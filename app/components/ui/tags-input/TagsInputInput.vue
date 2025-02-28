<script setup lang="ts">
import type { TagsInputInputProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TagsInputInput, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<
  TagsInputInputProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputInput
    v-bind="forwardedProps"
    :class="
      cn(
        'min-h-5 flex-1 bg-transparent px-1 text-sm focus:outline-none',
        props.class
      )
    "
  />
</template>
