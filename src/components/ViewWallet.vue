<script setup lang="ts">
import ViewCard from "./ui/ViewCard.vue";
import WalletItem from "./wallet/WalletItem.vue";
import WalletTabView from "./wallet/WalletTabView.vue";
import WalletSendView from "./wallet/WalletSendView.vue";
import WalletReceiveView from "./wallet/WalletReceiveView.vue";
import ContentWrapper from "./ui/ContentWrapper.vue";

import { useWalletsStore } from "@/stores/wallets";
import { useRoute } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import type { WalletAccount } from "@/types/StateTypes";
import WalletAccountHeader from "./wallet/WalletAccountHeader.vue";

const useWallets = useWalletsStore();
const route = useRoute();

let wallet: Ref<WalletAccount> = ref<WalletAccount>(
  useWallets.createWalletEntry("", -1)
);
onMounted(() => {
  const address = route.params.address;
  wallet.value =
    useWallets.accounts?.find((o) => o.account === address) ?? wallet.value;
});
</script>

<template>
  <ContentWrapper class="overflow-hidden relative">
    <ViewCard>
      <template #header>
        <WalletAccountHeader :wallet="wallet" />
      </template>
      <template #body>
        <WalletItem :wallet="wallet" />
      </template>
    </ViewCard>
    <main>
      <section>
        <WalletTabView />
      </section>
      <section>
        <WalletSendView />
      </section>
      <section>
        <WalletReceiveView />
      </section>
    </main>
  </ContentWrapper>
</template>
