import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { TestQuestionType, MAX_TEST_OPTIONS } from '#shared/constants/test';

export const useMake = (questions: IUserTestQuestion[]) => {
  const { t: $t } = useI18n();

  const { alert } = useAlert();

  const isLoadingMake: Ref<boolean> = ref(false);

  const responseEnum = z.enum([
    '0',
    ...Array.from({ length: MAX_TEST_OPTIONS - 1 }, (_, i) => String(i + 1))
  ]);

  const zodSingleQuestionFormSchema = z.object({
    type: z.literal(TestQuestionType.SINGLE),
    options: responseEnum.optional()
  });

  const zodMultipleQuestionFormSchema = z.object({
    type: z.literal(TestQuestionType.MULTIPLE),
    options: z.array(responseEnum).optional()
  });

  const zodFormSchema = z.object({
    questions: z.array(
      z.discriminatedUnion('type', [
        zodSingleQuestionFormSchema,
        zodMultipleQuestionFormSchema
      ])
    )
  });

  type IMake = z.TypeOf<typeof zodFormSchema>;

  type IMakeQuestion = IMake['questions'][0];

  const validationSchema = toTypedSchema(zodFormSchema);

  const { handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      questions: questions.map(({ type }) => {
        if (type === TestQuestionType.SINGLE)
          return {
            type: TestQuestionType.SINGLE as const,
            options: undefined
          };

        return {
          type: TestQuestionType.MULTIPLE as const,
          options: []
        };
      })
    }
  });

  const makeTest = handleSubmit(async ({ questions }: IMake) => {
    if (isLoadingMake.value) return;

    if (isSomeQuestionEmpty(questions)) {
      const response: boolean = await alert({
        title: $t('alert.emptyQuestions.title'),
        description: $t('alert.emptyQuestions.description')
      });

      if (!response) return;
    }

    isLoadingMake.value = true;

    // Make correction here

    isLoadingMake.value = false;
  });

  const isSomeQuestionEmpty = (questions: IMakeQuestion[]): boolean => {
    return questions.some(({ type, options }) => {
      if (type === TestQuestionType.SINGLE) return !options;
      else if (type === TestQuestionType.MULTIPLE) return !options?.length;
    });
  };

  return {
    isLoadingMake,
    makeTest
  };
};
