<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";
// const props = defineProps({
//   context: Object,
// });

// const props = defineProps({
//   context: Object,
// });
const { isAutoDarkMode, isDarkMode } = storeToRefs(useSettingsStore());
const { toggleAutoDarkMode } = useSettingsStore();
</script>
<template>
  <div>
    <div
      class="pb-4"
      :class="{
        'text-primary bg-transparent': !isDarkMode,
        'text-secondary bg-transparent': isDarkMode,
      }"
    >
      <div class="flex items-center gap-2 justify-end bg-white-500 pt-4">
        <span
          :class="{
            'bg-indigo-200': !isAutoDarkMode,
            'bg-indigo-600': isAutoDarkMode,
          }"
          class="relative inline-block flex-no-shrink h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
          role="checkbox"
          tabindex="0"
          @click="toggleAutoDarkMode"
          @keydown.space.prevent="toggleAutoDarkMode"
          :aria-checked="isAutoDarkMode"
        >
          <span
            aria-hidden="true"
            :class="{
              'translate-x-5': isAutoDarkMode,
              '-translate-x-0': !isAutoDarkMode,
            }"
            class="relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
          >
            <span
              :class="{
                'opacity-0 ease-out duration-100': isAutoDarkMode,
                'opacity-100 ease-in duration-200': !isAutoDarkMode,
              }"
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            >
              <div class="h-3 w-3 rounded-full"></div>
            </span>
            <span
              :class="{
                'opacity-100 ease-in duration-200': isAutoDarkMode,
                'opacity-0 ease-out duration-100': !isAutoDarkMode,
              }"
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            >
              <div class="h-3 w-3 rounded-full"></div>
            </span>
          </span>
        </span>
        <p>Auto Dark Mode</p>
      </div>
    </div>
  </div>
</template>
