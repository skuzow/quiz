<script lang="ts" setup>
import {
  COMMON_TOP_IMAGE_HEIGHT,
  COMMON_TOP_IMAGE_WIDTH
} from '#shared/constants/common.constant';

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
      :height="COMMON_TOP_IMAGE_HEIGHT"
      :width="COMMON_TOP_IMAGE_WIDTH"
      loading="lazy"
      :alt="alt"
      :class="`h-[${COMMON_TOP_IMAGE_HEIGHT}px] w-full rounded-md object-cover`"
    />

    <slot />
  </div>
</template>
