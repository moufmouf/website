import { writable } from "svelte/store";

export const contractAddress = "0x699fdF5d96B3548c51184d818e03Db4852d931fF";
export const error = writable<string>("");
export const loadingMint = writable<boolean>(false);
export const mintedNfts = writable<number>(0);
