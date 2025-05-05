<script setup lang="ts">
const emit = defineEmits<{
  (e: "send", text: string): void;
}>();

const input = ref("");

const handleSubmit = () => {
  if (input.value.trim()) {
    emit("send", input.value.trim());
    input.value = "";
  }
};
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10"
  >
    <form
      class="mx-auto flex w-full max-w-[800px] items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-2 shadow-sm"
      @submit.prevent="handleSubmit"
    >
      <!-- Attachment Button -->
      <UButton color="neutral" variant="ghost" size="sm" class="flex-shrink-0">
        <UIcon
          name="lucide:paperclip"
          class="text-gray-500 dark:text-gray-400"
        />
      </UButton>

      <!-- Chat Input -->
      <UInput
        v-model="input"
        variant="soft"
        placeholder="Ask anything ..."
        class="flex-1 border-none bg-transparent px-2 focus:ring-0"
        input-class="bg-transparent dark:bg-transparent dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
      />

      <!-- Mic Button -->
      <UButton color="neutral" variant="ghost" size="sm" class="flex-shrink-0">
        <UIcon name="lucide:mic" class="text-gray-500 dark:text-gray-400" />
      </UButton>

      <!-- Send Button -->
      <UButton
        type="submit"
        color="neutral"
        size="sm"
        class="flex h-9 w-9 items-center justify-center rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon
          name="lucide:arrow-up"
          class="h-4 w-4 text-gray-600 dark:text-gray-300"
        />
      </UButton>
    </form>
  </div>
</template>
