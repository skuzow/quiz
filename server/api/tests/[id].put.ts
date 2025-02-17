/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUserTest } from '#shared/types/test.type';

export default defineEventHandler(async (event) => {
  try {
    const session = await repository.auth.checkSession(event.headers);

    const { id } = getRouterParams(event);

    const prevTest: IUserTest | null = await repository.test.findById(id);

    if (!prevTest) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'Test not found'
        })
      );
    }

    if (session.user.id !== prevTest.author.id) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: 'Unauthorized'
        })
      );
    }

    const { test: editTest } = await readBody(event);

    if (!editTest) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Missing required fields',
          data: 'Test required'
        })
      );
    }

    const test: IUserTest = await repository.test.update(
      id,
      editTest as IUserTest
    );

    return {
      statusCode: 200,
      statusMessage: 'Test edited successfully',
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
