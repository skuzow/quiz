<script lang="ts" setup>
import { TESTS_PAGE_SIZE } from '#shared/constants/test.constant';

interface Props {
  id?: string;
  username?: string;
}

const { id, username } = defineProps<Props>();

const {
  tests,
  isLoading,
  hasMore,
  errorMessage,
  isFieldDirty,
  searchTests,
  handleScroll
} = useTestsFeed(id, username);

onMounted(() => {
  searchTests();

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <TestsFeedForm :is-field-dirty="isFieldDirty" />

    <section>
      <ol ref="infinite-scroll" class="grid grid-cols-1 gap-4">
        <template v-if="tests.length">
          <li v-for="test in tests" :key="test.id">
            <TestsFeedCard :test="test" />
          </li>
        </template>

        <template v-if="(!tests.length || isLoading) && !errorMessage">
          <li
            v-for="indexCardSkeleton in TESTS_PAGE_SIZE"
            :key="indexCardSkeleton"
          >
            <TestsFeedCardSkeleton />
          </li>
        </template>

        <TestsFeedErrorMessage v-if="!hasMore">
          {{ $t('error.testsMoreNotFound') }}
        </TestsFeedErrorMessage>

        <TestsFeedErrorMessage v-if="errorMessage">
          {{ errorMessage }}
        </TestsFeedErrorMessage>
      </ol>
    </section>
  </div>
</template>
