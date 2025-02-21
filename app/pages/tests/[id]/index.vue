<script lang="ts" setup>
const route = useRoute();

const id = route.params.id as string;

const testStore = useTestStore();

const { status, data } = await useLazyAsyncData(`test-${id}`, async () =>
  testStore.getTestById(id)
);
</script>

<template>
  <div>
    <TestsMakeSkeleton v-if="status === 'pending'" />

    <TestsMake
      v-else-if="status === 'success'"
      :test="data?.body?.test as IUserTest"
    />
  </div>
</template>
