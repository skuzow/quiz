<script lang="ts" setup>
definePageMeta({ middleware: 'auth' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('generate.title'),
  description: $t('generate.description')
});
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('generate.title')"
      :description="$t('generate.description')"
    />

    <section class="flex w-full flex-col gap-y-6 sm:max-w-md">
      <GenerateTabs />
    </section>
  </div>
</template>
