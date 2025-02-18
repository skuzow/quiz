import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

export const useGenerateWithText = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t, locale } = useI18n();

  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const { alert } = useAlert();

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

  const validationSchema = toTypedSchema(zodTextFormSchema);

  const { handleSubmit, isFieldDirty } = useForm({
    validationSchema
  });

  const generateWithText = handleSubmit(async ({ text, questions }: IText) => {
    if (isLoadingWithText.value) return;

    if (testStore.createTest) {
      const response: boolean = await alert({
        title: $t('alert.overrideTest.title'),
        description: $t('alert.overrideTest.description'),
        confirm: $t('continue')
      });

      if (!response) return;
    }

    isLoadingWithText.value = true;
    internalServerErrorWithText.value = false;

    try {
      const result = await $api.test.createWithAI({
        lang: locale.value,
        questions: questions,
        info: text
      });

      testStore.createTest = result?.body?.test as IUserTest;

      await navigateTo(localePath('/create'));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      internalServerErrorWithText.value = true;
    } finally {
      isLoadingWithText.value = false;
    }
  });

  return {
    isLoadingWithText,
    internalServerErrorWithText,
    isFieldDirty,
    generateWithText
  };
};
