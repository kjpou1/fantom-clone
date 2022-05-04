<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import WalletList from "../wallets/WalletList.vue";
import { useModalsStore } from "@/stores/modals";
import { onMounted, ref, watch } from "vue";
import AddAccountConfirmation from "./AddAccountConfirmation.vue";

const useModals = useModalsStore();
const waitingOnAccount = ref(false);
onMounted(() => {
  watch(useModals.isShowAccountConfirmation, (after) => {
    waitingOnAccount.value = after;
  });
});
</script>

<template>
  <!-- ConnectWallet Modal -->
  <ModalPanel
    header_class=""
    :show="useModals.isShowConnectWallet"
    :class="{ [`w-0`]: useModals.isShowAccountConfirmation.value }"
    @close-modal="useModals.showConnectWallet = false"
  >
    <template #heading>Connect Wallet</template>
    <template #body>
      <WalletList />
    </template>
  </ModalPanel>
  <AddAccountConfirmation v-if="useModals.isShowAccountConfirmation.value" />
</template>
