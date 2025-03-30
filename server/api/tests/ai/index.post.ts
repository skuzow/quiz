import { TestGenerationSchema } from '#shared/schemas/test.schema';

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

  const body: TestGeneration = await readBody(event);

  const result = TestGenerationSchema.safeParse(body);

  if (!result.success)
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid fields',
        data: result.error?.issues
      })
    );

  const test: TestCreation = await repository.test.generate(body);

  return {
    statusCode: 201,
    statusMessage: 'Test created successfully',
    body: {
      test
    }
  };
});
