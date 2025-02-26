import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import {
  TEST_SEARCH_PAGE_SIZE,
  TEST_SEARCH_TEXT_MAX
} from '#shared/constants/test.constant';

const SEARCH_TIMEOUT: number = 1000;

export const useTestsFeed = (id?: string, username?: string) => {
  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();

  const { FormInput, maxMessage } = useFormMessage();

  const tests: Ref<UserTestPartial[]> = ref([]);

  const page: Ref<number> = ref(0);
  const search: Ref<string | undefined> = ref();

  const isLoading: Ref<boolean> = ref(false);
  const hasMore: Ref<boolean> = ref(true);
  const errorMessage: Ref<string | undefined> = ref();

  const infiniteScroll = useTemplateRef<HTMLElement>('infinite-scroll');

  const FeedSchema = z.object({
    search: z
      .string()
      .max(TEST_SEARCH_TEXT_MAX, {
        message: maxMessage(FormInput.SEARCH, TEST_SEARCH_TEXT_MAX)
      })
      .refine(async (value) => await searchTimeout(value))
      .optional()
  });

  const validationSchema = toTypedSchema(FeedSchema);

  const { isFieldDirty } = useForm({
    validationSchema
  });

  const testsRequest = async (dto: TestSearch) => {
    if (id) return $api.test.getAllById(id, dto);

    if (username) return $api.test.getAllByUsername(username, dto);

    return $api.test.getAll(dto);
  };

  const searchTests = async (reset?: boolean) => {
    isLoading.value = true;

    if (reset) resetTests();

    const dto: TestSearch = { page: page.value, search: search.value };

    try {
      const response = await testsRequest(dto);

      const responseTests: UserTestPartial[] = response.body.tests;

      tests.value.push(...responseTests);

      if (responseTests.length < TEST_SEARCH_PAGE_SIZE) hasMore.value = false;
      else page.value++;
    } catch (e) {
      if (e.statusCode === 404) errorMessage.value = $t('error.testsNotFound');
      else errorMessage.value = $t('error.internalServer');
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

  const handleScroll = () => {
    if (isLoading.value || !hasMore.value || errorMessage.value) return;

    const infiniteScrollElement = infiniteScroll.value as HTMLElement;

    if (
      infiniteScrollElement.getBoundingClientRect().bottom < window.innerHeight
    )
      searchTests();
  };

  let searchNodeTimeout: NodeJS.Timeout;

  const searchTimeout = async (value: string): Promise<boolean> => {
    if (isInvalidSearch(value)) return false;

    if (searchNodeTimeout) clearTimeout(searchNodeTimeout);

    return new Promise((resolve) => {
      searchNodeTimeout = setTimeout(async () => {
        search.value = value;

        await searchTests(true);

        resolve(true);
      }, SEARCH_TIMEOUT);
    });
  };

  const isInvalidSearch = (value: string): boolean => {
    return value.length > TEST_SEARCH_TEXT_MAX;
  };

  return {
    tests,
    isLoading,
    hasMore,
    errorMessage,
    isFieldDirty,
    searchTests,
    handleScroll
  };
};
