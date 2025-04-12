import { describe, it, expect } from 'vitest';

import {
  AuthEmailCheckSchema,
  AuthUsernameCheckSchema
} from '#shared/schemas/auth.schema';
import {
  USER_EMAIL_MAX,
  USER_USERNAME_MIN
} from '#shared/constants/user.constant';

describe('AuthSchema', () => {
  it('should validate email correctly', async () => {
    const validEmail: AuthEmailCheck = { email: 'example@test.com' };

    const result = AuthEmailCheckSchema.safeParse(validEmail);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid email', async () => {
    const invalidEmail = {
      email: 'exampleexampleexampleexampleexampleexampleexampleexample'
    };

    const result = AuthEmailCheckSchema.safeParse(invalidEmail);

    const issues = result.error?.issues.map((issue) => issue.message);

    expect(result.success).toBe(false);
    expect(issues?.[0]).toBe('Invalid email');
    expect(issues?.[1]).toBe(
      `String must contain at most ${USER_EMAIL_MAX} character(s)`
    );
  });

  it('should validate username correctly', async () => {
    const validUsername: AuthUsernameCheck = { username: 'example' };

    const result = AuthUsernameCheckSchema.safeParse(validUsername);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid username', async () => {
    const invalidUsername = { username: 'ee' };

    const result = AuthUsernameCheckSchema.safeParse(invalidUsername);

    const issues = result.error?.issues.map((issue) => issue.message);

    expect(result.success).toBe(false);
    expect(issues?.[0]).toBe(
      `String must contain at least ${USER_USERNAME_MIN} character(s)`
    );
  });
});
