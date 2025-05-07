<script setup lang="ts">
import { onUpdated, ref } from "vue";

defineProps<{
  messages: {
    id: number;
    author: "user" | "assistant";
    text: string;
    time: string;
  }[];
}>();

const emit = defineEmits<{
  (e: "send", text: string): void;
}>();

// Scroll target reference
const chatEndRef = ref<HTMLElement | null>(null);

// Auto-scroll on message update
onUpdated(() => {
  chatEndRef.value?.scrollIntoView({ behavior: "smooth" });
});
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <!-- Messages Container -->
    <div class="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex"
        :class="msg.author === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- User Message -->
        <div
          v-if="msg.author === 'user'"
          class="max-w-[70%] px-4 py-3 text-sm bg-blue-500 text-white rounded-lg rounded-br-none"
        >
          <p class="whitespace-pre-line">{{ msg.text }}</p>
          <p class="mt-1 text-[11px] text-blue-100 text-right">
            {{
              new Date(msg.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </p>
        </div>

        <!-- Assistant Message -->
        <div
          v-else
          class="max-w-[70%] px-4 py-3 text-sm bg-gray-100 text-gray-800 rounded-lg rounded-bl-none"
        >
          <p class="whitespace-pre-line">{{ msg.text }}</p>
          <p class="mt-1 text-[11px] text-gray-500 text-right">
            {{
              new Date(msg.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </p>
        </div>
      </div>

      <!-- Scroll anchor -->
      <div ref="chatEndRef" class="h-4" />
    </div>

    <!-- Input Container -->
    <div class="mt-auto border-t border-gray-200">
      <div class="p-4">
        <ChatInput @send="emit('send', $event)" />
      </div>
    </div>
  </div>
</template>
