import type { WalletAccount, WalletTabs } from "./StateTypes";

export declare type ModalsState = {
  showConnectWallet: boolean;
  showCreateWallet: boolean;
  showRestoreWallet: boolean;
  showAccountConfirmation: boolean;
  showRemoveConfirmation: boolean;
  showWalletSettings: boolean;
  showSelectWallet: boolean;
  showQRCode: boolean;
  editingWallet: WalletAccount | null;
  walletTabIndex: WalletTabs;
};
