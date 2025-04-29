<script lang="ts" setup>
interface Props {
  src: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  alt: string;
  class?: string;
}

const {
  src,
  width,
  height,
  loading,
  decoding = 'async',
  alt,
  class: className
} = defineProps<Props>();
</script>

<template>
  <NuxtImg
    :src="src"
    :width="width"
    :height="height"
    :loading="loading"
    :decoding="decoding"
    :title="alt"
    :alt="alt"
    :class="className"
  />
</template>
