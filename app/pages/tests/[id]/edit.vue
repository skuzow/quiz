<script lang="ts" setup>
definePageMeta({ middleware: ['auth', 'tests-edit'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('edit.title'),
  description: $t('edit.description')
});
</script>

<template>
  <Create :edit="true" />
</template>
