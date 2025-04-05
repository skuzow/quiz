<script setup lang="ts">
import { FormLabel } from '@/components/ui/form';

defineProps<{
  required?: boolean;
}>();
</script>

<template>
  <FormLabel>
    <slot />
    <FormRequired v-if="required" />
  </FormLabel>
</template>
