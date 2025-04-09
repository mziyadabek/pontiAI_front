<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">🤖 Your Assistants</h1>
  <div class="flex justify-center items-center h-[60vh]">
    <div class="p-4 flex flex-col items-center w-[650px] gap-4">
      <p>
        You don't have an assistant yet. It's a great time to create your first
        Ponti Assistant!
      </p>
      <div class="w-[325px]">
        <UButton label="Create new" block @click="isOpen = true" />
      </div>
    </div>
  </div>
</template>
