import { z } from 'zod';

import {
  TestQuestionTypeValues,
  TEST_GENERATION_QUESTIONS_MIN,
  TEST_GENERATION_QUESTIONS_MAX,
  TEST_GENERATION_QUESTION_OPTIONS_MIN,
  TEST_GENERATION_QUESTION_OPTIONS_MAX,
  TEST_GENERATION_TEXT_MIN
} from '../constants/test.constant';

export const TestGenerationSchema = z.object({
  deep: z.boolean(),
  lang: z.string().length(2),
  questions: z.object({
    number: z
      .number()
      .min(TEST_GENERATION_QUESTIONS_MIN)
      .max(TEST_GENERATION_QUESTIONS_MAX),
    type: z.enum(TestQuestionTypeValues).optional(), // empty: all
    options: z
      .number()
      .min(TEST_GENERATION_QUESTION_OPTIONS_MIN)
      .max(TEST_GENERATION_QUESTION_OPTIONS_MAX)
      .optional() // empty: from TEST_GENERATION_QUESTION_OPTIONS_MIN to TEST_GENERATION_QUESTION_OPTIONS_MAX
  }),
  info: z.string().min(TEST_GENERATION_TEXT_MIN)
});
