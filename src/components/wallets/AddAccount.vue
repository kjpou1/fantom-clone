<script setup lang="ts">
import WalletService from "@/services/walletService";
import { useModalsStore } from "@/stores/modals";
import { useWalletsStore } from "@/stores/wallets";

const useWallets = useWalletsStore();
const useModals = useModalsStore();

const { loadedAccounts } = useWallets;

let confirmAccount = loadedAccounts ? loadedAccounts?.pop() : null;

const addAccount = () => {
  console.log("confirm this account", confirmAccount);
  if (loadedAccounts && loadedAccounts.length > 0) {
    confirmAccount = loadedAccounts.pop();
  } else {
    useModals.showAccountConfirmation = false;
    useModals.showConnectWallet = false;
    useWallets.addConfirmedAccount(confirmAccount);
  }
};
</script>

<template>
  <div
    class="pt-8 pb-12 px-24 transition-colors duration-1000 text-dark_primary dark:text-light_primary"
  >
    <div id="text-body">
      <p class="text-center pb-6">
        Would you like to add account {{ confirmAccount }}?
      </p>
    </div>
    <div id="buttons" class="flex justify-center items-center">
      <button
        class="bg-light_button hover:bg_light_button_hover text-light_button_text rounded-full min-h-[2.75rem] py-2 px-11"
        @click="addAccount"
      >
        Add Account
      </button>
    </div>
  </div>
</template>
