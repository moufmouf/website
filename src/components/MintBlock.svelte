<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import NftsMinted from "./NftsMinted.svelte";
    import { canMintWhiteStore } from "../stores/WhiteListStore"
    import { mintedNfts, contractAddress } from "../stores/WalletStore";
    import { ethers } from "ethers";

    export let wallet: string;
    export let providerEthereum; 

    let timeOutCompt: NodeJS.Timeout|null = null;
    let mintCount = 1;
    let mintPrice = 0;
    let totalSupply = 0;
    let maxSupply = 1;
    let getChainError = false;

    const DATE_TIME_TO_MINT_WHITELIST = new Date('2022-10-29T19:00:00.00Z');
    const DATE_TIME_TO_MINT = new Date('2022-10-29T15:00:00.00Z');

    let timestampWhitelist = DATE_TIME_TO_MINT_WHITELIST.getTime() - (new Date()).getTime();
    let timestampMint = DATE_TIME_TO_MINT.getTime() - (new Date()).getTime();

    let mintWhiteOpened = timestampWhitelist < 0;
    let mintOpened = timestampMint < 0;

    let hoursWhiteList = Math.floor(timestampWhitelist / (3600*1000));
    let minutesWhiteList = Math.floor(timestampWhitelist / (60*1000)) - (hoursWhiteList*60);
    let secondsWhiteList = Math.floor(timestampWhitelist / 1000) - (Math.floor(timestampWhitelist / (60*1000)) *60);

    let hoursMint = Math.floor(timestampMint / (3600*1000));
    let minutesMint = Math.floor(timestampMint / (60*1000)) - (hoursMint*60);
    let secondsMint = Math.floor(timestampMint / 1000) - (Math.floor(timestampMint / (60*1000)) *60);

    const timeCompt = () => {
        timestampWhitelist = DATE_TIME_TO_MINT_WHITELIST.getTime() - (new Date()).getTime();
        timestampMint = DATE_TIME_TO_MINT.getTime() - (new Date()).getTime();
        mintWhiteOpened = timestampWhitelist < 0;
        mintOpened = timestampMint < 0;

        hoursWhiteList = Math.floor(timestampWhitelist / (3600*1000));
        minutesWhiteList = Math.floor(timestampWhitelist / (60*1000)) - (hoursWhiteList*60);
        secondsWhiteList = Math.floor(timestampWhitelist / 1000) - (Math.floor(timestampWhitelist / (60*1000)) *60);

        hoursMint = Math.floor(timestampMint / (3600*1000));
        minutesMint = Math.floor(timestampMint / (60*1000)) - (hoursMint*60);
        secondsMint = Math.floor(timestampMint / 1000) - (Math.floor(timestampMint / (60*1000)) *60);

        timeOutCompt = setTimeout(() => {
            timeCompt();
        }, 1000);
    }

    function formatNumber(number: number){
        let value = number.toString();
        if(value.length < 2){
            return `0${number}`;
        }
        return value;
    }

    onMount( async() => {
        timeCompt();
        console.info('My current wallet: ', wallet);

        try {
            await providerEthereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xf00' }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await providerEthereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: "0x89",
                                rpcUrls: ["https://rpc-mainnet.matic.network/"],
                                chainName: "Polygon Mainnet",
                                nativeCurrency: {
                                    name: "MATIC",
                                    symbol: "MATIC",
                                    decimals: 18,
                                },
                                blockExplorerUrls: ["https://polygonscan.com/"],
                            },
                        ],
                    });
                } catch (addError) {
                    console.error('wallet_addEthereumChain request error: ', addError);
                    this.getChainError = true
                    return;
                }
            }
            console.error('wallet_switchEthereumChain request error: ', switchError);
            this.getChainError = true
            throw switchError;
        }

                /* eslint-enable */
        mintPrice = await getCost();
        maxSupply = await getMaxSupply();
        totalSupply = await getTotalSupply();
    });

    onDestroy(async () => {
        if(timeOutCompt){
            clearTimeout(timeOutCompt);
        }
    });

    async function getCost(): Promise<number> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const cost = await contract.cost();
            return Number(cost);
        } catch (err) {
            console.error(err);
            getChainError = true;
            return 0;
        }
        /* eslint-enable */
    }

    async function getTotalSupply(): Promise<number> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const supply = await contract.totalSupply();
            return Number(supply);
        } catch (err) {
            console.error(err);
            getChainError = true;
            return 0;
        }
        /* eslint-enable */
    }

    async function getMaxSupply(): Promise<number> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const maxSupply = await contract.maxSupply();
            return Number(maxSupply);
        } catch (err) {
            console.error(err);
            return 0;
        }
        /* eslint-enable */
    }

    function resetMintForm() {
        mintedNfts.set(0);
    }

    function downCount() {
        if (mintCount === 1) {
            return;
        }

        mintCount--;
    }

    function upCount() {
        if (mintCount === 10) {
            return;
        }

        mintCount++;
    }

    async function mint() {
        /* eslint-disable */
        loadingMint.set(true);
        error.set("");

        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
            try {
                const currentWallet = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0];
                const cost = String(BigInt(await contract.cost()) * BigInt(mintCount));
                const overrides = {
                    from: currentWallet,
                    value: String(cost),
                };

                console.log(overrides);
                const transaction = await contract.mint(currentWallet, mintCount, overrides);
                console.log("transaction");
                const test = await transaction.wait();
                console.log("after transac", test);
                mintedNfts.set(mintCount);
            } catch (err) {
                if (err.hasOwnProperty("data") && err.data.hasOwnProperty("message")) {
                    console.log(err.data.message);
                    if (err.data.message.includes("insufficient funds")) {
                        error.set("You don't have enought to pay NFTs and gaz fees");
                        loadingMint.set(false);
                        return;
                    }

                    error.set(err.data.message);
                }

                if (err instanceof Error) {
                    error.set(err.message);
                }
            }
            totalSupply = await getTotalSupply();
        }
        loadingMint.set(false);
        /* eslint-enable */
    }
</script>

<div class="row mint-block">
    {#if (!$canMintWhiteStore && mintOpened) || ($canMintWhiteStore && mintWhiteOpened)}
        {#if $mintedNfts > 0}
            <NftsMinted />
        {:else}
        <div class="col">
            <p class="mint-info">
            Let'go to Mint the Woka Gen 1 🚀
            </p>
            <div>
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label mint-qty-label text-center">Quantity</label>
                <select class="input">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <em class="input-info">Amount max 3 per transaction</em>
            </div>
            <div class="row">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                {#if $canMintWhiteStore}
                    <div class="col">
                        <label class="label mint-qty-label text-center">Unit value white list</label>
                        <input type="text" class="class mint-value" value="1" disabled/>
                    </div>
                {/if}
                <div class="col">
                    <label class="label mint-qty-label text-center">Unit value</label>
                    <input type="text" class="class mint-value" value="1" disabled/>
                </div>
            </div>
            <div>
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label mint-qty-label text-center">Total</label>
                <input type="text" class="mint-total" value="1" disabled/>
            </div>
            <div class="btn-zone">
                <!-- svelte-ignore security-anchor-rel-noreferrer -->
                <a href="https://play.staging.workadventu.re/@/metaventure/land/portal" target="_blank" class="btn btn-primary btn-nft" ph-id="go_to_metadventure">
                <span style="font-size: 14px;">Mint</span>
            </a>
            </div>
        </div>
        {/if}
    {:else}
      <div class="col">
        <p class="mint-info">
          Your mint will be opened 29 October at {#if ($canMintWhiteStore)}05.00 pm{:else}09.00 pm{/if} CET
        </p>
        <div class="row">
          <div class="col text-center">
            {#if ($canMintWhiteStore)}
              <h1>{formatNumber(hoursWhiteList)} : {formatNumber(minutesWhiteList)} : {formatNumber(secondsWhiteList)}</h1>
            {:else}
              <h1>{formatNumber(hoursMint)} : {formatNumber(minutesMint)} : {formatNumber(secondsMint)}</h1>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>