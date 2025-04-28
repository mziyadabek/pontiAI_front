// store/auth.ts
import { defineStore } from "pinia";
import type { SignInDTO, SignUpDTO, signInResponse } from "~/types/auth";
import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", () => {
  const { $userService } = useNuxtApp();

  const token = ref<string | null>(useCookie("access_token").value ?? null);
  const isAuthenticated = ref(!!token.value);
  const user = ref<User | null>(null);
  const errorMessage = ref<string | null>(null);

  const register = async (name: string, email: string, password: string) => {
    return await $userService.signUp({ name, email, password });
  };

  const login = async (email: string, password: string) => {
    const data = await $userService.signIn({ email, password });

    if (!data?.access_token) throw new Error("Invalid response");

    useCookie("access_token").value = data.access_token;
    user.value = data.user;
    isAuthenticated.value = true;
    token.value = data.access_token;

    return data;
  };

  const logout = async () => {
    try {
      await $userService.signOut();
    } catch (e) {
      console.error("Sign out failed", e);
    } finally {
      token.value = null;
      isAuthenticated.value = false;
      user.value = null;
      useCookie("access_token").value = null;
    }
  };

  const fetchUserInfo = async () => {
    const data = await $userService.getMe();
    user.value = data;
    return data;
  };

  return {
    token,
    isAuthenticated,
    user,
    errorMessage,
    login,
    register,
    logout,
    fetchUserInfo,
  };
});
