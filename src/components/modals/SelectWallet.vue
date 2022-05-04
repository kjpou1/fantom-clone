<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import WalletListItem from "../wallets/WalletListItem.vue";
import { useModalsStore } from "@/stores/modals";
import { useWalletsStore } from "@/stores/wallets";
const useModals = useModalsStore();
const useWallets = useWalletsStore();
const closeitup = () => {
  useModals.showSelectWallet = false;
};
</script>

<template>
  <!-- SelectWallet Modal -->
  <ModalPanel header_class="" size="5xl" @close-modal="closeitup">
    <template #heading>Select Wallet</template>
    <template #body>
      <div class="-mt-6 pb-4">
        <template
          v-for="(wallet, index) in useWallets.orderedWallets"
          :key="wallet"
        >
          <Suspense>
            <WalletListItem class="mx-8" :wallet="wallet" :index="index" />
          </Suspense>
        </template>
      </div>
    </template>
  </ModalPanel>
</template>
