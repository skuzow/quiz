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
      :width="1088"
      :height="172"
      loading="lazy"
      :alt="alt"
      class="h-[172px] rounded-md object-cover"
    />

    <slot />
  </div>
</template>
