<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();
const testStore = useTestStore();

const username = route.params.username as string;

const { status: userStatus, data: userData } = useAsyncData(
  `user-${username}`,
  () => userStore.getUserByUsername(username)
);

const { status: testsStatus, data: dataStatus } = useAsyncData(
  `user-tests-${username}`,
  () => testStore.getTestsByUsername(username, 0, 14)
);
</script>

<template>
  <div>
    <h1>{{ userStatus }}</h1>
    <p>{{ userData }}</p>
    <br />
    <h2>{{ testsStatus }}</h2>
    <p>{{ dataStatus }}</p>
  </div>
</template>
