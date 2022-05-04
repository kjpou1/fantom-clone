export declare type SettingsState = {
  lastWallet: string | undefined; // name of last wallet used
  theme: string; // light or dark theme
  isDarkMode: boolean;
  isAutoDarkMode: boolean;
  currency: string | undefined;
  precision: number;
  language: string | undefined;
};
