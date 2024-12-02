<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { AvatarRoot } from 'radix-vue';
import { avatarVariant, type AvatarVariants } from '.';

const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line vue/require-default-prop
    class?: HTMLAttributes['class'];
    size?: AvatarVariants['size'];
    shape?: AvatarVariants['shape'];
  }>(),
  {
    size: 'sm',
    shape: 'circle'
  }
);
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
