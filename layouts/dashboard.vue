<template>
  <div class="flex flex-col h-screen">
    <div class="flex w-full items-center justify-between border-b px-8 py-6">
      <div class="flex items-center justify-center gap-x-4">
        <a
          href="/"
          class="hover:underline underline-offset-4 max-md:hidden text-primary cursor-pointer rounded-xl font-medium transition text-[0.9rem]"
        >
          PontiAI
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
        <a
          class="hover:underline underline-offset-4 max-md:hidden text-primary cursor-pointer rounded-xl font-medium transition text-[0.9rem]"
          href="/blog"
        >
          Блог
        </a>
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
