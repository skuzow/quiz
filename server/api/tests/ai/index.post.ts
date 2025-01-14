/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async (event) => {
  try {
    await repository.auth.checkSession(event.headers);

    const { lang, questions, info } = await readBody(event);

    if (!lang || !questions || !info) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Missing required fields',
          data: 'Lang, Questions & Info required'
        })
      );
    }

    if (
      typeof lang !== 'string' ||
      typeof questions !== 'number' ||
      typeof info !== 'string'
    ) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Invalid field types',
          data: 'Lang must be a string, Questions a number & Info a string'
        })
      );
    }

    const test: IUserTest = await repository.test.createWithAI({
      lang,
      questions: Number(questions),
      info
    });

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
        statusMessage: e.statusMessage
      })
    );
  }
});
