/**
 * @notice Various formatters to help display data in the UI nicely
 */

import { parseUnits } from "ethers/lib/utils";
import { formatUnits, formatFixed, BigNumber } from "./deps";

// Returns an address with the following format: 0x1234...abcd
export function formatAddress(address: string) {
  if (address.length !== 42) return null;
  return `${address.slice(0, 6)}...${address.slice(38)}`;
}

let zeros = "0";
while (zeros.length < 256) {
  zeros += zeros;
}

// Returns a string "1" followed by decimal "0"s
function getMultiplier(decimals: BigNumberish): string {
  if (typeof decimals !== "number") {
    try {
      decimals = BigNumber.from(decimals).toNumber();
    } catch (e) {}
  }

  if (
    typeof decimals === "number" &&
    decimals >= 0 &&
    decimals <= 256 &&
    !(decimals % 1)
  ) {
    return "1" + zeros.substring(0, decimals);
  }

  //   return logger.throwArgumentError(
  //     "invalid decimal size",
  //     "decimals",
  //     decimals
  //   );
}
const Zero = BigNumber.from(0);
const NegativeOne = BigNumber.from(-1);
export function formatBalance(values: BigNumber, precision = 4, round = true) {
  const valueAsEth = Number(formatUnits(values, "ether"));
  const multiplier = 10 ** precision;
  if (round) {
    const sres = Math.round(valueAsEth * multiplier) / multiplier;
    const ethb = parseUnits(sres.toString());
    return formatUnits(ethb, "ether");
  } else {
    const sres = Math.trunc(valueAsEth * multiplier) / multiplier;
    const ethb = parseUnits(sres.toString());
    return formatUnits(ethb, "ether");
  }
}
