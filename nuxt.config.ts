// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
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

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'color-mode'
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en-US.json'
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es-ES.json'
      }
    ],
    lazy: true,
    restructureDir: 'app',
    langDir: 'lang',
    defaultLocale: 'en'
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

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});
