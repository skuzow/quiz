<script lang="ts" setup>
import { LucideRocket } from 'lucide-vue-next';
</script>

<template>
  <h1 class="text-xl">Hello Tailwind</h1>
  <Button size="icon" variant="ghost">
    <LucideRocket :size="18" />
  </Button>
</template>
