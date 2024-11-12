export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();

  const getUser = async (id: string) => {
    try {
      return $api.user.get(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return { getUser };
});
