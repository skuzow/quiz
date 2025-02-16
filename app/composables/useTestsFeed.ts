import { TESTS_PAGE_SIZE } from '#shared/constants/test';

export const useTestsFeed = (id?: string, username?: string) => {
  const testStore = useTestStore();

  const { t: $t } = useI18n();

  const tests: Ref<IUserTestPartial[]> = ref([]);
  const page: Ref<number> = ref(0);

  const isLoading: Ref<boolean> = ref(false);
  const hasMore: Ref<boolean> = ref(true);
  const errorMessage: Ref<string | undefined> = ref();

  const infiniteScroll = useTemplateRef<HTMLElement>('infinite-scroll');

  const testsRequest = async (): Promise<IUserTestPartial[] | undefined> => {
    if (id) return testStore.getTestsById(id, page.value);
    if (username) return testStore.getTestsByUsername(username, page.value);
    return testStore.getTests(page.value);
  };

  const loadTests = async () => {
    isLoading.value = true;

    try {
      const response = await testsRequest();

      const responseTests: IUserTestPartial[] = response.body.tests;

      tests.value.push(...responseTests);

      if (responseTests.length < TESTS_PAGE_SIZE) hasMore.value = false;
      else page.value++;
    } catch (e) {
      if (e.statusCode === 404) errorMessage.value = $t('error.testsNotFound');
      else errorMessage.value = $t('error.internalServer');
    } finally {
      isLoading.value = false;
    }
  };

  const handleScroll = () => {
    if (isLoading.value || !hasMore.value || errorMessage.value) return;

    const infiniteScrollElement = infiniteScroll.value as HTMLElement;

    if (
      infiniteScrollElement.getBoundingClientRect().bottom < window.innerHeight
    )
      loadTests();
  };

  return {
    tests,
    isLoading,
    hasMore,
    errorMessage,
    loadTests,
    handleScroll
  };
};
