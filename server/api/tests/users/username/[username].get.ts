import { TestSearchSchema } from '#shared/schemas/test.schema';

export default defineEventHandler(async (event) => {
  const params: TestSearch = getQuery(event);

  params.page = Number(params.page);

  const result = TestSearchSchema.safeParse(params);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  const { username } = getRouterParams(event);

  const tests: UserTestPartial[] | null =
    await repository.test.findAllByUsername(username, params);

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
