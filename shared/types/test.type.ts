import { z } from 'zod';

import type { UserPartial } from './user.type';

import {
  type TestCategory,
  type TestQuestionType,
  TestQuestionTypeValues
} from '../constants/test';

export interface UserTestPartial {
  id: string;
  title: string;
  description: string;
  image: string | null;
  author: UserPartial | null;
  categories: TestCategory[];
  questions: number;
  views: number;
  createdAt: Date;
}

export interface UserTest {
  id: string;
  title: string;
  description: string;
  image: string | null;
  author: UserPartial;
  categories: TestCategory[];
  questions: UserTestQuestion[];
  views: number;
  createdAt: Date;
}

export interface UserTestQuestion {
  number: number;
  text: string;
  image: string | null;
  type: TestQuestionType;
  options: UserTestQuestionOption[];
}

export interface UserTestQuestionOption {
  number: number;
  text: string;
  isCorrect: boolean;
}

export const TEST_QUESTION_OPTIONS_MIN: number = 2;
export const TEST_QUESTION_OPTIONS_MAX: number = 4;

export const TestGenerationSchema = z.object({
  deep: z.boolean(),
  lang: z.string().length(2),
  questions: z.object({
    number: z.number().min(1).max(10),
    type: z.enum(TestQuestionTypeValues).optional(), // empty: all
    options: z
      .number()
      .min(TEST_QUESTION_OPTIONS_MIN)
      .max(TEST_QUESTION_OPTIONS_MAX)
      .optional() // empty: from TEST_QUESTION_OPTIONS_MIN to TEST_QUESTION_OPTIONS_MAX
  }),
  info: z.string().min(10)
});

export type TestGeneration = z.infer<typeof TestGenerationSchema>;

export interface TestCorrectionQuestion {
  number: number;
  text: string;
  image: string | null;
  type: TestQuestionType;
  options: TestCorrectionQuestionOption[];
}

export interface TestCorrectionQuestionOption {
  number: number;
  text: string;
  isCorrect: boolean;
  isUserSelected: boolean;
}
