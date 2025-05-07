<template>
  <div class="flex flex-col w-full h-full gap-5 items-center">
    <AppHeader />

    <div
      class="flex flex-col gap-4 items-center bg-white dark:bg-gray-900 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8"
    >
      <!-- Animated Badge -->
      <UBadge
        size="xl"
        color="info"
        variant="subtle"
        class="rounded-full animate-fade-in"
      >
        🚀 Introducing the New Standard of AI Assistants
      </UBadge>

      <!-- Animated Headings -->
      <h1
        class="text-6xl font-bold text-center mb-6 animate-slide-up sm:text-3xl dark:text-white"
      >
        Create an AI Assistant for Your Business in 5 Minutes
      </h1>
      <p
        class="text-2xl w-xl flex text-center text-gray-500 dark:text-gray-300 mb-6 animate-slide-up delay-100 sm:text-xl"
      >
        Without any knowledge of AI and integrate it with your services. The
        ecosystem from Team will make the whole process as simple and fast as
        possible.
      </p>

      <!-- Animated Buttons -->
      <div
        class="flex space-x-4 animate-fade-in delay-300 flex-wrap justify-center gap-4"
      >
        <NuxtLink
          to="/dashboard"
          class="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors btn-primary"
        >
          Create Assistant
        </NuxtLink>
        <a
          href="https://t.me/mziyadabek"
          target="_blank"
          class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-lg font-semibold hover:border-gray-500 hover:text-gray-900 dark:hover:border-gray-400 dark:hover:text-white transition-colors btn-secondary"
        >
          Get Consultation
        </a>
      </div>

      <!-- Video placeholder with hover animation -->
      <div class="w-full max-w-7xl mx-auto my-6">
        <div class="relative aspect-video rounded-2xl overflow-hidden">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/2pOnHp4OyrY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Feature cards with staggered animation -->
      <div class="pt-10">
        <h1
          class="text-4xl font-bold text-center mb-6 animate-fade-in sm:text-3xl dark:text-white"
        >
          How Ponti AI Assistant Can Help Your Business
        </h1>
        <p
          class="text-2xl text-center text-gray-500 dark:text-gray-300 mb-6 sm:text-xl"
        >
          Ponti AI Assistant helps your business increase conversion, reduce
          customer loss, boost revenue, and save time
        </p>
        <div
          class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
        >
          <div
            v-for="(card, index) in featureCards"
            :key="index"
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center feature-card animate-fade-in"
            :style="`animation-delay: ${index * 200}ms;`"
          >
            <div :class="`text-4xl font-bold ${card.color}`">
              {{ card.value }}
            </div>
            <h2 class="text-xl font-semibold mt-4 dark:text-white">
              {{ card.title }}
            </h2>
            <p class="text-gray-500 dark:text-gray-300 mt-2">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Use Cases Block -->
      <section
        class="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 mb-10"
      >
        <div class="text-center mb-12">
          <div class="text-lg text-gray-500 dark:text-gray-400 mb-2">
            Use Cases
          </div>
          <h2 class="text-4xl font-extrabold mb-4 dark:text-white">
            How Our Clients Use Ponti
          </h2>
          <div class="text-xl text-gray-500 dark:text-gray-300">
            Examples of AI assistants created by our clients in Team
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="flex flex-col items-center text-center">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow">
              <UIcon
                name="i-lucide-dollar-sign"
                class="text-3xl text-gray-900 dark:text-white"
              />
            </div>
            <h3 class="text-lg font-bold mb-2 dark:text-white">
              Sales Manager
            </h3>
            <p class="text-gray-500 dark:text-gray-300">
              Consults clients and closes deals
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow">
              <UIcon
                name="i-lucide-wrench"
                class="text-3xl text-gray-900 dark:text-white"
              />
            </div>
            <h3 class="text-lg font-bold mb-2 dark:text-white">
              Tech Support Specialist
            </h3>
            <p class="text-gray-500 dark:text-gray-300">
              Helps clients solve their technical issues
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow">
              <UIcon
                name="i-lucide-message-square"
                class="text-3xl text-gray-900 dark:text-white"
              />
            </div>
            <h3 class="text-lg font-bold mb-2 dark:text-white">Consultant</h3>
            <p class="text-gray-500 dark:text-gray-300">
              Advises clients on product-related questions
            </p>
          </div>
        </div>
      </section>

      <!-- Integration icons with hover animation -->
      <div class="pt-10 w-full sm:w-3xl">
        <h1
          class="text-4xl font-bold text-center mb-6 sm:text-3xl dark:text-white"
        >
          No Integrations Required
        </h1>
        <p
          class="text-xl text-center text-gray-600 dark:text-gray-300 mb-8 sm:text-lg"
        >
          Clients can directly connect to the AI assistant on our platform,
          allowing for real-time interaction. This seamless connection enables
          users to get quick answers, solve problems, and receive personalized
          assistance, enhancing their overall experience.
        </p>

        <div class="flex flex-col justify-center text-center gap-8">
          <!-- First row of icons -->
          <div class="flex justify-center gap-8">
            <div
              v-for="(integration, index) in integrations.slice(0, 3)"
              :key="index"
              class="integration-item animate-slide-up text-center w-32"
              :style="`animation-delay: ${index * 100}ms;`"
            >
              <UIcon
                :name="integration.icon"
                class="size-10 hover:scale-110 transition-transform text-gray-700 dark:text-gray-300 mx-auto"
              />
              <p class="dark:text-gray-300 text-base font-semibold mt-2">
                {{ integration.name }}
              </p>
            </div>
          </div>

          <!-- Second row of icons -->
          <div class="flex justify-center gap-8">
            <div
              v-for="(integration, index) in integrations.slice(3, 6)"
              :key="index + 3"
              class="integration-item animate-slide-up text-center w-32"
              :style="`animation-delay: ${(index + 3) * 100}ms;`"
            >
              <UIcon
                :name="integration.icon"
                class="size-10 hover:scale-110 transition-transform text-gray-700 dark:text-gray-300 mx-auto"
              />
              <p class="dark:text-gray-300 text-base font mt-2">
                {{ integration.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated CTA section -->
    <div
      class="bg-blue-500 w-full h-auto flex flex-col gap-4 items-center py-20 px-4 sm:px-6 lg:px-8 pt-32 animate-fade-in"
    >
      <p class="bg-white dark:bg-gray-900 p-2 rounded-2xl">
        Create Your Ponti AI Assistant Today
      </p>

      <h1 class="text-4xl text-white font-bold text-center mb-6 sm:text-3xl">
        Want to see how Ponti AI Assistant works? Create one right now
      </h1>

      <NuxtLink
        to="/create-assistant"
        class="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors"
      >
        Create Assistant
      </NuxtLink>
    </div>

    <!-- Pricing Section -->
    <section class="w-full bg-gray-50 dark:bg-gray-900 py-20">
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
              >
                Get Started
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
              >
                Get Started
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
              <button
                class="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="flex w-full flex-col gap-20 p-20">
      <h2
        class="m-auto flex items-center gap-4 text-4xl font-semibold dark:text-white"
      >
        Our Partners
      </h2>

      <div class="grid grid-cols-4 justify-items-center gap-16">
        <NuxtImg
          src="/partners/partner-1.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-2.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-3.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-4.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-5.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-6.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-7.png"
          class="h-40 w-40 object-contain"
        />
        <NuxtImg
          src="/partners/partner-8.png"
          class="h-40 w-40 object-contain"
        />
      </div>
    </section>
  </div>
  <AppFooter />
</template>

<script setup>
import { onMounted } from "vue";

// Feature cards data
const featureCards = [
  {
    value: "+11%",
    title: "Increase in Purchase Conversion",
    description:
      "Ponti AI Assistant smoothly guides your customer to a deal and increases purchase conversion.",
    color: "text-green-500",
  },
  {
    value: "7 seconds",
    title: "24/7 Fast Response Time",
    description:
      "Ponti AI Assistant responds within 7 seconds and helps serve your customers 24/7.",
    color: "text-blue-500",
  },
  {
    value: "+100 requests",
    title: "Unlimited Request Processing",
    description:
      "Easily scale the number of requests without additional costs and resources for hiring and training staff.",
    color: "text-green-500",
  },
];

// Integrations data
const integrations = [
  { icon: "i-lucide-bot", name: "AI Assistant" },
  { icon: "i-lucide-message-square", name: "Direct Chat" },
  { icon: "i-lucide-zap", name: "Instant Response" },
  { icon: "i-lucide-shield-check", name: "Secure Platform" },
  { icon: "i-lucide-globe", name: "Web Access" },
  { icon: "i-lucide-smartphone", name: "Mobile Ready" },
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
