<script setup lang="ts">
import BalanceColumn from "../ui/BalanceColumn.vue";
</script>

<template>
  <div class="flex flex-grow basis-0 dark:text-white">
    <Suspense>
      <!-- Available -->
      <div class="flex-1">
        <BalanceColumn account="" type="available">
          <template #title>Available (Sum)</template>
        </BalanceColumn>
      </div>
    </Suspense>
    <Suspense>
      <!-- Total Balance -->
      <div class="flex-1">
        <BalanceColumn account="" type="total">
          <template #title>Total (Sum)</template>
        </BalanceColumn>
      </div>
    </Suspense>
  </div>
</template>
