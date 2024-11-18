import type { IUser } from '~~/shared/types/user.type';

export default defineEventHandler(async (event) => {
  const { username } = getRouterParams(event);

  const user: IUser | null = await repository.user.findByUsername(username);

  if (!user) {
    return {
      statusCode: 404,
      statusMessage: 'Not Found',
      body: {
        message: 'User not found'
      }
    };
  }

  return {
    statusCode: 200,
    body: {
      user,
      message: 'User found'
    }
  };
});
