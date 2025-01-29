<script lang="ts" setup>
const route = useRoute();

const testStore = useTestStore();

const id = route.params.id as string;

const { status, data } = useAsyncData(`test-${id}`, () =>
  testStore.getTest(id)
);
</script>

<template>
  <div>
    <h1>{{ status }}</h1>
    <p>{{ data }}</p>
  </div>
</template>
