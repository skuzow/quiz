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

  type AuthSession = typeof authClient.$Infer.Session.session;
  type AuthUser = typeof authClient.$Infer.Session.user;

  const authSession = useState<AuthSession | null>('auth:session', () => null);
  const authUser = useState<AuthUser | null>('auth:user', () => null);

  const isAuthenticated: ComputedRef<boolean> = computed(
    () => !!authSession.value
  );

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

    authSession.value = data?.session || null;
    authUser.value = data?.user || null;

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

  const authUserInfo: ComputedRef<string> = computed(() => {
    if (!authUser.value) return '';

    return authUser.value.username
      ? `@${authUser.value.username}`
      : authUser.value.email;
  });

  const authUserURL: ComputedRef<string> = computed(() => {
    if (!authUser.value) return '';

    const URL: string = authUser.value.username || `id/${authUser.value.id}`;

    return localePath(`/users/${URL}`);
  });

  const signOut = async () => {
    const res = await authClient.signOut();

    await navigateTo(localePath('/'));

    authSession.value = null;
    authUser.value = null;

    return res;
  };

  return {
    authSession,
    authUser,
    isAuthenticated,
    fetchSession,
    authUserInfo,
    authUserURL,
    signUp: authClient.signUp,
    signIn: authClient.signIn,
    forgotPassword: authClient.forgetPassword,
    resetPassword: authClient.resetPassword,
    signOut
  };
};
