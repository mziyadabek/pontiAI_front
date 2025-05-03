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
function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];

  if (file && (file.type === "application/pdf" || file.type === "text/plain")) {
    businessFile.value = file;
  } else {
    alert("Only PDF or TXT files are allowed.");
    businessFile.value = null;
  }
}

// Create a new assistant
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
    assistants.value = await $api("/assistants/", {
      method: "GET",
    });
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

// Upload knowledge base file for the assistant
async function uploadKnowledge(assistantId: number) {
  if (!businessFile.value) {
    alert("Please upload a knowledge base document first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", businessFile.value);

  try {
    loading.value = true;
    // Make the POST request to upload the knowledge base file
    const response = await $api<KnowledgeUploadResponse>(
      `/assistants/${assistantId}/upload-knowledge`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Check if the response status is 200 (success)
    if (response.status === 200) {
      alert("Knowledge base uploaded successfully.");
    } else {
      alert("Failed to upload knowledge base.");
    }
  } catch (error) {
    console.error("Error uploading knowledge base:", error);
    alert("Failed to upload knowledge base.");
  } finally {
    loading.value = false;
  }
}

// Delete an assistant
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

// Fetch assistants when the component is mounted
onMounted(fetchAssistants);
</script>

<template>
  <div class="flex flex-row justify-between pb-5">
    <h1 class="text-2xl font-bold mb-4">Your Assistants</h1>
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
        <!-- Form for creating assistant -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
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
            <label class="block text-sm font-medium mb-1"
              >Fallback Answer</label
            >
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
            <span v-if="businessFile" class="text-sm text-gray-500 mt-2">{{
              businessFile.name
            }}</span>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-4 p-4">
          <UButton
            :loading="loading"
            label="Create Assistant"
            color="primary"
            size="lg"
            class="rounded-full"
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
      You don’t have an assistant yet. It’s a great time to create your first
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
            <label class="block text-sm font-medium mb-1"
              >Upload file with buisnes information</label
            >
            <UInput type="file" class="w-full" />
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
            @click="createAssistant"
          />
        </div>
      </template>
    </UModal>
  </div>

  <!-- Assistants Table -->
  <div v-else>
    <table
      class="min-w-full table-auto rounded-lg border-collapse border border-gray-300 shadow-md"
    >
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-left bg-gray-100 text-sm font-semibold text-gray-600 border-b"
          >
            ID
          </th>
          <th
            class="px-6 py-3 text-left bg-gray-100 text-sm font-semibold text-gray-600 border-b"
          >
            Name
          </th>

          <th
            class="px-6 py-3 text-left bg-gray-100 text-sm font-semibold text-gray-600 border-b"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="a in assistants"
          :key="a.id"
          class="hover:bg-gray-50 transition duration-300"
        >
          <td class="px-6 py-4 text-sm text-gray-700 border-b">{{ a.id }}</td>
          <td class="px-6 py-4 text-sm text-gray-700 border-b">{{ a.name }}</td>
          <td class="px-6 py-4 border-b">
            <div class="flex gap-2">
              <UButton
                label="Go to The Assistant"
                size="sm"
                class="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                @click="copyLink(a.id)"
              />

              <UButton
                label="Delete"
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
