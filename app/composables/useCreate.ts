import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useFieldArray, type FieldArrayContext } from 'vee-validate';

import { TestQuestionType, MAX_TEST_OPTIONS } from '#shared/constants/test';

export const useCreate = (edit?: boolean) => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();

  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const isLoadingCreate: Ref<boolean> = ref(false);
  const internalServerErrorCreate: Ref<boolean> = ref(false);

  const zodOptionFormSchema = z.object({
    text: z
      .string({ required_error: requiredMessage(FormInput.OPTION) })
      .min(3, minMessage(FormInput.OPTION, 3))
      .max(150, maxMessage(FormInput.OPTION, 150)),
    isCorrect: z.boolean()
  });

  const zodQuestionFormSchema = z
    .object({
      text: z
        .string({ required_error: requiredMessage(FormInput.QUESTION) })
        .min(10, minMessage(FormInput.QUESTION, 10))
        .max(150, maxMessage(FormInput.QUESTION, 150)),
      type: z.enum(
        Object.values(TestQuestionType) as [keyof typeof TestQuestionType]
      ),
      options: z
        .array(zodOptionFormSchema, {
          required_error: requiredMessage(FormInput.OPTIONS)
        })
        .min(2, minMessage(FormInput.OPTIONS, 2, false))
        .max(
          MAX_TEST_OPTIONS,
          maxMessage(FormInput.OPTIONS, MAX_TEST_OPTIONS, false)
        )
        .refine(
          (options) => options.some((option) => option.isCorrect),
          minMessage(FormInput.CORRECT_OPTIONS, 1, false)
        )
      // image: z.string().optional()
    })
    .refine(
      (question) =>
        question.type !== TestQuestionType.SINGLE ||
        question.options.filter((option) => option.isCorrect).length === 1,
      maxMessage(FormInput.CORRECT_OPTIONS, 1, false)
    );

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
    type: TestQuestionType.SINGLE,
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
    initialValues:
      (edit ? testStore.editTest : testStore.createTest) || initialFormValue
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

  const questions: FieldArrayContext<ICreateQuestion> = useFieldArray(
    FormInput.QUESTIONS
  );

  const options: ComputedRef<FieldArrayContext<ICreateOption>[]> = computed(
    () => {
      return questions.fields.value.map(
        (_questionField, indexQuestionField) => {
          return useFieldArray(
            `${questionPath(indexQuestionField)}.${FormInput.OPTIONS}`
          );
        }
      );
    }
  );

  const questionPath = (indexQuestion: number) =>
    `${FormInput.QUESTIONS}.${indexQuestion}`;

  const optionPath = (indexQuestion: number, indexOption: number) =>
    `${questionPath(indexQuestion)}.${FormInput.OPTIONS}.${indexOption}`;

  const testCreateEditRequest = async (create: ICreate): Promise<IUserTest> => {
    if (edit)
      return $api.test.update(testStore.editTest!.id, create as IUserTest);

    return $api.test.create(create as IUserTest);
  };

  const createTest = handleSubmit(async (create: ICreate) => {
    if (isLoadingCreate.value) return;

    isLoadingCreate.value = true;
    internalServerErrorCreate.value = false;

    try {
      const result = await testCreateEditRequest(create);

      await navigateTo(localePath(`/tests/${result?.body?.test?.id}`));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      internalServerErrorCreate.value = true;
    } finally {
      isLoadingCreate.value = false;
    }
  });

  return {
    isLoadingCreate,
    internalServerErrorCreate,
    initialOptionValue,
    initialQuestionValue,
    errorBag,
    isFieldDirty,
    questions,
    options,
    questionPath,
    optionPath,
    createTest
  };
};
