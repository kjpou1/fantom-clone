<script setup lang="ts">
import ViewCard from "../ui/ViewCard.vue";
import TransitionSlide from "@/components/ui/transitions/TransitionSlide.vue";

import { useModalsStore } from "@/stores/modals";
import { WalletTabs } from "@/types/StateTypes";
import { ref } from "vue";
import WalletTransactions from "./wallet/WalletTransactions.vue";
import WalletAssets from "./wallet/WalletAssets.vue";

const useModals = useModalsStore();

const { whichWalletTab } = useModals;

enum Tabs {
  Transactions,
  Assets,
}
let currentIndex = ref(Tabs.Transactions);

const changeTab = (which: Tabs) => {
  currentIndex.value = which;
};
</script>

<template>
  <TransitionSlide>
    <ViewCard class="WALLET" v-if="whichWalletTab === WalletTabs.Wallet">
      <template #header>
        <div class="mx-4 border-b-2 border-gray-200 font-tabs">
          <ul class="flex flex-row gap-4 text-base font-normal mb">
            <li
              class="border-b-2 py-2 px-4 relative top-[2px] cursor-pointer"
              :class="[
                currentIndex === Tabs.Transactions
                  ? 'border-light_tab_hover'
                  : 'border-transparent hover:text-light_tab_hover',
              ]"
              @click="changeTab(Tabs.Transactions)"
            >
              Transactions
              <span class="text-gray-400">({{ currentIndex }})</span>
            </li>
            <li
              class="border-b-2 py-2 px-4 relative top-[2px] cursor-pointer"
              :class="[
                currentIndex === Tabs.Assets
                  ? 'border-light_tab_hover'
                  : 'border-transparent hover:text-light_tab_hover',
              ]"
              @click="changeTab(Tabs.Assets)"
            >
              Assets
              <span class="text-gray-400">({{ currentIndex }})</span>
            </li>
          </ul>
        </div>
      </template>
      <template #body>
        <div v-if="currentIndex === Tabs.Transactions">
          <WalletTransactions />
        </div>
        <div v-else-if="currentIndex === Tabs.Assets">
          <WalletAssets />
        </div>
      </template>
    </ViewCard>
  </TransitionSlide>
</template>
