<script lang="ts" setup>
import type { NuxtError } from '#app';

const route = useRoute();

const id = route.params.id as string;

const { $api } = useNuxtApp();

const { status, data } = await useLazyAsyncData(`user-${id}`, async () => {
  try {
    return await $api.user.getById(id);
  } catch (error) {
    showError(error as NuxtError);
  }
});

const user: ComputedRef<User | undefined> = computed(
  () => data.value?.body.user
);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="status === 'pending' || !data" />

    <UsersProfile v-else-if="status === 'success' && user" :user="user" />

    <TestsFeed :id="id" />
  </div>
</template>
