<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'radix-vue';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-vue-next';
import { NumberFieldIncrement, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldIncrement
    data-slot="increment"
    v-bind="forwarded"
    :class="
      cn(
        'absolute right-0 top-1/2 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        props.class
      )
    "
  >
    <slot>
      <PlusIcon class="h-4 w-4" />
    </slot>
  </NumberFieldIncrement>
</template>
