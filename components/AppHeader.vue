<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { useRouter } from "nuxt/app";

const authStore = useAuthStore();
const router = useRouter();

const userName = ref("");
const userEmail = ref("");
const userInitials = ref("");
const dropdownVisible = ref(false);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

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

const goToLogin = () => {
  router.push("/signin");
};
</script>

<template>
  <div
    class="backdrop-blur-sm rounded-full border mt-3 w-full py-3 px-4 flex justify-between items-center"
  >
    <!-- Logo and mobile header items -->
    <a class="flex items-center gap-x-1 px-2 md:px-4" href="/">PontiAI</a>

    <!-- Navbar links for larger screens -->
    <div class="hidden lg:flex flex-grow justify-center gap-x-4">
      <a
        class="text-sm font-medium hover:underline underline-offset-4"
        href="/dashboard"
        >Дэшборд</a
      >
      <a
        href="https://t.me/mziyadabek"
        target="_blank"
        class="text-sm font-medium hover:underline underline-offset-4"
      >
        Консультация
      </a>
      <a
        class="text-sm font-medium hover:underline underline-offset-4"
        href="/pricing"
        >Стоимость</a
      >
    </div>

    <!-- User profile and login for mobile and desktop -->
    <div class="ml-auto flex items-center gap-x-2">
      <div v-if="authStore.user" class="relative">
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
              <a
                href="/dashboard"
                class="flex gap-1 px-4 py-2 text-black hover:bg-gray-200"
              >
                <UIcon name="i-lucide-grid-2x2" class="size-5" />Дэшборд
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                class="flex gap-1 px-4 py-2 text-black hover:bg-gray-200"
              >
                <UIcon name="i-lucide-banknote" class="size-5" />Cтоимость
              </a>
            </li>
            <li>
              <a
                href="https://t.me/mziyadabek"
                target="_blank"
                class="flex gap-1 px-4 py-2 text-black hover:bg-gray-200"
              >
                <UIcon
                  name="i-lucide-message-circle-question"
                  class="size-5"
                />Консультация
              </a>
            </li>
            <li>
              <button
                @click="logout"
                class="flex gap-1 w-full px-4 py-2 text-black text-left hover:bg-gray-200"
              >
                <UIcon name="i-lucide-log-out" class="size-5" />Выйти
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Login Button (Visible when user is not logged in) -->
      <div v-else>
        <NuxtLink
          to="/signin"
          class="flex items-center gap-0.5 px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm font-semibold transition-colors btn-primary"
        >
          Войти
          <UIcon name="lucide-arrow-right" size="13" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
