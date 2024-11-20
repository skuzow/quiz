import type { IUser } from '~~/shared/types/user.type';

export default defineEventHandler(async (event) => {
  const { username } = getRouterParams(event);

  const user: IUser | null = await repository.user.findByUsername(username);

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
