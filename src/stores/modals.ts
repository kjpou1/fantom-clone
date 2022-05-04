import { defineStore } from "pinia";
import {
  WalletTabs,
  type ModalsState,
  type WalletAccount,
} from "@/types/StateTypes";
import { computed, type ComputedRef } from "vue";
import { useWalletsStore } from "./wallets";

export const useModalsStore = defineStore({
  id: "modals",
  state: () =>
    ({
      showConnectWallet: false,
      showCreateWallet: false,
      showRestoreWallet: false,
      showAccountConfirmation: false,
      showRemoveConfirmation: false,
      showWalletSettings: false,
      showQRCode: false,
      showSelectWallet: false,
      editingWallet: null,
      walletTabIndex: WalletTabs.Wallet,
    } as ModalsState),
  getters: {
    isShowConnectWallet: (state) => computed(() => state.showConnectWallet),
    isShowCreateWallet: (state) => computed(() => state.showCreateWallet),
    isShowRestoreWallet: (state) => computed(() => state.showRestoreWallet),
    isShowAccountConfirmation: (state) =>
      computed(() => state.showAccountConfirmation),
    isShowWalletSettings: (state) => computed(() => state.showWalletSettings),
    isShowQRCode: (state) => computed(() => state.showQRCode),
    isShowRemoveConfirmation: (state) =>
      computed(() => state.showRemoveConfirmation),
    isShowSelectWallet: (state) => computed(() => state.showSelectWallet),
    whichWalletTab: (state) => computed(() => state.walletTabIndex),
    isWalletTabSelected(): ComputedRef<boolean> {
      return computed(() => this.walletTabIndex === WalletTabs.Wallet);
    },
  },
  actions: {
    async editWallet(wallet: WalletAccount) {
      if (useWalletsStore().accounts) {
        this.editingWallet = wallet;
        useModalsStore().showWalletSettings = true;
      }
    },
  },
});
