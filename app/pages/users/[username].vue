<script lang="ts" setup>
const route = useRoute();

const username = route.params.username as string;

const userStore = useUserStore();

const { status, data } = await useLazyAsyncData(`user-${username}`, () =>
  userStore.getUserByUsername(username)
);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="status === 'pending'" />

    <UsersProfile
      v-else-if="status === 'success'"
      :user="data?.body?.user as IUser"
    />

    <TestsFeed :username="username" />
  </div>
</template>
