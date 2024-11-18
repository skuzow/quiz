import type { IUserTest } from '~~/shared/types/test.type';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const test: IUserTest | null = await repository.test.findById(id);

  if (!test) {
    return {
      statusCode: 404,
      statusMessage: 'Not Found',
      body: {
        message: 'Test not found'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      test,
      message: 'Test found'
    }
  };
});
