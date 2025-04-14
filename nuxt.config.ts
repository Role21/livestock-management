// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  plugins: ['@/plugins/fontawesome'],

  nitro: {
    esbuild: {
      target: 'esnext'
    }
  },

  runtimeConfig: {
    // Server-only
    ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN,

    // Public runtime config (exposed to the client)
    public: {
      // Nothing here for now
    }
  }
})
