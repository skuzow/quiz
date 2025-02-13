export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();

  const getUserById = async (id: string) => {
    try {
      return $api.user.getById(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getUserByUsername = async (username: string) => {
    try {
      return $api.user.getByUsername(username);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return { getUserById, getUserByUsername };
});
