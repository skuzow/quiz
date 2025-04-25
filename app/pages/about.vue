<script lang="ts" setup>
const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.about.title'),
  description: $t('nav.header.about.description')
});
</script>

<template>
  <div class="mt-6 space-y-20 md:mt-10 md:space-y-48">
    <AboutHero />

    <AboutDeveloper />

    <LandingFaq />

    <AboutContact />
  </div>
</template>
