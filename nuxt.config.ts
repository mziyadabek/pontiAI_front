import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  plugins: ['~/plugins/pinia', ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: [
    '~/assets/css/main.css',  // Your custom CSS
   
  ],
  app: {
    head: {
      // script: [
      //   { src: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js' }
      // ],
    },
  },
});
