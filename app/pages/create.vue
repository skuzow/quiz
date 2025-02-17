<script lang="ts" setup>
definePageMeta({ middleware: 'auth' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('create.title'),
  description: $t('create.description')
});
</script>

<template>
  <Create />
</template>
