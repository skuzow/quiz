<script lang="ts" setup>
import type { NuxtError } from '#app';

const route = useRoute();

const username = route.params.username as string;

const { $api } = useNuxtApp();

const { status, data } = await useLazyAsyncData(
  `user-${username}`,
  async () => {
    try {
      return await $api.user.getByUsername(username);
    } catch (e) {
      showError(e as NuxtError);
    }
  }
);

const user = computed(() => data.value?.body.user);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="status === 'pending' && !data" />

    <UsersProfile v-else-if="status === 'success' && user" :user="user" />

    <TestsFeed :username="username" />
  </div>
</template>
