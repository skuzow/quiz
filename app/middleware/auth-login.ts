export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) return;

  const nuxtApp = useNuxtApp();

  return abortNavigation({
    statusCode: 403,
    statusMessage: nuxtApp.$i18n.t('error.alreadyLoggedIn')
  });
});
