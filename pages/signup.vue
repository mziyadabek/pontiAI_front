<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "~~/store/auth";

useSeoMeta({
  title: "Sign up",
});

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const validationErrors = ref<Record<string, string[]>>({});

async function handleRegister() {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";
    validationErrors.value = {};

    await authStore.register(
      formData.value.name,
      formData.value.email,
      formData.value.password
    );

    successMessage.value = "Registration successful! Redirecting to login...";
    setTimeout(() => router.push("/signin"), 2000);
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error.data?.errors) {
      validationErrors.value = error.data.errors;
    } else if (error.data?.message) {
      errorMessage.value = error.data.message;
    } else {
      errorMessage.value = "Registration failed. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div
      class="max-w-sm w-full bg-white/75 dark:bg-white/5 p-6 rounded-lg shadow-md backdrop-blur"
    >
      <h1 class="text-2xl font-semibold mb-4">Create an account</h1>

      <form @submit.prevent="handleRegister">
        <!-- Name Field -->
        <div class="mb-4">
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Name</label
          >
          <input
            v-model="formData.name"
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            class="mt-1 p-2 w-full border rounded-md"
            :class="{ 'border-red-500': validationErrors.name }"
          />
          <p v-if="validationErrors.name" class="text-red-500 text-sm mt-1">
            {{ validationErrors.name[0] }}
          </p>
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email</label
          >
          <input
            v-model="formData.email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="mt-1 p-2 w-full border rounded-md"
            :class="{ 'border-red-500': validationErrors.email }"
          />
          <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">
            {{ validationErrors.email[0] }}
          </p>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Password</label
          >
          <input
            v-model="formData.password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            class="mt-1 p-2 w-full border rounded-md"
            :class="{ 'border-red-500': validationErrors.password }"
          />
          <p v-if="validationErrors.password" class="text-red-500 text-sm mt-1">
            {{ validationErrors.password[0] }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ isLoading ? "Creating..." : "Create account" }}
        </button>
      </form>

      <!-- Error and Success Messages -->
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-2">
        {{ successMessage }}
      </p>

      <!-- Links -->
      <div class="mt-4 text-center">
        <p>Already have an account?</p>
        <NuxtLink to="/login" class="text-blue-500 font-medium">Login</NuxtLink
        >.
      </div>

      <div class="mt-4 text-center text-sm text-gray-600">
        By signing up, you agree to our
        <NuxtLink to="/" class="text-blue-500 font-medium"
          >Terms of Service</NuxtLink
        >.
      </div>
    </div>
  </div>
</template>
