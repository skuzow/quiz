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

  const forgotPassword = async (email: string) => {
    return authClient.forgetPassword({
      email: email,
      redirectTo: localePath('/reset-password')
    });
  };

  const revokeSession = async (token: string) => {
    const res = await authClient.revokeSession({ token });

    if (!res.error && token === authSession.value?.token) {
      await navigateTo(localePath('/'));

      authSession.value = null;
      authUser.value = null;
    }

    return res;
  };

  return {
    authSession,
    authUser,
    isAuthenticated,
    fetchSession,
    authUserURL,
    signUp: authClient.signUp,
    signIn: authClient.signIn,
    signOut,
    forgotPassword,
    resetPassword: authClient.resetPassword,
    updateAuthUser: authClient.updateUser,
    changeEmail: authClient.changeEmail,
    verifyEmail: authClient.sendVerificationEmail,
    listAuthSessions: authClient.listSessions,
    revokeSession,
    listAccounts: authClient.listAccounts,
    unlinkAccount: authClient.unlinkAccount,
    linkAccount: authClient.linkSocial,
    deleteAuthUser: authClient.deleteUser
  };
};
