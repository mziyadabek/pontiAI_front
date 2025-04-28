<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useNuxtApp } from "#app";

const route = useRoute();
const { $api } = useNuxtApp();

const assistantId = Number(route.params.id);
const assistantName = ref("Loading...");
const loading = ref(false);

type Message = {
  id: number;
  author: "user" | "assistant";
  text: string;
  time: string;
};

const messages = ref<Message[]>([
  {
    id: 1,
    author: "assistant",
    text: "Hello! How can I help you today?",
    time: new Date().toISOString(),
  },
]);

const scrollAnchor = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick(); // wait until DOM updates
  scrollAnchor.value?.scrollIntoView({ behavior: "smooth" });
};

// Fetch assistant name
onMounted(async () => {
  try {
    const assistant = await $api<{ name: string }>(
      `/assistants/${assistantId}`,
      {
        method: "GET",
      }
    );
    assistantName.value = assistant.name;
  } catch {
    assistantName.value = "Unknown Assistant";
  }

  scrollToBottom(); // scroll when loaded
});

const handleSend = async (text: string) => {
  if (!text.trim()) return;

  const userMsg: Message = {
    id: messages.value.length + 1,
    author: "user",
    text,
    time: new Date().toISOString(),
  };

  messages.value.push(userMsg);
  loading.value = true;
  scrollToBottom();

  try {
    const assistantReply = await $api<{ response: string }>(
      `/assistants/${assistantId}/chat`,
      {
        method: "POST",
        body: {
          text: userMsg.text,
          tone: "normal",
          business_type: "selling",
        },
      }
    );

    messages.value.push({
      id: messages.value.length + 1,
      author: "assistant",
      text: assistantReply.response,
      time: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    messages.value.push({
      id: messages.value.length + 1,
      author: "assistant",
      text: "Oops! Something went wrong while getting my response.",
      time: new Date().toISOString(),
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};
</script>

<template>
  <div class="mt-20 px-4 h-[calc(100vh-80px)] w-full flex flex-col">
    <h2 class="text-xl font-semibold mb-4 text-center">
      Chatting with: {{ assistantName }}
    </h2>

    <div class="flex-1 overflow-y-auto pb-4">
      <Chat :messages="messages" @send="handleSend" />
      <!-- Scroll anchor -->
      <div ref="scrollAnchor" />
    </div>

    <div v-if="loading" class="text-center text-sm text-gray-500 mt-2">
      Assistant is typing...
    </div>
  </div>
</template>
