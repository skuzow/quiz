<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
}

const { title, description } = defineProps<Props>();
</script>

<template>
  <h1 class="mb-2 text-3xl font-bold">
    <CommonGradientText>{{ title }}</CommonGradientText>
  </h1>
  <p class="mb-10">{{ description }}</p>
</template>
