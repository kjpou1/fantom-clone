<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import { useModalsStore } from "@/stores/modals";
const useModals = useModalsStore();
</script>

<template>
  <!-- CreateWallet Modal -->
  <ModalPanel
    header_class="bg-[#0ebec2]"
    @close-modal="useModals.showCreateWallet = false"
  >
    <template #heading>Create Wallet</template>
    <template #body>
      <h1>Hello</h1>
    </template>
  </ModalPanel>
</template>
