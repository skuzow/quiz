<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

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

    <section class="flex w-80 flex-col gap-y-6 md:w-96">
      <CreateAiTabs />
    </section>
  </div>
</template>
