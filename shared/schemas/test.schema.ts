import { z } from 'zod';

import {
  TestOrder,
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
  TEST_CREATION_QUESTION_OPTION_TEXT_MAX,
  TEST_GENERATION_QUESTIONS_MIN,
  TEST_GENERATION_QUESTIONS_MAX,
  TEST_GENERATION_QUESTION_OPTIONS_MIN,
  TEST_GENERATION_QUESTION_OPTIONS_MAX,
  TEST_GENERATION_TEXT_MIN,
  TEST_SEARCH_TEXT_MAX
} from '../constants/test.constant';

const TestCreationQuestionOptionSchema = z.object({
  text: z
    .string()
    .min(TEST_CREATION_QUESTION_OPTION_TEXT_MIN)
    .max(TEST_CREATION_QUESTION_OPTION_TEXT_MAX),
  isCorrect: z.boolean()
});

const TestCreationQuestionSchema = z
  .object({
    text: z
      .string()
      .min(TEST_CREATION_QUESTION_TEXT_MIN)
      .max(TEST_CREATION_QUESTION_TEXT_MAX),
    type: z.nativeEnum(TestQuestionType),
    options: z
      .array(TestCreationQuestionOptionSchema)
      .min(TEST_CREATION_QUESTION_OPTIONS_MIN)
      .max(TEST_CREATION_QUESTION_OPTIONS_MAX)
      .refine((options) => options.some((option) => option.isCorrect))
  })
  .refine(
    (question) =>
      question.type !== TestQuestionType.SINGLE ||
      question.options.filter((option) => option.isCorrect).length === 1
  );

export const TestCreationSchema = z.object({
  published: z.boolean().optional(),
  title: z.string().min(TEST_CREATION_TITLE_MIN).max(TEST_CREATION_TITLE_MAX),
  description: z
    .string()
    .min(TEST_CREATION_DESCRIPTION_MIN)
    .max(TEST_CREATION_DESCRIPTION_MAX),
  categories: z
    .array(z.nativeEnum(TestCategory))
    .max(TEST_CREATION_CATEGORIES_MAX)
    .optional(),
  questions: z
    .array(TestCreationQuestionSchema)
    .min(TEST_CREATION_QUESTIONS_MIN)
    .max(TEST_CREATION_QUESTIONS_MAX)
});

export const TestGenerationSchema = z.object({
  deep: z.boolean(),
  lang: z.string().length(2),
  questions: z.object({
    number: z
      .number()
      .int()
      .min(TEST_GENERATION_QUESTIONS_MIN)
      .max(TEST_GENERATION_QUESTIONS_MAX),
    type: z.nativeEnum(TestQuestionType).optional(), // empty: all
    options: z
      .number()
      .int()
      .min(TEST_GENERATION_QUESTION_OPTIONS_MIN)
      .max(TEST_GENERATION_QUESTION_OPTIONS_MAX)
      .optional() // empty: from TEST_GENERATION_QUESTION_OPTIONS_MIN to TEST_GENERATION_QUESTION_OPTIONS_MAX
  }),
  info: z.string().min(TEST_GENERATION_TEXT_MIN)
});

export const TestSearchSchema = z.object({
  page: z.number().int().min(0),
  search: z.string().max(TEST_SEARCH_TEXT_MAX).optional(),
  sort: z.nativeEnum(TestOrder).optional(),
  filter: z.nativeEnum(TestCategory).optional()
});

export const TestCompletionSchema = z.object({
  score: z.number().multipleOf(0.01).min(0).max(10)
});
