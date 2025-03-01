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

  const authSession = await repository.auth.getSession(event.headers);

  const tests: UserTestPartial[] | null = await repository.test.findAll(
    authSession?.user.id,
    params
  );

  if (!tests)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Tests not found'
      })
    );

  return {
    statusCode: 200,
    statusMessage: 'Tests found',
    body: {
      tests
    }
  };
});
