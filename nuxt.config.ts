import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  /* ---------- 1.  PUBLIC RUNTIME CONFIG  ---------- */
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "https://ai-assistant-backend-cxb2.onrender.com",
    },
  },

  /* ---------- 2.  EXISTING SETTINGS  -------------- */
  plugins: ['~/plugins/pinia'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  vite: { plugins: [tailwindcss()] },

  css: ['~/assets/css/main.css'],

  app: { head: {} }
})
