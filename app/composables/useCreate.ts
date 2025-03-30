import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useFieldArray, type FieldArrayContext } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  TestCategoryValues,
  TestQuestionType,
  TestQuestionTypeValues,
  TEST_CREATION_TITLE_MIN,
  TEST_CREATION_TITLE_MAX,
  TEST_CREATION_DESCRIPTION_MIN,
  TEST_CREATION_DESCRIPTION_MAX,
  TEST_CREATION_CATEGORIES_MAX,
  TEST_CREATION_QUESTIONS_MIN,
  TEST_CREATION_QUESTIONS_MAX,
  TEST_CREATION_QUESTION_TEXT_MIN,
  TEST_CREATION_QUESTION_TEXT_MAX,
  TEST_CREATION_QUESTION_OPTIONS_MIN,
  TEST_CREATION_QUESTION_OPTIONS_MAX,
  TEST_CREATION_QUESTION_OPTION_TEXT_MIN,
  TEST_CREATION_QUESTION_OPTION_TEXT_MAX
} from '#shared/constants/test.constant';

export const useCreate = (edit?: boolean) => {
  const { $api } = useNuxtApp();
  const localePath = useLocalePath();
  const { t: $t } = useI18n();

  const testStore = useTestStore();

  const { requiredMessage, minMessage, maxMessage } = useFormMessage();

  const { authUserURL } = useAuth();

  const { alert } = useAlert();
  const { toast } = useToast();

  const isLoadingCreate: Ref<boolean> = ref(false);
  const internalServerErrorCreate: Ref<boolean> = ref(false);

  const isLoadingDelete: Ref<boolean> = ref(false);

  const CreateQuestionOptionSchema = z.object({
    text: z
      .string({ required_error: requiredMessage(FormInput.OPTION) })
      .min(
        TEST_CREATION_QUESTION_OPTION_TEXT_MIN,
        maxMessage(FormInput.OPTION, TEST_CREATION_QUESTION_OPTION_TEXT_MIN)
      )
      .max(
        TEST_CREATION_QUESTION_OPTION_TEXT_MAX,
        maxMessage(FormInput.OPTION, TEST_CREATION_QUESTION_OPTION_TEXT_MAX)
      ),
    isCorrect: z.boolean()
  });

  const CreateQuestionSchema = z
    .object({
      text: z
        .string({ required_error: requiredMessage(FormInput.QUESTION) })
        .min(
          TEST_CREATION_QUESTION_TEXT_MIN,
          minMessage(FormInput.QUESTION, TEST_CREATION_QUESTION_TEXT_MIN)
        )
        .max(
          TEST_CREATION_QUESTION_TEXT_MAX,
          maxMessage(FormInput.QUESTION, TEST_CREATION_QUESTION_TEXT_MAX)
        ),
      type: z.enum(TestQuestionTypeValues),
      options: z
        .array(CreateQuestionOptionSchema, {
          required_error: requiredMessage(FormInput.OPTIONS)
        })
        .min(
          TEST_CREATION_QUESTION_OPTIONS_MIN,
          minMessage(
            FormInput.OPTIONS,
            TEST_CREATION_QUESTION_OPTIONS_MIN,
            false
          )
        )
        .max(
          TEST_CREATION_QUESTION_OPTIONS_MAX,
          maxMessage(
            FormInput.OPTIONS,
            TEST_CREATION_QUESTION_OPTIONS_MAX,
            false
          )
        )
        .refine(
          (options) => options.some((option) => option.isCorrect),
          minMessage(FormInput.CORRECT_OPTIONS, 1, false)
        )
    })
    .refine(
      (question) =>
        question.type !== TestQuestionType.SINGLE ||
        question.options.filter((option) => option.isCorrect).length === 1,
      maxMessage(FormInput.CORRECT_OPTIONS, 1, false)
    );

  const CreateSchema = z.object({
    published: z.boolean().default(false),
    title: z
      .string({ required_error: requiredMessage(FormInput.TITLE) })
      .min(
        TEST_CREATION_TITLE_MIN,
        minMessage(FormInput.TITLE, TEST_CREATION_TITLE_MIN)
      )
      .max(
        TEST_CREATION_TITLE_MAX,
        maxMessage(FormInput.TITLE, TEST_CREATION_TITLE_MAX)
      ),
    description: z
      .string({ required_error: requiredMessage(FormInput.DESCRIPTION) })
      .min(
        TEST_CREATION_DESCRIPTION_MIN,
        minMessage(FormInput.DESCRIPTION, TEST_CREATION_DESCRIPTION_MIN)
      )
      .max(
        TEST_CREATION_DESCRIPTION_MAX,
        maxMessage(FormInput.DESCRIPTION, TEST_CREATION_DESCRIPTION_MAX)
      ),
    categories: z
      .array(z.enum(TestCategoryValues))
      .max(
        TEST_CREATION_CATEGORIES_MAX,
        maxMessage(FormInput.CATEGORIES, TEST_CREATION_CATEGORIES_MAX, false)
      )
      .default([]),
    questions: z
      .array(CreateQuestionSchema, {
        required_error: requiredMessage(FormInput.QUESTIONS)
      })
      .min(
        TEST_CREATION_QUESTIONS_MIN,
        minMessage(FormInput.QUESTIONS, TEST_CREATION_QUESTIONS_MIN, false)
      )
      .max(
        TEST_CREATION_QUESTIONS_MAX,
        maxMessage(FormInput.QUESTIONS, TEST_CREATION_QUESTIONS_MAX, false)
      )
  });

  type CreateForm = z.TypeOf<typeof CreateSchema>;

  type CreateQuestionForm = CreateForm['questions'][0];
  type CreateQuestionOptionForm = CreateForm['questions'][0]['options'][0];

  const initialCorrectOptionValue: CreateQuestionOptionForm = {
    text: '',
    isCorrect: true
  };

  const initialIncorrectOptionValue: CreateQuestionOptionForm = {
    text: '',
    isCorrect: false
  };

  const initialSingleQuestionValue: CreateQuestionForm = {
    text: '',
    type: TestQuestionType.SINGLE,
    options: [initialCorrectOptionValue, initialIncorrectOptionValue]
  };

  const initialMultipleQuestionValue: CreateQuestionForm = {
    text: '',
    type: TestQuestionType.MULTIPLE,
    options: [
      initialCorrectOptionValue,
      initialIncorrectOptionValue,
      initialCorrectOptionValue
    ]
  };

  const initialFormValue: CreateForm = {
    published: false,
    title: '',
    description: '',
    categories: [],
    questions: [initialSingleQuestionValue, initialMultipleQuestionValue]
  };

  const validationSchema = toTypedSchema(CreateSchema);

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

  const questions: FieldArrayContext<CreateQuestionForm> = useFieldArray(
    FormInput.QUESTIONS
  );

  const options: ComputedRef<FieldArrayContext<CreateQuestionOptionForm>[]> =
    computed(() => {
      return questions.fields.value.map(
        (_questionField, indexQuestionField) => {
          return useFieldArray(
            `${questionPath(indexQuestionField)}.${FormInput.OPTIONS}`
          );
        }
      );
    });

  const questionPath = (indexQuestion: number) =>
    `${FormInput.QUESTIONS}.${indexQuestion}`;

  const optionPath = (indexQuestion: number, indexOption: number) =>
    `${questionPath(indexQuestion)}.${FormInput.OPTIONS}.${indexOption}`;

  const testCreateEditRequest = async (create: CreateForm) => {
    if (edit) return $api.test.update(testStore.editTest!.id, create);

    return $api.test.create(create);
  };

  const createTest = handleSubmit(async (create: CreateForm) => {
    if (isLoadingCreate.value) return;

    isLoadingCreate.value = true;
    internalServerErrorCreate.value = false;

    try {
      const result = await testCreateEditRequest(create);

      const test: UserTest = result.body.test;

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

  const deleteTest = async () => {
    if (edit) {
      const response: boolean = await alert({
        title: $t('alert.deleteTest.title'),
        description: $t('alert.deleteTest.description'),
        danger: true
      });

      if (!response) return;
    }

    isLoadingDelete.value = true;

    if (edit) await $api.test.delete(testStore.editTest!.id);
    else console.log('Delete test creation'); // TODO: delete test creation

    isLoadingDelete.value = false;

    if (edit) {
      await navigateTo(authUserURL.value);

      toast({
        title: $t('toast.test.delete'),
        description: testStore.editTest?.title
      });

      testStore.editTest = undefined;
    }
  };

  return {
    isLoadingCreate,
    internalServerErrorCreate,
    isLoadingDelete,
    initialIncorrectOptionValue,
    initialSingleQuestionValue,
    errorBag,
    isFieldDirty,
    questions,
    options,
    questionPath,
    optionPath,
    createTest,
    deleteTest
  };
};
