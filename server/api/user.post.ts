export default defineEventHandler(async (_) => {
  return {
    user: await prisma.user.create({
      data: {
        email: 'alex@skuzow.net',
        name: 'skuzow'
      }
    })
  };
});
