<script lang="ts" setup>
import { ChevronDownIcon, FilterIcon } from 'lucide-vue-next';

// interface Props {
//   userId?: string;
// }

// const { userId } = defineProps<Props>();

const testStore = useTestStore();

const { status, data } = useAsyncData('tests', () => testStore.getTests(0, 14));
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
      <ol class="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
