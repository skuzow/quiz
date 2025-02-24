import type { UserRole } from '../constants/user.constant';

export interface UserPartial {
  id: string;
  name: string;
  username: string | null;
  image: string | null;
}

export interface User {
  id: string;
  name: string;
  username: string | null;
  image: string | null;
  roles: UserRole[];
  createdAt: Date;
}
