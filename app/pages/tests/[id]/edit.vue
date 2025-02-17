<script lang="ts" setup>
definePageMeta({ middleware: ['auth', 'tests-edit'] });

const { t: $t } = useI18n();

const testStore = useTestStore();

seoMeta({
  title: `${$t('edit.title')} - ${testStore.editTest?.title}`,
  description: testStore.editTest?.description
});
</script>

<template>
  <Create :edit="true" />
</template>
