<script setup lang="ts">
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

const handleSend = (text: string) => {
  if (!text.trim()) return;

  messages.value.push({
    id: messages.value.length + 1,
    author: "user",
    text,
    time: new Date().toISOString(),
  });

  // Optional: Simulate assistant reply
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      author: "assistant",
      text: "Got it! Let me check that for you.",
      time: new Date().toISOString(),
    });
  }, 1000);
};
</script>

<template>
  <div class="mt-20 flex h-[calc(100vh-80px)] w-full flex-col">
    <Chat :messages="messages" @send="handleSend" />
  </div>
</template>
