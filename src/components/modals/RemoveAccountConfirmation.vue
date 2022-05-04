<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import RemoveAccount from "../wallets/RemoveAccount.vue";
import { useModalsStore } from "@/stores/modals";
import type { WalletAccount } from "@/types/WalletAccount";

const props = defineProps<{
  wallet: WalletAccount;
}>();

const useModals = useModalsStore();
</script>

<template>
  <!-- RemoveAccountConfirmation Modal -->
  <ModalPanel
    header_class=""
    @close-modal="useModals.showRemoveConfirmation = false"
  >
    <template #heading>Remove Wallet</template>
    <template #body>
      <RemoveAccount
        :wallet="props.wallet"
        @remove-account="(e) => $emit('remove-account', e)"
      />
    </template>
  </ModalPanel>
</template>
