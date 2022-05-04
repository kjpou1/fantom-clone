<script setup lang="ts">
import IconTimes from "../icons/IconTimes.vue";
</script>

<template>
  <!-- Modal Close Button -->
  <div
    class="hover:bg-light_btn_hover hover:rounded-full hover:transition-colors duration-500 dark:hover:bg-dark_btn_hover w-8 h-8 flex justify-center items-center"
  >
    <div class="modal-close cursor-pointer z-50">
      <IconTimes class="fill-light_btn dark:fill-dark_btn w-5 h-5" />
    </div>
  </div>
</template>
