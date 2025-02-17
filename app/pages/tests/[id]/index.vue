<script lang="ts" setup>
const route = useRoute();

const testStore = useTestStore();

const id = route.params.id as string;

const { status, data } = useAsyncData(`test-${id}`, () =>
  testStore.getTestById(id)
);
</script>

<template>
  <div>
    <TestsMakeSkeleton v-if="!data && status === 'pending'" />

    <TestsMake v-else :test="data?.body?.test as IUserTest" />
  </div>
</template>
