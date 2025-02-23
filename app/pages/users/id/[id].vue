<script lang="ts" setup>
const route = useRoute();

const id = route.params.id as string;

const userStore = useUserStore();

const { status, data } = await useLazyAsyncData(`user-${id}`, () =>
  userStore.getUserById(id)
);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <UsersProfileSkeleton v-if="status === 'pending'" />

    <UsersProfile
      v-else-if="status === 'success'"
      :user="data?.body?.user as IUser"
    />

    <TestsFeed :id="id" />
  </div>
</template>
