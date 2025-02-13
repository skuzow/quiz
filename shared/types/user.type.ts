import type { UserRole } from '../constants/user';

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
  roles: UserRole[];
  createdAt: Date;
}
