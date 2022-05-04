<script setup lang="ts">
import { toRef } from "vue";

const props = defineProps<{
  title: string;
  size?: string;
  text_class: string | string[];
  icon_class: string | string[];
}>();

const size = props.size ?? "btn-lg";

// Let's keep the reactivity of the class as it can be modified dynamically
const icon_class = toRef(props, "icon_class");
// Let's keep the reactivity of the class as it can be modified dynamically
const text_class = toRef(props, "text_class");
</script>

<template>
  <span :title="props.title" class="cursor-pointer">
    <button class="btn" :class="[icon_class, size]">
      <slot></slot>
    </button>
    <p class="pt-2" :class="[text_class]">{{ props.title }}</p>
  </span>
</template>

<style scoped>
.btn {
  @apply rounded-full inline-flex justify-center items-center transition ease-in-out duration-300 text-base;
}
.btn.btn-sm {
  @apply w-8 h-8 text-sm;
}

.btn.btn-lg {
  @apply text-lg w-11 h-11;
}
</style>
