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

  const { id } = getRouterParams(event);

  const prevTest: UserTest | null = await repository.test.findById(id);

  if (!prevTest)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Test not found'
      })
    );

  if (authSession.user.id !== prevTest.author.id)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );

  const { test: editTest } = await readBody(event);

  const result = TestCreationSchema.safeParse(editTest);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  const test: UserTest = await repository.test.update(id, editTest);

  return {
    statusCode: 200,
    statusMessage: 'Test edited successfully',
    body: {
      test
    }
  };
});
