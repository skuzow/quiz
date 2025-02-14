export const useTestStore = defineStore('test', () => {
  const { $api } = useNuxtApp();

  const createTest: Ref<IUserTest | undefined> = ref();

  const getTestById = async (id: string) => {
    try {
      return $api.test.getById(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTests = async (page: number) => {
    try {
      return $api.test.getAll(page);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTestsById = async (id: string, page: number) => {
    try {
      return $api.test.getAllById(id, page);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTestsByUsername = async (username: string, page: number) => {
    try {
      return $api.test.getAllByUsername(username, page);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return {
    createTest,
    getTestById,
    getTests,
    getTestsById,
    getTestsByUsername
  };
});
