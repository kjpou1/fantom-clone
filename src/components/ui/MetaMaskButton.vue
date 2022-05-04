<script setup lang="ts">
import IconMetaMask from "../icons/IconMetaMask.vue";
import PulseLoader from "./loaders/PulseLoader.vue";
import { useWalletsStore } from "@/stores/wallets";
import { watch, ref, onMounted } from "vue";

const useWallet = useWalletsStore();

const waitingOnWallet = ref(false);
onMounted(() => {
  watch(useWallet.isWalletConnecting, (after) => {
    waitingOnWallet.value = after;
  });
});
</script>

<template>
  <template v-if="!waitingOnWallet">
    <IconMetaMask />
  </template>
  <template v-else>
    <PulseLoader :loading="waitingOnWallet" />
  </template>
</template>
