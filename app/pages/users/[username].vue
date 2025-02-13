<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();

const username = route.params.username as string;

const { status, data } = useAsyncData(`user-${username}`, () =>
  userStore.getUserByUsername(username)
);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="!data && status === 'pending'" />

    <UsersProfile v-else :user="data?.body?.user as IUser" />

    <TestsFeed :username="username" />
  </div>
</template>
