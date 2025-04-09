<template>
  <AppHeader />
  <div class="flex flex-col h-screen pt-40 sm:px-6 lg:px-8">
    <div class="max-w-lg mx-auto text-center">
      <h2 class="text-3xl font-extrabold text-gray-900">
        Фиксированная стоимость. Никаких сторонних оплат.
      </h2>
      <p class="mt-4 text-lg text-gray-500">
        Вы точно знаете, во сколько вам обойдется ИИ-ассистент. Все включено в
        тариф.
      </p>
    </div>

    <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        class="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
      >
        <h3 class="text-2xl font-semibold text-gray-900">Лайт</h3>
        <p class="mt-4 text-xl font-semibold text-gray-900">10.000₸/мес</p>
        <ul class="mt-4 space-y-4 text-left text-gray-500">
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> 1 интеграция с
            мессенджером
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Чат-виджет на сайт
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Базовый функционал
            (база знаний, мониторинг, статистика)
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Последние версии
            ИИ-ассистента Pleep
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Техническая поддержка
          </li>
        </ul>
        <button
          class="mt-6 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Купить
        </button>
      </div>

      <div
        class="flex flex-col rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg"
      >
        <h3 class="text-2xl font-semibold text-gray-900">Бизнес</h3>
        <p class="mt-4 text-xl font-semibold text-gray-900">35.000₸/мес</p>
        <ul class="mt-4 space-y-4 text-left text-gray-500">
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Все, что в Лайт
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> 3 интеграции с
            мессенджерами
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Интеграция с CRM
            системами (amoCRM, Битрикс24, Wazzup)
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Интеграция с Google
            Calendar
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Повторные касания
            (дожим)
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> WhatsApp рассылки
          </li>
        </ul>
        <button
          class="mt-6 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Купить
        </button>
      </div>

      <div
        class="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
      >
        <h3 class="text-2xl font-semibold text-gray-900">Про</h3>
        <p class="mt-4 text-xl font-semibold text-gray-900">55.000₸/мес</p>
        <ul class="mt-4 space-y-4 text-left text-gray-500">
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Все, что в Бизнес
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Неограниченное
            количество каналов связи
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Индивидуальные
            запросы (API, и т.д.)
          </li>
          <li>
            <UIcon name="i-lucide-check" class="size-5" /> Ранний доступ к новым
            обновлениям
          </li>
        </ul>
        <button
          class="mt-6 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Приобрести
        </button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
