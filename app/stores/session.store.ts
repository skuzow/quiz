export const useSessionStore = defineStore('session', () => {
  const session = authClient.useSession();

  const sessionData = computed(() => session?.value?.data);
  const isAuthenticated = computed(() => !!sessionData);

  return { sessionData, isAuthenticated };
});
