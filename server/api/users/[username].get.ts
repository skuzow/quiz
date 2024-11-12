import type { User } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const { username } = getRouterParams(event);

  const user: User | null = await prisma.user.findFirst({
    where: { username: username }
  });

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
      user
    }
  };
});
