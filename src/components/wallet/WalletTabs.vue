<script setup lang="ts">
import ButtonWithRoundImage from "../ui/ButtonWithRoundImage.vue";
import { useModalsStore } from "@/stores/modals";
import { WalletTabs } from "@/types/StateTypes";
import IconWalletHome from "../icons/IconWalletHome.vue";
import IconSend from "../icons/IconSend.vue";
import IconReceive from "../icons/IconReceive.vue";
import { ref } from "vue";

const useModals = useModalsStore();
const currentTab = ref(WalletTabs.Wallet);
useModals.walletTabIndex = currentTab.value;
const notSelected =
  "bg-transparent hover:bg-light_btn_hover hover:dark:bg-[#3e425b] outline transition-background-color duration-1000 ease-in-out";
const selected =
  "bg-light_btn hover:bg-blue-700 text-white transition-background-color duration-1000 ease-in-out";

const walletTabClass = ref(
  currentTab.value === WalletTabs.Wallet ? notSelected : selected
);
const sendTabClass = ref(
  currentTab.value === WalletTabs.Send ? notSelected : selected
);
const receiveTabClass = ref(
  currentTab.value === WalletTabs.Receive ? notSelected : selected
);

const updateTab = (tab: WalletTabs) => {
  useModals.walletTabIndex = tab;
  currentTab.value = tab;
  walletTabClass.value =
    currentTab.value === WalletTabs.Wallet ? notSelected : selected;
  sendTabClass.value =
    currentTab.value === WalletTabs.Send ? notSelected : selected;
  receiveTabClass.value =
    currentTab.value === WalletTabs.Receive ? notSelected : selected;
};
</script>

<template>
  <div>
    <ul
      class2="list-none flex justify-evenly text-sm break-words text-center cursor-pointer leading-4"
      class="list-none flex text-center cursor-pointer text-sm break-words leading-4 text-light_btn"
    >
      <li class="min-w-[80px]">
        <ButtonWithRoundImage
          title="Wallet"
          text_class="text-light_btn"
          :icon_class="walletTabClass"
          @click="updateTab(WalletTabs.Wallet)"
        >
          <IconWalletHome />
        </ButtonWithRoundImage>
      </li>
      <li class="ml-4 min-w-[80px]">
        <ButtonWithRoundImage
          title="Send"
          text_class="text-light_btn"
          :icon_class="sendTabClass"
          @click="updateTab(WalletTabs.Send)"
        >
          <IconSend />
        </ButtonWithRoundImage>
      </li>
      <li class="ml-4 pr-0 min-w-[80px]">
        <ButtonWithRoundImage
          title="Receive"
          text_class="text-light_btn"
          :icon_class="receiveTabClass"
          @click="updateTab(WalletTabs.Receive)"
        >
          <IconReceive />
        </ButtonWithRoundImage>
      </li>
    </ul>
  </div>
</template>
