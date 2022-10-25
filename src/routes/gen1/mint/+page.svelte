<script>
  import "../../../scss/style.scss";
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
              Mint <span>Gen 1</span>
            </h1>
            <div class="row mint-block">
              <div class="col-xs-6">
                <div class="mint-image">
                  <img src="http://placekitten.com/g/400/400" />
                </div>
              </div>
              <div class="col-xs-6">
                <p class="mint-info">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet massa id ex venenatis, sed posuere nisl feugiat. Duis euismod malesuada lectus, lobortis scelerisque libero fermentum eu.
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
                <div>
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label class="label mint-qty-label text-center">Value</label>
                  <input disabled type="text" class="class mint-value" value="1" />
                </div>
                <div>
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label class="label mint-qty-label text-centerl">Total</label>
                  <input type="text" class="mint-total" value="1" />
                </div>
                <div class="btn-zone">
                  <!-- svelte-ignore security-anchor-rel-noreferrer -->
                  <a href="https://play.staging.workadventu.re/@/metaventure/land/portal" target="_blank" class="btn btn-primary btn-nft" ph-id="go_to_metadventure">
                    <span style="font-size: 14px;">Mint</span>
                  </a>
                </div>
              </div>
            </div>
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
