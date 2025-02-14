<script lang="ts" setup>
import { ChevronDownIcon, FilterIcon } from 'lucide-vue-next';

interface Props {
  id?: string;
  username?: string;
}

const { id, username } = defineProps<Props>();

const testStore = useTestStore();

const asyncDataKey = () => {
  if (id) return `user-tests-${id}`;
  if (username) return `user-tests-${username}`;
  return 'tests';
};

const asyncDataFn = () => {
  if (id) return testStore.getTestsById(id, 0, 14);
  if (username) return testStore.getTestsByUsername(username, 0, 14);
  return testStore.getTests(0, 14);
};

const { status, data } = useAsyncData(asyncDataKey(), asyncDataFn);
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <Input :placeholder="$t('tests.search.placeholder')" />

      <Button class="gap-x-2" variant="outline">
        {{ $t('tests.search.buttons.sort') }}
        <ChevronDownIcon :size="16" />
      </Button>

      <Button class="gap-x-2" variant="secondary">
        <FilterIcon :size="16" />
        {{ $t('tests.search.buttons.filter') }}
      </Button>
    </div>

    <section>
      <ol class="grid grid-cols-1 gap-4">
        <template v-if="!data && status === 'pending'">
          <li v-for="index in 14" :key="index">
            <TestsCardSkeleton />
          </li>
        </template>

        <template v-else>
          <li v-for="(test, index) in data?.body?.tests" :key="index">
            <TestsCard :test="test" />
          </li>
        </template>
      </ol>
    </section>
  </div>
</template>
