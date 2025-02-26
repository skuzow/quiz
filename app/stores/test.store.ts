export const useTestStore = defineStore('test', () => {
  const createTest: Ref<TestCreation | undefined> = ref();
  const editTest: Ref<UserTest | undefined> = ref();

  return {
    createTest,
    editTest
  };
});
