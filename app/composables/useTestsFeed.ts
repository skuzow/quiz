import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { TESTS_PAGE_SIZE } from '#shared/constants/test.constant';

const SEARCH_TIMEOUT: number = 1000;

const MAX_SEARCH_LENGTH: number = 150;

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

  const searchSchema = z.object({
    search: z
      .string()
      .max(MAX_SEARCH_LENGTH, {
        message: maxMessage(FormInput.SEARCH, MAX_SEARCH_LENGTH)
      })
      .refine(async (value) => await searchTimeout(value))
      .optional()
  });

  const searchValidationSchema = toTypedSchema(searchSchema);

  const { isFieldDirty } = useForm({
    validationSchema: searchValidationSchema
  });

  const testsRequest = async () => {
    if (id) return $api.test.getAllById(id, page.value, search.value);

    if (username)
      return $api.test.getAllByUsername(username, page.value, search.value);

    return $api.test.getAll(page.value, search.value);
  };

  const searchTests = async (reset?: boolean) => {
    isLoading.value = true;

    if (reset) resetTests();

    try {
      const response = await testsRequest();

      const responseTests: UserTestPartial[] = response.body.tests;

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
    return value.length > MAX_SEARCH_LENGTH;
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
