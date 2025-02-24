import locales from './i18n/locales';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    'shadcn-nuxt',

    (_options, nuxt) => {
      nuxt.hook('devtools:customTabs', (tabs) => {
        tabs.push({
          name: 'api-docs',
          title: 'API Docs',
          icon: 'lucide:telescope',
          view: {
            type: 'iframe',
            src: '/_nitro/scalar'
          }
        });
      });
    }
  ],

  runtimeConfig: {
    quizAi: {
      apiUrl: '',
      apiKey: ''
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'color-mode'
  },

  i18n: {
    lazy: true,
    defaultLocale: 'en',
    locales
  },

  site: {
    url: 'https://quiz.skuzow.com',
    name: 'skuzow/quiz',
    indexable: false // delete this when site is finished
  },

  pinia: {
    storesDirs: ['./app/stores/**']
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  imports: {
    dirs: ['lib']
  },
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },
  nitro: {
    imports: {
      dirs: ['./server/utils']
    },
    experimental: {
      openAPI: true
    }
  },
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});
