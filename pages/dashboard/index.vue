<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    await authStore.fetchUserInfo();
  }
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to the main dashboard page.</p>
    <p v-if="authStore.user">{{ authStore.user.name }}</p>
  </div>
</template>
