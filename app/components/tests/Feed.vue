<script lang="ts" setup>
import { ArrowDownUpIcon, FilterIcon } from 'lucide-vue-next';

import { TESTS_PAGE_SIZE } from '#shared/constants/test';

interface Props {
  id?: string;
  username?: string;
}

const { id, username } = defineProps<Props>();

const { tests, isLoading, hasMore, errorMessage, loadTests, handleScroll } =
  useTestsFeed(id, username);

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

        <template v-if="(!tests.length || isLoading) && !errorMessage">
          <li v-for="index in TESTS_PAGE_SIZE" :key="index">
            <TestsCardSkeleton />
          </li>
        </template>

        <span v-if="!hasMore">{{ $t('error.testsMoreNotFound') }}</span>

        <span v-if="errorMessage">{{ errorMessage }}</span>
      </ol>
    </section>
  </div>
</template>
