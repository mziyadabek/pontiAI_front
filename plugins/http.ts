import userService from "~/service/userService";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;

  const api = $fetch.create({
    baseURL,
    onRequest({ options }) {
      const access_token = useCookie("access_token").value;
      // const refresh_token = useCookie("refresh_token").value;
      const headers = options.headers || {};

      if (access_token) {
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${access_token}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${access_token}`);
        } else {
          (headers as Record<string, string>).Authorization =
            `Bearer ${access_token}`;
        }
      }


      options.headers = headers;
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        const userStore = useAuthStore();
        await userStore.logout();
        await nuxtApp.runWithContext(() => navigateTo("/signin"));
      }
    },

    async onRequestError({ error }) {
      console.error("Request error", error);
    },
  });

  return {
    provide: {
      api,
      userService: userService(api),
    },
  };
});