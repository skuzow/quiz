import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useFieldArray, type FieldArrayContext } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  IMAGE_SIZE_MAX_MB,
  IMAGE_SIZE_MAX
} from '#shared/constants/image.constant';
import {
  TestCategory,
  TestQuestionType,
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

  const imageInput = useTemplateRef<HTMLInputElement>('test-image-input');

  const editImageFile: Ref<File | undefined> = ref();

  const image: ComputedRef<string> = computed(() => {
    if (edit) {
      if (editImageFile.value) return URL.createObjectURL(editImageFile.value);
      if (testStore.editTest?.image) return testStore.editTest.image;
    } else if (testStore.createImageFile) {
      return URL.createObjectURL(testStore.createImageFile);
    }

    return '/images/test.avif';
  });

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
      )
      .trim(),
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
        )
        .trim(),
      type: z.nativeEnum(TestQuestionType),
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
      )
      .trim(),
    description: z
      .string({ required_error: requiredMessage(FormInput.DESCRIPTION) })
      .min(
        TEST_CREATION_DESCRIPTION_MIN,
        minMessage(FormInput.DESCRIPTION, TEST_CREATION_DESCRIPTION_MIN)
      )
      .max(
        TEST_CREATION_DESCRIPTION_MAX,
        maxMessage(FormInput.DESCRIPTION, TEST_CREATION_DESCRIPTION_MAX)
      )
      .trim(),
    categories: z
      .array(z.nativeEnum(TestCategory))
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

  const { values, handleSubmit, errorBag, isFieldDirty, resetForm } = useForm({
    validationSchema,
    initialValues:
      (edit ? testStore.editTest : testStore.createTest) || initialFormValue
  });

  if (!edit) {
    watch(
      values,
      (newValues) => {
        testStore.createTest = convertPartialDeepToPlain(newValues);
      },
      { deep: true }
    );
  }

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

      await updateImage(test.id);

      await navigateTo(localePath(`/tests/${test.id}`));

      if (edit) testStore.editTest = undefined;
      else {
        testStore.createTest = undefined;
        testStore.createImageFile = undefined;
      }

      toast({
        title: edit ? $t('toast.tests.edit') : $t('toast.create.title'),
        description: test.title
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      internalServerErrorCreate.value = true;
    } finally {
      isLoadingCreate.value = false;
    }
  });

  const resetTest = async () => {
    const response: boolean = await alert({
      title: $t('alert.create.reset.title'),
      description: $t('alert.create.reset.description'),
      danger: true
    });

    if (!response) return;

    testStore.createTest = undefined;
    testStore.createImageFile = undefined;

    resetForm({ values: initialFormValue });

    toast({ title: $t('toast.create.reset') });
  };

  const deleteTest = async () => {
    const response: boolean = await alert({
      title: $t('alert.tests.delete.title'),
      description: $t('alert.tests.delete.description'),
      danger: true
    });

    if (!response) return;

    isLoadingDelete.value = true;

    await $api.test.delete(testStore.editTest!.id);

    isLoadingDelete.value = false;

    await navigateTo(authUserURL.value);

    toast({
      title: $t('toast.tests.delete'),
      description: testStore.editTest?.title
    });

    testStore.editTest = undefined;
  };

  const updateImage = async (testId: string) => {
    if (edit ? !editImageFile.value : !testStore.createImageFile) return;

    const formData = new FormData();
    formData.append(
      'image',
      edit ? editImageFile.value! : testStore.createImageFile!
    );

    await $api.test.updateImage(testId, formData);
  };

  const clickImageInput = () => imageInput.value?.click();

  const updateImageInput = async (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file: File = input.files[0]!;

    if (file.size > IMAGE_SIZE_MAX) {
      return toast({
        title: `${$t('form.image.size')} ${IMAGE_SIZE_MAX_MB} MB`,
        variant: 'destructive'
      });
    }

    if (edit) editImageFile.value = file;
    else testStore.createImageFile = file;
  };

  return {
    isLoadingCreate,
    internalServerErrorCreate,
    isLoadingDelete,
    image,
    initialIncorrectOptionValue,
    initialSingleQuestionValue,
    errorBag,
    isFieldDirty,
    questions,
    options,
    questionPath,
    optionPath,
    createTest,
    resetTest,
    deleteTest,
    clickImageInput,
    updateImageInput
  };
};
