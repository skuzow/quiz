import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';

import { FILE_TYPES } from '~/constants/file';

export const useCreateAiWithFile = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t, locale } = useI18n();

  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const { alert } = useAlert();

  const file: Ref<File | undefined> = ref(undefined);
  const requiredFileError: Ref<boolean> = ref(false);

  const onFileChange = (inputFile: PreviewFile | null) => {
    file.value = inputFile?.file;
  };

  const isLoadingWithFile: Ref<boolean> = ref(false);
  const internalServerErrorWithFile: Ref<boolean> = ref(false);

  const zodFileFormSchema = z.object({
    questions: z
      .number({
        required_error: requiredMessage(FormInput.QUESTIONS)
      })
      .min(1, {
        message: minMessage(FormInput.QUESTIONS, 1)
      })
      .max(10, {
        message: maxMessage(FormInput.QUESTIONS, 10)
      })
      .default(5)
  });

  type IFile = z.TypeOf<typeof zodFileFormSchema>;

  const fileFormSchema = toTypedSchema(zodFileFormSchema);

  const { handleSubmit: handleSubmitWithFile, errors: errorMessageWithFile } =
    useForm({
      validationSchema: fileFormSchema
    });

  const { value: questionsValue } = useField(FormInput.QUESTIONS);

  const generateWithFile = handleSubmitWithFile(
    async ({ questions }: IFile) => {
      if (isLoadingWithFile.value) return;

      requiredFileError.value = false;

      if (!file.value) return (requiredFileError.value = true);

      if (testStore.createTest) {
        const response: boolean = await alert({
          title: $t('alert.overrideTest.title'),
          description: $t('alert.overrideTest.description'),
          confirm: $t('continue')
        });

        if (!response) return;
      }

      isLoadingWithFile.value = true;
      internalServerErrorWithFile.value = false;

      try {
        const text: string | null = await parseFile(file.value);

        if (!text) throw new Error('Failed to parse file');

        const result = await $api.test.createWithAI({
          lang: locale.value,
          questions: questions,
          info: formatTextContent(text)
        });

        testStore.createTest = result?.body?.test as IUserTest;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        internalServerErrorWithFile.value = true;
      }

      isLoadingWithFile.value = false;

      if (!internalServerErrorWithFile.value)
        await navigateTo(localePath('/create'));
    }
  );

  const parseFile = async (file: File) => {
    const fileParsers = {
      [FILE_TYPES.TXT]: txtParse,
      [FILE_TYPES.PDF]: pdfParse,
      [FILE_TYPES.DOCX]: docxParse
    };

    const parser = fileParsers[file.type as keyof typeof fileParsers];

    return parser ? parser(file) : null;
  };

  const formatTextContent = (content: string): string => {
    return content.replace(/[\s\\]/g, '').replace(/"/g, '\\"');
  };

  return {
    requiredFileError,
    onFileChange,
    isLoadingWithFile,
    questionsValue,
    errorMessageWithFile,
    internalServerErrorWithFile,
    generateWithFile
  };
};
