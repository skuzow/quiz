<script lang="ts" setup>
import { type IconVariants, iconVariants } from '.';

interface Props {
  size?: IconVariants['size'];
}

const { size } = defineProps<Props>();

const sizeVariant: string = iconVariants({ size });
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :width="sizeVariant"
    :height="sizeVariant"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-foreground"
  >
    <path
      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="0.35s"
        values="0 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </path>
  </svg>
</template>
