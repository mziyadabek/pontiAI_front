import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'; // Correct the typo here
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Check if the user is authenticated (i.e., token exists)
  if (!authStore.token) {
    // If not authenticated, redirect to the login page
    return navigateTo('/signin'); // Corrected the function name
  }
});
