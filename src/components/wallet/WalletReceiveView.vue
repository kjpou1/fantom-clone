<script setup lang="ts">
import ViewCard from "../ui/ViewCard.vue";
import TransitionSlide from "@/components/ui/transitions/TransitionSlide.vue";
import { useModalsStore } from "@/stores/modals";
import { WalletTabs } from "@/types/StateTypes";

const useModals = useModalsStore();
const { whichWalletTab } = useModals;
</script>

<template>
  <TransitionSlide>
    <ViewCard class="RECEIVE" v-if="whichWalletTab === WalletTabs.Receive">
      <template #header>Receive Transaction ETH</template>
      <template #body>
        <p>Hic sunt animations</p>
      </template>
    </ViewCard>
  </TransitionSlide>
</template>
