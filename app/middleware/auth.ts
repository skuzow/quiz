export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    const localePath = useLocalePath();

    return navigateTo(localePath('/login'));
  }
});
