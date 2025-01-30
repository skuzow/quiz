<script lang="ts" setup>
// interface Props {
//   userId?: string;
// }

// const { userId } = defineProps<Props>();

const testStore = useTestStore();

const { status, data } = useAsyncData('tests', () => testStore.getTests(0, 10));
</script>

<template>
  <p>{{ status }}</p>
  <section class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <TestsCard
      v-for="(test, index) in data?.body?.tests"
      :key="index"
      :test="test"
    />
  </section>
</template>
