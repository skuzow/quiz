import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';

export const useCreateAiWithText = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { locale } = useI18n();

  const createStore = useCreateStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const isLoadingWithText: Ref<boolean> = ref(false);
  const internalServerErrorWithText: Ref<boolean> = ref(false);

  const zodTextFormSchema = z.object({
    text: z
      .string({
        required_error: requiredMessage(FormInput.TEXT)
      })
      .min(10, {
        message: minMessage(FormInput.TEXT, 10)
      }),
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

  type IText = z.TypeOf<typeof zodTextFormSchema>;

  const textFormSchema = toTypedSchema(zodTextFormSchema);

  const { handleSubmit: handleSubmitWithText, errors: errorMessageWithText } =
    useForm({
      validationSchema: textFormSchema
    });

  const { value: textAreaValue } = useField(FormInput.TEXT);
  const { value: questionsValue } = useField(FormInput.QUESTIONS);

  const generateWithText = handleSubmitWithText(
    async ({ text, questions }: IText) => {
      if (isLoadingWithText.value) return;

      isLoadingWithText.value = true;
      internalServerErrorWithText.value = false;

      try {
        const result = await $api.test.createWithAI({
          lang: locale.value,
          questions: questions,
          info: text
        });

        createStore.createTestValue = result?.body?.test as IUserTest;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        internalServerErrorWithText.value = true;
      }

      isLoadingWithText.value = false;

      if (!internalServerErrorWithText.value)
        await navigateTo(localePath('/create'));
    }
  );

  return {
    isLoadingWithText,
    textAreaValue,
    questionsValue,
    errorMessageWithText,
    internalServerErrorWithText,
    generateWithText
  };
};
