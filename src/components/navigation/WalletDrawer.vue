<script setup lang="ts">
import IconHome from "../icons/IconHome.vue";
import IconWallet from "../icons/IconWallet.vue";
import IconStaking from "../icons/IconStaking.vue";
import IconMint from "../icons/IconMint.vue";
import IconSwap from "../icons/IconSwap.vue";
import IconUNI from "../icons/IconUNI.vue";
import IconGovernance from "../icons/IconGovernance.vue";
import IconSettings from "../icons/IconSettings.vue";

// fill: none stroke:currentColor
const navigation = [
  {
    name: "Home",
    href: { name: "home" },
    index: 0,
    component: IconHome,
  },
  {
    name: "Wallet",
    href: { name: "wallet" },
    index: 1,
    component: IconWallet,
  },
  {
    name: "Staking",
    href: { name: "staking" },
    index: 2,
    component: IconStaking,
  },
  {
    name: "fMint",
    href: { name: "fmint" },
    index: 3,
    component: IconMint,
  },
  { name: "fSwap", href: { name: "fswap" }, index: 4, component: IconSwap },
  { name: "fUni", href: { name: "funi" }, index: 5, component: IconUNI },
  {
    name: "Governance",
    href: { name: "governance" },
    index: 6,
    component: IconGovernance,
  },
  {
    name: "Settings",
    href: { name: "settings" },
    index: 7,
    component: IconSettings,
  },
];
</script>

<template>
  <nav class="flex flex-col items-center justify-between">
    <router-link
      v-for="link in navigation"
      :key="link.name"
      :to="link.href"
      exact
      class="text-wallet_link hover:text-wallet_link_hover w-full min-h-"
    >
      <!-- <div class="flex flex-wrap px-6 py-6 text-sm  sm:justify-center"> -->
      <div class="flex flex-wrap px-6 py-6 text-sm items-center">
        <component
          class="fill-current min-w-[32px] min-h-[32px]"
          :is="link.component"
        />
        <span class="ml-4 font-drawer_menu">{{ link.name }}</span>
      </div>
    </router-link>
  </nav>
</template>
