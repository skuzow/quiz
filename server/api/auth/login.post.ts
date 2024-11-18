import type { IAuthUser } from '~~/shared/types/auth.type';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Email & Password are required'
        }
      })
    );
  }

  const user: IAuthUser | null = await repository.auth.login({
    email,
    password
  });

  if (!user) {
    return {
      statusCode: 401,
      body: {
        message: 'Invalid email or password'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      user,
      message: 'Login successful'
    }
  };
});
