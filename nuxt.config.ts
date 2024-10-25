// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'shadcn-nuxt'
  ],

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

  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});
