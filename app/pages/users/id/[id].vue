<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();
const testStore = useTestStore();

const id = route.params.id as string;

const { status: userStatus, data: userData } = useAsyncData(`user-${id}`, () =>
  userStore.getUserById(id)
);

const { status: testsStatus, data: dataStatus } = useAsyncData(
  `user-tests-${id}`,
  () => testStore.getTestsById(id, 0, 14)
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
