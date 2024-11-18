import type { IUserTestPartial } from '~~/shared/types/test.type';

export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event);

  if (!skip || !take) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Skip & Take are required'
        }
      })
    );
  }

  const tests: IUserTestPartial[] | null = await repository.test.findAll(
    Number(skip),
    Number(take)
  );

  if (!tests) {
    return {
      statusCode: 404,
      statusMessage: 'Not Found',
      body: {
        message: 'Tests not found'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      tests,
      message: 'Tests found'
    }
  };
});
