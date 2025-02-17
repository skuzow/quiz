/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUserTest } from '#shared/types/test.type';

export default defineEventHandler(async (event) => {
  try {
    const session = await repository.auth.checkSession(event.headers);

    const { id } = getRouterParams(event);

    const test: IUserTest | null = await repository.test.findById(id);

    if (!test) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'Test not found'
        })
      );
    }

    if (session.user.id !== test.author.id) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: 'Unauthorized'
        })
      );
    }

    await repository.test.delete(id);

    return {
      statusCode: 200,
      statusMessage: 'Test deleted successfully'
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
