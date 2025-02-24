<script lang="ts" setup>
import type { NuxtError } from '#app';

const route = useRoute();

const id = route.params.id as string;

const { $api } = useNuxtApp();

const { status, data } = await useLazyAsyncData(`user-${id}`, async () => {
  try {
    return await $api.user.getById(id);
  } catch (e) {
    showError(e as NuxtError);
  }
});

const user = computed(() => data.value?.body.user);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="status === 'pending'" />

    <UsersProfile v-else-if="status === 'success' && user" :user="user" />

    <TestsFeed :id="id" />
  </div>
</template>
