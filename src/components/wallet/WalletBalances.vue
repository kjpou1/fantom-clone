<script setup lang="ts">
import type { WalletAccount } from "@/types/StateTypes";
import BalanceColumn from "../ui/BalanceColumn.vue";

const props = defineProps<{
  wallet: WalletAccount;
}>();
</script>

<template>
  <div class="flex flex-grow basis-0 dark:text-white">
    <Suspense>
      <!-- Available -->
      <div class="flex-1">
        <BalanceColumn
          :account="props.wallet.account"
          type="available"
          level="2"
        >
          <template #title>Available (Sum)</template>
        </BalanceColumn>
      </div>
    </Suspense>
    <Suspense>
      <!-- Total Balance -->
      <div class="flex-1">
        <BalanceColumn :account="props.wallet.account" type="total" level="2">
          <template #title>Total (Sum)</template>
        </BalanceColumn>
      </div>
    </Suspense>
  </div>
</template>
