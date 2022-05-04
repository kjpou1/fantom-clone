<script setup lang="ts">
import IconAppLogo from "../icons/IconAppLogo.vue";
</script>

<template>
  <!-- App Name -->
  <router-link
    :to="{ name: 'home' }"
    class="text-wallet_link_active hover:text-wallet_link_hover font-bold mr-4"
    exact-active-class="no-active"
  >
    <div class="flex flex-wrap items-center px-6 py-8 text-sm">
      <IconAppLogo class="min-w-[32px] min-h-[32px]"></IconAppLogo>
      <span class="ml-4">fWallet</span>
    </div>
  </router-link>
</template>
