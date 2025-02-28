/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async (event) => {
  try {
    const authSession = await repository.auth.checkSession(event.headers);

    const { id } = getRouterParams(event);

    const test: UserTest | null = await repository.test.findById(id);

    if (!test) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'Test not found'
        })
      );
    }

    if (authSession.user.id !== test.author.id) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: 'Unauthorized'
        })
      );
    }

    await repository.test.delete(id);

    return {
      statusCode: 200,
      statusMessage: 'Test deleted successfully'
    };
  } catch (error: any) {
    return sendError(
      event,
      createError({
        statusCode: error.statusCode,
        statusMessage: error.stack
      })
    );
  }
});
