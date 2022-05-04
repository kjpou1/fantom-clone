<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import { useModalsStore } from "@/stores/modals";
const useModals = useModalsStore();
</script>

<template>
  <!-- CreateWallet Modal -->
  <ModalPanel
    header_class="bg-[#6665dd]"
    @close-modal="useModals.showRestoreWallet = false"
  >
    <template #heading>Restore Wallet</template>
    <template #body>
      <h1>Restore</h1>
    </template>
  </ModalPanel>
</template>
