export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated.value) return;

  const localePath = useLocalePath();

  await navigateTo(localePath('/login'));
});
