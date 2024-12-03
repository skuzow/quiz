export default defineNuxtRouteMiddleware((to, _from) => {
  const { isAuthenticated } = useAuth();

  const nuxtApp = useNuxtApp();
  const localePath = useLocalePath();

  if (isAuthenticated.value) {
    if (to.path === localePath('/login') || to.path === localePath('/signup')) {
      return abortNavigation(nuxtApp.$i18n.t('error.alreadyLoggedIn'));
    }
  } else if (
    to.path === localePath('/create') ||
    to.path === localePath('/createai')
  ) {
    return navigateTo(localePath('/login'));
  }
});
