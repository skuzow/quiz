<script setup lang="ts">
import { cn } from '@/lib/utils';
import { CircleIcon } from 'lucide-vue-next';
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  RadioGroupItemProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <CircleIcon class="h-3 w-3 fill-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
