export default defineNuxtRouteMiddleware(async (to, _from) => {
  const id = to.params.id as string;

  const { $api } = useNuxtApp();

  let result;

  try {
    result = await $api.test.getByIdStats(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const localePath = useLocalePath();

    return await navigateTo(localePath(`/tests/${id}`));
  }

  const testStore = useTestStore();

  testStore.statsTest = result.body.test;
});
