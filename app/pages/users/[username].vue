<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();

const username = route.params.username as string;

const { status: userStatus, data: userData } = useAsyncData(
  `user-${username}`,
  () => userStore.getUserByUsername(username)
);
</script>

<template>
  <div>
    <h1>{{ userStatus }}</h1>
    <p>{{ userData }}</p>

    <TestsFeed :username="username" />
  </div>
</template>
