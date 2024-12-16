export const useCreateStore = defineStore('create', () => {
  const createTestValue: Ref<IUserTest | undefined> = ref(undefined);

  return { createTestValue };
});
