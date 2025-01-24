import { createAuthClient } from 'better-auth/client';
import {
  usernameClient,
  twoFactorClient,
  inferAdditionalFields
} from 'better-auth/client/plugins';

export const useAuth = () => {
  const url = useRequestURL();
  const headers = import.meta.server ? useRequestHeaders() : undefined;

  const authClient = createAuthClient({
    baseURL: url.origin,
    plugins: [
      usernameClient(),
      twoFactorClient(),
      inferAdditionalFields<typeof auth>()
    ],
    fetchOptions: {
      headers
    }
  });

  type Session = typeof authClient.$Infer.Session.session;
  type User = typeof authClient.$Infer.Session.user;

  const session = useState<Session | null>('auth:session', () => null);
  const user = useState<User | null>('auth:user', () => null);

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

  const localePath = useLocalePath();

  const nameAbbreviation = computed(() => {
    if (!user.value) return '';

    const name: string = user.value.username || user.value.name;

    return abbreviate(name);
  });

  const userURL = computed(() => {
    if (!user.value) return '';

    const URL: string = user.value.username || user.value.id;

    return localePath(`/user/${URL}`);
  });

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
    nameAbbreviation,
    userURL,
    signUp: authClient.signUp,
    signIn: authClient.signIn,
    signOut
  };
};
