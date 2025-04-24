<script lang="ts" setup>
import { type GradientVariants, gradientVariants } from '.';

interface Props {
  direction?: GradientVariants['direction'];
  class?: string;
}

const { direction, class: className } = defineProps<Props>();

const directionVariant: string = gradientVariants({ direction });
</script>

<template>
  <span
    :class="
      cn(
        'from-gradient-start to-gradient-end bg-clip-text text-transparent',
        directionVariant,
        className
      )
    "
  >
    <slot />
  </span>
</template>
