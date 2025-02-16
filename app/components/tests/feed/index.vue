<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { ArrowDownUpIcon, FilterIcon } from 'lucide-vue-next';

import { TESTS_PAGE_SIZE } from '#shared/constants/test';

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

const { FormInput } = useFormMessage();

const isDesktop: Ref<boolean> = useMediaQuery('(min-width: 768px)');

onMounted(() => {
  searchTests();

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <FormField
        v-slot="{ componentField }"
        :name="FormInput.SEARCH"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem v-auto-animate class="w-full">
          <FormControl>
            <Input
              type="text"
              :placeholder="$t('tests.search.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button
        class="shrink-0 gap-x-2"
        variant="outline"
        :size="isDesktop ? 'default' : 'icon'"
      >
        <span :class="{ 'sr-only': !isDesktop }">
          {{ $t('tests.search.buttons.sort') }}
        </span>
        <ArrowDownUpIcon :size="16" />
      </Button>

      <Button
        class="shrink-0 gap-x-2"
        variant="secondary"
        :size="isDesktop ? 'default' : 'icon'"
      >
        <FilterIcon :size="16" />
        <span :class="{ 'sr-only': !isDesktop }">
          {{ $t('tests.search.buttons.filter') }}
        </span>
      </Button>
    </div>

    <section>
      <ol ref="infinite-scroll" class="grid grid-cols-1 gap-4">
        <template v-if="tests.length">
          <li v-for="(test, index) in tests" :key="index">
            <TestsFeedCard :test="test" />
          </li>
        </template>

        <template v-if="(!tests.length || isLoading) && !errorMessage">
          <li v-for="index in TESTS_PAGE_SIZE" :key="index">
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
