import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { TestQuestionType } from '#shared/constants/test';

export const useMake = (questions: IUserTestQuestion[]) => {
  const isLoadingMake: Ref<boolean> = ref(false);

  const responseEnum = z.enum([
    '0',
    ...Array.from({ length: 9 }, (_, i) => String(i + 1))
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

  const makeTest = handleSubmit(async (make: IMake) => {
    if (isLoadingMake.value) return;

    isLoadingMake.value = true;

    console.log(make);

    isLoadingMake.value = false;
  });

  return {
    isLoadingMake,
    makeTest
  };
};
