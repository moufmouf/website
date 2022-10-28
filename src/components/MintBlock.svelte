<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { canMintWhiteStore } from "../stores/WhiteListStore"
    import { mintedNfts, contractAddress, error, loadingMint } from "../stores/WalletStore";
    import { ethers } from "ethers";
    import Contract from "../artifacts/Woka.json";
    import address from "./address";
    import { MerkleTree } from 'merkletreejs/dist/index';
	import { keccak256 } from "ethers/lib/utils";

    export let wallet: string;
    export let providerEthereum;

    let timeOutCompt: NodeJS.Timeout|null = null;
    let mintCount = 1;
    let mintPrice = 0;
    let totalSupply = 0;
    let maxSupply = 1;
    let availableMintAmount= 0;
    let mintWhitelistPrice = 0;
    let mintedNftsContract = 0;
    let maxMintPerWallet = 0;
    let getChainError = false;
    let loading = true;
    let quantitySelected: number = 1;
    let mintAmountAvailable = 0;
    let totalPrice = 0;

    let hadMinted = 0;

    const leaves = address.map((x: string) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const leaf = keccak256(wallet);
    const proof = tree.getProof(leaf).map((x) => {
        console.log(x)
        return "0x" + x.toString("hex")
    });

    console.log(leaf, proof)

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
                params: [{ chainId: '0x1' }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await providerEthereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: "0x1",
                                rpcUrls: ["https://mainnet.infura.io/v3/"],
                                chainName: "Ethereum Mainet",
                                nativeCurrency: {
                                    name: "ETH",
                                    symbol: "ETH",
                                    decimals: 18,
                                },
                                blockExplorerUrls: ["https://etherscan.io"],
                            },
                        ],
                    });
                } catch (addError) {
                    if (addError.code === 4001) {
                        console.info('wallet_addEthereumChain => 4001 => request error: ', switchError);
                    }else{
                        console.error('wallet_addEthereumChain request error: ', addError);
                        this.getChainError = true
                        return;
                    }
                }
            }
            if (switchError.code === 4001) {
                console.info('wallet_switchEthereumChain => 4001 => request error: ', switchError);
            }else{
                console.error('wallet_switchEthereumChain request error: ', switchError);
                this.getChainError = true
                throw switchError;
            }
        }

        /* eslint-enable */
        mintPrice = await getCost();
        mintWhitelistPrice = await getWhitelistCost();
        maxSupply = await getMaxSupply();
        totalSupply = await getTotalSupply();
        mintedNftsContract = await getMintedNft();
        maxMintPerWallet = await getMaxMintPerWallet();
        mintAmountAvailable = maxMintPerWallet - mintedNftsContract <= 0 ? 0 : maxMintPerWallet - mintedNftsContract;
        canMintWhiteStore.set((await isInWhitelist()) && mintedNftsContract === 0);
        updateTotalPrice();
        loading = false;

        console.log(mintPrice, mintWhitelistPrice, maxSupply, totalSupply, mintedNftsContract, maxMintPerWallet);
        console.log(maxMintPerWallet - mintedNftsContract)
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

    async function getWhitelistCost(): Promise<number> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const cost = await contract.whitelistedCost();
            return Number(cost);
        } catch (err) {
            console.error(err);
            getChainError = true;
            return 0;
        }
        /* eslint-enable */
    }

    async function isInWhitelist(): Promise<boolean> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const result = await contract.isWhitelisted(proof, leaf);
            console.log("is whitelisted", result);
            return Boolean(result);
        } catch (err) {
            console.error(err);
            getChainError = true;
            return false;
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

    async function getMintedNft(): Promise<number> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const supply = await contract.balanceOf(wallet);
            return Number(supply);
        } catch (err) {
            console.error(err);
            getChainError = true;
            return 0;
        }
        /* eslint-enable */
    }

    async function getMaxMintPerWallet(): Promise<number> {
        /* eslint-disable */
        const provider = new ethers.providers.Web3Provider(providerEthereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            const supply = await contract.maxMintAmount();
            return Number(supply);
        } catch (err) {
            console.error(err);
            getChainError = true;
            return 0;
        }
        /* eslint-enable */
    }

    function updateTotalPrice() {
        totalPrice = $canMintWhiteStore ? mintWhitelistPrice + (quantitySelected-1)*mintPrice : quantitySelected*mintPrice;
    }

    async function mint() {
        /* eslint-disable */
        loadingMint.set(true);
        error.set("");
        hadMinted = 0;

        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
            try {
                const currentWallet = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0];
                const cost = String($canMintWhiteStore ?
                    BigInt(await contract.whitelistedCost()) + BigInt(quantitySelected-1) * BigInt(await contract.cost()) : BigInt(quantitySelected) * BigInt(await contract.cost()));
                const overrides = {
                    from: currentWallet,
                    value: String(cost),
                };

                let transaction;

                console.log(overrides);
                if ($canMintWhiteStore) {
                    transaction = await contract.whitelistedMint(mintCount, overrides);
                } else {
                    transaction = await contract.mint(currentWallet, mintCount, overrides);
                }
                console.log("transaction");
                const test = await transaction.wait();
                console.log("after transac", test);
                hadMinted = quantitySelected;
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
            mintedNftsContract = await getMintedNft();
            mintAmountAvailable = maxMintPerWallet - mintedNftsContract <= 0 ? 0 : maxMintPerWallet - mintedNftsContract;
            canMintWhiteStore.set((await isInWhitelist()) && mintedNftsContract === 0);
            quantitySelected = 1;
        }
        loadingMint.set(false);
        /* eslint-enable */
    }
</script>

<div class="row mint-block">
    {#if loading}
        <div class="col">
            <h1 class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <g>
                      <circle cx="60" cy="50" r="4" fill="#0566b0">
                        <animate attributeName="cx" repeatCount="indefinite" dur="0.6896551724137931s" values="95;35" keyTimes="0;1" begin="-0.9715s"></animate>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="0.6896551724137931s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.9715s"></animate>
                      </circle>
                      <circle cx="60" cy="50" r="4" fill="#0566b0">
                        <animate attributeName="cx" repeatCount="indefinite" dur="0.6896551724137931s" values="95;35" keyTimes="0;1" begin="-0.4785s"></animate>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="0.6896551724137931s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.4785s"></animate>
                      </circle>
                      <circle cx="60" cy="50" r="4" fill="#0566b0">
                        <animate attributeName="cx" repeatCount="indefinite" dur="0.6896551724137931s" values="95;35" keyTimes="0;1" begin="0s"></animate>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="0.6896551724137931s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
                      </circle>
                    </g><g transform="translate(-15 0)">
                      <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)"></path>
                      <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.6896551724137931s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                      </path>
                      <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.6896551724137931s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                      </path>
                    </g>
                </svg>
            </h1>
        </div>
    {:else}
        {#if maxSupply === totalSupply}
            <div class="col">
                <h1 class="text-center">
                    All NFTs has been minted !<br> Thank you 🎉
                </h1>
            </div>
        {:else if mintAmountAvailable <= 0 }
            <div class="col">
                <h1 class="text-center">
                    You reached the mint limit per wallet 😅
                </h1>
            </div>
        {:else if (!$canMintWhiteStore && mintOpened) || ($canMintWhiteStore && mintWhiteOpened)}
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

                    <select class="input" disabled={$loadingMint} bind:value={quantitySelected} on:change={() => updateTotalPrice()}>
                        {#each Array(mintAmountAvailable) as _, i}
                            <option value={i+1}>
                                {i+1}
                            </option>
                        {/each}
                    </select>

                    <em class="input-info">{maxMintPerWallet} Woka max mintable per wallet</em>
                </div>
                <div class="row">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    {#if $canMintWhiteStore }
                        <div class="col">
                            <label class="label mint-qty-label text-center">White list Unit value</label>
                            <input type="text" class="class mint-value" value={`${mintWhitelistPrice / 10 ** 18} ETH`} disabled/>
                        </div>
                    {/if}
                    <div class="col">
                        <label class="label mint-qty-label text-center">Unit value</label>
                        <input type="text" class="class mint-value" value={`${mintPrice / 10 ** 18} ETH`} disabled/>
                    </div>
                </div>
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label mint-qty-label text-center">Total</label>
                    <input type="text" class="mint-total" value={`${totalPrice / 10 ** 18} ETH`} disabled/>
                    <em class="input-info">Without gas fees</em>
                </div>
                {#if hadMinted > 0}
                    <div>
                        <p class="text-center" style="text-align:center;color:seagreen;word-break: break-all;">You have minted {hadMinted} Woka !</p>
                    </div>
                {/if}
                {#if $error}
                    <div>
                        <p style="text-align:center;color:firebrick;word-break: break-all;">{$error}</p>
                    </div>
                {/if}
                <div class="btn-zone">
                    <!-- svelte-ignore security-anchor-rel-noreferrer -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <btn disabled={$loadingMint} on:click|preventDefault={mint} class="btn btn-primary btn-nft">
                        <span style="font-size: 14px;">Mint</span>
                    </btn>
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
    {/if}
  </div>