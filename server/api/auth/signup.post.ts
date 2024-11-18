import type { IAuthUser } from '~~/shared/types/auth.type';

export default defineEventHandler(async (event) => {
  const { email, username, password } = await readBody(event);

  if (!email || !username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Email, Username & Password are required'
        }
      })
    );
  }

  const emailTaken: boolean = await repository.auth.checkEmail(email);

  if (emailTaken) {
    return {
      statusCode: 409,
      body: {
        message: 'Email is already in use'
      }
    };
  }

  const usernameTaken: boolean = await repository.auth.checkUsername(username);

  if (usernameTaken) {
    return {
      statusCode: 409,
      body: {
        message: 'Username is already in use'
      }
    };
  }

  const user: IAuthUser | null = await repository.auth.signup({
    email,
    username,
    password
  });

  if (!user) {
    return {
      statusCode: 500,
      body: {
        message: 'Signup failed'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      user,
      message: 'Signup successful'
    }
  };
});
