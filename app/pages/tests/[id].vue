<script lang="ts" setup>
const route = useRoute();

const testStore = useTestStore();

const { status, data } = useAsyncData('getTest', () =>
  testStore.getTest(route.params.id as string)
);
</script>

<template>
  <div>
    <h1>{{ status }}</h1>
    <p>{{ data }}</p>
  </div>
</template>
