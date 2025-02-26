import { AuthEmailCheckSchema } from '#shared/schemas/auth.schema';

export default defineEventHandler(async (event) => {
  const body: AuthEmailCheck = await readBody(event);

  const result = AuthEmailCheckSchema.safeParse(body);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  const { email } = body;

  const emailTaken: boolean = await repository.auth.checkEmail(email);

  if (emailTaken)
    return {
      statusCode: 409,
      statusMessage: 'Email already in use',
      body: {
        isAvailable: false
      }
    };

  return {
    statusCode: 200,
    statusMessage: 'Email available',
    body: {
      isAvailable: true
    }
  };
});
