<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();

const id = route.params.id as string;

const { status, data } = useAsyncData(`user-${id}`, () =>
  userStore.getUserById(id)
);
</script>

<template>
  <div>
    <h1>{{ status }}</h1>
    <p>{{ data }}</p>
  </div>
</template>
