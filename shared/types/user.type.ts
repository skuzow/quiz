import type { IUserTestPartial } from './test.type';

export interface IUserPartial {
  username: string;
  image: Buffer<ArrayBufferLike> | null;
}

export interface IUser {
  username: string;
  image: Buffer<ArrayBufferLike> | null;
  roles: string[];
  tests: IUserTestPartial[];
  createdAt: Date;
}
