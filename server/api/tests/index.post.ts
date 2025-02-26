import { TestCreationSchema } from '#shared/schemas/test.schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async (event) => {
  try {
    const authSession = await repository.auth.checkSession(event.headers);

    const { test: createTest } = await readBody(event);

    const result = TestCreationSchema.safeParse(createTest);

    console.log(result.error?.issues);

    if (!result.success)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Invalid fields',
          data: result.error?.issues
        })
      );

    const test: UserTest = await repository.test.create(
      authSession.user.id,
      createTest
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
