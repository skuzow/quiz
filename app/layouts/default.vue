<script lang="ts" setup>
import { Theme, ThemeColor } from '@/constants/theme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { locale, locales } = useI18n();

const colorMode = useColorMode();

type LocaleCode = (typeof locales.value)[number]['code'];

const ogLocales: Record<LocaleCode, string> = {
  en: 'en_US',
  es: 'es_ES'
};

const ogLocale = computed(() => ogLocales[locale.value as LocaleCode]);

const themeColor = computed(() =>
  colorMode.value === Theme.DARK ? ThemeColor.DARK : ThemeColor.LIGHT
);

useHead({
  htmlAttrs: {
    lang: locale
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
  themeColor: themeColor,
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
  <div class="relative grid min-h-dvh grid-rows-[auto_1fr_auto] gap-2">
    <NavHeader />
    <main class="container mb-4 max-w-6xl py-4 md:my-11 md:px-8">
      <slot />
    </main>
    <NavFooter />
  </div>
</template>
