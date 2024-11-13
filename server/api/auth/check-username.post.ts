export default defineEventHandler(async (event) => {
  const { username } = await readBody(event);

  if (!username) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Username is required'
        }
      })
    );
  }

  const usernameTaken: boolean = !!(await prisma.user.findFirst({
    where: { username: username }
  }));

  if (usernameTaken) {
    return {
      statusCode: 200,
      body: {
        available: false,
        message: 'Username is already in use'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      available: true,
      message: 'Username is available'
    }
  };
});
