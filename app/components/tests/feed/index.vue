<script lang="ts" setup>
import { TEST_SEARCH_PAGE_SIZE } from '#shared/constants/test.constant';

interface Props {
  id?: string;
  username?: string;
}

const { id, username } = defineProps<Props>();

const { tests, isLoading, hasMore, errorMessage, isFieldDirty, searchEnter } =
  useTestsFeed(id, username);
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <TestsFeedForm :is-field-dirty="isFieldDirty" @search-enter="searchEnter" />

    <section>
      <ol ref="infinite-scroll" class="grid grid-cols-1 gap-4">
        <template v-if="tests.length">
          <li v-for="test in tests" :key="test.id">
            <TestsFeedCard :test="test" />
          </li>
        </template>

        <template v-if="(!tests.length || isLoading) && !errorMessage">
          <li
            v-for="indexCardSkeleton in TEST_SEARCH_PAGE_SIZE"
            :key="indexCardSkeleton"
          >
            <TestsFeedCardSkeleton />
          </li>
        </template>

        <li v-if="!hasMore">
          <TestsFeedErrorMessage>
            {{ $t('error.testsMoreNotFound') }}
          </TestsFeedErrorMessage>
        </li>

        <li v-else-if="errorMessage">
          <TestsFeedErrorMessage>
            {{ errorMessage }}
          </TestsFeedErrorMessage>
        </li>
      </ol>
    </section>
  </div>
</template>
