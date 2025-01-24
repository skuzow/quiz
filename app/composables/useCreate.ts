import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useFieldArray } from 'vee-validate';

export const useCreate = () => {
  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  // const zodOptionFormSchema = z.object({
  //   text: z.string(),
  //   isCorrect: z.boolean()
  // });

  // const zodQuestionFormSchema = z.object({
  //   text: z.string(),
  //   options: z.array(zodOptionFormSchema).min(2).max(5),
  //   image: z.string().optional()
  // });

  const zodFormSchema = z.object({
    title: z
      .string({
        required_error: requiredMessage(FormInput.TITLE)
      })
      .min(10, {
        message: minMessage(FormInput.TITLE, 10)
      })
      .max(100, {
        message: maxMessage(FormInput.TITLE, 100)
      }),
    description: z
      .string({
        required_error: requiredMessage(FormInput.DESCRIPTION)
      })
      .min(10, {
        message: minMessage(FormInput.DESCRIPTION, 10)
      })
      .max(300, {
        message: maxMessage(FormInput.DESCRIPTION, 300)
      })
    // questions: z.array(zodQuestionFormSchema).min(1).max(100)
  });

  type ICreate = z.TypeOf<typeof zodFormSchema>;

  const validationSchema = toTypedSchema(zodFormSchema);

  const { resetForm, isFieldDirty, handleSubmit, values } = useForm({
    validationSchema,
    initialValues: testStore.createTest
  });

  // watch(
  //   values,
  //   (newValues) => {
  //     console.log(newValues);
  //     testStore.createTest = newValues;
  //     console.log(testStore.createTest);
  //   },
  //   { deep: true }
  // );

  const {
    fields: questionFields,
    push: pushQuestion,
    remove: removeQuestion
  } = useFieldArray(FormInput.QUESTIONS);

  const createTest = handleSubmit(async (create: ICreate) => {
    console.log(create);
    console.log(testStore.createTest);

    // TODO: know how to reset the form completely, not placing initial values again
    // testStore.createTest = undefined;
    // resetForm(testStore.createTest);
    //   if (isLoadingWithText.value) return;

    //   if (createStore.createTestValue) {
    //     const response: boolean = await alert({
    //       title: $t('alert.overrideTest.title'),
    //       description: $t('alert.overrideTest.description'),
    //       confirm: $t('continue')
    //     });

    //     if (!response) return;
    //   }

    //   isLoadingWithText.value = true;
    //   internalServerErrorWithText.value = false;

    //   try {
    //     const result = await $api.test.createWithAI({
    //       lang: locale.value,
    //       questions: questions,
    //       info: text
    //     });

    //     createStore.createTestValue = result?.body?.test as IUserTest;
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   } catch (error) {
    //     internalServerErrorWithText.value = true;
    //   }

    //   isLoadingWithText.value = false;

    //   if (!internalServerErrorWithText.value)
    //     await navigateTo(localePath('/create'));
  });

  return {
    isFieldDirty,
    questionFields,
    pushQuestion,
    removeQuestion,
    createTest
  };
};
