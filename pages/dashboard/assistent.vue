<script setup>
definePageMeta({
  layout: "dashboard",
});
import { ref } from "vue";

const isOpen = ref(false);
const isStart = ref(true);
const isNextName = ref(false);
const isNextInfo = ref(false);
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">🤖 Your Assistants</h1>
  <div class="flex justify-center items-center h-[60vh]">
    <div class="p-4 flex flex-col items-center w-[650px] gap-4">
      <p>
        You don’t have an assistant yet. It's a great time to create your first
        Ponti Assistant!
      </p>
      <div class="w-[325px]">
        <UButton label="Create new" block @click="isOpen = true" />
      </div>

      <UModal v-model="isOpen" fullscreen>
        <UCard
          :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' },
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Ponti AI Assistant
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>

          <!-- Step 1: Start -->
          <div
            v-if="isStart"
            class="flex flex-col justify-center items-center mx-auto h-full gap-2"
          >
            <p>Will take 10 min ⌛️</p>
            <p class="text-2xl font-bold">Let's create a new assistant</p>
            <p>
              We made the process easy to understand. Please follow the
              instructions.
            </p>
            <UButton
              size="xl"
              label="Start"
              color="primary"
              block
              class="w-[200px]"
              @click="
                () => {
                  isStart = false;
                  isNextName = true;
                }
              "
            />
          </div>

          <!-- Step 2: Name Input -->
          <div
            v-if="isNextName"
            class="flex flex-col justify-center items-center mx-auto h-full gap-2"
            label="Name"
          >
            <p>Basic information</p>
            <p class="text-2xl font-bold">
              How we gonna name and describe our assistant?
            </p>

            <div class="flex flex-col gap-2 mt-5 w-[50%]">
              <UInput placeholder="Enter the name of your assistant" />

              <UTextarea
                v-model="assistantInfo"
                placeholder="Enter additional information about your assistant"
              />
              <div class="flex flex-row gap-2">
                <UButton
                  label="Previous"
                  color="primary"
                  @click="
                    () => {
                      isNextInfo = false;
                      isNextName = true;
                    }
                  "
                />
                <UButton
                  label="Next"
                  color="primary"
                  @click="
                    () => {
                      isNextName = false;
                      isNextInfo = true;
                    }
                  "
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Description Input -->
          <div
            v-if="isNextInfo"
            class="flex flex-col justify-center items-center mx-auto h-full gap-4"
          >
            <h2 class="text-xl font-bold">
              Let's create an instruction for your assistant
            </h2>
            <div class="flex flex-col gap-2 mt-5 w-[50%]">
              <UInput
                v-model="companyName"
                label="Company Name"
                placeholder="Example: Pleep"
              />
              <UTextarea
                v-model="role"
                label="Role"
                placeholder="Example: Answer customer questions about our service and schedule them for a free consultation"
              />
              <USelect
                v-model="communicationStyle"
                label="Communication Style"
                :options="['Friendly', 'Professional', 'Casual']"
                placeholder="Select communication style"
              />
              <USelect
                v-model="unknownResponse"
                label="What should the assistant say if it doesn't know the answer?"
                :options="[
                  'I am not sure, but I can find out.',
                  'Please contact support.',
                  'I do not have this information.',
                ]"
                placeholder="Select a phrase"
              />
              <UTextarea
                v-model="escalationTopics"
                label="Topics for Escalation"
                placeholder="Example: Partnership proposals, refund requests, technical issues"
              />
              <UTextarea
                v-model="additionalInstructions"
                label="Additional Instructions"
                placeholder="Example: Provide customers with information about current promotions"
              />

              <div class="flex flex-row gap-2">
                <UButton
                  label="Previous"
                  color="gray"
                  @click="
                    () => {
                      isNextInfo = false;
                      isNextName = true;
                    }
                  "
                />
                <UButton
                  label="Create AI"
                  color="primary"
                  @click="
                    () => {
                      isNextInfo = false;
                      isFinalStep = true;
                    }
                  "
                />
              </div>
            </div>
          </div>

          <!-- Step 4: Confirmation -->
          <div
            v-if="isFinalStep"
            class="flex flex-col justify-center items-center mx-auto h-full gap-4"
          >
            <p class="text-xl font-bold">
              Your assistant has been successfully created! 🎉
            </p>
            <p class="text-gray-500">
              You can now start using your Ponti AI Assistant.
            </p>
            <UButton
              label="Close"
              color="primary"
              block
              @click="isOpen = false"
            />
          </div>
        </UCard>
      </UModal>
    </div>
  </div>
</template>
