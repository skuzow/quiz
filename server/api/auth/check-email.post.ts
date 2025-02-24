export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  if (!email) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: 'Email required'
      })
    );
  }

  const emailTaken: boolean = await repository.auth.checkEmail(email);

  if (emailTaken) {
    return {
      statusCode: 409,
      statusMessage: 'Email already in use',
      body: {
        isAvailable: false
      }
    };
  }

  return {
    statusCode: 200,
    statusMessage: 'Email available',
    body: {
      isAvailable: true
    }
  };
});
