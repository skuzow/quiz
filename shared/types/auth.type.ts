import type { z } from 'zod';

import type {
  AuthEmailCheckSchema,
  AuthUsernameCheckSchema
} from '../schemas/auth.schema';

export type AuthEmailCheck = z.infer<typeof AuthEmailCheckSchema>;

export type AuthUsernameCheck = z.infer<typeof AuthUsernameCheckSchema>;
