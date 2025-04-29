<script lang="ts" setup>
interface Props {
  format?: string[];
  src: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  alt: string;
  class?: string;
}

const {
  format = ['avif', 'webp'],
  src,
  width,
  height,
  loading,
  alt,
  class: className
} = defineProps<Props>();
</script>

<template>
  <NuxtPicture
    :format="format.join(',')"
    :src="src"
    :width="width"
    :height="height"
    :loading="loading"
    :alt="alt"
    :img-attrs="{
      title: alt,
      class: className
    }"
  />
</template>
