// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});
