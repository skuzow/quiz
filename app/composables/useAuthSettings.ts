export const useAuthSettings = () => {
  const { isAuthenticated } = useAuth();

  const isOpen = useState<boolean>('settings:isOpen', () => false);

  const isProfileFormOpen: Ref<boolean> = ref(false);
  const isUsernameFormOpen: Ref<boolean> = ref(false);
  const isEmailFormOpen: Ref<boolean> = ref(false);

  const openAuthSettings = () => {
    if (!isAuthenticated.value) return;

    isOpen.value = true;
  };

  return {
    isOpen,
    isProfileFormOpen,
    isUsernameFormOpen,
    isEmailFormOpen,
    openAuthSettings
  };
};
