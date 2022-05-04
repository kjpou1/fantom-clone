<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import QRCodeVue from "../ui/QRCode.vue";
import { useModalsStore } from "@/stores/modals";
import { useWalletsStore } from "@/stores/wallets";

const useModals = useModalsStore();
const useWallets = useWalletsStore();

console.log(useWallets.addressForQRCode);
</script>

<template>
  <!-- WalletQRCode Modal -->
  <ModalPanel header_class="" @close-modal="useModals.showQRCode = false">
    <template #heading>Address</template>
    <template #body>
      <div
        class="flex flex-grow flex-col place-content-center px-10 pb-10 text-base font-light text-[#2b3954] dark:text-white"
      >
        <div class="font-medium flex flex-col pb-4 justify-center items-center">
          <span class="pr-4 text-lg">
            {{ useWallets.addressForQRCode }}
          </span>
          <div class="pt-8">
            <div class="p-2 bg-white">
              <QRCodeVue :value="useWallets.addressForQRCode" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalPanel>
</template>
