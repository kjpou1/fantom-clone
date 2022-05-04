<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import AddAccount from "../wallets/AddAccount.vue";
import { useModalsStore } from "@/stores/modals";

const useModals = useModalsStore();
</script>

<template>
  <!-- AddAccountConfirmation Modal -->
  <ModalPanel
    header_class=""
    state="showAccountConfirmation"
    controller="isShowAccountConfirmation"
  >
    <template #heading>Add Metamask Account</template>
    <template #body>
      <AddAccount />
    </template>
  </ModalPanel>
</template>
