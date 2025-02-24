export default defineEventHandler(async (event) => {
  const { username } = getRouterParams(event);

  const user: User | null = await repository.user.findByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    );
  }

  return {
    statusCode: 200,
    statusMessage: 'User found',
    body: {
      user
    }
  };
});
