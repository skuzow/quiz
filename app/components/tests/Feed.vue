<script lang="ts" setup>
import { ChevronDownIcon, SlidersHorizontalIcon } from 'lucide-vue-next';

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
        <SlidersHorizontalIcon :size="16" />
        {{ $t('tests.search.buttons.filter') }}
      </Button>
    </div>

    <section class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <template v-if="status === 'pending'">
        <TestsCardSkeleton v-for="index in 14" :key="index" />
      </template>

      <template v-else>
        <TestsCard
          v-for="(test, index) in data?.body?.tests"
          :key="index"
          :test="test"
        />
      </template>
    </section>
  </div>
</template>
