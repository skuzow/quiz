/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async (event) => {
  try {
    const authSession = await repository.auth.checkSession(event.headers);

    const { test: createTest } = await readBody(event);

    if (!createTest) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Missing required fields',
          data: 'Test required'
        })
      );
    }

    const test: UserTest = await repository.test.create(
      authSession.user.id,
      createTest as UserTest
    );

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
        statusMessage: e.stack
      })
    );
  }
});
