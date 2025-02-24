export default defineNuxtRouteMiddleware(async (to, _from) => {
  const id = to.params.id as string;

  const { $api } = useNuxtApp();

  const result = await $api.test.getById(id);

  const test = result.body.test;

  const { authUser } = useAuth();

  if (authUser.value?.id !== test.author.id) {
    const localePath = useLocalePath();

    return await navigateTo(localePath(`/tests/${id}`));
  }

  const testStore = useTestStore();

  testStore.editTest = test;
});
