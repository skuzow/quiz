export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();

  const getUserByUsername = async (username: string) => {
    try {
      return $api.user.getByUsername(username);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      return $api.user.get(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return { getUserByUsername, getUserById };
});
