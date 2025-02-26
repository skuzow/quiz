import { AuthUsernameCheck } from '#shared/schemas/auth.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = AuthUsernameCheck.safeParse(body);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  const { username } = body;

  const usernameTaken: boolean = await repository.auth.checkUsername(username);

  if (usernameTaken)
    return {
      statusCode: 409,
      statusMessage: 'Username already in use',
      body: {
        isAvailable: false
      }
    };

  return {
    statusCode: 200,
    statusMessage: 'Username available',
    body: {
      isAvailable: true
    }
  };
});
