export default defineNuxtRouteMiddleware(async (to, _from) => {
  const id = to.params.id as string;

  const testStore = useTestStore();

  const result = await testStore.getTestById(id);

  const test: IUserTest = result.body.test;

  const { user } = useAuth();

  if (user.value?.id !== test.author.id) {
    const localePath = useLocalePath();

    return navigateTo(localePath(`/tests/${id}`));
  }

  testStore.editTest = test;
});
