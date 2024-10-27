<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { locale, locales } = useI18n();

type LocaleCode = (typeof locales.value)[number]['code'];

const ogLocales: Record<LocaleCode, string> = {
  en: 'en_US',
  es: 'es_ES'
};

const ogLocale = computed(() => ogLocales[locale.value as LocaleCode]);

useHead({
  htmlAttrs: {
    lang: locale,
    class: 'dark' // TODO: remove when make theme toggle
  },
  link: [
    {
      rel: 'preload',
      href: '/fonts/GeistVF.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    },
    {
      rel: 'preload',
      href: '/fonts/GeistMonoVF.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    },

    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    },
    {
      rel: 'mask-icon',
      href: '/favicon.svg',
      color: '#FF4D88'
    },

    {
      rel: 'sitemap',
      href: '/sitemap.xml'
    }
  ]
});

useSeoMeta({
  themeColor: '#0B0A0B', // TODO: make this color dynamic
  author: 'Alejandro Porras - skuzow',
  keywords: 'quiz, test, exam, ai',

  twitterCard: 'summary_large_image',
  twitterSite: '@skuzow',
  twitterCreator: '@skuzow',

  ogLocale: ogLocale,
  ogType: 'website',
  ogImageType: 'image/png',
  ogImageWidth: '1200',
  ogImageHeight: '630'
});
</script>

<template>
  <GradientSVG />

  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
