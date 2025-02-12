<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();

const username = route.params.username as string;

const { status, data } = useAsyncData(`user-${username}`, () =>
  userStore.getUserByUsername(username)
);
</script>

<template>
  <div>
    <h1>{{ status }}</h1>
    <p>{{ data }}</p>
  </div>
</template>
