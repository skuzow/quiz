<script lang="ts" setup>
import type { ButtonVariants } from '@/components/ui/button';

interface Props {
  variant: ButtonVariants['variant'];
  text: string;
}

const { variant, text } = defineProps<Props>();
</script>

<template>
  <Button :variant="variant" :text="text" class="shrink-0 gap-x-2">
    <span class="sr-only md:not-sr-only">
      {{ text }}
    </span>

    <slot />
  </Button>
</template>
