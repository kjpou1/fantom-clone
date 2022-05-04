<script setup lang="ts">
import QrcodeVue from "qrcode.vue";

const props = defineProps<{
  value: string;
}>();

const size = 300;
</script>

<template>
  <qrcode-vue :value="props.value" :size="size" level="H" />
</template>
