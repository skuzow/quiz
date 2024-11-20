import type { IUserTestPartial } from './test.type';

export interface IUserPartial {
  id: string;
  name: string;
  username: string | null;
  image: string | null;
}

export interface IUser {
  id: string;
  name: string;
  username: string | null;
  image: string | null;
  roles: string[];
  tests: IUserTestPartial[];
  createdAt: Date;
}
