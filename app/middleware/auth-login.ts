export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) return;

  const nuxtApp = useNuxtApp();

  abortNavigation(nuxtApp.$i18n.t('error.alreadyLoggedIn'));
});
