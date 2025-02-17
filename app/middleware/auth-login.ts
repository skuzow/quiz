export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated.value) {
    const nuxtApp = useNuxtApp();

    return abortNavigation(nuxtApp.$i18n.t('error.alreadyLoggedIn'));
  }
});
