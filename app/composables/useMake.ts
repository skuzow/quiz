import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { TestQuestionType } from '#shared/constants/test';

export const useMake = (questions: IUserTestQuestion[]) => {
  const { FormInput, requiredMessage } = useFormMessage();

  const isLoadingMake: Ref<boolean> = ref(false);

  const zodQuestionFormSchema = z.object({
    options: z.array(z.string(), {
      required_error: requiredMessage(FormInput.OPTIONS)
    })
  });

  const zodFormSchema = z.object({
    questions: z.array(zodQuestionFormSchema, {
      required_error: requiredMessage(FormInput.QUESTIONS)
    })
  });

  type IMake = z.TypeOf<typeof zodFormSchema>;

  const validationSchema = toTypedSchema(zodFormSchema);

  const { handleSubmit, errorBag, isFieldDirty } = useForm({
    validationSchema,
    initialValues: {
      questions: questions.map((_question) => ({
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
    errorBag,
    isFieldDirty,
    // question,
    // options,
    makeTest
  };
};
