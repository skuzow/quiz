import { z } from 'zod';

import {
  USER_EMAIL_MAX,
  USER_USERNAME_MIN,
  USER_USERNAME_MAX
} from '../constants/user.constant';

export const AuthEmailCheckSchema = z.object({
  email: z.string().email().max(USER_EMAIL_MAX)
});

export const AuthUsernameCheckSchema = z.object({
  username: z.string().min(USER_USERNAME_MIN).max(USER_USERNAME_MAX)
});
