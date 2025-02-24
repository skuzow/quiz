export const useTestStore = defineStore('test', () => {
  const createTest: Ref<IUserTest | undefined> = ref();
  const editTest: Ref<IUserTest | undefined> = ref();

  return {
    createTest,
    editTest
  };
});
