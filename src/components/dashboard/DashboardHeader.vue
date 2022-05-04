<script setup lang="ts">
import DashboardWallet from "./DashboardWallet.vue";
import DashboardBalances from "./DashboardBalances.vue";
</script>

<template>
  <!-- <div class="grid grid-cols-2 grid-flow-col auto-cols-max"> -->
  <div class="flex flex-row items-center flex-wrap">
    <div class="flex-grow basis-1/2">
      <DashboardWallet />
    </div>
    <div class="flex-grow basis-1/2">
      <DashboardBalances />
    </div>
  </div>
</template>
