<script lang="ts" setup>
const { t: $t } = useI18n();

seoMeta({
  title: $t('tests.title'),
  description: $t('tests.description')
});
</script>

<template>
  <TestsFeed />
</template>
