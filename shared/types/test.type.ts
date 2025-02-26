import type { z } from 'zod';

import type { UserPartial } from './user.type';
import type {
  TestCreationSchema,
  TestGenerationSchema,
  TestSearchSchema
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

export type TestCreation = z.infer<typeof TestCreationSchema>;

export type TestGeneration = z.infer<typeof TestGenerationSchema>;

export type TestSearch = z.infer<typeof TestSearchSchema>;

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
