export const useAuthSettings = () => {
  const { isAuthenticated } = useAuth();

  const isOpen = useState<boolean>('settings:isOpen', () => false);

  const openAuthSettings = () => {
    if (!isAuthenticated.value) return;

    isOpen.value = true;
  };

  const closeAuthSettings = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    openAuthSettings,
    closeAuthSettings
  };
};
