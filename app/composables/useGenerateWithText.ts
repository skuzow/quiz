import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  TestQuestionTypeValues,
  TEST_GENERATION_QUESTIONS_MIN,
  TEST_GENERATION_QUESTIONS_MAX,
  TEST_GENERATION_QUESTION_OPTIONS_MIN,
  TEST_GENERATION_QUESTION_OPTIONS_MAX,
  TEST_GENERATION_TEXT_MIN
} from '#shared/constants/test.constant';

export const useGenerateWithText = () => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t, locale } = useI18n();

  const testStore = useTestStore();

  const { requiredMessage, minMessage, maxMessage } = useFormMessage();

  const { alert } = useAlert();
  const { toast } = useToast();

  const isLoadingWithText: Ref<boolean> = ref(false);
  const internalServerErrorWithText: Ref<boolean> = ref(false);

  const GenerateTextSchema = z.object({
    text: z
      .string({
        required_error: requiredMessage(FormInput.TEXT)
      })
      .min(TEST_GENERATION_TEXT_MIN, {
        message: minMessage(FormInput.TEXT, TEST_GENERATION_TEXT_MIN)
      }),
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

  type GenerateTextForm = z.TypeOf<typeof GenerateTextSchema>;

  const validationSchema = toTypedSchema(GenerateTextSchema);

  const { handleSubmit, isFieldDirty } = useForm({
    validationSchema
  });

  const generateWithText = handleSubmit(
    async ({ text, type, questions, options, deep }: GenerateTextForm) => {
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
        const result = await $api.test.generate({
          deep,
          lang: locale.value,
          questions: {
            number: questions,
            type: type === 'ALL' ? undefined : type,
            options
          },
          info: text
        });

        testStore.createTest = result?.body?.test;

        await navigateTo(localePath('/create'));

        toast({
          title: $t('toast.test.generate'),
          description: testStore.createTest.title
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        internalServerErrorWithText.value = true;
      } finally {
        isLoadingWithText.value = false;
      }
    }
  );

  return {
    isLoadingWithText,
    internalServerErrorWithText,
    isFieldDirty,
    generateWithText
  };
};
