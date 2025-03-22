import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import type { NuxtError } from '#app';

import { FormInput } from '@/constants/form.constant';
import {
  TEST_SEARCH_PAGE_SIZE,
  TEST_SEARCH_TEXT_MAX,
  TestOrderValues,
  TestCategoryValues,
  type TestOrder,
  type TestCategory
} from '#shared/constants/test.constant';

const SEARCH_TIMEOUT: number = 1000;

export const useTestsFeed = (id?: string, username?: string) => {
  const route = useRoute();
  const router = useRouter();

  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();

  const { maxMessage } = useFormMessage();

  const tests: Ref<UserTestPartial[]> = ref([]);

  const page: Ref<number> = ref(0);

  const isLoading: Ref<boolean> = ref(false);
  const hasMore: Ref<boolean> = ref(true);
  const errorMessage: Ref<string | undefined> = ref();

  const queryValues = computed(() => ({
    search: route.query.search as string,
    sort: (route.query.sort as string)?.toUpperCase() as TestOrder,
    filter: (route.query.filter as string)?.toUpperCase() as TestCategory
  }));

  const infiniteScroll = useTemplateRef<HTMLElement>('infinite-scroll');

  const FeedSchema = z.object({
    search: z
      .string()
      .max(TEST_SEARCH_TEXT_MAX, {
        message: maxMessage(FormInput.SEARCH, TEST_SEARCH_TEXT_MAX)
      })
      .optional(),
    sort: z.enum(TestOrderValues).optional(),
    filter: z.enum(TestCategoryValues).optional()
  });

  type FeedForm = z.TypeOf<typeof FeedSchema>;

  const validationSchema = toTypedSchema(FeedSchema);

  const { values, setFieldValue, isFieldDirty } = useForm({
    validationSchema,
    initialValues: queryValues.value
  });

  const setFormValues = ({ search, sort, filter }: FeedForm) => {
    setFieldValue(FormInput.SEARCH, search);
    setFieldValue('sort', sort);
    setFieldValue('filter', filter);
  };

  const testsRequest = async (dto: TestSearch) => {
    if (id) return $api.test.getAllById(id, dto);

    if (username) return $api.test.getAllByUsername(username, dto);

    return $api.test.getAll(dto);
  };

  const searchTests = async (reset?: boolean) => {
    isLoading.value = true;

    if (reset) resetTests();

    const dto: TestSearch = {
      page: page.value,
      search: values.search,
      sort: values.sort,
      filter: values.filter
    };

    try {
      const response = await testsRequest(dto);

      const responseTests: UserTestPartial[] = response.body.tests;

      tests.value.push(...responseTests);

      if (responseTests.length < TEST_SEARCH_PAGE_SIZE) hasMore.value = false;
      else page.value++;
    } catch (error) {
      handleError(error as NuxtError);
    } finally {
      isLoading.value = false;
    }
  };

  const resetTests = () => {
    tests.value = [];
    page.value = 0;
    hasMore.value = true;
    errorMessage.value = undefined;
  };

  const handleError = (error: NuxtError) => {
    if (error.statusCode === 404) {
      if (page.value === 0) errorMessage.value = $t('error.testsNotFound');
      else hasMore.value = false;
    } else errorMessage.value = $t('error.internalServer');
  };

  const handleScroll = () => {
    if (isLoading.value || !hasMore.value || errorMessage.value) return;

    const infiniteScrollElement = infiniteScroll.value as HTMLElement;

    if (
      infiniteScrollElement.getBoundingClientRect().bottom < window.innerHeight
    )
      searchTests();
  };

  let searchNodeTimeout: NodeJS.Timeout;

  const searchTimeout = async (): Promise<boolean> => {
    if (isInvalidSearch()) return false;

    if (searchNodeTimeout) clearTimeout(searchNodeTimeout);

    return new Promise((resolve) => {
      searchNodeTimeout = setTimeout(async () => {
        await searchTests(true);

        resolve(true);
      }, SEARCH_TIMEOUT);
    });
  };

  const searchEnter = async () => {
    if (isInvalidSearch()) return;

    if (searchNodeTimeout) clearTimeout(searchNodeTimeout);

    await searchTests(true);
  };

  const isInvalidSearch = (): boolean => {
    return !!values.search && values.search.length > TEST_SEARCH_TEXT_MAX;
  };

  watch(values, async () => {
    await router.push({
      query: {
        search: values.search || undefined,
        sort: values.sort?.toLowerCase(),
        filter: values.filter?.toLowerCase()
      }
    });
  });

  watch(
    () => [route.query.search, route.query.sort, route.query.filter],
    async (_newQuery, oldQuery) => {
      const result = FeedSchema.safeParse(queryValues.value);

      if (!result.success) return;

      setFormValues(queryValues.value);

      if (queryValues.value.search !== oldQuery[0]) await searchTimeout();
      else {
        if (searchNodeTimeout) clearTimeout(searchNodeTimeout);

        await searchTests(true);
      }
    }
  );

  onMounted(async () => {
    await searchTests();

    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => window.removeEventListener('scroll', handleScroll));

  return {
    tests,
    isLoading,
    hasMore,
    errorMessage,
    isFieldDirty,
    searchEnter
  };
};
