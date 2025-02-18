<script lang="ts" setup>
definePageMeta({ middleware: 'auth' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('createai.title'),
  description: $t('createai.description')
});
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('createai.title')"
      :description="$t('createai.description')"
    />

    <section class="flex w-full flex-col gap-y-6 sm:max-w-md">
      <GenerateTabs />
    </section>
  </div>
</template>
