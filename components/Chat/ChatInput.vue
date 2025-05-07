<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "send", text: string): void;
}>();

const message = ref("");

const handleSubmit = () => {
  if (message.value.trim()) {
    emit("send", message.value);
    message.value = "";
  }
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSubmit();
  }
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  if (target) {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  }
};
</script>

<template>
  <div class="relative">
    <textarea
      v-model="message"
      class="w-full px-4 py-3 pr-12 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
      placeholder="Type your message..."
      rows="1"
      @keypress="handleKeyPress"
      @input="handleInput"
    ></textarea>
    <button
      class="absolute right-2 bottom-2 p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      :disabled="!message.trim()"
      @click="handleSubmit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
textarea {
  min-height: 44px;
  max-height: 120px;
  transition: height 0.2s ease-out;
}
</style>
