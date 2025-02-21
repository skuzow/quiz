export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();

  const getUserById = async (id: string) => {
    try {
      return await $api.user.getById(id);
    } catch (e) {
      showError(e!);
    }
  };

  const getUserByUsername = async (username: string) => {
    try {
      return await $api.user.getByUsername(username);
    } catch (e) {
      showError(e!);
    }
  };

  return { getUserById, getUserByUsername };
});
