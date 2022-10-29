<script lang="ts">
  import "../../../scss/style.scss";
  import MetamaskDownload from "../../../components/MetamaskDownload.svelte";
  import NotLoggedOnMetaMask from "../../../components/NotLoggedOnMetaMask.svelte";
  import MintBlock from "../../../components/MintBlock.svelte";
  import detectEthereumProvider from '@metamask/detect-provider';

	import { onMount } from "svelte";

  let hasEthProvider = false;
  let hasWalletAccountConnected = false;
  let wallets : Array<string> | null = null;
  let providerEthereum = null;

  onMount( async() => {
    //openWallet();
  });

  async function openWallet(){
    providerEthereum = await detectEthereumProvider();
    hasEthProvider = true;

    if (!providerEthereum) return;
    try{
      // From now on, this should always be true:
      // provider === window.ethereum
      //startApp(provider); // initialize your app
      await connect();
      try{
        hasWalletAccountConnected = await providerEthereum._metamask.isUnlocked();
      }catch(err){
        hasWalletAccountConnected = providerEthereum.isConnected();
      }
    }catch(err){
      hasWalletAccountConnected = false;
    }

    providerEthereum.on('accountsChanged', (accounts: Array<string>) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      wallets = accounts;
    });

    providerEthereum.on('chainChanged', (chainId: string) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      console.info('chainChanged', chainId);
      window.location.reload();
    });

    providerEthereum.on('connect', (connectInfo) => {
      console.info('connect', connectInfo);
      window.location.reload();
    });

    interface ProviderRpcError extends Error {
      message: string;
      code: number;
      data?: unknown;
    }
    providerEthereum.on('disconnect', (error: ProviderRpcError) => {
      console.info('disconnect', error);
      window.location.reload();
    });

    interface ProviderMessage {
      type: string;
      data: unknown;
    }

    providerEthereum.on('message', (message: ProviderMessage) => {
      console.info('message', message);
    });
  }

let currentAccount = null;
// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    throw 'Please connect to MetaMask.';
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
  }
}

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
async function connect() {
  if(providerEthereum !== window.ethereum) throw "Do you have multiple wallets installed?";
  return await providerEthereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
    return handleAccountsChanged(accounts);
  });
}
</script>

<svelte:head>
    <title>Mint Gen1 - Metadventure</title>
    <meta name="title" content="Mint Gen1 - Metadventure">
    <meta name="description" content="More than just an art NFT, your Woka Gen1 will be your reliable avatar granting you access to Metaverses.">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:title" content="Discover our NFT collection">
    <meta property="og:type" content="More than just an art NFT, your Woka Gen1 will be your reliable avatar granting you access to Metaverses.">
    <meta property="og:url" content="https://metadventu.re/gen1/mint">
    <meta property="og:image" content="https://metadventu.re/img/og-image.jpg">
</svelte:head>

<progress max="100" value="0"></progress>
<header>
  <div class="row">
    <div class="col-xs-4 col-md-6">
      <a href="/">
        <img class="header-logo header-logo-big" src="/img/Logo.svg"
             alt="Logo Metadventu.re" loading="lazy"/>
        <img class="header-logo header-logo-small" src="/img/Logo_small.svg"
             alt="Logo Metadventu.re" loading="lazy"/>
      </a>
    </div>
    <div class="col-xs-8 col-sm-6">
      <ul class="header-social">
        <li>
          <!-- svelte-ignore security-anchor-rel-noreferrer -->
          <a href="https://twitter.com/Metadventure_" target="_blank" ph-id="join_twitter" class="header-social_links">
            <img src="/img/social/013-twitter-1.svg" alt="Icon Twitter" style="transform: translateY(-5px);" loading="lazy">
          </a>
        </li>
        <li>
          <!-- svelte-ignore security-anchor-rel-noreferrer -->
          <a href="https://discord.gg/DqUkUwA88d" target="_blank" ph-id="join_discord" class="header-social_links">
            <img src="/img/social/discord.svg" alt="Icon Discord" style="transform: translateY(-3px);" loading="lazy">
          </a>
        </li>
        <li>
          <!-- svelte-ignore security-anchor-rel-noreferrer -->
          <a href="https://github.com/thecodingmachine/workadventure" target="_blank" ph-id="join_github" class="header-social_links">
            <img src="/img/social/github.svg" alt="Icon GitHub" loading="lazy"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</header>
<main>
  <div class="row block block-intro block-intro-nft">
    <div class="bg-block-intro-nft-wrapper">
      <div class="bg-block-intro-nft"></div>
    </div>
    <div class="row middle-xs block-intro-content">
      <div class="col-xs-12">
        <div class="container">
          <div class="col-xs-12 pad-0 nft-content">
            <h1 class="text-center">
              Mint WOKA <span>Gen 1</span>
            </h1>

            <div class="row mint-block">
              <div class="col text-center" style="display: flex;flex-direction: column;align-items: center;">
                <p>The mint has been canceled due to technical issues causing an incorrect number of Wokas to be delivered.</p>
                <p>We are deeply sorry for this, but anyone who participated in the mint has been <strong>fully refunded</strong> (including gas fees!)</p>
                <p>We are in the process of analysing what went wrong. In the coming days, expect from us a detailed feedback and more details about a new mint date!</p>
              </div>
            </div>
            <!--
            {#if (!hasEthProvider)}
                <MetamaskDownload />
            {:else}
              {#if !hasWalletAccountConnected}
                <NotLoggedOnMetaMask />
              {:else}
                <MintBlock wallet={currentAccount} providerEthereum={providerEthereum}/>
              {/if}
            {/if}
            -->
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="btn-zone">
    <!-- svelte-ignore security-anchor-rel-noreferrer -->
    <a href="https://discord.gg/DqUkUwA88d" target="_blank" class="follow-us" ph-id="join_discord">
      <img src="/img/social/discord.svg" alt="Icon Discord" loading="lazy"/>
      Join us on Discord
    </a>
    <!-- svelte-ignore security-anchor-rel-noreferrer -->
    <a href="https://twitter.com/Metadventure_" target="_blank" class="follow-us" ph-id="join_twitter">
      <img src="/img/social/013-twitter-1.svg" alt="Icon Twitter" loading="lazy"/>
      Follow us on Twitter
    </a>
  </div>

  <footer>
    <a href="/">
      <img class="footer-logo" src="/img/Logo.svg" alt="Logo Metadventu.re" loading="lazy"/>
    </a>
  </footer>
</main>
