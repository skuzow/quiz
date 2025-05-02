import type { z } from 'zod';

import type { UserPartial } from './user.type';
import type {
  TestCreationSchema,
  TestGenerationSchema,
  TestSearchSchema,
  TestCompletionSchema
} from '../schemas/test.schema';
import type {
  TestCategory,
  TestQuestionType
} from '../constants/test.constant';

export interface UserTestPartial {
  id: string;
  title: string;
  description: string;
  image: string | null;
  published: boolean;
  author: UserPartial | null;
  categories: TestCategory[];
  questions: number;
  completed: number;
  createdAt: string;
}

export interface UserTest {
  id: string;
  title: string;
  description: string;
  image: string | null;
  published: boolean;
  author: UserPartial;
  categories: TestCategory[];
  questions: UserTestQuestion[];
  completed: number;
  createdAt: string;
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

export interface UserTestStats {
  id: string;
  title: string;
  description: string;
  image: string | null;
  published: boolean;
  author: UserPartial;
  categories: TestCategory[];
  questions: number;
  completed: number;
  stats: UserTestCompleted[];
  createdAt: string;
}

export interface UserTestCompleted {
  id: string;
  score: number;
  completedAt: string;
}

export type TestCreation = z.infer<typeof TestCreationSchema>;

export type TestGeneration = z.infer<typeof TestGenerationSchema>;

export type TestSearch = z.infer<typeof TestSearchSchema>;

export type TestCompletion = z.infer<typeof TestCompletionSchema>;

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
