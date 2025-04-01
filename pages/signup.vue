<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "~~/store/auth";

useSeoMeta({
  title: "Sign up",
});

const router = useRouter();
const authStore = useAuthStore();

// Use ref() to make formData reactive
const formData = ref({
  name: "",
  email: "",
  password: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function handleRegister() {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    console.log("Form Data for Register:", formData.value); // Accessing .value here

    // Access formData using .value for each field
    await authStore.register(
      formData.value.name,
      formData.value.email,
      formData.value.password
    );

    successMessage.value = "Registration successful! Redirecting to login...";
    router.push("/login");
  } catch (error) {
    console.error(error);
    errorMessage.value = "Registration failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
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
        />
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
        />
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
        />
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
      <NuxtLink to="/login" class="text-blue-500 font-medium">Login</NuxtLink>.
    </div>

    <div class="mt-4 text-center text-sm text-gray-600">
      By signing up, you agree to our
      <NuxtLink to="/" class="text-blue-500 font-medium"
        >Terms of Service</NuxtLink
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
