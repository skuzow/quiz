import { createAuthClient } from 'better-auth/client';
import { usernameClient, twoFactorClient } from 'better-auth/client/plugins';
import type {
  InferSessionFromClient,
  InferUserFromClient,
  ClientOptions
} from 'better-auth/types';

export const useAuth = () => {
  const localePath = useLocalePath();

  const url = useRequestURL();
  const headers = import.meta.server ? useRequestHeaders() : undefined;

  const authClient = createAuthClient({
    baseURL: url.origin,
    plugins: [usernameClient(), twoFactorClient()],
    fetchOptions: {
      headers
    }
  });

  const session = useState<InferSessionFromClient<ClientOptions> | null>(
    'auth:session',
    () => null
  );

  const user = useState<InferUserFromClient<ClientOptions> | null>(
    'auth:user',
    () => null
  );

  const isAuthenticated: ComputedRef<boolean> = computed(() => !!session.value);

  const isSessionFetching: Ref<boolean> = import.meta.server
    ? ref(false)
    : useState('auth:isSessionFetching', () => false);

  const fetchSession = async () => {
    if (isSessionFetching.value) return;

    isSessionFetching.value = true;

    const { data } = await authClient.getSession({
      fetchOptions: {
        headers
      }
    });

    session.value = data?.session || null;
    user.value = data?.user || null;

    isSessionFetching.value = false;

    return data;
  };

  if (import.meta.client) {
    authClient.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) return;

      await fetchSession();
    });
  }

  const signOut = async () => {
    const res = await authClient.signOut();

    session.value = null;
    user.value = null;

    await navigateTo(localePath('/'));

    return res;
  };

  return {
    session,
    user,
    isAuthenticated,
    fetchSession,
    signUp: authClient.signUp,
    signIn: authClient.signIn,
    signOut
  };
};
