<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();

const id = route.params.id as string;

const { status: userStatus, data: userData } = useAsyncData(`user-${id}`, () =>
  userStore.getUserById(id)
);
</script>

<template>
  <div>
    <h1>{{ userStatus }}</h1>
    <p>{{ userData }}</p>

    <TestsFeed :id="id" />
  </div>
</template>
