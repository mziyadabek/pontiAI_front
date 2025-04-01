<script lang="ts" setup>
const route = useRoute();

const imgError = ref(false);

const tooltipAttrs = {
  text: "Еще в разработке",
  ui: {
    background: "bg-blue-100",
    color: "text-blue-500 font-semibold",
  },
};

const links = [
  {
    id: 1,
    label: "Assistent",
    icon: "i-gravity-ui:face-robot",
    to: "/dashboard/assistent",
  },
  {
    id: 2,
    label: "reports",
    icon: "i-gravity-ui-arrows-3-rotate-left-letter-a",
    to: "/dashboard/reports",
  },
  {
    id: 3,
    label: "Settings",
    icon: "i-gravity-ui-calendar",
    to: "/dashboard/settings",
  },
];

const activeRoute = (link: string) => {
  return route.fullPath.includes(link);
};
</script>

<template>
  <div
    class="sticky top-0 hidden h-full w-[240px] flex-shrink-0 flex-col gap-6 overflow-auto border px-4 py-6 md:flex"
  >
    <!-- card -->
    <div
      class="flex w-full flex-col items-center rounded-2xl bg-white p-2 gap-2"
    >
      <h1 class="font-bold text-xl">Ponti AI</h1>
      <NavCard />
    </div>

    <!-- navigation -->
    <div class="mt-4 flex h-full w-full flex-col gap-2">
      <UButton
        v-for="link in links"
        :key="link.label"
        variant="ghost"
        class="group w-full gap-3 rounded-2xl p-2 font-medium text-black transition-colors duration-200 hover:opacity-90 active:opacity-85"
        :class="{
          'bg-gray-300': activeRoute(link.to),
        }"
        :to="link.to"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full"
          :class="{
            'bg-gray-700': activeRoute(link.to),
            'bg-white': !activeRoute(link.to),
          }"
        >
          <UIcon
            :name="link.icon"
            class="h-5 w-5"
            :class="{
              'text-white': activeRoute(link.to),
              'text-black': !activeRoute(link.to),
            }"
          />
        </div>

        <p class="text-sm">{{ link.label }}</p>
      </UButton>
    </div>
  </div>
</template>
