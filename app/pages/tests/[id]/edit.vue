<script lang="ts" setup>
definePageMeta({ middleware: 'auth' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('edit.title'),
  description: $t('edit.description')
});

const route = useRoute();

const id = route.params.id as string;
</script>

<template>
  <div>{{ id }}</div>
</template>
