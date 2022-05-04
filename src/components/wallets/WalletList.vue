<script setup lang="ts">
import { useWalletsStore } from "@/stores/wallets";
import { useModalsStore } from "@/stores/modals";
import AddAccountConfirmation from "../modals/AddAccountConfirmation.vue";
import { watch } from "vue";
import { onMounted, ref } from "vue";

const useWallets = useWalletsStore();
const useModals = useModalsStore();
const connectWallet = (name: string) => {
  if (!useWallets.isWalletConnecting.value) {
    useWallets.connect(name);
  }
};

const waitingOnAccount = ref(false);
onMounted(() => {
  watch(useModals.isShowAccountConfirmation, (after) => {
    waitingOnAccount.value = after;
  });
});
</script>

<template>
  <div class="pt-8 pb-12 px-24 text-black dark:text-white">
    <ul>
      <li v-for="wallet in useWallets.walletsList" :key="wallet.name">
        <div
          class="flex flex-row flex-wrap items-center py-1 px-6 mb-6 rounded-lg transition-colors duration-250 bg-light_wallet_list hover:bg-light_wallet_list_hover dark:bg-dark_wallet_list dark:hover:bg-dark_wallet_list_hover cursor-pointer"
          @click="connectWallet(wallet.name)"
        >
          <div class="basis-0 flex-grow max-w-full p-2">
            {{ wallet.name }}
          </div>
          <span>
            <component :is="wallet.image" />
          </span>
        </div>
      </li>
    </ul>
  </div>
  <AddAccountConfirmation v-if="useModals.isShowAccountConfirmation.value" />
</template>
