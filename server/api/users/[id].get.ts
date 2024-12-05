export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const user: IUser | null = await repository.user.findById(id);

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
