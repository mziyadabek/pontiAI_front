<template>
  <!-- No changes to template section -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "~/store/chat";
import { useNuxtApp } from "#app";

interface Assistant {
  chat_url: string;
}

const { $api } = useNuxtApp();
const loading = ref(false);

async function copyLink(id: number) {
  try {
    loading.value = true;
    const response = await $api<Assistant>(`/assistants/${id}/chat-link`, {
      method: "GET",
    });
    const chatStore = useChatStore();
    chatStore.setAssistentId(id);

    if (response?.chat_url) {
      // Update the URL to use the simplified chat
      const simplifiedUrl = response.chat_url.replace(
        "/web-chat/",
        "/web-chat/simplified/"
      );
      window.open(simplifiedUrl, "_blank");
    }
  } catch (error) {
    console.error("Failed to get chat link:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<style>
/* No changes to style section */
</style>
