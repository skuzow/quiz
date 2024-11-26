export default defineNuxtRouteMiddleware(async (to, _from) => {
  const sessionStore = await useSessionStore();

  const localePath = useLocalePath();

  if (sessionStore.isAuthenticated) {
    if (to.path === localePath('/login') || to.path === localePath('/signup')) {
      return abortNavigation('Already logged in');
    }
  } else if (
    to.path === localePath('/create') ||
    to.path === localePath('/createai')
  ) {
    return navigateTo(localePath('/login'));
  }
});
