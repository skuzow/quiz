import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';

import { FILE_TYPES } from '~/constants/file';

export const useCreateAiWithFile = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { locale } = useI18n();

  const createStore = useCreateStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

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

      isLoadingWithFile.value = true;
      internalServerErrorWithFile.value = false;

      try {
        const text: string | null = await readFileContent(file.value);

        if (!text) return;

        const result = await $api.test.createWithAI({
          lang: locale.value,
          questions: questions,
          info: text
        });

        createStore.createTestValue = result?.body?.test as IUserTest;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        internalServerErrorWithFile.value = true;
      }

      isLoadingWithFile.value = false;

      if (!internalServerErrorWithFile.value)
        await navigateTo(localePath('/create'));
    }
  );

  const readFileContent = async (file: File) => {
    if (file.type === FILE_TYPES.TXT) return readTxtContent(file);
    else if (file.type === FILE_TYPES.PDF) return readPdfContent(file);
    else if (file.type === FILE_TYPES.DOCX) return readDocxContent(file);

    return null;
  };

  const readTxtContent = async (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        const content = e.target?.result;

        const result: string = formatFileContent(content as string);

        resolve(result);
      };

      reader.readAsText(file);
    });
  };

  const readPdfContent = async (file: File): Promise<string> => {
    // return new Promise<string>((resolve) => {
    //   const reader = new FileReader();
    //   reader.onloadend = (e) => {
    //     const content = e.target?.result;
    //     pdfParse(content).then((result) => {
    //       const resultFormatted: string = formatFileContent(
    //         result.text as string
    //       );
    //       resolve(resultFormatted);
    //     });
    //   };
    // });
  };

  const readDocxContent = async (file: File): Promise<string> => {
    // return new Promise<string>((resolve) => {
    //   const reader = new FileReader();
    //   reader.onloadend = (e) => {
    //     const content = e.target?.result;
    //     const result: string = formatFileContent(content as string);
    //     resolve(result);
    //   };
    //   reader.readAsText(file);
    // });
  };

  const formatFileContent = (content: string): string => {
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
