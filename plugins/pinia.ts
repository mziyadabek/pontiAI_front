import { defineNuxtPlugin } from '#app'
import pinia from '~/store'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(pinia)
})
