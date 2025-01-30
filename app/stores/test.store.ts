export const useTestStore = defineStore('test', () => {
  const { $api } = useNuxtApp();

  const createTest: Ref<IUserTest | undefined> = ref();

  const getTests = async (skip: number, take: number) => {
    try {
      return $api.test.getAll(skip, take);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTest = async (id: string) => {
    try {
      return $api.test.get(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return {
    createTest,
    getTests,
    getTest
  };
});
