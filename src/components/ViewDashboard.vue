<script setup lang="ts">
import DashboardHeader from "./dashboard/DashboardHeader.vue";
import ViewCard from "./ui/ViewCard.vue";
import { useWalletsStore } from "@/stores/wallets";

import WalletListItem from "./wallets/WalletListItem.vue";
import WalletSettings from "./modals/WalletSettings.vue";
import ContentWrapper from "./ui/ContentWrapper.vue";
import { useModalsStore } from "@/stores/modals";

const useWallets = useWalletsStore();
const useModals = useModalsStore();
</script>

<template>
  <ContentWrapper>
    <ViewCard>
      <template #header>Home</template>
      <template #body>
        <DashboardHeader />
      </template>
    </ViewCard>
    <main>
      <section>
        <div class="pt-7 text-3xl font-bold mb-5">
          <p class="text-3xl font-bold mb-5 font-sans-serif">
            Wallets
            <span class="text-neutral_text">
              ({{ useWallets.accounts.length }})
            </span>
          </p>
          <template
            v-for="(wallet, index) in useWallets.orderedWallets"
            :key="wallet"
          >
            <Suspense>
              <WalletListItem :wallet="wallet" :index="index" />
            </Suspense>
          </template>
          <WalletSettings v-if="useModals.isShowWalletSettings.value" />
        </div>
      </section>
      <section></section>
    </main>
  </ContentWrapper>
</template>
