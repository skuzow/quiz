<script lang="ts" setup>
useHead({
  htmlAttrs: {
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
  author: 'Alejandro Porras - skuzow',
  keywords: 'quiz, test, exam, ai',

  twitterCard: 'summary_large_image',
  twitterSite: '@skuzow',
  twitterCreator: '@skuzow',

  ogType: 'website',
  ogImageType: 'image/png',
  ogImageWidth: '1200',
  ogImageHeight: '630'
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
