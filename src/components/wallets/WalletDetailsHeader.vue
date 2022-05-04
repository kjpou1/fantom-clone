<script setup lang="ts">
import WalletDetails from "./WalletDetails.vue";
import DashboardBalances from "../dashboard/DashboardBalances.vue";
</script>

<template>
  <!-- <div class="grid grid-cols-2 grid-flow-col auto-cols-max"> -->
  <div class="flex flex-row flex-wrap">
    <div class="flex-grow basis-1/2">
      <WalletDetails />
    </div>
    <div class="flex-grow basis-1/2">
      <DashboardBalances />
    </div>
  </div>
</template>
