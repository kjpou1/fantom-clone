import { useWalletsStore } from "@/stores/wallets";
import detectEthereumProvider from "@metamask/detect-provider";
import { BigNumber, providers, Web3Provider } from "../utils/deps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { ethereum } = <any>window;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type ListenerCallback = (...args: any[]) => void;

class WalletService {
  static async initializeWallet(changeActionListener: ListenerCallback) {
    const provider = await detectEthereumProvider();
    // modern browsers
    // if there is a provider then lets
    // log that it is working and access the window from document
    // to set Web3 to the provider
    if (provider) {
      const web3Provider = await WalletService.startApp({
        provider,
        changeActionListener,
      });
      return web3Provider;
    } else {
      // no ethereum provider
      console.log("no ethereum wallet detected");
    }
    return null;
  }

  private static async startApp(options: Record<string, unknown>) {
    let isActivated = true;

    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (options.provider !== ethereum) {
      console.error("Do you have multiple wallets installed?");
      isActivated = false;
    }
    // Access the decentralized web!
    if (typeof ethereum !== "undefined") {
      console.log("Ethereum wallet detected!");
    }
    if (isActivated) {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const web3Provider = new providers.Web3Provider(ethereum);
      if (web3Provider) {
        await this.pollForChanges(
          web3Provider,
          options.changeActionListener as ListenerCallback
        );
      }
      return web3Provider;
    }
    return null;
  }

  static async pollForChanges(
    provider: Web3Provider,
    changeActionListener: ListenerCallback
  ) {
    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/
    // https://medium.com/@pedrouid/chainid-vs-networkid-how-do-they-differ-on-ethereum-eec2ed41635b
    // deprecated
    // const networkId = await ethereum.request({ method: "net_version" });
    // changeActionListener("networkChanged", networkId);
    const chainId = await ethereum.request({ method: "eth_chainId" });
    changeActionListener("chainChanged", chainId);
    changeActionListener("networkChanged", Number(chainId));
    // https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
    // chainId: string; // A 0x-prefixed hexadecimal string
    ethereum.on("chainChanged", (chainId: string) =>
      changeActionListener("chainChanged", chainId)
    );
    // deprecated - https://eips.ethereum.org/EIPS/eip-1193#chainchanged
    // ethereum.on("networkChanged", (networkId: string) =>
    //   changeActionListener("networkChanged", networkId)
    // );
    provider?.on("block", () => {
      changeActionListener("block");
    });
  }

  static async loadAccounts(): Promise<[] | null> {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    } catch (err) {
      if (err instanceof Error) {
        if (err.code === 4001) {
          console.log("A connection to MetaMask is needed to proceed.");
        }
        console.warn(err.message);
      }
    }
    return null;
  }

  static async getBalance(account: string): Promise<BigNumber> {
    try {
      if (account && account.trim().length > 0) {
        const balance = await useWalletsStore().provider?.getBalance(account);
        return balance ?? BigNumber.from(0);
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.code === 4001) {
          console.log("A connection to MetaMask is needed to proceed.");
        }
        console.warn(err.message);
      } else {
        console.warn(err);
      }
    }
    return BigNumber.from(0);
  }

  //console.log(import.meta.env.VITE_ETHERSCAN_API);
  static async getExchangeRates(account: string): Promise<BigNumber> {
    try {
      const endpoint = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${
        import.meta.env.VITE_ETHERSCAN_API
      }`;
      const response = await fetch(endpoint, {
        // learn more about this API here: https://graphql-pokemon2.vercel.app/
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });

      console.log(await response.json());

      // if (account && account.trim().length > 0) {
      //   const balance = await useWalletsStore().provider?.getBalance(account);
      //   return balance ?? BigNumber.from(0);
      // }
    } catch (err) {
      if (err instanceof Error) {
        if (err.code === 4001) {
          console.log("A connection to MetaMask is needed to proceed.");
        }
        console.warn(err.message);
      } else {
        console.warn(err);
      }
    }
    return BigNumber.from(0);
  }
}

export default WalletService;
