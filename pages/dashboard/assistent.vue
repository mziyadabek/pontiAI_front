<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { useChatStore } from "~/store/chat";

// Define the expected structure of the API response for knowledge upload
interface KnowledgeUploadResponse {
  message: string; // Assuming the API sends a message field in the response
  status: number; // Assuming the API sends a status code (200, etc.)
}

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

// Handle file upload event

// Create a new assistant
async function createAssistant() {
  loading.value = true;

  try {
    // First, create the assistant
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

    const response = await $api<{ id: number }>("/assistants/", {
      method: "POST",
      body: payload,
    });

    const assistantId = response.id;

    // If there's a file, upload it
    if (businessFile.value) {
      const formData = new FormData();
      formData.append("file", businessFile.value);

      await $api(`/assistants/${assistantId}/upload-knowledge`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
    }

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
    alert("Failed to create assistant. Please try again.");
  } finally {
    loading.value = false;
  }
}

// Reset the form after assistant creation
function resetForm() {
  assistantName.value = "";
  conversationTone.value = "";
  fallbackAnswer.value = "";
  companyName.value = "";
  assistantRole.value = "";
  businessFile.value = null;
}

// Fetch existing assistants
async function fetchAssistants() {
  try {
    const response = await $api("/assistants/", {
      method: "GET",
    });
    // Ensure the data is in the correct format
    assistants.value = Array.isArray(response)
      ? response.map((assistant) => ({
          id: assistant.id,
          name: assistant.name,
        }))
      : [];
  } catch (error) {
    console.error("Error fetching assistants:", error);
  }
}

interface Assistant {
  bussiness_name: string;
  unique_id: string;
  chat_url: string;
}

// Copy the assistant's chat link
async function copyLink(id: number) {
  try {
    loading.value = true;
    const response = await $api<Assistant>(`/assistants/${id}/chat-link`, {
      method: "GET",
    });
    const chatStore = useChatStore();
    chatStore.setAssistentId(id);

    if (response?.chat_url) {
      window.open(response.chat_url, "_blank");
    } else {
      alert("No chat link available for this assistant.");
    }
  } catch (error) {
    console.error("Failed to get chat link:", error);
    alert("Could not get assistant chat link. Please try again.");
  } finally {
    loading.value = false;
  }
}

const knowledgeFile = ref<File | null>(null);

async function uploadKnowledge(assistantId: number) {
  if (!knowledgeFile.value) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", knowledgeFile.value);

  try {
    loading.value = true;

    const response = await $api<KnowledgeUploadResponse>(
      `/assistants/${assistantId}/upload-knowledge`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.status === 200) {
      alert("Knowledge base uploaded successfully.");
      knowledgeFile.value = null;
    } else {
      alert(`Upload failed: ${response.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed.");
  } finally {
    loading.value = false;
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    businessFile.value = target.files[0];
  }
}

async function deleteAssistant(assistantId: number) {
  const confirmation = confirm(
    "Are you sure you want to delete this assistant?"
  );
  if (!confirmation) return;

  try {
    loading.value = true;
    await $api(`/assistants/${assistantId}`, {
      method: "DELETE",
    });

    assistants.value = assistants.value.filter((a) => a.id !== assistantId);
    alert("Assistant deleted successfully.");
  } catch (error) {
    console.error("Error deleting assistant:", error);
    alert("Failed to delete assistant.");
  } finally {
    loading.value = false;
  }
}

onMounted(fetchAssistants);
</script>

<template>
  <div class="flex flex-row justify-between pb-5 m-8">
    <h1 class="text-xl font-semibold">Your Assistants</h1>
    <UModal
      v-model="isOpen"
      title="Create a New Assistant"
      class="modal-container"
    >
      <UButton
        label="Create New"
        icon="i-heroicons-plus"
        size="lg"
        class="bg-blue-500 text-white hover:bg-blue-600"
        @click="isOpen = true"
      />
      <template #body>
        <div class="w-full flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Assistant Name</label>
            <UInput
              v-model="assistantName"
              placeholder="e.g. Alex"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1"
              >Tone of Conversation</label
            >
            <USelect
              v-model="conversationTone"
              :items="tones"
              placeholder="Select tone"
              class="w-full"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium mb-1"
              >Fallback Answer</label
            >
            <UTextarea
              v-model="fallbackAnswer"
              placeholder="Fallback answer"
              autoresize
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Company Name</label>
            <UInput
              v-model="companyName"
              placeholder="Company Name"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Assistant Role</label>
            <USelect
              v-model="assistantRole"
              :items="roles"
              placeholder="Select role"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-200"
              >Upload Knowledge Base</label
            >
            <UInput
              type="file"
              @change="handleFileChange"
              class="w-full"
              accept=".pdf,.doc,.docx,.txt"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Supported formats: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-4">
          <UButton
            label="Cancel"
            color="secondary"
            variant="ghost"
            size="lg"
            @click="isOpen = false"
          />

          <UButton
            :loading="loading"
            label="Create Assistant"
            color="primary"
            size="lg"
            class="bg-blue-500 hover:bg-blue-600 transition duration-300"
            :disabled="
              !assistantName ||
              !conversationTone ||
              !companyName ||
              !assistantRole
            "
            @click="createAssistant"
          />
        </div>
      </template>
    </UModal>
  </div>

  <!-- Empty State -->
  <div
    v-if="assistants.length === 0"
    class="flex flex-col items-center gap-4 h-[60vh] justify-center"
  >
    <p>
      You don't have an assistant yet. It's a great time to create your first
      Ponti Assistant!
    </p>

    <UModal
      v-model="isOpen"
      title="Create a New Assistant"
      class="modal-container"
    >
      <UButton
        label="Create New Assistant +"
        size="xl"
        class="bg-blue-500 text-white hover:bg-blue-600"
        @click="isOpen = true"
      />
      <template #body>
        <div class="w-full flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Assistant Name</label>
            <UInput
              v-model="assistantName"
              placeholder="e.g. Alex"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1"
              >Tone of Conversation</label
            >
            <USelect
              v-model="conversationTone"
              :items="tones"
              placeholder="Select tone"
              class="w-full"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium mb-1"
              >Fallback Answer</label
            >
            <UTextarea
              v-model="fallbackAnswer"
              placeholder="Fallback answer"
              autoresize
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Company Name</label>
            <UInput
              v-model="companyName"
              placeholder="Company Name"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Assistant Role</label>
            <USelect
              v-model="assistantRole"
              :items="roles"
              placeholder="Select role"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-200"
              >Upload Knowledge Base</label
            >
            <UInput
              type="file"
              @change="handleFileChange"
              class="w-full"
              accept=".pdf,.doc,.docx,.txt"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Supported formats: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-4">
          <UButton
            label="Cancel"
            color="secondary"
            variant="ghost"
            size="lg"
            @click="isOpen = false"
          />

          <UButton
            :loading="loading"
            label="Create Assistant"
            color="primary"
            size="lg"
            class="bg-blue-500 hover:bg-blue-600 transition duration-300"
            :disabled="
              !assistantName ||
              !conversationTone ||
              !companyName ||
              !assistantRole ||
              !businessFile
            "
            @click="createAssistant"
          />
        </div>
      </template>
    </UModal>
  </div>

  <!-- Assistants Table -->
  <div v-else class="m-5">
    <table
      class="min-w-full table-auto rounded-2xl border-collapse border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden bg-white dark:bg-gray-800"
    >
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-left bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
          >
            ID
          </th>
          <th
            class="px-6 py-3 text-left bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="a in assistants"
          :key="a.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
        >
          <td
            class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
          >
            {{ a.id }}
          </td>
          <td
            class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
          >
            {{ a.name }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div class="flex flex-row gap-2 justify-end">
              <UButton
                label="Go to The Assistant"
                icon="i-heroicons-arrow-right"
                size="sm"
                class="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                @click="copyLink(a.id)"
              />

              <UButton
                icon="i-heroicons-trash"
                size="sm"
                class="bg-red-500 text-white hover:bg-red-600 transition duration-300"
                @click="deleteAssistant(a.id)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Modal styling */
.modal-container {
  max-width: 600px;
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: auto;
}

/* Input styling */
.input-field {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}
</style>
