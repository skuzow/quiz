<script lang="ts" setup>
interface Props {
  format?: string[];
  src: string;
  height: string;
  width: string;
  loading?: 'lazy' | 'eager';
  alt: string;
  class?: string;
}

const {
  format = ['avif', 'webp'],
  src,
  height,
  width,
  loading,
  alt,
  class: className
} = defineProps<Props>();
</script>

<template>
  <NuxtPicture
    :format="format.join(',')"
    :src="src"
    :height="height"
    :width="width"
    :loading="loading"
    :title="alt"
    :alt="alt"
    :img-attrs="{
      class: className
    }"
  />
</template>
