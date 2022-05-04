// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type ListenerCallback = (...args: any[]) => void;

class PriceService {
  static async getExchangeRates(
    chainId: string
  ): Promise<Record<string, unknown> | null> {
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

      const priceResponse = await response.json();
      return priceResponse;
    } catch (err) {
      if (err instanceof Error) {
        console.warn(`Error retrieving exchange rates: ${err.message}`);
      } else {
        console.warn(err);
      }
    }
    return null;
  }
}

export default PriceService;
