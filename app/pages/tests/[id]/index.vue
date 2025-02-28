<script lang="ts" setup>
import type { NuxtError } from '#app';

const route = useRoute();

const id = route.params.id as string;

const { $api } = useNuxtApp();

const { status, data } = await useLazyAsyncData(`test-${id}`, async () => {
  try {
    return await $api.test.getById(id);
  } catch (error) {
    showError(error as NuxtError);
  }
});

const test = computed(() => data.value?.body.test);
</script>

<template>
  <div>
    <TestsMakeSkeleton v-if="status === 'pending' && !data" />

    <TestsMake v-else-if="status === 'success' && test" :test="test" />
  </div>
</template>
