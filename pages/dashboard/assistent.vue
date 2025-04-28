<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const { $api } = useNuxtApp();

const isOpen = ref(false);
const loading = ref(false);
const assistants = ref<Array<{ id: number; name: string }>>([]);

const assistantName = ref("");
const conversationTone = ref("");
const fallbackAnswer = ref("");
const companyName = ref("");
const assistantRole = ref("");
const businessFile = ref<File | null>(null);

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

function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file && file.type === "application/pdf") {
    businessFile.value = file;
  }
}

async function createAssistant() {
  loading.value = true;

  const payload = {
    name: assistantName.value,
    model: "gpt-3.5-turbo",
    language: "en",
    business_profile: {
      business_name: companyName.value,
      business_type: assistantRole.value,
      tone_preferences: { primary: conversationTone.value },
    },
  };

  try {
    const response = await $api<{ id: number }>("/assistants/", {
      method: "POST",
      body: payload,
    });

    const assistantId = response.id;

    const assistantData = await $api<{ id: number; name: string }>(
      `/assistants/${assistantId}`,
      { method: "GET" }
    );

    assistants.value.push({
      id: assistantData.id,
      name: assistantData.name,
    });

    resetForm();
    isOpen.value = false;
  } catch (error) {
    console.error("Error creating or fetching assistant:", error);
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  assistantName.value = "";
  conversationTone.value = "";
  fallbackAnswer.value = "";
  companyName.value = "";
  assistantRole.value = "";
  businessFile.value = null;
}

async function fetchAssistants() {
  try {
    assistants.value = await $api("/assistants/", {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching assistants:", error);
  }
}

function uploadKnowledge(id: number) {
  console.log(`Uploading knowledge for assistant: ${id}`);
}

async function copyLink(id: number) {
  try {
    const response = await $api<{ link: string }>(
      `/assistants/${id}/chat-link`,
      {
        method: "GET",
      }
    );

    // Open chat link in new tab
    window.open(response.link, "_blank");
  } catch (error) {
    console.error("Failed to get chat link:", error);
    alert("Could not get assistant chat link.");
  }
}

onMounted(fetchAssistants);
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">🤖 Your Assistants</h1>

  <!-- Empty State -->
  <div
    v-if="assistants.length === 0"
    class="flex flex-col items-center gap-4 h-[60vh] justify-center"
  >
    <p>
      You don’t have an assistant yet. It’s a great time to create your first
      Ponti Assistant!
    </p>
    <UButton
      label="Create New Assistant +"
      color="info"
      size="xl"
      class="rounded-full"
      @click="isOpen = true"
    />
  </div>

  <!-- Assistants List -->
  <div v-else class="space-y-4">
    <UCard
      v-for="a in assistants"
      :key="a.id"
      class="flex items-center justify-between px-6 py-4"
    >
      <span class="font-medium">{{ a.name }}</span>
      <div class="flex gap-2">
        <UButton
          label="Upload Knowledge"
          size="sm"
          @click="uploadKnowledge(a.id)"
        />
        <UButton
          label="Get Link"
          color="primary"
          size="sm"
          @click="copyLink(a.id)"
        />
      </div>
    </UCard>

    <div class="flex justify-center pt-6">
      <UButton
        label="Create Another Assistant +"
        color="info"
        variant="subtle"
        class="rounded-full"
        @click="isOpen = true"
      />
    </div>
  </div>

  <!-- Assistant Creation Modal -->
  <UModal v-model="isOpen" title="Create a New Assistant">
    <template #body>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Assistant Name</label>
          <UInput v-model="assistantName" placeholder="e.g. Alex" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1"
            >Tone of Conversation</label
          >
          <USelect
            v-model="conversationTone"
            :items="tones"
            placeholder="Select tone"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium mb-1">Fallback Answer</label>
          <UTextarea
            v-model="fallbackAnswer"
            placeholder="Fallback answer"
            autoresize
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Company Name</label>
          <UInput v-model="companyName" placeholder="Company Name" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Assistant Role</label>
          <USelect
            v-model="assistantRole"
            :items="roles"
            placeholder="Select role"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium mb-1"
            >Business Profile PDF (optional)</label
          >
          <input
            type="file"
            accept="application/pdf"
            @change="handleFileUpload"
            class="file:mr-4 file:rounded file:px-4 file:py-2 file:border-0 file:bg-primary file:text-white"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        :loading="loading"
        label="Create Assistant"
        color="primary"
        size="lg"
        class="rounded-full"
        @click="createAssistant"
      />
    </template>
  </UModal>
</template>
