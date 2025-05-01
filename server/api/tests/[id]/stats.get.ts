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

  if (authSession.user.id !== test.author.id)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );

  const testStats = await repository.test.findByIdStats(id);

  return {
    statusCode: 200,
    statusMessage: 'Test stats found',
    body: {
      test: testStats
    }
  };
});
