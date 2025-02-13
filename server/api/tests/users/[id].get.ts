export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event);

  if (!skip || !take) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Skip & Take required'
        }
      })
    );
  }

  const { id } = getRouterParams(event);

  const tests: IUserTestPartial[] | null = await repository.test.findAllById(
    id,
    Number(skip),
    Number(take)
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
