export const useTestStore = defineStore('test', () => {
  const { $api } = useNuxtApp();

  const createTest: Ref<IUserTest | undefined> = ref();

  const getTest = async (id: string) => {
    try {
      return $api.test.get(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return {
    createTest,
    getTest
  };
});
