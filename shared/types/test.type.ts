import type { IUserPartial } from './user.type';

import type { TestCategory, TestQuestionType } from '../constants/test';

export interface IUserTestPartial {
  id: string;
  title: string;
  description: string;
  image: string | null;
  author: IUserPartial;
  categories: TestCategory[];
  views: number;
  createdAt: Date;
}

export interface IUserTest {
  id: string;
  title: string;
  description: string;
  image: string | null;
  author: IUserPartial;
  categories: TestCategory[];
  questions: IUserTestQuestion[];
  views: number;
  createdAt: Date;
}

export interface IUserTestQuestion {
  number: number;
  text: string;
  image: string | null;
  type: TestQuestionType;
  options: IUserTestQuestionOption[];
}

export interface IUserTestQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface IUserTestAI {
  lang: string;
  questions: number;
  info: string;
}
