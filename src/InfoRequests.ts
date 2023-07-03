import { Alchemy, Network } from "alchemy-sdk";
import { Utils } from "alchemy-sdk";
import { ethers } from "ethers";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getBlockNumber(): Promise<string> {
  const result = await alchemy.core.getBlockNumber();
  return result.toString();
}

export async function getAdressBalance(address: string) {
  const balanceWei = await alchemy.core.getBalance(address);
  const balanceEth = Utils.formatEther(balanceWei);
  return balanceEth;
}

export async function WsSubscribe(callBack: (num: number) => void) {
  try {
    alchemy.ws.on("block", (blockNumber) => callBack(blockNumber));
  } catch (error) {
    alert("Error connecting to live block updates");
    return 0;
  }
}

export async function WsUnsubscribe(callBack: (num: number) => void) {
  alchemy.ws.off("block", (blockNumber) => callBack(blockNumber));
}

export function CheckIsValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}
