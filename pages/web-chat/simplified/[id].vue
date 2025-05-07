<template>
  <div class="h-full w-full flex flex-col">
    <h2
      class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100"
    >
      Chatting with: {{ businessName }}
    </h2>

    <div class="flex-1 flex flex-col min-h-0">
      <Chat :messages="messages" @send="handleSend" />
      <div ref="scrollAnchor" />
    </div>
    <div
      v-if="loading"
      class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2"
    >
      Assistant is typing...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "#app";
import Chat from "~/components/Chat/index.vue";

const route = useRoute();
const businessUniqueId = route.params.id;
const loading = ref(false);
const businessName = ref("Loading...");
const welcomeMessage = ref("");

type Message = {
  id: number;
  author: "user" | "assistant";
  text: string;
  time: string;
};

const messages = ref<Message[]>([]);
const scrollAnchor = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  scrollAnchor.value?.scrollIntoView({ behavior: "smooth" });
};

// Initialize chat
const initChat = async () => {
  try {
    const response = await fetch(
      `https://ai-assistant-backend-cxb2.onrender.com/web-chat/simplified/${businessUniqueId}`
    );
    const data = await response.json();

    // Store client_id and business_unique_id
    localStorage.setItem("client_id", data.client_id);
    localStorage.setItem("business_unique_id", businessUniqueId.toString());

    // Set business info
    businessName.value = data.business_name;
    welcomeMessage.value = data.welcome_message;

    // Add welcome message
    messages.value.push({
      id: 1,
      author: "assistant",
      text: data.welcome_message,
      time: new Date().toISOString(),
    });

    // Load chat history
    await loadChatHistory();
  } catch (error) {
    console.error("Error initializing chat:", error);
    messages.value.push({
      id: 1,
      author: "assistant",
      text: "Sorry, there was an error loading the chat. Please try again later.",
      time: new Date().toISOString(),
    });
  }
};

// Load chat history
const loadChatHistory = async () => {
  const clientId = localStorage.getItem("client_id");
  if (!clientId) return;

  try {
    const response = await fetch(
      `https://ai-assistant-backend-cxb2.onrender.com/web-chat/simplified-history/${businessUniqueId}?client_id=${clientId}`
    );
    const data = await response.json();

    // Add messages to chat
    data.messages.forEach((msg: any, index: number) => {
      messages.value.push({
        id: index + 2, // Start from 2 since we already have welcome message
        author: msg.role,
        text: msg.content,
        time: msg.timestamp,
      });
    });
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
};

// Send message
const handleSend = async (text: string) => {
  if (!text.trim()) return;

  const clientId = localStorage.getItem("client_id");
  if (!clientId) {
    console.error("No client ID found");
    return;
  }

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
    const response = await fetch(
      `https://ai-assistant-backend-cxb2.onrender.com/web-chat/simplified-chat/${businessUniqueId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          client_id: clientId,
          tone: "normal",
          business_type: "selling",
          language: "en",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    messages.value.push({
      id: messages.value.length + 1,
      author: "assistant",
      text: data.content,
      time: data.timestamp,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    messages.value.push({
      id: messages.value.length + 1,
      author: "assistant",
      text: "Sorry, there was an error sending your message. Please try again.",
      time: new Date().toISOString(),
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};

onMounted(initChat);
</script>
