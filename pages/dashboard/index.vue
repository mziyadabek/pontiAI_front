<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p class="text-lg">Welcome to your dashboard!</p>
    <p class="text-lg">User: {{ authStore.user?.name }}</p>
  </div>
</template>
