/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUserTest } from '#shared/types/test.type';

export default defineEventHandler(async (event) => {
  try {
    const session = await repository.auth.checkSession(event.headers);

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

    const test: IUserTest = await repository.test.create(
      session.user.id,
      createTest as IUserTest
    );

    return {
      statusCode: 200,
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
