import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import {
  TestQuestionType,
  TEST_QUESTION_OPTIONS_MAX
} from '#shared/constants/test.constant';

export const useMake = (questions: UserTestQuestion[]) => {
  const { t: $t } = useI18n();

  const { FormInput, minMessage } = useFormMessage();

  const { alert } = useAlert();

  const isLoadingMake: Ref<boolean> = ref(false);
  const makeCorrection: Ref<TestCorrectionQuestion[] | undefined> = ref();

  const responseEnum = z.enum([
    '0',
    ...Array.from({ length: TEST_QUESTION_OPTIONS_MAX - 1 }, (_, i) =>
      String(i + 1)
    )
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
    questions: z
      .array(
        z.discriminatedUnion('type', [
          zodSingleQuestionFormSchema,
          zodMultipleQuestionFormSchema
        ])
      )
      .refine(
        (questions) => isSomeQuestionAnswered(questions),
        minMessage(FormInput.ANSWERED_QUESTIONS, 1, false)
      )
  });

  type MakeQuestionForm =
    | z.infer<typeof zodSingleQuestionFormSchema>
    | z.infer<typeof zodMultipleQuestionFormSchema>;

  type MakeForm = {
    questions: MakeQuestionForm[];
  };

  const validationSchema = toTypedSchema(zodFormSchema);

  const { handleSubmit, errorBag, isFieldTouched, resetForm } = useForm({
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

  const makeTest = handleSubmit(async ({ questions }: MakeForm) => {
    if (isLoadingMake.value) return;

    if (isSomeQuestionEmpty(questions)) {
      const response: boolean = await alert({
        title: $t('alert.emptyQuestions.title'),
        description: $t('alert.emptyQuestions.description')
      });

      if (!response) return;
    }

    isLoadingMake.value = true;

    correctTest(questions);

    isLoadingMake.value = false;
  });

  const correctTest = (makeQuestions: MakeQuestionForm[]) => {
    makeCorrection.value = makeQuestions.map(
      ({ type, options: makeOptions }, indexMakeQuestion) => {
        const question: UserTestQuestion = questions[indexMakeQuestion]!;

        if (type === TestQuestionType.SINGLE)
          return correctSingleQuestion(makeOptions, question);

        return correctMultipleQuestion(makeOptions, question);
      }
    );
  };

  const correctSingleQuestion = (
    makeQuestionOption: string | undefined,
    question: UserTestQuestion
  ): TestCorrectionQuestion => {
    return {
      ...question,
      options: question.options.map((option) => ({
        ...option,
        isUserSelected: String(option.number) === makeQuestionOption
      }))
    };
  };

  const correctMultipleQuestion = (
    makeQuestionOption: string[] | undefined,
    question: UserTestQuestion
  ) => {
    return {
      ...question,
      options: question.options.map((option) => ({
        ...option,
        isUserSelected:
          makeQuestionOption?.includes(String(option.number)) || false
      }))
    };
  };

  const retryTest = () => {
    resetForm();
    makeCorrection.value = undefined;

    scrollTop();
  };

  const isSomeQuestionAnswered = (questions: MakeQuestionForm[]): boolean => {
    return questions.some(({ type, options }) => {
      if (type === TestQuestionType.SINGLE) return options;
      else if (type === TestQuestionType.MULTIPLE) return options?.length;
    });
  };

  const isSomeQuestionEmpty = (questions: MakeQuestionForm[]): boolean => {
    return questions.some(({ type, options }) => {
      if (type === TestQuestionType.SINGLE) return !options;
      else if (type === TestQuestionType.MULTIPLE) return !options?.length;
    });
  };

  return {
    isLoadingMake,
    makeCorrection,
    errorBag,
    isFieldTouched,
    makeTest,
    retryTest
  };
};
