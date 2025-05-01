<script lang="ts" setup>
definePageMeta({ middleware: ['auth', 'test-stats'] });

const { t: $t } = useI18n();

const testStore = useTestStore();

seoMeta({
  title: `${$t('tests.stats.title')} - ${testStore.statsTest?.title}`,
  description: testStore.statsTest?.description
});
</script>

<template>
  <TestsStats :test="testStore.statsTest!" />
</template>
