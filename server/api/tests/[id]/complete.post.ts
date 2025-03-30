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

  await repository.test.complete(id);

  return {
    statusCode: 201,
    statusMessage: 'Test completed successfully'
  };
});
