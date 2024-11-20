import type { IUserTest } from '~~/shared/types/test.type';

export default defineEventHandler(async (event) => {
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

  return {
    statusCode: 200,
    statusMessage: 'Test found',
    body: {
      test
    }
  };
});
