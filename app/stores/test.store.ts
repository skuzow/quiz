export const useTestStore = defineStore('test', () => {
  const { $api } = useNuxtApp();

  const createTest: Ref<IUserTest | undefined> = ref();
  const editTest: Ref<IUserTest | undefined> = ref();

  const getTestById = async (id: string) => {
    try {
      return $api.test.getById(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTests = async (page: number, search?: string) => {
    try {
      return $api.test.getAll(page, search);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTestsById = async (id: string, page: number, search?: string) => {
    try {
      return $api.test.getAllById(id, page, search);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTestsByUsername = async (
    username: string,
    page: number,
    search?: string
  ) => {
    try {
      return $api.test.getAllByUsername(username, page, search);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const deleteTest = async (id: string) => {
    try {
      return $api.test.delete(id);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  return {
    createTest,
    editTest,
    getTestById,
    getTests,
    getTestsById,
    getTestsByUsername,
    deleteTest
  };
});
