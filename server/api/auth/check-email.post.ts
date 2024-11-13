export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  if (!email) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        data: {
          message: 'Email is required'
        }
      })
    );
  }

  const emailTaken: boolean = !!(await prisma.user.findFirst({
    where: { email: email }
  }));

  if (emailTaken) {
    return {
      statusCode: 200,
      body: {
        available: false,
        message: 'Email is already in use'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      available: true,
      message: 'Email is available'
    }
  };
});
