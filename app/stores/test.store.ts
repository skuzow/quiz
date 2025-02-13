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

  const getTests = async (skip: number, take: number) => {
    try {
      return $api.test.getAll(skip, take);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTestsById = async (id: string, skip: number, take: number) => {
    try {
      return $api.test.getAllById(id, skip, take);
    } catch (error) {
      console.error('fetchPostList error:' + error);
    }
  };

  const getTestsByUsername = async (
    username: string,
    skip: number,
    take: number
  ) => {
    try {
      return $api.test.getAllByUsername(username, skip, take);
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
