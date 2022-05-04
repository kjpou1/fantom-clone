import type { BigNumber } from "@/utils/deps";

export declare type WalletAccount = {
  account: string;
  name: string;
  type: string;
  order: number;
  available: BigNumber;
  total: BigNumber;
};
