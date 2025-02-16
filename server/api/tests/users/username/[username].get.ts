export default defineEventHandler(async (event) => {
  const { page, search } = getQuery(event);

  if (!page) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Page required'
        }
      })
    );
  }

  const { username } = getRouterParams(event);

  const tests: IUserTestPartial[] | null =
    await repository.test.findAllByUsername(
      username,
      Number(page),
      search ? String(search) : undefined
    );

  if (!tests) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User Tests not found'
      })
    );
  }

  return {
    statusCode: 200,
    statusMessage: 'User Tests found',
    body: {
      tests
    }
  };
});
