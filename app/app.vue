<script lang="ts" setup>
useHead({
  link: [
    {
      rel: 'preload',
      href: '/fonts/GeistVF.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    },
    {
      rel: 'preload',
      href: '/fonts/GeistMonoVF.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    }
  ]
});
</script>

<template>
  <HelloWorld />
  <Button>Hello shadcn/ui</Button>
  <LucideRocket :size="50" class="color-primary" />
</template>
