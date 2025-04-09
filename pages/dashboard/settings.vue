<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const darkMode = ref(false);
const emailNotifications = ref("all");

const saveSettings = () => {
  alert("Settings saved!");
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">⚙️ Settings</h1>
    <div class="bg-white p-4 rounded shadow">
      <form class="space-y-4">
        <!-- Dark Mode Toggle -->
        <div>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="darkMode" class="form-checkbox" />
            <span>Enable Dark Mode</span>
          </label>
        </div>

        <!-- Notification Preferences -->
        <div>
          <label class="block">Email Notifications</label>
          <select
            v-model="emailNotifications"
            class="border p-2 rounded w-full"
          >
            <option value="all">All</option>
            <option value="important">Only Important</option>
            <option value="none">None</option>
          </select>
        </div>

        <!-- Save Button -->
        <button
          type="button"
          class="bg-blue-500 text-white px-4 py-2 rounded"
          @click="saveSettings"
        >
          Save Settings
        </button>
      </form>
    </div>
  </div>
</template>
