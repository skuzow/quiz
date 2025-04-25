<script lang="ts" setup>
const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.about.title'),
  description: $t('nav.header.about.description')
});
</script>

<template>
  <div>
    <h1 class="text-8xl">about</h1>
  </div>
</template>
