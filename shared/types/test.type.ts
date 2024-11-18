import type { IUserPartial } from './user.type';

export interface IUserTestPartial {
  id: string;
  title: string;
  description: string;
  image: Buffer<ArrayBufferLike> | null;
  author: IUserPartial;
  categories: string[];
  views: number;
  createdAt: Date;
}

export interface IUserTest {
  id: string;
  title: string;
  description: string;
  image: Buffer<ArrayBufferLike> | null;
  author: IUserPartial;
  categories: string[];
  questions: IUserTestQuestion[];
  views: number;
  createdAt: Date;
}

export interface IUserTestQuestion {
  number: number;
  text: string;
  image: Buffer<ArrayBufferLike> | null;
  type: string;
  options: IUserTestQuestionOption[];
}

export interface IUserTestQuestionOption {
  text: string;
  isCorrect: boolean;
}
