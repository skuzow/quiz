import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  TestQuestionType,
  TEST_CREATION_QUESTION_OPTIONS_MAX
} from '#shared/constants/test.constant';

export const useMake = (test: UserTest) => {
  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();

  const { minMessage } = useFormMessage();

  const { alert } = useAlert();
  const { toast } = useToast();

  const isLoadingMake: Ref<boolean> = ref(false);
  const makeCorrection: Ref<TestCorrectionQuestion[] | undefined> = ref();

  const MakeQuestionResponseSchema = z.enum([
    '0',
    ...Array.from({ length: TEST_CREATION_QUESTION_OPTIONS_MAX - 1 }, (_, i) =>
      String(i + 1)
    )
  ]);

  const MakeSingleQuestionSchema = z.object({
    type: z.literal(TestQuestionType.SINGLE),
    options: MakeQuestionResponseSchema.optional()
  });

  const MakeMultipleQuestionSchema = z.object({
    type: z.literal(TestQuestionType.MULTIPLE),
    options: z.array(MakeQuestionResponseSchema).optional()
  });

  const MakeSchema = z.object({
    questions: z
      .array(
        z.discriminatedUnion('type', [
          MakeSingleQuestionSchema,
          MakeMultipleQuestionSchema
        ])
      )
      .refine(
        (questions) => isSomeQuestionAnswered(questions),
        minMessage(FormInput.ANSWERED_QUESTIONS, 1, false)
      )
  });

  type MakeQuestionForm =
    | z.infer<typeof MakeSingleQuestionSchema>
    | z.infer<typeof MakeMultipleQuestionSchema>;

  type MakeForm = {
    questions: MakeQuestionForm[];
  };

  const validationSchema = toTypedSchema(MakeSchema);

  const { handleSubmit, errorBag, isFieldTouched, resetForm } = useForm({
    validationSchema,
    initialValues: {
      questions: test.questions.map(({ type }) => {
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
        title: $t('alert.tests.make.empty.title'),
        description: $t('alert.tests.make.empty.description')
      });

      if (!response) return;
    }

    isLoadingMake.value = true;

    const correction: TestCorrectionQuestion[] = correctTest(questions);
    const score: number = scoreTest(correction);

    await $api.test.complete(test.id, { score });

    makeCorrection.value = correction;

    isLoadingMake.value = false;

    toast({
      title:
        score >= 5
          ? $t('toast.tests.make.score.title.pass')
          : $t('toast.tests.make.score.title.fail'),
      description: `${$t('toast.tests.make.score.description')} ${score}/10`
    });
  });

  const correctTest = (
    makeQuestions: MakeQuestionForm[]
  ): TestCorrectionQuestion[] => {
    return makeQuestions.map(
      ({ type, options: makeOptions }, indexMakeQuestion) => {
        const question: UserTestQuestion = test.questions[indexMakeQuestion]!;

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
    makeQuestionOptions: string[] | undefined,
    question: UserTestQuestion
  ): TestCorrectionQuestion => {
    return {
      ...question,
      options: question.options.map((option) => ({
        ...option,
        isUserSelected:
          makeQuestionOptions?.includes(String(option.number)) || false
      }))
    };
  };

  const scoreTest = (correction: TestCorrectionQuestion[]): number => {
    const scoreQuestions: number = correction.reduce(
      (sum, { type, options }) => {
        if (type === TestQuestionType.SINGLE)
          return sum + scoreSingleQuestion(options);

        return sum + scoreMultipleQuestion(options);
      },
      0
    );

    const average: number = scoreQuestions / correction.length;
    const score: number = average * 10;

    return roundToTwo(score);
  };

  const scoreSingleQuestion = (
    options: TestCorrectionQuestionOption[]
  ): number => {
    const score: number = options.some(
      ({ isUserSelected, isCorrect }) => isUserSelected && isCorrect
    )
      ? 1
      : 0;

    return score;
  };

  const scoreMultipleQuestion = (
    options: TestCorrectionQuestionOption[]
  ): number => {
    const correctOptions: number = options.filter(
      ({ isCorrect }) => isCorrect
    ).length;

    const correctSelectedOptions: number = options.filter(
      ({ isUserSelected, isCorrect }) => isUserSelected && isCorrect
    ).length;

    const score: number = correctSelectedOptions / correctOptions;

    return score;
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
