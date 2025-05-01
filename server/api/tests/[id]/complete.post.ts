import { TestCompletionSchema } from '#shared/schemas/test.schema';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const authSession = await repository.auth.getSession(event.headers);

  const test: UserTest | null = await repository.test.findById(
    authSession?.user.id,
    id
  );

  if (!test)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Test not found'
      })
    );

  const body: TestCompletion = await readBody(event);

  const result = TestCompletionSchema.safeParse(body);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  await repository.test.complete(id, body);

  return {
    statusCode: 201,
    statusMessage: 'Test completed successfully'
  };
});
