export default defineEventHandler(async (_) => {
  return {
    users: await prisma.user.findMany()
  };
});
