<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import WalletMenu from "./components/navigation/WalletMenu.vue";
import { useWalletsStore } from "./stores/wallets";
import { useSettingsStore } from "./stores/settings";
import { storeToRefs } from "pinia";
import { usePriceStore } from "./stores/prices";

const wallets = useWalletsStore();
const { isDarkMode } = storeToRefs(useSettingsStore());

onMounted(async () => {
  const useSettings = useSettingsStore();
  useSettings.initializeSettings();
  await wallets.initializeWallet();
  await usePriceStore().initializePolling();
});

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen text-white select-none flex flex-row justify-between m-0 p0 b-0`,
};
</script>

<template>
  <main :class="{ dark: isDarkMode }">
    <div
      class="bg-light_secondary dark:bg-dark_secondary h-screen max-h-screen h-min-screen w-screen text-white select-none flex flex-row justify-between m-0 p0 b-0"
    >
      <WalletMenu></WalletMenu>
      <router-view v-slot="{ Component }">
        <transition name="route-scale" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style>
.route-fade-enter-from {
  opacity: 0;
  transform: translateX(00px);
}
.route-fade-enter-active {
  transition: all 0.3s ease-out;
}

.route-fade-leave-to {
  opacity: 0;
  transform: translateX(-0px);
}

.route-fade-leave-active {
  transition: all 0.3s ease-in;
}

.route-scale-enter-from {
  opacity: 0;
  transform: translateX(00px);
  transform: scale(000%);
}
.route-scale-enter-active {
  transition: all 0.3s ease-out;
}

.route-scale-leave-to {
  opacity: 0;
  transform: translateX(-0px);
  transform: scale(00%);
}

.route-scale-leave-active {
  transition: all 0.3s ease-in;
}

.route-fade-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.route-fade-slide-enter-active {
  transition: all 0.8s ease-out;
}

.route-fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.route-fade-slide-leave-active {
  transition: all 0.3s ease-in;
}
</style>
