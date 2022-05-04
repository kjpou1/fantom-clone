import { defineStore } from "pinia";
import type { SettingsState, WalletAccount } from "@/types/StateTypes";
import { ref, watch } from "vue";
import { useWalletsStore } from "./wallets";

// Local storage key names
const settings = {
  lastWallet: "last-wallet",
  theme: "dark-mode", // this is the localStorage key
  auto_theme: "auto-dark-mode",
  currency: "currency",
  precision: "precision",
  language: "language",
  registered_accounts: "registered_accounts",
};

const DEFAULT_CURRENCY = "EUR";
const DEFAULT_LANGUAGE = "English";
const DEFAULT_PRECISION = 2;
const DEFAULT_THEME = "light";

// Helper methods to load save items from local storage
const load = (key: string) => window.localStorage.getItem(key);
const save = (key: string, value: string) =>
  window.localStorage.setItem(key, value);
const remove = (key: string) => window.localStorage.removeItem(key);

export const useSettingsStore = defineStore({
  id: "settings",
  state: () =>
    ({
      lastWallet: undefined, // name of last wallet used
      theme: DEFAULT_THEME, // light or dark theme
      isDarkMode: false,
      isAutoDarkMode: false,
      currency: DEFAULT_CURRENCY,
      precision: DEFAULT_PRECISION,
      language: DEFAULT_LANGUAGE,
    } as SettingsState),
  getters: {
    currencyOptions(): string[] {
      return ["USD", "EUR"];
    },
    languageOptions(): string[] {
      return ["English"];
    },
  },
  actions: {
    async initializeSettings() {
      // Load settings
      this.lastWallet = load(settings.lastWallet)
        ? String(load(settings.lastWallet))
        : undefined;
      this.theme = load(settings.theme)
        ? String(load(settings.theme))
        : DEFAULT_THEME;
      this.isDarkMode = this.theme !== "light";
      const autoDarkMode = load(settings.auto_theme);
      this.isAutoDarkMode = autoDarkMode === "true" ? true : false;
      this.currency = load(settings.currency)
        ? String(load(settings.currency))
        : DEFAULT_CURRENCY;
      this.language = load(settings.language)
        ? String(load(settings.language))
        : DEFAULT_LANGUAGE;
      this.precision = load(settings.precision)
        ? Number.parseInt(String(load(settings.precision)))
        : DEFAULT_PRECISION;
      this.loadWallets();
    },
    loadWallets() {
      const storedAccounts = load(settings.registered_accounts);
      if (storedAccounts) {
        useWalletsStore().accounts = JSON.parse(storedAccounts);
      }
    },
    setLastWallet(walletName: string) {
      save(settings.lastWallet, walletName);
    },

    clearLastWallet() {
      remove(settings.lastWallet);
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.theme = this.isDarkMode ? "dark" : "light";
      save(settings.theme, this.theme);
    },
    toggleAutoDarkMode() {
      this.isAutoDarkMode = !this.isAutoDarkMode;
      save(settings.auto_theme, this.isAutoDarkMode.toString());
    },
    setCurrency(value: string) {
      this.currency = value;
      save(settings.currency, value);
    },
    setDecimalPositions(value: number) {
      this.precision = value;
      save(settings.precision, value.toString());
    },
    setLanguage(value: string) {
      this.language = value;
      save(settings.language, value);
    },
    saveAccounts(accounts: WalletAccount[]) {
      save(settings.registered_accounts, JSON.stringify(accounts));
    },
  },
});
