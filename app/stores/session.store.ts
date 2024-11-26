export const useSessionStore = defineStore('session', async () => {
  const { data: session } = await authClient.useSession(useFetch);

  const isAuthenticated = computed(() => !!session);

  return { session, isAuthenticated };
});
