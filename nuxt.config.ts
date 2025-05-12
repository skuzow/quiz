import locales from './i18n/locales';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-security',
    '@nuxtjs/fontaine',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    'shadcn-nuxt'
  ],

  runtimeConfig: {
    quizAi: {
      apiUrl: '',
      apiKey: ''
    }
  },

  security: {
    headers: {
      contentSecurityPolicy: false,
      xXSSProtection: false
    },
    xssValidator: false
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'color-mode'
  },

  i18n: {
    lazy: true,
    defaultLocale: 'en',
    locales,
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  site: {
    url: 'https://quiz.skuzow.com',
    name: 'Quiz'
  },

  robots: {
    disallow: ['/forgot-password', '/reset-password']
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
    }
  },
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});
