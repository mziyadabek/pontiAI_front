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
    <div
      class="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto"
    >
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex"
        :class="msg.author === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[70%] px-4 py-3 text-sm shadow rounded-xl"
          :class="
            msg.author === 'user'
              ? 'bg-indigo-600 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
          "
        >
          <p class="whitespace-pre-line">{{ msg.text }}</p>
          <p
            class="mt-1 text-[11px] text-gray-400 dark:text-gray-500 text-right"
          >
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

    <!-- Input -->
    <div class="mt-auto">
      <ChatInput @send="emit('send', $event)" />
    </div>
  </div>
</template>
