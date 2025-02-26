import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import {
  TestQuestionTypeValues,
  TEST_GENERATION_QUESTIONS_MIN,
  TEST_GENERATION_QUESTIONS_MAX,
  TEST_GENERATION_QUESTION_OPTIONS_MIN,
  TEST_GENERATION_QUESTION_OPTIONS_MAX
} from '#shared/constants/test.constant';

import type { PreviewFile } from '@/types/file.type';
import { FileTypes } from '@/constants/file.constant';

export const useGenerateWithFile = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t, locale } = useI18n();

  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const { alert } = useAlert();
  const { toast } = useToast();

  const file: Ref<File | undefined> = ref(undefined);
  const requiredFileError: Ref<boolean> = ref(false);

  const onFileChange = (inputFile: PreviewFile | null) => {
    file.value = inputFile?.file;
  };

  const isLoadingWithFile: Ref<boolean> = ref(false);
  const internalServerErrorWithFile: Ref<boolean> = ref(false);

  const GenerateFileSchema = z.object({
    type: z.enum(['ALL', ...TestQuestionTypeValues]).default('ALL'),
    questions: z
      .number({
        required_error: requiredMessage(FormInput.QUESTIONS)
      })
      .int()
      .min(TEST_GENERATION_QUESTIONS_MIN, {
        message: minMessage(FormInput.QUESTIONS, TEST_GENERATION_QUESTIONS_MIN)
      })
      .max(TEST_GENERATION_QUESTIONS_MAX, {
        message: maxMessage(FormInput.QUESTIONS, TEST_GENERATION_QUESTIONS_MAX)
      })
      .default(5),
    options: z
      .number({
        required_error: requiredMessage(FormInput.OPTIONS)
      })
      .int()
      .min(TEST_GENERATION_QUESTION_OPTIONS_MIN, {
        message: minMessage(
          FormInput.OPTIONS,
          TEST_GENERATION_QUESTION_OPTIONS_MIN
        )
      })
      .max(TEST_GENERATION_QUESTION_OPTIONS_MAX, {
        message: maxMessage(
          FormInput.OPTIONS,
          TEST_GENERATION_QUESTION_OPTIONS_MAX
        )
      })
      .optional(),
    deep: z.boolean().default(true)
  });

  type GenerateFileForm = z.TypeOf<typeof GenerateFileSchema>;

  const validationSchema = toTypedSchema(GenerateFileSchema);

  const { handleSubmit, isFieldDirty } = useForm({
    validationSchema
  });

  const generateWithFile = handleSubmit(
    async ({ type, questions, options, deep }: GenerateFileForm) => {
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

        const result = await $api.test.generate({
          deep,
          lang: locale.value,
          questions: {
            number: questions,
            type: type === 'ALL' ? undefined : type,
            options
          },
          info: formatTextContent(text)
        });

        testStore.createTest = result?.body?.test;

        await navigateTo(localePath('/create'));

        toast({
          title: $t('toast.test.generate'),
          description: testStore.createTest.title
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        internalServerErrorWithFile.value = true;
      } finally {
        isLoadingWithFile.value = false;
      }
    }
  );

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
