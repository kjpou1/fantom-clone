<script setup lang="ts">
import WalletSettings from "../modals/WalletSettings.vue";
import WalletQRCode from "../modals/WalletQRCode.vue";
import RemoveAccountConfirmation from "../modals/RemoveAccountConfirmation.vue";

import IconCopy from "../icons/IconCopyLarge.vue";
import IconShowQR from "../icons/IconShowQR.vue";
import IconEdit from "../icons/IconEdit.vue";
import IconLeave from "../icons/IconLeave.vue";

import ButtonWithRoundImage from "../ui/ButtonWithRoundImage.vue";
import { useClipboard } from "@/composables/clipboard";
import type { WalletAccount } from "@/types/StateTypes";
import { useModalsStore } from "@/stores/modals";
import { useWalletsStore } from "@/stores/wallets";
import SelectWallet from "../modals/SelectWallet.vue";

const props = defineProps<{
  wallet: WalletAccount;
}>();

const useModals = useModalsStore();
const useWallets = useWalletsStore();

const copyMe = async () => {
  const { copyTextToClipboard } = useClipboard();
  await copyTextToClipboard(props.wallet.account ?? "");
  console.log("Address copied to clipboard.");
};

const showQR = () => {
  useWallets.addressForQRCode = props.wallet.account ?? "";
  useModals.showQRCode = true;
};

const editMe = (evt: Event) => {
  evt.preventDefault();
  evt.stopPropagation();
  useModals.editWallet(props.wallet);
};

const removeWalletInfo = () => {
  if (props.wallet) {
    useModals.showRemoveConfirmation = true;
  }
};

const remove = () => {
  if (props.wallet) {
    useWallets.removeWallet(props.wallet);
  }
  useModals.showWalletSettings = false;
  useModals.showRemoveConfirmation = false;
};

const selectWallet = () => {
  console.log("select wallet");
  useModals.showSelectWallet = true;
};
</script>

<template>
  <div class="flex flex-row flex-wrap items-center cursor-pointer">
    <div class="basis-2/3" @click.prevent="selectWallet">
      <div class="font-medium flex flex-col pb-4">
        <span class="pr-4">
          {{ props.wallet.name }}
        </span>
      </div>
    </div>

    <div class="basis-1/3">
      <div class="flex flex-row justify-end">
        <ButtonWithRoundImage
          title=""
          size="btn-lg"
          text_class=""
          icon_class="bg-transparent hover:bg-light_btn_hover text-light_btn"
          @click="copyMe"
        >
          <IconCopy />
        </ButtonWithRoundImage>
        <ButtonWithRoundImage
          title=""
          size="btn-lg"
          text_class=""
          icon_class="bg-transparent hover:bg-light_btn_hover text-light_btn"
          @click="showQR"
        >
          <IconShowQR />
        </ButtonWithRoundImage>
        <ButtonWithRoundImage
          title=""
          size="btn-lg"
          text_class=""
          icon_class="bg-transparent hover:bg-light_btn_hover text-light_btn"
          @click="editMe"
        >
          <IconEdit />
        </ButtonWithRoundImage>
        <ButtonWithRoundImage
          title=""
          size="btn-lg"
          text_class=""
          icon_class="bg-transparent hover:bg-light_btn_hover text-light_btn"
          @click="removeWalletInfo"
        >
          <IconLeave />
        </ButtonWithRoundImage>
      </div>
    </div>
    <WalletSettings v-if="useModals.isShowWalletSettings.value" />
    <WalletQRCode v-if="useModals.isShowQRCode.value" />
    <RemoveAccountConfirmation
      :wallet="wallet!"
      v-if="useModals.isShowRemoveConfirmation.value"
      @remove-account="remove"
    />
  </div>
  <SelectWallet v-if="useModals.isShowSelectWallet.value" />
</template>
