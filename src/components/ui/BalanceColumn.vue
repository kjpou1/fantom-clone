formatBalance
<script setup lang="ts">
import { usePriceStore } from "@/stores/prices";
import { useWalletsStore } from "@/stores/wallets";
import { BigNumber, formatBalance } from "@/utils/deps";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  account: string;
  type: string;
  level?: string;
}>();

const balanceValue = ref("0");
const balanceCurrency = ref("ETH");
const balanceCurrencyValue = ref("0");
let balanceClass = "text-3xl";
let currencyClass = "text-sm";
let balCurrencyClass = "text-xl";
switch (props.level) {
  case "2":
    balanceClass = "text-2xl";
    currencyClass = "text-xs";
    balCurrencyClass = "text-normal";
    break;
  default: // level 1
    break;
}

const level = props.level ?? "1";
const usePrice = usePriceStore();
const useWallets = useWalletsStore();
onMounted(() => {
  watch(usePrice.isRatesUpdated, async () => {
    switch (level) {
      case "1":
        {
          let balAvailable = BigNumber.from(0);
          let balTotal = BigNumber.from(0);
          for (const wallet of useWallets.accounts ?? []) {
            balAvailable = balAvailable.add(wallet.available);
            balTotal = balTotal.add(wallet.total);
          }
          balanceValue.value = formatBalance(balTotal);
          const inCurr = usePrice.priceToCurrency(balTotal);
          const fmtCurr = formatBalance(inCurr, 2);
          balanceCurrencyValue.value = fmtCurr;
        }
        break;
      case "2":
        {
          const acct = useWallets.accounts?.find(
            (e) => e.account === props.account
          );
          if (acct) {
            const balTot = acct.available;
            balanceValue.value = formatBalance(balTot);
            const inCurr = usePrice.priceToCurrency(balTot);
            const fmtCurr = formatBalance(inCurr, 2);
            balanceCurrencyValue.value = fmtCurr;
          }
        }
        break;
      default:
        break;
    }
  });
});
</script>

<template>
  <div class="flex flex-grow basis-0 px-2 dark:text-white">
    <!-- Available -->
    <div class="flex-1 px-4">
      <span>
        <h3 class="font-bold flex items-baseline" :class="[balanceClass]">
          {{ balanceValue }}
          <p class="px-2" :class="[currencyClass]">
            {{ balanceCurrency }}
          </p>
        </h3>
        <span class="text-neutral_text" :class="[balCurrencyClass]">
          <p>{{ balanceCurrencyValue }}</p>
          <p>
            <slot name="title"></slot>
          </p>
        </span>
      </span>
    </div>
  </div>
</template>
