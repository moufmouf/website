import { writable } from "svelte/store";

export const contractAddress = "0x9426abF5Fe2300A1B074894AD1CF6D881F93CE17";
export const error = writable<string>("");
export const loadingMint = writable<boolean>(false);
export const mintedNfts = writable<number>(0);
