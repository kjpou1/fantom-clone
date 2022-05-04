<script setup lang="ts">
import IconConnectWallet from "../icons/IconConnectWallet.vue";
import IconCreateWallet from "../icons/IconCreateWallet.vue";
import IconRestoreWallet from "../icons/IconRestoreWallet.vue";

import ConnectWallet from "../modals/ConnectWallet.vue";
import CreateWallet from "../modals/CreateWallet.vue";
import RestoreWallet from "../modals/RestoreWallet.vue";

import { useModalsStore } from "../../stores/modals";
import ButtonWithRoundImage from "../ui/ButtonWithRoundImage.vue";

const useModals = useModalsStore();
const { isShowConnectWallet, isShowCreateWallet, isShowRestoreWallet } =
  useModals;

//max-w-[80px] flex w-[2.75rem] text-center min-w-[80px] cursor-pointer text-sm break-words leading-4
</script>

<template>
  <div>
    <ul
      class="list-none gap-8 flex text-sm break-words text-center cursor-pointer leading-4"
    >
      <li>
        <ButtonWithRoundImage
          title="Connect Wallet"
          text_class="text-[#ec6597] max-w-[80px]"
          icon_class="bg-[#ec6597] hover:bg-[#e01b64]"
          @click="useModals.showConnectWallet = true"
        >
          <IconConnectWallet />
        </ButtonWithRoundImage>
      </li>
      <li>
        <ButtonWithRoundImage
          title="Create Wallet"
          text_class="text-[#0ebec2]  max-w-[80px]"
          icon_class="bg-[#0ebec2] hover:bg-[#0a8e91]"
          @click="useModals.showCreateWallet = true"
        >
          <IconCreateWallet />
        </ButtonWithRoundImage>
      </li>
      <li>
        <ButtonWithRoundImage
          title="Restore Wallet"
          text_class="text-[#6665dd]  max-w-[80px]"
          icon_class="bg-[#6665dd] hover:bg-[#2c2bc5]"
          @click="useModals.showRestoreWallet = true"
        >
          <IconRestoreWallet />
        </ButtonWithRoundImage>
      </li>
    </ul>
  </div>
  <ConnectWallet v-if="isShowConnectWallet" />
  <CreateWallet v-if="isShowCreateWallet" />
  <RestoreWallet v-if="isShowRestoreWallet" />
</template>
