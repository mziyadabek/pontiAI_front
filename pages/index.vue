<template>
  <div>
    <AppHeader />

    <div class="flex flex-col gap-4 items-center bg-white py-20 px-40 pt-32">
      <!-- Animated Badge -->
      <UBadge
        size="xl"
        color="info"
        variant="subtle"
        class="rounded-full animate-fade-in"
      >
        🚀 Представляем новый стандарт ИИ-ассистентов
      </UBadge>

      <!-- Animated Headings -->
      <h1 class="text-4xl font-bold text-center mb-6 animate-slide-up">
        Создайте ИИ-ассистента для бизнеса за 5 минут
      </h1>
      <p
        class="text-2xl text-center text-gray-500 mb-6 animate-slide-up delay-100"
      >
        Автоматизируйте коммуникации с клиентами уже сегодня и повысьте
        конверсию в целевое действие на 11%. Pleep позволит вам сделать это
        быстро и качественно.
      </p>

      <!-- Animated Buttons -->
      <div class="flex space-x-4 animate-fade-in delay-300">
        <NuxtLink
          to="/create-assistant"
          class="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors btn-primary"
        >
          Создать ассистента
        </NuxtLink>
        <NuxtLink
          to="/consultation"
          class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full text-lg font-semibold hover:border-gray-500 hover:text-gray-900 transition-colors btn-secondary"
        >
          Получить консультацию
        </NuxtLink>
      </div>

      <!-- Video placeholder with hover animation -->
      <div
        class="flex items-center justify-center w-[1200px] h-[600px] rounded-2xl bg-gray-200 transform transition-all hover:scale-[1.02] cursor-pointer"
      >
        <UIcon name="i-lucide-play" class="size-30 animate-pulse" />
      </div>

      <!-- Feature cards with staggered animation -->
      <div class="pt-10">
        <h1 class="text-4xl font-bold text-center mb-6 animate-fade-in">
          Как ИИ ассистент от Team поможет вашему бизнесу
        </h1>
        <p class="text-2xl text-center text-gray-500 mb-6">
          ИИ ассистент от Team поможет вашему бизнесу увеличить конверсию,
          терять меньше клиентов, повысить доходы и сэкономить время
        </p>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div
            v-for="(card, index) in featureCards"
            :key="index"
            class="bg-white p-6 rounded-xl shadow-md text-center feature-card animate-fade-in"
            :style="`animation-delay: ${index * 200}ms;`"
          >
            <div :class="`text-4xl font-bold ${card.color}`">
              {{ card.value }}
            </div>
            <h2 class="text-xl font-semibold mt-4">{{ card.title }}</h2>
            <p class="text-gray-500 mt-2">{{ card.description }}</p>
          </div>
        </div>
      </div>

      <!-- Integration icons with hover animation -->
      <div class="pt-10 w-3xl">
        <h1 class="text-4xl font-bold text-center mb-6">Интеграции</h1>
        <p class="text-xl text-center text-gray-600 mb-8">
          Подключите ИИ-ассистента от Team к мессенджерам, CRM-системам и другим
          сервисам, которые вы используете, за несколько минут
        </p>

        <div class="flex justify-center gap-8">
          <div
            v-for="(integration, index) in integrations"
            :key="index"
            class="integration-item animate-slide-up text-center"
            :style="`animation-delay: ${index * 100}ms;`"
          >
            <UIcon
              :name="integration.icon"
              class="size-10 hover:scale-110 transition-transform"
            />
            <p>{{ integration.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated CTA section -->
    <div
      class="bg-blue-500 w-full h-96 flex flex-col gap-4 items-center py-20 px-40 pt-32 animate-fade-in"
    >
      <p class="bg-white p-2 rounded-2xl">
        Создайте ИИ-ассистента от Pleep уже сегодня
      </p>

      <h1 class="text-4xl text-white font-bold text-center mb-6">
        Интересно увидеть как работает ИИ ассистент от Pleep? Cоздайте его прямо
        сейчас
      </h1>

      <NuxtLink
        to="/create-assistant"
        class="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors"
      >
        Создать ассистента
      </NuxtLink>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// Feature cards data
const featureCards = [
  {
    value: "+11%",
    title: "Увеличение конверсии в покупку",
    description:
      "ИИ ассистент от Team плавно подведет вашего клиента к сделке и повысит конверсию в покупку.",
    color: "text-green-500",
  },
  {
    value: "7 секунд",
    title: "Круглосуточные скоростные ответы",
    description:
      "ИИ ассистент от Team будет отвечать за 7 секунд и поможет обслуживать ваших клиентов 24/7.",
    color: "text-blue-500",
  },
  {
    value: "+100 заявок",
    title: "Неограниченная обработка заявок",
    description:
      "Легко масштабируйте количество заявок без дополнительных затрат и ресурсов на найм и обучение сотрудников.",
    color: "text-green-500",
  },
];

// Integrations data
const integrations = [
  { icon: "i-lucide-send", name: "Telegram" },
  { icon: "i-lucide-instagram", name: "Instagram" },
  { icon: "i-heroicons-chat-bubble-oval-left-ellipsis", name: "WhatsApp" },
];

// Intersection Observer setup
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  });

  document
    .querySelectorAll(".feature-card, .integration-item")
    .forEach((el) => {
      observer.observe(el);
    });
});
</script>

<style>
/* Keyframe animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
  opacity: 0;
}

.delay-100 {
  animation-delay: 100ms;
}
.delay-300 {
  animation-delay: 300ms;
}

/* Hover animations */
.btn-primary {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.integration-item {
  transition: transform 0.3s ease;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
