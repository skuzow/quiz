<script lang="ts" setup>
// interface Props {
//   userId?: string;
// }

// const { userId } = defineProps<Props>();

const testStore = useTestStore();

const { status, data } = useAsyncData('tests', () => testStore.getTests(0, 14));
</script>

<template>
  <p>{{ status }}</p>
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
</template>
