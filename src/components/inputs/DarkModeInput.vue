<script setup lang="ts">
import { ref } from "vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/solid";
import { useSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";

// const props = defineProps({
//   context: Object,
// });
const { isDarkMode: isDark } = storeToRefs(useSettingsStore());
const { toggleDarkMode } = useSettingsStore();
</script>
<template>
  <div>
    <div
      class="pb-4"
      :class="{
        'text-primary-900 bg-transparent': !isDark,
        'text-secondary bg-transparent': isDark,
      }"
    >
      <div class="flex items-center gap-2 justify-end bg-white-500 pt-4">
        <span
          :class="{ 'bg-indigo-200': !isDark, 'bg-indigo-600': isDark }"
          class="relative inline-block flex-no-shrink h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
          role="checkbox"
          tabindex="0"
          @click="toggleDarkMode"
          @keydown.space.prevent="toggleDarkMode"
          :aria-checked="isDark"
        >
          <span
            aria-hidden="true"
            :class="{ 'translate-x-5': isDark, '-translate-x-0': !isDark }"
            class="relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
          >
            <span
              :class="{
                'opacity-0 ease-out duration-100': isDark,
                'opacity-100 ease-in duration-200': !isDark,
              }"
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            >
              <SunIcon class="h-3 w-3 text-yellow-500" />
            </span>
            <span
              :class="{
                'opacity-100 ease-in duration-200': isDark,
                'opacity-0 ease-out duration-100': !isDark,
              }"
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            >
              <MoonIcon class="h-3 w-3 text-primary-600" />
            </span>
          </span>
        </span>
        <p>Dark Mode</p>
      </div>
    </div>
  </div>
</template>
