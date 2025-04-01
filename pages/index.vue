<template>
  <div>
    <AppHeader />

    <div class="flex flex-col gap-4 items-center bg-white py-20 px-40 pt-32">
      <UBadge size="xl" color="info" variant="subtle" class="rounded-full">
        🚀 Представляем новый стандарт ИИ-ассистентов
      </UBadge>

      <h1 class="text-4xl font-bold text-center mb-6">
        Создайте ИИ-ассистента для бизнеса за 5 минут
      </h1>
      <p class="text-2xl text-center text-gray-500 mb-6">
        Автоматизируйте коммуникации с клиентами уже сегодня и повысьте
        конверсию в целевое действие на 11%. Pleep позволит вам сделать это
        быстро и качественно.
      </p>

      <div class="flex space-x-4">
        <NuxtLink
          to="/create-assistant"
          class="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Создать ассистента
        </NuxtLink>
        <NuxtLink
          to="/consultation"
          class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full text-lg font-semibold hover:border-gray-500 hover:text-gray-900 transition-colors"
        >
          Получить консультацию
        </NuxtLink>
      </div>

      <div
        class="flex items-center justify-center w-[1200px] h-[600px] rounded-2xl bg-gray-200"
      >
        <UIcon name="i-lucide-play" class="size-30" />
      </div>

      <div class="pt-10">
        <h1 class="text-4xl font-bold text-center mb-6">
          Как ИИ ассистент от Team поможет вашему бизнесу
        </h1>
        <p class="text-2xl text-center text-gray-500 mb-6">
          ИИ ассистент от Team поможет вашему бизнесу увеличить конверсию,
          терять меньше клиентов, повысить доходы и сэкономить время
        </p>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div class="bg-white p-6 rounded-xl shadow-md text-center">
            <div class="text-4xl font-bold text-green-500">+11%</div>
            <h2 class="text-xl font-semibold mt-4">
              Увеличение конверсии в покупку
            </h2>
            <p class="text-gray-500 mt-2">
              ИИ ассистент от Team плавно подведет вашего клиента к сделке и
              повысит конверсию в покупку.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md text-center">
            <div class="text-4xl font-bold text-blue-500">7 секунд</div>
            <h2 class="text-xl font-semibold mt-4">
              Круглосуточные скоростные ответы
            </h2>
            <p class="text-gray-500 mt-2">
              ИИ ассистент от Team будет отвечать за 7 секунд и поможет
              обслуживать ваших клиентов 24/7.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md text-center">
            <div class="text-4xl font-bold text-green-500">+100 заявок</div>
            <h2 class="text-xl font-semibold mt-4">
              Неограниченная обработка заявок
            </h2>
            <p class="text-gray-500 mt-2">
              Легко масштабируйте количество заявок без дополнительных затрат и
              ресурсов на найм и обучение сотрудников.
            </p>
          </div>
        </div>
      </div>

      <div class="pt-10 w-3xl">
        <h1 class="text-4xl font-bold text-center mb-6">Интеграции</h1>
        <p class="text-xl text-center text-gray-600 mb-8">
          Подключите ИИ-ассистента от Team к мессенджерам, CRM-системам и другим
          сервисам, которые вы используете, за несколько минут
        </p>

        <div class="flex justify-center gap-8">
          <!-- Telegram -->
          <div class="text-center">
            <UIcon name="i-lucide-send" class="size-10" />
            <p>Telegram</p>
          </div>

          <!-- Instagram -->
          <div class="text-center">
            <UIcon name="i-lucide-instagram" class="size-10" />
            <p>Instagram</p>
          </div>

          <!-- WhatsApp -->
          <div class="text-center">
            <UIcon
              name="i-heroicons-chat-bubble-oval-left-ellipsis"
              class="size-10"
            />
            <p>WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-blue-500 w-full h-96 flex flex-col gap-4 items-center py-20 px-40 pt-32"
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
