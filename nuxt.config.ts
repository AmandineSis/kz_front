export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:1337/api',
      strapiUrl: process.env.NUXT_STRAPI_URL || 'http://localhost:1337',
    },
  },
  typescript: {
    shim: false,
  },

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  components: {
    dirs: ['~/components'],
  },
});
