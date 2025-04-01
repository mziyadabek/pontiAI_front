<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~~/store/auth";
import { useRouter } from "nuxt/app";

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});

const isLoading = ref(false);
const errorMessage = ref("");

async function handleLogin() {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    console.log("Form Data for Login:", formData.value);

    await authStore.login(formData.value.email, formData.value.password);

    // On successful login, redirect to the dashboard
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    errorMessage.value = "Неверные учетные данные. Попробуйте еще раз.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    class="max-w-sm w-full bg-white/75 dark:bg-white/5 p-6 rounded-lg shadow-md backdrop-blur"
  >
    <h1 class="text-2xl font-semibold mb-4">С возвращением</h1>

    <form @submit.prevent="handleLogin">
      <!-- Email Field -->
      <div class="mb-4">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Электронная почта</label
        >
        <input
          v-model="formData.email"
          type="email"
          id="email"
          placeholder="Введите вашу электронную почту"
          required
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <!-- Password Field -->
      <div class="mb-4">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Пароль</label
        >
        <input
          v-model="formData.password"
          type="password"
          id="password"
          placeholder="Введите ваш пароль"
          required
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 disabled:bg-gray-400"
      >
        {{ isLoading ? "Вход..." : "Войти" }}
      </button>
    </form>

    <!-- Error or Loading State -->
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    <p v-if="isLoading" class="text-gray-500 mt-2">Вход...</p>

    <!-- Links -->
    <div class="mt-4 text-center">
      <p>Нет аккаунта?</p>
      <NuxtLink to="/signup" class="text-blue-500 font-medium"
        >Зарегистрируйтесь</NuxtLink
      >.
    </div>

    <div class="mt-4 text-center text-sm text-gray-600">
      <NuxtLink to="/" class="text-blue-500 font-medium"
        >Забыли пароль?</NuxtLink
      >.
    </div>

    <div class="mt-4 text-center text-sm text-gray-600">
      Входя в систему, вы соглашаетесь с нашими
      <NuxtLink to="/" class="text-blue-500 font-medium"
        >Условиями обслуживания</NuxtLink
      >.
    </div>
  </div>
</template>

<style scoped>
/* Optional styling */
body {
  background-color: #f0f0f0;
}
</style>
