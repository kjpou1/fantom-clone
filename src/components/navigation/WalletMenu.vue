<script setup lang="ts">
import WalletHeader from "./WalletHeader.vue";
import WalletDrawer from "./WalletDrawer.vue";
</script>

<template>
  <div class="w-52 overflow-hidden rounded-tr-[20px]">
    <div
      class="flex flex-col overflow-auto sm:h-full transition-colors duration-500 bg-wallet_menu dark:bg-wallet_menu_dark"
    >
      <!-- Header -->
      <WalletHeader></WalletHeader>
      <!-- Menu Items -->
      <WalletDrawer></WalletDrawer>

      <div class="p-5"></div>
    </div>
  </div>
</template>
