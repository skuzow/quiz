export default defineEventHandler(async (event) => {
  const { username } = await readBody(event);

  if (!username) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: 'Username required'
      })
    );
  }

  const usernameTaken: boolean = await repository.auth.checkUsername(username);

  if (usernameTaken) {
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: 'Username already in use'
      })
    );
  }

  return {
    statusCode: 200,
    statusMessage: 'Username available'
  };
});
