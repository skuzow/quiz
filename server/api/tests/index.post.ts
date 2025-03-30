import { TestCreationSchema } from '#shared/schemas/test.schema';

export default defineEventHandler(async (event) => {
  const authSession = await repository.auth.getSession(event.headers);

  if (!authSession)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );

  const { test: createTest } = await readBody(event);

  const result = TestCreationSchema.safeParse(createTest);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  const test: UserTest = await repository.test.create(
    authSession.user.id,
    createTest
  );

  return {
    statusCode: 201,
    statusMessage: 'Test created successfully',
    body: {
      test
    }
  };
});
