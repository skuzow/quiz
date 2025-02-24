import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useFieldArray, type FieldArrayContext } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import {
  TestQuestionType,
  TestQuestionTypeValues,
  MAX_TEST_OPTIONS
} from '#shared/constants/test';

export const useCreate = (edit?: boolean) => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t } = useI18n();

  const testStore = useTestStore();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const { toast } = useToast();

  const isLoadingCreate: Ref<boolean> = ref(false);
  const internalServerErrorCreate: Ref<boolean> = ref(false);

  const zodOptionFormSchema = z.object({
    text: z
      .string({ required_error: requiredMessage(FormInput.OPTION) })
      .min(2, minMessage(FormInput.OPTION, 2))
      .max(150, maxMessage(FormInput.OPTION, 150)),
    isCorrect: z.boolean()
  });

  const zodQuestionFormSchema = z
    .object({
      text: z
        .string({ required_error: requiredMessage(FormInput.QUESTION) })
        .min(10, minMessage(FormInput.QUESTION, 10))
        .max(150, maxMessage(FormInput.QUESTION, 150)),
      type: z.enum(TestQuestionTypeValues),
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

  const initialCorrectOptionValue: ICreateOption = {
    text: '',
    isCorrect: true
  };

  const initialIncorrectOptionValue: ICreateOption = {
    text: '',
    isCorrect: false
  };

  const initialSingleQuestionValue: ICreateQuestion = {
    text: '',
    type: TestQuestionType.SINGLE,
    options: [initialCorrectOptionValue, initialIncorrectOptionValue]
  };

  const initialMultipleQuestionValue: ICreateQuestion = {
    text: '',
    type: TestQuestionType.MULTIPLE,
    options: [
      initialCorrectOptionValue,
      initialIncorrectOptionValue,
      initialCorrectOptionValue
    ]
  };

  const initialFormValue: ICreate = {
    title: '',
    description: '',
    questions: [initialSingleQuestionValue, initialMultipleQuestionValue]
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

  const testCreateEditRequest = async (create: ICreate) => {
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

      const test: IUserTest = result.body.test;

      await navigateTo(localePath(`/tests/${test.id}`));

      toast({
        title: edit ? $t('toast.test.edit') : $t('toast.test.create'),
        description: test.title
      });
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
    initialIncorrectOptionValue,
    initialSingleQuestionValue,
    errorBag,
    isFieldDirty,
    questions,
    options,
    questionPath,
    optionPath,
    createTest
  };
};
