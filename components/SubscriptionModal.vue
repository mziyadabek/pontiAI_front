<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
      <h2 class="text-xl font-semibold mb-4">Оформление подписки</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Номер карты</label
          >
          <input
            v-model="card.number"
            type="text"
            placeholder="0000 0000 0000 0000"
            class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Срок</label>
            <input
              v-model="card.expiry"
              type="text"
              placeholder="MM/YY"
              class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">CVC</label>
            <input
              v-model="card.cvc"
              type="text"
              placeholder="CVC"
              class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? "Обработка..." : "Купить" }}
        </button>
      </form>

      <!-- Close Button -->
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        @click="$emit('update:isOpen', false)"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";

const props = defineProps<{
  planId: number;
  isOpen: boolean;
}>();

const emit = defineEmits(["update:isOpen", "subscribed"]);

const loading = ref(false);
const card = ref({ number: "", expiry: "", cvc: "" });

const submit = async () => {
  const authStore = useAuthStore();
  await authStore.fetchUserInfo(); // Ensure user is populated

  const userId = authStore.user?.id;
  const token = authStore.token;

  if (!userId || !token) {
    alert("Пользователь не авторизован.");
    return navigateTo("/signin");
  }

  loading.value = true;
  try {
    console.log("Sending:", { user_id: userId, plan_id: props.planId });

    await $fetch(
      "https://ai-assistant-backend-cxb2.onrender.com/payments/subscriptions",
      {
        method: "POST",
        query: { test_mode: true },
        body: {
          user_id: userId,
          plan_id: props.planId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    emit("subscribed");
    emit("update:isOpen", false);
  } catch (err: any) {
    if (err.response?.status === 422) {
      console.error("Validation error:", await err.response.json());
    } else {
      console.error("Subscription failed:", err);
    }
    alert("Ошибка при оформлении подписки");
  } finally {
    loading.value = false;
  }
};
</script>
