<script lang="ts" setup>
interface Props {
  user: IUser;
}

const { user } = defineProps<Props>();
</script>

<template>
  <div>{{ user }}</div>
</template>
