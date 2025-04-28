import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const access_token = useCookie("access_token");

  if (import.meta.server) {
    if (!access_token.value) {
      return navigateTo("/signin");
    }

    return;
  }

  const nuxtApp = useNuxtApp();
  const userStore = useAuthStore();
  const isAuthenticated = userStore.isAuthenticated || access_token.value;

  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  ) {
    if (!isAuthenticated) {
      return navigateTo("/sign-in");
    }
  }

  if (!isAuthenticated) {
    if (from.path === to.path) {
      return navigateTo("/");
    } else {
      return navigateTo(from.path);
    }
  }
});