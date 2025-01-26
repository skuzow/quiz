import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useFieldArray, type FieldArrayContext } from 'vee-validate';

export const useCreate = () => {
  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const zodOptionFormSchema = z.object({
    text: z
      .string({ required_error: requiredMessage(FormInput.OPTION) })
      .min(5, minMessage(FormInput.OPTION, 5))
      .max(150, maxMessage(FormInput.OPTION, 150)),
    isCorrect: z.boolean()
  });

  const zodQuestionFormSchema = z.object({
    text: z
      .string({ required_error: requiredMessage(FormInput.QUESTION) })
      .min(10, minMessage(FormInput.QUESTION, 10))
      .max(150, maxMessage(FormInput.QUESTION, 150)),
    options: z
      .array(zodOptionFormSchema, {
        required_error: requiredMessage(FormInput.OPTIONS)
      })
      .min(2, minMessage(FormInput.OPTIONS, 2, false))
      .max(10, maxMessage(FormInput.OPTIONS, 10, false))
      .refine(
        (options) => options.some((option) => option.isCorrect),
        minMessage(FormInput.CORRECT_OPTIONS, 1, false)
      )
    // image: z.string().optional()
  });

  const zodFormSchema = z.object({
    title: z
      .string({ required_error: requiredMessage(FormInput.TITLE) })
      .min(10, minMessage(FormInput.TITLE, 10))
      .max(150, maxMessage(FormInput.TITLE, 150)),
    description: z
      .string({ required_error: requiredMessage(FormInput.DESCRIPTION) })
      .min(10, minMessage(FormInput.DESCRIPTION, 10))
      .max(500, maxMessage(FormInput.DESCRIPTION, 500)),
    questions: z
      .array(zodQuestionFormSchema, {
        required_error: requiredMessage(FormInput.QUESTIONS)
      })
      .min(1, minMessage(FormInput.QUESTIONS, 1, false))
      .max(100, maxMessage(FormInput.QUESTIONS, 100, false))
  });

  type ICreate = z.TypeOf<typeof zodFormSchema>;

  type ICreateQuestion = ICreate['questions'][0];
  type ICreateOption = ICreate['questions'][0]['options'][0];

  const correctInitialOptionValue: ICreateOption = {
    text: '',
    isCorrect: true
  };

  const initialOptionValue: ICreateOption = {
    text: '',
    isCorrect: false
  };

  const initialQuestionValue: ICreateQuestion = {
    text: '',
    options: [correctInitialOptionValue, initialOptionValue]
  };

  const initialFormValue: ICreate = {
    title: '',
    description: '',
    questions: [initialQuestionValue, initialQuestionValue]
  };

  const validationSchema = toTypedSchema(zodFormSchema);

  const { handleSubmit, errorBag, isFieldDirty } = useForm({
    validationSchema,
    initialValues: testStore.createTest || initialFormValue
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

  const question: FieldArrayContext<ICreateQuestion> = useFieldArray(
    FormInput.QUESTIONS
  );

  const options: ComputedRef<FieldArrayContext<ICreateOption>[]> = computed(
    () => {
      return question.fields.value.map((_questionField, indexQuestionField) => {
        return useFieldArray(
          `${questionPath(indexQuestionField)}.${FormInput.OPTIONS}`
        );
      });
    }
  );

  const questionPath = (indexQuestion: number) =>
    `${FormInput.QUESTIONS}.${indexQuestion}`;

  const optionPath = (indexQuestion: number, indexOption: number) =>
    `${FormInput.QUESTIONS}.${indexQuestion}.${FormInput.OPTIONS}.${indexOption}`;

  const createTest = handleSubmit(async (create: ICreate) => {
    // console.log(options.value);
    console.log(create);
    // console.log(testStore.createTest);

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
    initialOptionValue,
    initialQuestionValue,
    errorBag,
    isFieldDirty,
    question,
    options,
    questionPath,
    optionPath,
    createTest
  };
};
