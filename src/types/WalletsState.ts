import type { Web3Provider } from "../utils/deps";
import type { WalletListEntry } from "./WalletListEntry";
import type { WalletAccount } from "./WalletAccount";

export declare type WalletsState = {
  walletsList: WalletListEntry[];
  walletConnecting: boolean;
  provider: Web3Provider | null;
  accounts: WalletAccount[] | null;
  loadedAccounts: string[] | null;
  networkId: number;
  chainId: string | null;
  editingWallet: WalletAccount | null;
  addressForQRCode: string;
};
