<script lang="ts" setup>
import { Layers3Icon } from 'lucide-vue-next';

interface Props {
  size?: number;
}

const { size = 24 } = defineProps<Props>();
</script>

<template>
  <Layers3Icon :size="size" stroke="url(#gradient-svg)" />
</template>
