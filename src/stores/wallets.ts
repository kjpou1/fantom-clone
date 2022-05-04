import { defineStore } from "pinia";
import type { WalletAccount, WalletsState } from "@/types/StateTypes";
import { computed, markRaw } from "vue";
import WalletService from "@/services/walletService";
//import type Web3 from "web3";
import IconLedger from "../components/icons/IconLedger.vue";
import IconCoinbaseWallet from "../components/icons/IconCoinbaseWallet.vue";
import IconWalletConnect from "../components/icons/IconWalletConnect.vue";
import MetaMaskButton from "../components/ui/MetaMaskButton.vue";
import { useModalsStore } from "./modals";
import { useSettingsStore } from "./settings";
import { BigNumber } from "@/utils/deps";

const walletNames = {
  metamask: "Metamask",
  ledger: "Ledger",
  coinbase: "Coinbase Wallet",
  wallet_connect: "Wallet Connect",
};
export const useWalletsStore = defineStore({
  id: "wallets",
  state: () =>
    ({
      walletsList: markRaw([
        { name: walletNames.metamask, image: MetaMaskButton },
        { name: walletNames.ledger, image: IconLedger },
        { name: walletNames.coinbase, image: IconCoinbaseWallet },
        { name: walletNames.wallet_connect, image: IconWalletConnect },
      ]),
      walletConnecting: false,
      provider: null,
      accounts: [],
      loadedAccounts: null,
      networkId: 0,
      // https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
      chainId: null, // A 0x-prefixed hexadecimal string
      editingWallet: null,
      addressForQRCode: "",
    } as WalletsState),
  getters: {
    isWalletConnecting: (state) => computed(() => state.walletConnecting),
    orderedWallets(): WalletAccount[] {
      return this.accounts?.sort((a, b) => a.order - b.order) ?? [];
    },
  },
  actions: {
    async delay(ms?: number | undefined) {
      await new Promise((resolve) => setTimeout(resolve, ms ?? 0));
    },
    async connect(name: string) {
      console.log("connecting to ", name);
      this.walletConnecting = true;
      switch (name) {
        case walletNames.metamask:
          await this.loadAccounts();
          break;
        case walletNames.ledger:
          console.log("ledger me");
          break;
        case walletNames.coinbase:
          console.log("coinbase me");
          break;
        case walletNames.wallet_connect:
          console.log("wallet connect me");
          break;
      }
    },
    async initializeWallet() {
      const provider = await WalletService.initializeWallet(
        this.changeActionListener
      );
      if (provider) {
        // Use markRaw here or errors will be thrown in browser console
        // related to synchronization of blocks
        this.provider = markRaw(provider);
        return this.provider;
      }
      return null;
    },
    createWalletEntry(
      account: string,
      order: number,
      type = "MetaMask"
    ): WalletAccount {
      const newWallet: WalletAccount = {
        account: account,
        name: `Wallet ${order}`,
        type,
        order,
        available: BigNumber.from(0),
        total: BigNumber.from(0),
      };
      return newWallet;
    },
    async loadAccounts() {
      const loadedAccounts = await WalletService.loadAccounts();
      const newAccounts: WalletAccount[] = [];
      let order = 1;
      for (const acct of loadedAccounts ?? []) {
        if (
          this.accounts &&
          this.accounts?.findIndex((e) => e.account === acct) < 0
        ) {
          const newWallet = this.createWalletEntry(acct, order++);
          newAccounts.push(newWallet);
        }
      }
      if (newAccounts.length > 0) {
        this.loadedAccounts = loadedAccounts;
        useModalsStore().showAccountConfirmation = true;
      } else {
        useModalsStore().showConnectWallet = false;
      }
      this.walletConnecting = false;
      return this.accounts;
    },
    async changeActionListener(event: string, payload?: unknown) {
      switch (event) {
        case "networkChanged":
          this.networkId = parseInt(payload as string, 10);
          break;
        case "chainChanged":
          this.chainId = payload as string;
          break;
        case "block":
          await this.updateWalletBalances();
          break;
      }
    },
    addConfirmedAccount(account: string | null | undefined) {
      if (!account) {
        return;
      }
      if (this.accounts) {
        const newWallet = this.createWalletEntry(
          account,
          this.accounts.length + 1
        );
        this.accounts.push(newWallet);
        useSettingsStore().saveAccounts(this.accounts);
      }
    },
    async getBalance(account: string): Promise<BigNumber> {
      const balance = await WalletService.getBalance(account);
      return balance ?? BigNumber.from(0);
    },
    async updateWalletBalances() {
      if (this.accounts) {
        for (const wallet of this.accounts) {
          const balance = await this.getBalance(wallet.account);
          wallet.available = balance;
          wallet.total = balance;
        }
      }
    },
    saveWallet(wallet: WalletAccount) {
      if (this.accounts) {
        const index = this.accounts?.findIndex(
          (e) => e.account === wallet.account
        );
        if (index > -1) {
          const originalOrder = this.accounts[index].order;
          if (originalOrder != wallet.order) {
            const replaceIndex = this.accounts?.findIndex(
              (e) => e.order === wallet.order
            );
            if (replaceIndex > -1) {
              this.accounts[replaceIndex].order = originalOrder;
            }
          }

          this.accounts[index].name = wallet.name;
          this.accounts[index].order = wallet.order;
        }
        useSettingsStore().saveAccounts(this.accounts);
        useSettingsStore().loadWallets();
        useModalsStore().showWalletSettings = false;
      }
    },
    removeWallet(wallet: WalletAccount) {
      if (this.accounts) {
        const index = this.accounts?.findIndex(
          (e) => e.account === wallet.account
        );
        if (index > -1) {
          this.accounts.splice(index, 1);
        }
        useSettingsStore().saveAccounts(this.accounts);
        useModalsStore().showWalletSettings = false;
      }
    },
  },
});
