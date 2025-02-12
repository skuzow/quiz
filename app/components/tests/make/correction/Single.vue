<script lang="ts" setup>
import { CircleIcon } from 'lucide-vue-next';

interface Props {
  selected: boolean;
}

const { selected } = defineProps<Props>();
</script>

<template>
  <div
    class="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary"
  >
    <CircleIcon v-if="selected" :size="12" class="fill-primary" />
  </div>
</template>
