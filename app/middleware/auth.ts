export default defineNuxtRouteMiddleware((to, _from) => {
  const { isAuthenticated } = useAuth();

  const localePath = useLocalePath();

  if (isAuthenticated.value) {
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
