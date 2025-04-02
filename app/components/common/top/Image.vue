<script lang="ts" setup>
import {
  IMAGE_COMMON_TOP_HEIGHT,
  IMAGE_COMMON_TOP_WIDTH
} from '#shared/constants/image.constant';

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
      :height="IMAGE_COMMON_TOP_HEIGHT"
      :width="IMAGE_COMMON_TOP_WIDTH"
      loading="lazy"
      :alt="alt"
      :class="`h-[${IMAGE_COMMON_TOP_HEIGHT}px] w-full rounded-md object-cover`"
    />

    <slot />
  </div>
</template>
