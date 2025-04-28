<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { useRouter } from "nuxt/app";

const authStore = useAuthStore();
const router = useRouter();

// State for user details
const userName = ref("");
const userEmail = ref("");
const userInitials = ref("");
const dropdownVisible = ref(false);

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Logout logic
onMounted(async () => {
  await authStore.fetchUserInfo();

  if (authStore.user) {
    const { name, email } = authStore.user;
    userName.value = name;
    userEmail.value = email;
    userInitials.value = name
      .split(" ")
      .map((n) => n[0]?.toUpperCase() || "")
      .join("");
  }
});

const logout = async () => {
  await authStore.logout();
  router.push("/signin");
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex w-full items-center justify-between border-b px-8 py-6">
      <div class="flex items-center justify-center gap-x-4">
        <a
          href="/"
          class="hover:underline underline-offset-4 max-md:hidden text-primary cursor-pointer rounded-xl font-medium transition text-[0.9rem]"
        >
          Ponti
        </a>
        <a
          target="_blank"
          class="hover:underline underline-offset-4 max-md:hidden text-primary cursor-pointer rounded-xl font-medium transition text-[0.9rem]"
          href="https://www.youtube.com/@pleep_app"
        >
          Туториалы
        </a>
        <a
          class="hover:underline underline-offset-4 max-md:hidden text-primary cursor-pointer rounded-xl font-medium transition text-[0.9rem]"
          href="/pricing"
        >
          Стоимость
        </a>
      </div>

      <!-- Profile Icon with Initials and Dropdown Button -->
      <div class="relative">
        <div
          class="w-12 h-12 rounded-full cursor-pointer bg-green-500 text-white flex items-center justify-center font-bold"
          @click.stop="toggleDropdown"
        >
          {{ userInitials }}
        </div>

        <!-- Dropdown Menu -->
        <div
          v-if="dropdownVisible"
          class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
        >
          <div class="flex items-center p-4 border-b">
            <div
              class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold"
            >
              {{ userInitials }}
            </div>
            <div class="ml-3">
              <p class="text-sm font-semibold">{{ userName }}</p>
              <p class="text-xs text-gray-500">{{ userEmail }}</p>
            </div>
          </div>
          <ul>
            <li>
              <a class="flex gap-1 px-4 py-2 text-black hover:bg-gray-200">
                <UIcon name="i-lucide-user" class="size-5" /> Личный кабинет</a
              >
            </li>
            <li>
              <a
                href="/dashboard"
                class="flex gap-1 px-4 py-2 text-black hover:bg-gray-200"
                ><UIcon name="i-lucide-grid-2x2" class="size-5" />Дэшборд</a
              >
            </li>
            <li>
              <button
                @click="logout"
                class="flex gap-1 w-full px-4 py-2 text-black text-left hover:bg-gray-200"
              >
                <UIcon name="i-lucide-log-out" class="size-5" />
                Выйти
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex flex-row h-full">
      <Sidebar />
      <main class="flex-1 border px-4 py-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
