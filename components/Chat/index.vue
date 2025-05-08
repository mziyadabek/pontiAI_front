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
    <!-- Fixed Header -->
    <div
      class="flex-none bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4"
    >
      <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
        Company Name
      </h1>
    </div>

    <!-- Scrollable Messages Area -->
    <div class="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex"
        :class="msg.author === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[70%] px-4 py-3 text-sm rounded-lg"
          :class="
            msg.author === 'user'
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
          "
        >
          <p class="whitespace-pre-line">{{ msg.text }}</p>
          <p
            class="mt-1 text-[11px] text-right"
            :class="
              msg.author === 'user'
                ? 'text-blue-100'
                : 'text-gray-500 dark:text-gray-400'
            "
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

    <!-- Fixed Input -->
    <div
      class="flex-none bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4"
    >
      <ChatInput @send="emit('send', $event)" />
    </div>
  </div>
</template>
