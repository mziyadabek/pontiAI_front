<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="flex flex-col gap-4 h-screen">
    <AppHeader />

    <div
      class="flex flex-row h-full gap-4 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
    >
      <div class="flex flex-row gap-4 w-full">
        <Sidebar />
        <main
          class="flex-1 border border-gray-200 dark:border-gray-700 rounded-4xl px-4 py-6 bg-white dark:bg-gray-800"
        >
          <NuxtPage />
        </main>
      </div>
    </div>
  </div>
</template>
