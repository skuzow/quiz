import type { IUser } from '~~/shared/types/user.type';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const user: IUser | null = await repository.user.findById(id);

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
