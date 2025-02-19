import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { FileTypes } from '@/constants/file';

export const useGenerateWithFile = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t, locale } = useI18n();

  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const { alert } = useAlert();

  const file: Ref<File | undefined> = ref(undefined);
  const requiredFileError: Ref<boolean> = ref(false);

  const onFileChange = (inputFile: IPreviewFile | null) => {
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
      .default(5),
    deep: z.boolean().default(true)
  });

  type IFile = z.TypeOf<typeof zodFileFormSchema>;

  const validationSchema = toTypedSchema(zodFileFormSchema);

  const { handleSubmit, isFieldDirty } = useForm({
    validationSchema
  });

  const generateWithFile = handleSubmit(async ({ questions }: IFile) => {
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

      await navigateTo(localePath('/create'));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      internalServerErrorWithFile.value = true;
    } finally {
      isLoadingWithFile.value = false;
    }
  });

  const parseFile = async (file: File) => {
    const fileParsers = {
      [FileTypes.TXT]: txtParse,
      [FileTypes.PDF]: pdfParse,
      [FileTypes.DOCX]: docxParse
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
    internalServerErrorWithFile,
    isFieldDirty,
    generateWithFile
  };
};
