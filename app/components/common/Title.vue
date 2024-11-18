<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
}

const { title, description } = defineProps<Props>();
</script>

<template>
  <h1
    class="mb-2 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-3xl font-bold text-transparent"
  >
    {{ title }}
  </h1>
  <p class="mb-10">{{ description }}</p>
</template>
