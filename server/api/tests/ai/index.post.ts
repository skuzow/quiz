/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async (event) => {
  try {
    await repository.auth.checkSession(event.headers);

    const body = await readBody(event);

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

    const test: IUserTest = await repository.test.generate(body);

    return {
      statusCode: 201,
      statusMessage: 'Test created successfully',
      body: {
        test
      }
    };
  } catch (e: any) {
    return sendError(
      event,
      createError({
        statusCode: e.statusCode,
        statusMessage: e.statusMessage
      })
    );
  }
});
