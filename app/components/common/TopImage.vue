<script lang="ts" setup>
interface Props {
  src: string;
  alt: string;
}

const { src, alt } = defineProps<Props>();
</script>

<template>
  <div class="relative w-full">
    <CommonPicture
      :src="src"
      height="172"
      width="100%"
      loading="lazy"
      :alt="alt"
      class="h-[172px] w-full rounded-md object-cover"
    />

    <slot />
  </div>
</template>
