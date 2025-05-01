export const useTestStore = defineStore('test', () => {
  const createTest: Ref<TestCreation | undefined> = ref();
  const editTest: Ref<UserTest | undefined> = ref();

  const statsTest: Ref<UserTestStats | undefined> = ref();

  return {
    createTest,
    editTest,
    statsTest
  };
});
