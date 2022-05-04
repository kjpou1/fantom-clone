<script setup lang="ts">
import ModalCloseButton from "./ModalCloseButton.vue";

const props = defineProps<{
  header_class: string;
  size?: string;
}>();

const DEFAULT_BG_HEADER = "bg-light_secondary dark:bg-dark_secondary";
const header_class =
  props.header_class === null || props.header_class.length === 0
    ? DEFAULT_BG_HEADER
    : props.header_class;

const panelSize = props.size ?? "lg";
const classSize = `panel-${panelSize}`;
//    :class="{ hidden: !useModals[props.controller] }"
</script>

<template>
  <!-- ConnectWallet Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity backdrop-opacity-8">
        <div class="absolute inset-0 bg-modal opacity-60"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div class="panel" :class="[classSize]">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6" :class="[header_class]">
          <!--Title-->
          <div class="flex justify-between items-center pb-0">
            <div class="flex-grow text-center">
              <p
                class="text-2xl font-bold text-light_header dark:text-dark_header"
              >
                <slot name="heading"></slot>
              </p>
            </div>
            <!-- Modal Close Button -->
            <ModalCloseButton @click.prevent="(e) => $emit('close-modal', e)" />
          </div>
        </div>
        <div :class="DEFAULT_BG_HEADER">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  @apply inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full;
}
.panel.panel-sm {
  @apply w-8 h-8 text-sm;
}

.panel.panel-lg {
  @apply sm:max-w-lg;
}
.panel.panel-xl {
  @apply sm:max-w-xl;
}
.panel.panel-2xl {
  @apply sm:max-w-2xl;
}
.panel.panel-3xl {
  @apply sm:max-w-3xl;
}
.panel.panel-4xl {
  @apply sm:max-w-4xl;
}
.panel.panel-5xl {
  @apply sm:max-w-5xl;
}

.panel.panel-6xl {
  @apply sm:max-w-6xl;
}

.panel.panel-7xl {
  @apply sm:max-w-7xl;
}
</style>
