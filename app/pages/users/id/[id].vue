<script lang="ts" setup>
const route = useRoute();

const userStore = useUserStore();

const id = route.params.id as string;

const { status, data } = useAsyncData(`user-${id}`, () =>
  userStore.getUserById(id)
);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="!data && status === 'pending'" />

    <UsersProfile v-else :user="data?.body?.user as IUser" />

    <TestsFeed :id="id" />
  </div>
</template>
