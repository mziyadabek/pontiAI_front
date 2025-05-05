<template>
  <div class="h-screen flex flex-col">
    <AppHeader />

    <!-- Hero Section -->

    <section class="w-full dark:bg-gray-900 py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12 dark:text-white">
          Simple, Transparent Pricing
        </h2>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Basic Plan -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
          >
            <div class="text-center">
              <h3 class="text-2xl font-bold mb-4 dark:text-white">Basic</h3>
              <div class="text-4xl font-bold mb-6 dark:text-white">
                $29<span class="text-lg text-gray-500">/month</span>
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Up to 100 messages/month
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Basic AI responses
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Email support
                </li>
              </ul>
              <button
                class="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                @click="openModal(1)"
              >
                Purchase
              </button>
            </div>
          </div>

          <!-- Pro Plan -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 border-2 border-blue-500"
          >
            <div class="text-center">
              <div
                class="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4"
              >
                Most Popular
              </div>
              <h3 class="text-2xl font-bold mb-4 dark:text-white">Pro</h3>
              <div class="text-4xl font-bold mb-6 dark:text-white">
                $99<span class="text-lg text-gray-500">/month</span>
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Unlimited messages
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Advanced AI responses
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Priority support
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Custom integrations
                </li>
              </ul>
              <button
                class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                @click="openModal(2)"
              >
                Purchase
              </button>
            </div>
          </div>

          <!-- Enterprise Plan -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
          >
            <div class="text-center">
              <h3 class="text-2xl font-bold mb-4 dark:text-white">
                Enterprise
              </h3>
              <div class="text-4xl font-bold mb-6 dark:text-white">Custom</div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Everything in Pro
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Dedicated support
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  Custom AI training
                </li>
                <li class="flex items-center dark:text-gray-300">
                  <UIcon name="i-lucide-check" class="text-green-500 mr-2" />
                  SLA guarantee
                </li>
              </ul>
              <a
                href="https://t.me/mziyadabek"
                target="_blank"
                class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-lg font-semibold hover:border-gray-500 hover:text-gray-900 dark:hover:border-gray-400 dark:hover:text-white transition-colors btn-secondary"
              >
                Get Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AppFooter />
    <SubscriptionModal
      v-if="selectedPlanId !== null"
      v-model:isOpen="modalOpen"
      :plan-id="selectedPlanId"
      @subscribed="onSubscribed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import SubscriptionModal from "~/components/SubscriptionModal.vue";

const authStore = useAuthStore();

const modalOpen = ref(false);
const selectedPlanId = ref<number | null>(null);

function onSubscribed() {
  window.alert("Subscription activated!");
}

function openModal(planId: number) {
  if (!authStore.isAuthenticated) {
    return navigateTo("/signin");
  }

  selectedPlanId.value = planId;
  modalOpen.value = true;
}
</script>
