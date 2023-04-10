<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiArrowRight, mdiGithub, mdiMagnify, mdiOpenInNew } from "@mdi/js";

useHead({
  title: "Astronomy Picture of the Day",
});

const date = ref(new Date().toISOString().split("T")[0]);

const eventPicture = ref({
  date: "",
  explanation: "",
  hdurl: "",
  media_type: "",
  service_version: "",
  title: "Picture of the Day",
  url: "",
});

const errors = ref([]);

const isEmpty = ref(true);

const isLoading = ref(false);

const getPictureOfTheDay = async () => {
  if (!date.value) {
    errors.value.push({ name: "date", message: "Please select a date." });
    return;
  }

  errors.value = [];

  eventPicture.value.title = "Loading...";

  isLoading.value = true;

  const { data, pending } = await useFetch("/api/apod", {
    params: {
      date: date.value,
    },
  });

  eventPicture.value = data.value;

  isLoading.value = false;

  if (eventPicture?.value.code != "404") isEmpty.value = false;

  if (eventPicture?.value.code != "200" || eventPicture?.value.code == 200)
    modal.show({
      type: "danger",
      title: "This is the title property",
      body: "This is the body property.",
      primary: {
        label: "Primary Action",
        theme: "red",
        action: () => $toast.show("Primary Button clicked"),
      },
      secondary: {
        label: "Secondary Action",
        theme: "white",
        action: () => $toast.show("Clicked Secondary"),
      },
    });
};
</script>

<template>
  <div class="font-sans">
    <div class="relative"></div>

    <section class="pt-24 pb-16 border-b">
      <div class="relative container mx-auto px-8 lg:px-4">
        <div class="mb-12">
          <div class="mb-8">
            <h1 class="text-4xl md:text-6xl font-black mx-auto mb-4">
              Astronomy Picture of the Day
            </h1>
            <span class="text-lg text-gray-500">
              This is a simple Nuxt.js application that uses the NASA API to
              fetch the Astronomy Picture of the Day.
            </span>
          </div>
          <a
            href="https://github.com/cmdinglasan/cmdinglasan-nuxtjs/pages/custom/nasa"
            target="_blank"
            title="View Astronomy Picture of the Day on GitHub"
            class="group inline-block relative"
          >
            <div
              class="relative flex items-center space-x-4 py-3 px-4 bg-[#03a9f4] hover:bg-[#0285c1] rounded-lg text-white transform transition"
            >
              <SvgIcon type="mdi" :path="mdiGithub" class="w-6 h-6" />
              <span class="font-bold">View on GitHub</span>
              <SvgIcon type="mdi" :path="mdiArrowRight" class="w-6 h-6" />
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="relative py-12 bg-white">
      <div class="relative container mx-auto px-8 lg:px-4">
        <div class="relative">
          <div
            class="absolute h-full w-px bg-gray-200 dark:bg-white left-8"
          ></div>
          <div class="relative flex space-x-8 mb-8">
            <div
              class="flex-shrink-0 h-16 w-16 rounded-full bg-[#03a9f4] flex items-center justify-center"
            >
              <span class="text-white text-3xl font-bold">1</span>
            </div>
            <div class="flex-1 py-3">
              <h2 class="text-3xl font-bold mb-8 dark:text-white">
                Select a day
              </h2>
              <form
                class="flex flex-col md:flex-row"
                @submit.prevent="getPictureOfTheDay"
              >
                <div class="md:mr-4">
                  <input
                    v-model="date"
                    :max="new Date().toISOString().split('T')[0]"
                    type="date"
                    class="inline-block w-full border-0 md:w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                  />
                  <span
                    v-if="errors.length > 0"
                    class="inline-block text-red-500 text-sm mt-1"
                  >
                    {{ errors.find((e) => e.name === "date")?.message }}
                  </span>
                </div>
                <div class="mt-4 md:mt-0">
                  <button
                    type="submit"
                    class="relative flex items-center justify-items-center w-full space-x-4 py-3 px-4 bg-[#03a9f4] hover:bg-[#0285c1] rounded-lg text-white transform transition"
                  >
                    <SvgIcon type="mdi" :path="mdiMagnify" class="w-6 h-6" />
                    <span class="md:hidden">Search</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-if="isLoading" class="relative flex space-x-8 mb-8 bg-white">
            <div
              class="flex-shrink-0 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center animate-pulse"
            ></div>
            <div class="flex-1 py-3">
              <div
                class="h-8 w-full md:w-72 rounded-md bg-gray-100 animate-pulse"
              ></div>
              <div class="flex flex-col-reverse xl:flex-row xl:space-x-8 mt-8">
                <div class="flex-1 flex flex-col space-y-4 mt-8 xl:mt-0">
                  <div class="w-full">
                    <div
                      class="h-3.5 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[480px] mb-4"
                    ></div>
                    <div
                      class="h-3.5 bg-gray-100 rounded-full dark:bg-gray-700 mb-4"
                    ></div>
                    <div
                      class="h-3.5 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[440px] mb-4"
                    ></div>
                    <div
                      class="h-3.5 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[460px] mb-4"
                    ></div>
                    <div
                      class="h-3.5 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[360px]"
                    ></div>
                    <div
                      class="relative inline-block w-48 h-12 py-3 px-4 bg-gray-100 rounded-lg mt-24 xl:mt-8"
                    ></div>
                  </div>
                </div>
                <div class="flex-none w-full xl:max-w-xl">
                  <div class="group rounded-lg overflow-hidden">
                    <div
                      class="relative aspect-video overflow-hidden border border-transparent rounded-lg bg-gray-100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="!isEmpty && eventPicture.code === 200"
            class="relative flex space-x-8 mb-8"
          >
            <div
              class="flex-shrink-0 h-16 w-16 rounded-full bg-[#03a9f4] flex items-center justify-center"
            >
              <span class="text-white text-3xl font-bold">2</span>
            </div>

            <div class="flex-1 py-3">
              <h2 class="text-3xl font-bold mb-8 dark:text-white">
                {{ eventPicture.title }}
              </h2>
              <div class="flex flex-col-reverse xl:flex-row xl:space-x-8">
                <div class="flex-1 mt-6 xl:mt-0">
                  <p class="text-lg text-gray-500 mb-4">
                    {{ eventPicture.explanation }}
                  </p>
                  <a
                    :href="eventPicture?.hdurl"
                    target="_blank"
                    title="View Astronomy Picture of the Day on GitHub"
                    class="group inline-block relative"
                  >
                    <div
                      class="relative flex items-center space-x-4 py-3 px-4 bg-[#03a9f4] hover:bg-[#0285c1] rounded-lg text-white transform transition"
                    >
                      <span class="font-bold">View full image</span>
                      <SvgIcon
                        type="mdi"
                        :path="mdiOpenInNew"
                        class="w-6 h-6"
                      />
                    </div>
                  </a>
                </div>
                <div class="flex-none w-full xl:max-w-xl">
                  <a
                    :href="eventPicture.hdurl"
                    target="_blank"
                    class="relative"
                  >
                    <div class="group rounded-lg overflow-hidden">
                      <div
                        class="relative aspect-video overflow-hidden border rounded-lg"
                      >
                        <img
                          :src="eventPicture.url"
                          :alt="eventPicture.title"
                        />
                      </div>
                      <div
                        class="absolute inset-0 z-10 opacity-0 group-hover:opacity-1 bg-black/20 flex items-center justify-center space-x-4 text-white"
                      >
                        <span>View Photo</span>
                        <SvgIcon
                          type="mdi"
                          :path="mdiOpenInNew"
                          class="w-6 h-6"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="eventPicture?.error?.code === 'OVER_RATE_LIMIT'"
            class="relative flex space-x-8"
          >
            <div
              class="flex-shrink-0 h-16 w-16 rounded-full bg-[#03a9f4] flex items-center justify-center"
            >
              <span class="text-white text-3xl font-bold">2</span>
            </div>

            <div class="flex-1 py-3">
              <h2 class="text-3xl font-bold mb-8 dark:text-white">
                Failed to retrieve data
              </h2>
              <span v-text="eventPicture?.error?.message"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
