<script setup lang="ts">
import type { WalletAccount } from "@/types/StateTypes";
import WalletTabs from "./WalletTabs.vue";
import WalletBalances from "./WalletBalances.vue";

const props = defineProps<{
  wallet: WalletAccount;
}>();
</script>

<template>
  <div class="flex flex-row flex-wrap items-center">
    <div class="flex-grow basis-1/2">
      <WalletTabs />
    </div>
    <div class="flex-grow basis-1/2">
      <WalletBalances :wallet="props.wallet"> </WalletBalances>
    </div>
  </div>
</template>
