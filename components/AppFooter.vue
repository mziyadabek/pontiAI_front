<template>
  <footer class="bg-gray-50 flex flex-col py-10 w-full h-full">
    <div
      class="container mx-auto flex flex-col lg:flex-row justify-between items-center"
    >
      <!-- Logo and Text -->
      <div class="flex flex-col items-center mb-4 lg:mb-0">
        <h1>PontiAI</h1>
        <span class="font-semibold text-lg"
          >Сервис создания ИИ-ассистентов</span
        >
      </div>

      <!-- Links -->
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-4 lg:mb-0">
        <div class="flex flex-col items-center lg:items-start">
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900 mb-2"
            >Блог</NuxtLink
          >
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900 mb-2"
            >Консультация</NuxtLink
          >
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900 mb-2"
            >Стоимость</NuxtLink
          >
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900"
            >Privacy Policy (EN)</NuxtLink
          >
        </div>

        <div class="flex flex-col items-center lg:items-start">
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900 mb-2"
            >Политика конфиденциальности</NuxtLink
          >
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900 mb-2"
            >Пользовательское соглашение</NuxtLink
          >
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900 mb-2"
            >Договор оферты</NuxtLink
          >
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900"
            >Описание процедуры оплаты</NuxtLink
          >
        </div>
      </div>

      <!-- Contact & Socials -->
      <div class="text-center lg:text-right">
        <a
          href="mailto:contact@pleep.app"
          class="block text-gray-600 hover:text-gray-900 mb-2"
          >contact@pleep.app</a
        >
        <p class="text-gray-600 mb-2">+7 (707) 733 3854</p>
        <div class="flex justify-center lg:justify-end space-x-4 mt-2">
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <!-- <img src="/instagram-icon.png" alt="Instagram" class="h-6" /> -->
          </a>
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <!-- <img src="/whatsapp-icon.png" alt="WhatsApp" class="h-6" /> -->
          </a>
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <!-- <img src="/telegram-icon.png" alt="Telegram" class="h-6" /> -->
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
