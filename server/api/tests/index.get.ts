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

  const tests: IUserTestPartial[] | null = await repository.test.findAll(
    Number(skip),
    Number(take)
  );

  if (!tests) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Tests not found'
      })
    );
  }

  return {
    statusCode: 200,
    statusMessage: 'Tests found',
    body: {
      tests
    }
  };
});
