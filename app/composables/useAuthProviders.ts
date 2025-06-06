import { useToast } from '@/components/ui/toast/use-toast';

export const useAuthProviders = () => {
  const { t: $t } = useI18n();

  const { signIn } = useAuth();

  const { toast } = useToast();

  const isLoadingWithGoogle: Ref<boolean> = ref(false);
  const isLoadingWithGithub: Ref<boolean> = ref(false);

  const loginWithGoogle = async () => {
    if (isLoadingWithGoogle.value) return;

    isLoadingWithGoogle.value = true;

    const { error } = await signIn.social({
      provider: 'google'
    });

    isLoadingWithGoogle.value = false;

    if (error) showErrorToast('Google', error.message);
  };

  const loginWithGithub = async () => {
    if (isLoadingWithGithub.value) return;

    isLoadingWithGithub.value = true;

    const { error } = await signIn.social({
      provider: 'github'
    });

    isLoadingWithGithub.value = false;

    if (error) showErrorToast('Github', error.message);
  };

  const showErrorToast = (provider: string, description?: string) => {
    toast({
      title: `${$t('toast.auth.error')} ${provider}`,
      description: description,
      variant: 'destructive'
    });
  };

  return {
    isLoadingWithGoogle,
    isLoadingWithGithub,
    loginWithGoogle,
    loginWithGithub
  };
};
