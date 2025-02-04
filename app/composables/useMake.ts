import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { TestQuestionType } from '#shared/constants/test';

export const useMake = (questions: IUserTestQuestion[]) => {
  const isLoadingMake: Ref<boolean> = ref(false);

  const zodSingleQuestionFormSchema = z.object({
    options: z
      .enum(['0', ...Array.from({ length: 9 }, (_, i) => String(i + 1))])
      .optional()
  });

  const zodMultipleQuestionFormSchema = z.object({
    options: z.array(z.string()).optional()
  });

  const zodFormSchema = z.object({
    singleQuestions: z.array(zodSingleQuestionFormSchema),
    multipleQuestions: z.array(zodMultipleQuestionFormSchema)
  });

  type IMake = z.TypeOf<typeof zodFormSchema>;

  const validationSchema = toTypedSchema(zodFormSchema);

  const { handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      multipleQuestions: questions
        .filter((question) => question.type === TestQuestionType.MULTIPLE)
        .map((_question) => ({
          options: []
        }))
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
