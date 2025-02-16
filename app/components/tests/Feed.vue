<script lang="ts" setup>
import { ArrowDownUpIcon, FilterIcon } from 'lucide-vue-next';

import { TESTS_PAGE_SIZE } from '#shared/constants/test';

interface Props {
  id?: string;
  username?: string;
}

const { id, username } = defineProps<Props>();

const testStore = useTestStore();

const tests: Ref<IUserTestPartial[]> = ref([]);

const page: Ref<number> = ref(0);
const isLoading: Ref<boolean> = ref(false);
const hasMore: Ref<boolean> = ref(true);

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // 404
    // TODO: handle 404 error with message (e.statusCode)
    hasMore.value = false;
  } finally {
    isLoading.value = false;
  }
};

const infiniteScroll = useTemplateRef<HTMLElement>('infinite-scroll');

const handleScroll = () => {
  if (isLoading.value || !hasMore.value) return;

  const infiniteScrollElement = infiniteScroll.value as HTMLElement;

  if (infiniteScrollElement.getBoundingClientRect().bottom < window.innerHeight)
    loadTests();
};

onMounted(() => {
  loadTests();

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <Input :placeholder="$t('tests.search.placeholder')" />

      <Button class="gap-x-2" variant="outline">
        {{ $t('tests.search.buttons.sort') }}
        <ArrowDownUpIcon :size="16" />
      </Button>

      <Button class="gap-x-2" variant="secondary">
        <FilterIcon :size="16" />
        {{ $t('tests.search.buttons.filter') }}
      </Button>
    </div>

    <section>
      <ol ref="infinite-scroll" class="grid grid-cols-1 gap-4">
        <template v-if="tests.length">
          <li v-for="(test, index) in tests" :key="index">
            <TestsCard :test="test" />
          </li>
        </template>

        <template v-if="!tests.length || isLoading">
          <li v-for="index in TESTS_PAGE_SIZE" :key="index">
            <TestsCardSkeleton />
          </li>
        </template>

        <span v-if="!hasMore">No more tests :(</span>
      </ol>
    </section>
  </div>
</template>
