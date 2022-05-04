<script setup lang="ts">
import ModalPanel from "./ModalPanel.vue";
import IconCopy from "../icons/IconCopyLarge.vue";
import IconShowQR from "../icons/IconShowQR.vue";
import ButtonWithRoundImage from "../ui/ButtonWithRoundImage.vue";
import ButtonPrimary from "../ui/ButtonPrimary.vue";
import ButtonSecondary from "../ui/ButtonSecondary.vue";

import { useModalsStore } from "@/stores/modals";
import { useWalletsStore } from "@/stores/wallets";
import { ref } from "vue";
import WalletQRCode from "./WalletQRCode.vue";
import { useClipboard } from "@/composables/clipboard";
import RemoveAccountConfirmation from "./RemoveAccountConfirmation.vue";
const walletSettingsForm = ref(null);

const useModals = useModalsStore();
const name = ref();
const order = ref();
const useWallets = useWalletsStore();
const { editingWallet: wallet } = useModals;
if (wallet) {
  name.value = wallet.name;
  order.value = wallet.order;
}
const maxOrder = useWallets.accounts?.length;
const helpText = `Enter a number between 1 and ${maxOrder}.`;
const orderValidation = `required|number|between:1,${maxOrder}`;

const copyMe = async () => {
  const { copyTextToClipboard } = useClipboard();
  await copyTextToClipboard(wallet?.account ?? "");
  console.log("Address copied to clipboard.");
};

const showQR = () => {
  useWallets.addressForQRCode = wallet?.account ?? "";
  useModals.showQRCode = true;
};

const saveWalletInfo = (values: Record<string, unknown>) => {
  if (wallet) {
    const newWallet = {
      ...wallet,
    };
    newWallet.name = values.name as string;
    newWallet.order = Number.parseInt(values.order as string);
    useWallets.saveWallet(newWallet);
  }
};

const removeWalletInfo = () => {
  if (wallet) {
    useModals.showRemoveConfirmation = true;
  }
};

const submitForm = (evt: Event) => {
  if (walletSettingsForm.value) {
    evt.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { node } = walletSettingsForm.value as any;
    node?.submit();
  }
};

const remove = () => {
  if (wallet) {
    useWallets.removeWallet(wallet);
  }
  useModals.showWalletSettings = false;
  useModals.showRemoveConfirmation = false;
};
</script>

<template>
  <!-- WalletSettings Modal -->
  <ModalPanel
    header_class=""
    size="xl"
    @close-modal="useModals.showWalletSettings = false"
  >
    <template #heading>Wallet Settings</template>
    <template #body>
      <div
        class="flex flex-grow flex-col place-content-center px-10 pb-10 text-base font-light text-[#2b3954]dark:text-white"
      >
        <div class="font-medium flex flex-col pb-4">
          <span>Address</span>
          <div class="flex flex-row items-center">
            <span class="pr-4">
              {{ wallet?.account }}
            </span>
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
          </div>
        </div>
        <div class="flex flex-col pb-4">
          <span>Type</span>
          <span>{{ wallet?.type }}</span>
        </div>
        <FormKit
          type="form"
          ref="walletSettingsForm"
          :actions="false"
          @submit="saveWalletInfo"
        >
          <FormKit
            type="text"
            name="name"
            v-model="name"
            label="Name"
            validation="required|name"
            minlength="1"
            placeholder="Name"
            wrapper-class="max-w-none"
            input-class="text-[#2b3954] dark:text-white"
            help-class="text-[#2b3954] dark:text-white"
          />
          <FormKit
            type="number"
            name="order"
            v-model="order"
            label="Display Order"
            placeholder="Order is required"
            :validation="orderValidation"
            :help="helpText"
            step="1"
            min="1"
            :max="maxOrder"
            wrapper-class="max-w-none"
            input-class="text-black dark:text-white"
            help-class="text-black dark:text-white"
          />
          <div
            class="flex flex-shrink-0 flex-wrap gap-2 items-center justify-center p-4 border-t border-gray-200 rounded-b-md"
          >
            <ButtonSecondary type="button" @click="removeWalletInfo">
              Remove Wallet ...
            </ButtonSecondary>
            <ButtonPrimary type="submit" @click="submitForm"
              >Save</ButtonPrimary
            >
          </div>
        </FormKit>
      </div>
    </template>
  </ModalPanel>
  <WalletQRCode v-if="useModals.isShowQRCode.value" />
  <RemoveAccountConfirmation
    :wallet="wallet!"
    v-if="useModals.isShowRemoveConfirmation.value"
    @remove-account="remove"
  />
</template>
