<script setup lang="ts">
import ViewCard from "./ui/ViewCard.vue";
import SettingsWallet from "./settings/SettingsWallet.vue";
import ContentWrapper from "./ui/ContentWrapper.vue";
</script>
<template>
  <ContentWrapper>
    <main class="pt-8">
      <h1 class="mt-2 text-4xl text-center">Settings</h1>
      <ViewCard>
        <template #header>Wallet</template>
        <template #body>
          <SettingsWallet />
        </template>
      </ViewCard>
    </main>
  </ContentWrapper>
</template>
