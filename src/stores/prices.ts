import { defineStore } from "pinia";
import type { PriceState } from "@/types/StateTypes";
import PriceService from "../services/priceService";
import { computed } from "vue";
import { BigNumber, type BigNumberish } from "@/utils/deps";
import { formatUnits, parseEther } from "ethers/lib/utils";

export const usePriceStore = defineStore({
  id: "prices",
  state: () =>
    ({
      BTC: 0,
      BTC_timestamp: 0,
      USD: 0,
      USD_timestamp: 0,
      ratesUpdated: false,
    } as PriceState),
  getters: {
    isRatesUpdated: (state) => computed(() => state.ratesUpdated),
  },
  actions: {
    async initializePolling() {
      this.loadData();
      setInterval(() => {
        this.loadData();
      }, 30000);
    },
    async loadData() {
      console.log("fetching exchange rate");
      const exchangeInfo = await PriceService.getExchangeRates("");
      if (exchangeInfo?.message === "OK") {
        const rates = exchangeInfo.result as Record<string, unknown>;
        let rate = Number(rates.ethbtc);
        this.ratesUpdated = rate != this.BTC;
        this.BTC = rate;
        this.BTC_timestamp = Number(rates.ethbtc_timestamp);
        rate = Number(rates.ethusd);
        this.ratesUpdated = rate != this.USD;
        this.USD = rate;
        this.USD_timestamp = Number(rates.ethusd_timestamp);
        if (this.ratesUpdated) {
          console.log("rates were updated");
        }
      } else {
        console.warn(
          "Unable to retrieve exchange prices from: PriceService.getExchangeRates "
        );
      }
      //console.log(exchangeInfo);
    },
    priceToCurrency(value: BigNumberish): BigNumber {
      const bn = BigNumber.from(value);
      const eth = Number(formatUnits(bn));
      const cur = eth * this.USD;
      return parseEther(cur.toString());
    },
  },
});
