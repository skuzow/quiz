<script setup lang="ts">
import type { TagsInputItemProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

import { TagsInputItem, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<
  TagsInputItemProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="
      cn(
        'flex h-5 items-center rounded-md bg-secondary ring-offset-background data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2',
        props.class
      )
    "
  >
    <slot />
  </TagsInputItem>
</template>
