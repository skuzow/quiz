<script lang="ts" setup>
import { CheckIcon } from 'lucide-vue-next';

interface Props {
  selected: boolean;
}

const { selected } = defineProps<Props>();
</script>

<template>
  <div class="h-4 w-4 shrink-0 rounded-sm border border-primary">
    <CheckIcon
      v-if="selected"
      :size="14"
      class="bg-primary stroke-background"
    />
  </div>
</template>
