<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

import { ref } from "vue";

const isOpen = ref(false);

// Form fields
const assistantName = ref("");
const conversationTone = ref("");
const fallbackAnswer = ref("");
const companyName = ref("");
const assistantRole = ref("");
const businessFile = (ref < File) | (null > null);

// Select options
const tones = [
  { label: "Friendly", value: "friendly" },
  { label: "Professional", value: "professional" },
  { label: "Casual", value: "casual" },
];

const roles = [
  { label: "Sales", value: "sales" },
  { label: "Consultation", value: "consultation" },
  { label: "Tech Support", value: "tech_support" },
];

// File input handler
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    businessFile.value = file;
  }
}
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">🤖 Your Assistants</h1>
  <div class="flex justify-center items-center h-[60vh]">
    <div class="p-4 flex flex-col items-center w-[650px] gap-4">
      <p>
        You don't have an assistant yet. It's a great time to create your first
        Ponti Assistant!
      </p>

      <!-- Trigger Button -->

      <!-- Modal -->
      <UModal v-model="isOpen" title="Create a New Assistant">
        <UButton
          label="Create New Assistant +"
          color="info"
          size="xl"
          class="rounded-full"
          variant="subtle"
          @click="isOpen = true"
        />
        <template #body>
          <div class="space-y-6">
            <!-- Form layout -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Assistant Name -->
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1"
                  >Assistant Name</label
                >
                <UInput v-model="assistantName" placeholder="e.g. Alex" />
              </div>

              <!-- Tone -->
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1"
                  >Tone of Conversation</label
                >
                <USelect
                  v-model="conversationTone"
                  :items="tones"
                  placeholder="Select tone"
                />
              </div>

              <!-- File Upload -->

              <!-- Fallback Answer -->
              <div class="w-full">
                <label class="block text-sm font-medium mb-1"
                  >Fallback Answer</label
                >
                <UTextarea
                  v-model="fallbackAnswer"
                  placeholder="e.g. I'm not sure about that, please contact our team."
                  autoresize
                />
              </div>

              <!-- Company Name -->
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1"
                  >Company Name</label
                >
                <UInput v-model="companyName" placeholder="e.g. Ponti Inc." />
              </div>

              <!-- Assistant Role -->
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1"
                  >Assistant Role</label
                >
                <USelect
                  v-model="assistantRole"
                  :items="roles"
                  placeholder="Select a role"
                />
              </div>
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1"
                  >Upload Business Info (PDF)</label
                >
                <input
                  type="file"
                  accept=".pdf"
                  @change="handleFileUpload"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- Footer -->
        <template #footer>
          <div class="w-full flex justify-end">
            <UButton
              label="Create Assistant"
              color="primary"
              size="lg"
              class="rounded-full"
              @click="console.log('Creating assistant...')"
            />
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
