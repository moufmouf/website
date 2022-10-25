<script>
    // @ts-nocheck

    import gsap from "gsap/dist/gsap";
    import ScrollTrigger from "gsap/dist/ScrollTrigger";
    import "../scss/style.scss";
	import { onMount } from "svelte";

    onMount(() => {
        var animatedTextures = [];

        gsap.registerPlugin(ScrollTrigger);
        gsap.to('progress', {
            value: 100,
            ease: 'none',
            scrollTrigger: { scrub: 0.3 }
        });

        gsap.to(".lets-create", {
            y: '-200px',
            opacity: '0',
            ease: "power3.out"
        });
        gsap.to(".services", {
            y: '-200px',
            opacity: '0',
            ease: "power3.out"
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".services",
                start: 200,
                //pin: true
            }
        })
        .to(".lets-create",  { opacity: '1', y: '0px' }, 0)
        .to(".services",  {stagger: 0.2, opacity: '1', y: '0px' }, 0);
        gsap.to(".reinforcement", {
            y: '-200px',
            opacity: '0',
            scale: '0',
            ease: "power3.out"
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".reinforcement",
                start: "top bottom +200",
                //pin: true
            }
        })
        .to(".reinforcement",  {stagger: 1,  opacity: '1', scale: '1', y: '0px' }, 0);

        gsap.to(".step-line", {
            height: '0px',
            ease: "power3.out"
        });
        gsap.to(".step-circle", {
            opacity: '0',
            ease: "power3.out"
        });
        gsap.to(".step-date", {
            y: '-20px',
            opacity: '0',
            ease: "power3.out"
        });
        gsap.to(".step-content", {
            y: '-20px',
            opacity: '0',
            ease: "power3.out"
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".roadmap",
                end: -300
                //pin: true
            }
        })
        .to(".step-line",  {stagger: 0.5, height: "100%" }, 0)
        .to(".step-circle",  {stagger: 0.5, opacity: "1"}, .2)
        .to(".step-date",  {stagger: 0.5, opacity: "1", y: '0px' }, 0)
        .to(".step-content",  {stagger: 0.5, opacity: "1", y: '0px' }, 0);

        gsap.to(".team-member", {
            y: '-20px',
            opacity: '0',
            scale: '0',
            ease: "power3.out"
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".team-member",
                start: "top bottom +20",
                scrub: true
                //pin: true
            }
        })
        .to(".team-member", {stagger: 0.2, scale: '1', opacity: "1"}, 0);

        gsap.to(".parallax-bg", {
            scrollTrigger: {
                scrub: true
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
            ease: "none"
        });



        // NFTS

        gsap.registerPlugin(ScrollTrigger);
        gsap.to('progress', {
            value: 100,
            ease: 'none',
            scrollTrigger: { scrub: 0.3 }
        });



        const eltNFT = document.querySelector('#elt-nft')
        const elFAQ = document.querySelector('#elt-faq')
        const elTeam = document.querySelector('#elt-team')
        const observer = new window.IntersectionObserver(([entry]) => {
            var menu = document.querySelector('.' + entry.target.id);
            if (entry.isIntersecting) {
                const menuItems = document.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                    item.classList.remove('activeMenu');
                });
                menu.classList.toggle('activeMenu');
                return
            }
            menu.classList.remove('activeMenu');
        }, {
            root: null,
            threshold: 0.0001, // set offset 0.1 means trigger if atleast 10% of element
            // in viewport
        });

        var menuItem = document.querySelectorAll(".menu-item");
        for (const item of menuItem) {
            item.addEventListener('click', function (event) {
                this.classList.add("activeMenu");
            })
        }

        gsap.to(".bg-blurry", {
            scrollTrigger: {
                scrub: true
            },
            y: 3000,
            ease: "ease"
        });

        gsap.to(".bg-pattern", {
            scrollTrigger: {
                scrub: true
            },
            y: 2400,
            ease: "ease"
        });


        var tlIntro = gsap.timeline();
        tlIntro.to(".block.block-intro.block-intro-nft .bg-block-intro-nft", 30, { scale: 1.3 }, 0);

        // @ts-ignore
        observer.observe(elTeam);
        // @ts-ignore
        observer.observe(elFAQ);
        // @ts-ignore
        observer.observe(eltNFT);

        const stepAnimatedTexture = (id) => {
            const animatedTexture = animatedTextures[id];

            // Go to the next texture each 15 frames
            animatedTexture.frameCount++;
            if (animatedTexture.frameCount < 35) {
                animatedTexture.requestAnimationFrame = window.requestAnimationFrame(() => {
                    stepAnimatedTexture(id);
                });
                return;
            }
            animatedTexture.frameCount = 0;

            // Clear the canvas
            clearCanvasAnimatedTexture(id);

            // Draw texture
            animatedTextureDrawFrame(
                id,
                animatedTexture.cycleLoop[animatedTexture.currentLoopIndex],
                animatedTexture.currentDirection,
                0,
                0
            );

            // Check the next texture
            animatedTexture.currentLoopIndex++;
            if (animatedTexture.currentLoopIndex >= animatedTexture.cycleLoop.length) {
                animatedTexture.currentLoopIndex = 0;
                animatedTexture.currentDirection++;
            }

            // Reset the Woka position
            if (animatedTexture.currentDirection >= 4) {
                animatedTexture.currentDirection = 0;
            }

            animatedTexture.requestAnimationFrame = window.requestAnimationFrame(() => {
                stepAnimatedTexture(id)
            });
        }

        const animatedTextureDrawFrame = (id, frameX, frameY, canvasX, canvasY) => {
            const animatedTexture = animatedTextures[id];
            animatedTexture.context.drawImage(
                animatedTexture.image,
                frameX * animatedTexture.width,
                frameY * animatedTexture.height,
                animatedTexture.width,
                animatedTexture.height,
                canvasX,
                canvasY,
                animatedTexture.scale * animatedTexture.width,
                animatedTexture.scale * animatedTexture.height
            );
        }

        const clearCanvasAnimatedTexture = (id) => {
            const animatedTexture = animatedTextures[id];
            animatedTexture.context.clearRect(
                0,
                0,
                animatedTexture.canvas.width,
                animatedTexture.canvas.height
            );
        }

        elFAQ.querySelectorAll("label").forEach((item) => {
            item.addEventListener('click', (event) => {
                const currentInput = event.currentTarget.parentNode.querySelector('input[name="toggle"]');
                if (currentInput && currentInput.checked) {
                    currentInput.checked = false;
                    event.preventDefault();
                }
            });
        });

        function wokaCard(id) {
            //cancel animation WOKA
            if (animatedTextures[id] != undefined) {
                window.cancelAnimationFrame(animatedTextures[id].requestAnimationFrame);
            }

            //create canvas animation
            const image = new Image();
            image.src = `img/NFT/static/${id}.png`;
            const canvas = document.getElementById(id);
            const animatedTexture = {
                image: image,
                canvas: canvas,
                context: canvas.getContext('2d'),
                cycleLoop: [0, 1, 0, 2],
                currentLoopIndex: 0,
                frameCount: 0,
                currentDirection: 0,
                scale: 1,
                width: 512,
                height: 512,
                requestAnimationFrame: null,
            };
            animatedTexture.context.imageSmoothingEnabled = false;
            animatedTexture.requestAnimationFrame = window.requestAnimationFrame(() => {
                stepAnimatedTexture(id);
            });

            animatedTextures[id] = animatedTexture;

            //step animation
            stepAnimatedTexture(id);
        }

        wokaCard('gen1');
        wokaCard('gen2');
        wokaCard('gen3');
        wokaCard('gen4');
        wokaCard('gen5');
        wokaCard('gen6');
        wokaCard('gen7');
        wokaCard('gen8');
        wokaCard('gen9');
    });
</script>

<svelte:head>
    <title>Metadventure - Build your own Metaverse</title>
    <meta name="title" content="Metadventure - Build your own Metaverse">
    <meta name="description" content="More than just an art NFT, your Woka Gen1 will be your reliable avatar granting you access to Metaverses.">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:title" content="Discover our NFT collection">
    <meta property="og:type" content="More than just an art NFT, your Woka Gen1 will be your reliable avatar granting you access to Metaverses.">
    <meta property="og:url" content="https://metadventu.re/">
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
          <!-- svelte-ignore security-anchor-rel-noreferrer -->
          <li>
            <a href="https://github.com/thecodingmachine/workadventure" target="_blank" ph-id="join_github" class="header-social_links">
              <img src="/img/social/github.svg" alt="Icon GitHub" loading="lazy"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <nav class="menu">
    <div class="menu-list row">
      <div class="menu-item col-xs-4 elt-team">
        <a href="#team" ph-id="menu_team">
          <div class="menu-number nav-item nav-item-3">.03</div>
          <div class="menu-label nav-item nav-item-3">
            Team
          </div>
        </a>
      </div>
      <div class="menu-item col-xs-4 elt-faq">
        <a href="#faq" ph-id="menu_faq">
          <div class="menu-number nav-item nav-item-2">.02</div>
          <div class="menu-label nav-item nav-item-2">
            FAQ
          </div>
        </a>
      </div>
      <div class="menu-item col-xs-4 elt-nft">
        <a href="#nft" class="nav-item-1" ph-id="menu_nft">
          <div class="menu-number nav-item nav-item-1">.01</div>
          <div class="menu-label nav-item nav-item-1">
            NFT<span class="lower">s</span>
          </div>
        </a>
      </div>
    </div>
  </nav>
  <div class="bg-wrapper">
    <div class="bg-pattern parallax-bg"></div>
    <div class="bg-blurry parallax-bg"></div>
  </div>
  <main>
    <div class="row block block-intro block-intro-nft">
      <div class="bg-block-intro-nft-wrapper">
        <div class="bg-block-intro-nft"></div>
      </div>
      <div class="row middle-xs block-intro-content">
        <div class="col-xs-12">
          <div class="container">
            <div class="col-xs-12 pad-0 nft-content">
              <h1>
                Discover our <span>NFT collection</span>
              </h1>
              <p class="subtitle big-subtitle">
                Welcome fam & frens!
              </p>
              <p class="subtitle">
                After months of hard work we are very happy to welcome you
                and finally reveal the first bricks of Metadventure global ecosystem.<strong> Be ready, soon you will be able to explore thousands of different metaverses</strong> with your Woka Gen1.
              </p>
              <p class="subtitle">
                More than just NFT Art, <strong>your Woka Gen1 will be your reliable avatar granting you access to metaverses.</strong>
              </p>
              <p class="subtitle">
                As a preview, you will find below a Portal to start exploring
                some virtual worlds already built and fully operational. In
                this world you will notice that the gates are closed for now.
                It is normal! <strong>Soon after the mint Gen1 owners will start co-building their own metaverse.</strong>
              </p>
              <p class="subtitle">
                This is only the beginning. Follow us to discover everything we have prepared for you and how we are going to build altogether the Web3.
              </p>
              <p class="subtitle">
                <strong>Fasten your seatbelts Adventurers 🚀</strong>
              </p>
              <div class="btn-zone">
                <a href="https://play.staging.workadventu.re/@/metaventure/land/portal" target="_blank" class="btn btn-primary btn-nft" ph-id="go_to_metadventure" style="cursor: wait;pointer-events: none;">
                  <span style="font-size: 14px;">Mint</span>
                  <div style="font-size: 11px;">coming soon</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="block block-nft elt" id="elt-nft">
      <div class="container">
        <h2 id="nft">Browse our <span>NFTs</span></h2>
        <div class="nft-carrousel row">
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/1.png" alt="Perso 1 NFT gen1"/>-->
                <canvas
                    id="gen1"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_blue.svg" alt="Background perso 1 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Johnny Cardio
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/2.png" alt="Perso 2 NFT gen1"/>-->
                <canvas
                    id="gen2"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_green.svg" alt="Background perso 2 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Marta McFly
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/3.png" alt="Perso 3 NFT gen1"/>-->
                <canvas
                    id="gen3"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_blue.svg" alt="Background perso 3 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Diego Rainbow
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/4.png" alt="Perso 4 NFT gen1"/>-->
                <canvas
                    id="gen4"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_yellow.svg" alt="Background perso 4 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Viv Legging
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/5.png" alt="Perso 4 NFT gen1"/>-->
                <canvas
                    id="gen5"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_blue.svg" alt="Background perso 4 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Parker Levi's
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/6.png" alt="Perso 5 NFT gen1"/>-->
                <canvas
                    id="gen6"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_yellow.svg" alt="Background perso 5 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Silky Nylon
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4 hide-xs-only hide-sm-only">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/7.png" alt="Perso 6 NFT gen1"/>-->
                <canvas
                    id="gen7"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_blue.svg" alt="Background perso 6 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Brandon Mullet
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4 hide-xs-only hide-sm-only">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/8.png" alt="Perso 7 NFT gen1"/>-->
                <canvas
                    id="gen8"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_yellow.svg" alt="Background perso 7 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Axl Teddy Rose
              </div>
            </div>
          </div>
          <div class="nft-elt col-xs-12 col-sm-6 col-md-4 hide-xs-only hide-sm-only">
            <div class="nft-image">
              <div class="character">
                <!--<img class="character-img" src="/img/NFT/static/9.png" alt="Perso 8 NFT gen1"/>-->
                <canvas
                    id="gen9"
                    height="512"
                    width="512"
                    class="character-img"></canvas>
              </div>
              <img class="background-nft" src="/img/NFT/Box_blue.svg" alt="Background perso 8 NFT gen1" loading="lazy"/>
              <div class="nft-name">
                Tom Beetlejuice
              </div>
            </div>
          </div>
        </div>
        <div class="btn-zone">
          <a href="https://discord.gg/DqUkUwA88d" target="_blank" class="follow-us" ph-id="join_discord">
            <img src="/img/social/discord.svg"
                 alt="Icon Discord" loading="lazy"/>
            Join us on Discord
          </a>
          <a href="https://twitter.com/Metadventure_" target="_blank" class="follow-us" ph-id="join_twitter">
            <img src="/img/social/013-twitter-1.svg"
                 alt="Icon Twitter" loading="lazy"/>
            Follow us on Twitter
          </a>
        </div>
      </div>
    </div>
    <div class="block block-faq elt" id="elt-faq">

      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h3 id="faq">FAQ</h3>
          </div>
        </div>
        <div class="col-xs-12">
          <div class="accordion">
            <input id="toggle1" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle1" ph-id="faq_what_is_gen1">What is Woka Gen1
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ What is Woka Gen1" loading="lazy"/>
            </label>
            <section>
              <p>
                Gen1 is the first collection of 8000 unique avatars allowing you to teleport & travel in all the Metaverses generated from Metadventure & Workadventure.
              </p>
              <p>
                Gen1 avatars are blocked time travelers, they have been around us since the 80s & 90s and were waiting for Metadventure's launch to be able to travel to the future again. They are now ready to be awaken and their immense knowledge in teleportation will help you in your exploration of the Web3.
              </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle2" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle2" ph-id="faq_collection">What will this collection be used for?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ What will this collection be used for?" loading="lazy"/>
            </label>
            <section>
              <p>
                Your Woka Gen1 will become your official avatar, able to teleport from a virtual world to another.
              </p>
              <p>
                Each Woka Gen1 will grant you access to a dedicated Metaverse where you will be able to discover new experiences in the Web3 while building it.
              </p>
              <p>
                All owners will be able to cooperate, interact, meet in order to create for the Gen1 a new home. After completion, this new home will be divided into 8000 NFTs parcels that each Gen1 owner will receive.
              </p>
              <p>
                Last but not least, each Woka Gen1 will come with a lifetime subscription in WorkAdventure for 25, 50 or 100 simultaneous users!
              </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle3" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle3" ph-id="faq_how_many_woka">How many Woka will be created in this Gen1?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ How many Woka will be created in this Gen1 and at which price?" loading="lazy"/>
            </label>
            <section>
              <p>
                The Woka Gen1 is a collection of 8K NFTs. Each Woka Gen 1 is an ERC-721 token on ETH.
              </p>
              <p>
                Whitelisting for pre-minting & crazy multi-metaverses challenges will be organized 😝
              </p>
              <p class="italic">
                Note: 40 Wokas are being withheld from the sale. They will be offered for giveaways, challenge rewards & for the team.
              </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle4" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle4" ph-id="faq_release_date">What is the release date?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ What is the release date?" loading="lazy"/>
            </label>
            <section>
              <p>
                28th October 2022 🚀
              </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle5" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle5" ph-id="faq_available">Which wallets will be available for minting?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ Which wallets will be available for minting?" loading="lazy"/>
            </label>
            <section>
              <p>
                Metamask.
                Info and tutorials about how to install and use Metamask will be provided in our Discord channel.
             </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle6" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle6" ph-id="faq_rarity">Will there be some sort of rarity?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ Will there be some sort of rarity?" loading="lazy"/>
            </label>
            <section>
              <p>
                The Gen1 was blocked while time travelling in the 80s & 90s. They might have kept some outfits, hair styles or accessories from those golden years...
              </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle7" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle7" ph-id="faq_build">How the metaverse for Gen1 owners will be built?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ How the metaverse for Gen1 owners will be built?" loading="lazy"/>
            </label>
            <section>
              <p>
                Since two years we have gain deep understanding and knowledge in building metaverses. With Workadventure the team has delivered hundreds of them for small, medium and multinational corporations or associations.
              </p>
              <p>
                We will use and transmit our expertise in building Yours.
              </p>
              <p>
                We will go altogether through the different phases of design, iteration, voting, experiences integration etc...
              </p>
              <p>
                Once the construction will be over, each Gen1 owner will receive one or several of the 8000 NFTs parcels of this new metaverse.
              </p>
            </section>
          </div>

          <div class="accordion">
            <input id="toggle8" type="radio" class="accordion-toggle" name="toggle"/>
            <label for="toggle8" ph-id="faq_metadventure">What about Metadventure?
              <img src="/img/arrow-down.svg" class="arrow-down" alt="Arrow FAQ What about Metadventure?" loading="lazy"/>
            </label>
            <section>
              <p>
                As mentioned Woka Gen1 is one of the first bricks of the Metadventure ecosystem.
              </p>
              <p>
                Metadventure will consist in a metaverse factory or metaverse-as-a-service platform allowing you to instantly generate a metaverse and its affiliated NFT parcels!
              </p>
              <p>
                Whitepaper, Roadmap & Tokenomics will be released very soon. Follow us!
              </p>
            </section>
          </div>
        </div>
        <div class="btn-zone">
          <a href="https://discord.gg/DqUkUwA88d" target="_blank" class="follow-us" ph-id="join_discord">
            <img src="/img/social/discord.svg" alt="Icon Discord" loading="lazy"/>
            Join us on Discord
          </a>
          <a href="https://twitter.com/Metadventure_" target="_blank" class="follow-us" ph-id="join_twitter">
            <img src="/img/social/013-twitter-1.svg" alt="Icon Twitter" loading="lazy"/>
            Follow us on Twitter
          </a>
        </div>
      </div>
    </div>

    <div class="block block-informations">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h3 id="#product">Virtual <span class="full-fill">worlds</span></h3>
          </div>
        </div>
        <div class="row informations-wrapper">
          <div class="col-xs-12 col-md-7 txt-informations">
            <div class="information-title pad-0 t-right"><span>Build</span>
            </div>
            <div class="subtext t-right">
              Build your own metaverse, import assets, trade NFTs
            </div>
            <div class="subtitle t-right">
              Your limits?... Your imagination! Make your dreams come true, create your virtual worlds, gather your audience, start interacting, start earning.
            </div>
          </div>
          <div class="col-xs-12 col-md-5 first-sm first-xs last-md last-lg last-xl img-informations">
            <div style="background-image: url('img/build.gif')"></div>
          </div>
        </div>
        <div class="row informations-wrapper">
          <div class="col-xs-12 col-md-5 img-informations">
            <div style="background-image: url('img/use-emojis.gif')"></div>
          </div>
          <div class="col-xs-12 col-md-7 txt-informations">
            <div class="information-title pad-0"><span>Interact</span></div>
            <div class="subtext">
              Meet, exchange, collaborate while having fun with thousands of
              users in other worlds
            </div>
            <div class="subtitle">
              Create new memories, share, talk, chat, meet... You are here for one reason: connect with people!
            </div>
          </div>
        </div>
        <div class="row informations-wrapper">
          <div class="col-xs-12 col-md-7 txt-informations">
            <div class="information-title pad-0 t-right"><span>Learn & discover</span></div>
            <div class="subtext t-right">
              Create or share your contents & bring knowledge to a wider
              community
            </div>
            <div class="subtitle t-right">
              Metadventure is here to help you grow your future! Training, art exhibitions, conferences, professional venues, hackathons… You are one click away from participating in the knowledge transmission in the Web3.
            </div>
          </div>
          <div class="col-xs-12 col-md-5 first-sm first-xs last-md last-lg last-xl img-informations">
            <div style="background-image: url('img/discover.gif')"></div>
          </div>
        </div>
        <div class="row informations-wrapper">
          <div class="col-xs-12 col-md-5 img-informations">
            <div style="background-image: url('img/interconnect.gif')"></div>
          </div>
          <div class="col-xs-12 col-md-7 txt-informations">
            <div class="information-title pad-0"><span>Interconnect</span></div>
            <div class="subtext">
              Connect your metaverse to hundreds other one
            </div>
            <div class="subtitle">
              Think bigger! You have access to thousands of worlds. It is time to make a difference and use the power of the metaverse.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="btn-zone">
              <a href="https://play.staging.workadventu.re/@/metaventure/land/portal" target="_blank" class="btn btn-primary btn-nft" ph-id="go_to_metadventure">
                <span>Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block block-team elt" id="elt-team">
      <div class="container">
        <h4 id="team">Team</h4>
        <p class="subtitle">
          A sweet mix of different universes and backgrounds to make the perfect team! They combine their strengths and passion to make everything possible for you!</p>
        <div class="team-member row">
          <div class="member-info col-xs-12 col-md-2">
            <div class="member-info_name">
              David Négrier
            </div>
            <div class="member-info_job">
              Founder & CTO
            </div>
            <div class="member-info_links">
              <ul>
                <li>
                  <a target="_blank" href="https://twitter.com/david_negrier">
                    <img src="/img/social/013-twitter-1.svg" alt="DAN twitter gen0" loading="lazy"/>
                  </a>
                </li>
                <li>
                  <a target="_blank"
                     href="https://www.linkedin.com/in/david-n%C3%A9grier-9911171/">
                    <img src="/img/social/031-linkedin.svg" alt="DAN libkedin gen0" loading="lazy"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="member-photo col-xs-12 col-md-2">
            <div>
              <img src="/img/Line.svg" class="line-profil line-profil-1 " alt="DAN line" loading="lazy"/>
              <img src="/img/team/david.svg" alt="Team DAN" loading="lazy"/>
            </div>
          </div>
          <div class="member-description col-xs-12 col-md-8">
            <div class="member-text" style="padding-top: 23px;">
              He loves developing and building things. Extremely engaged with the open-source community, he contributed to dozens of projects and even a PHP standard (PSR-11). Serial entrepeneur, he co-founded TheCodingMachine, a 100-people IT service company and acted as CTO for 15 years. He stepped down 2 years ago to dedicate 100% to building the best platform to meet in the metaverse!
            </div>
          </div>
        </div>

        <div class="team-member row">
          <div class="member-info col-xs-12 col-md-2 ">
            <div class="member-info_name">
              Grégory Rocher
            </div>
            <div class="member-info_job">
              Co-founder & CEO
            </div>
            <div class="member-info_links">
              <ul>
                <li>
                  <a target="_blank" href="https://twitter.com/Grgry_r">
                    <img src="/img/social/013-twitter-1.svg" alt="GRR twitter gen0" loading="lazy"/>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.linkedin.com/in/gregoryrocher/">
                    <img src="/img/social/031-linkedin.svg" alt="GRR libkedin gen0" loading="lazy"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="member-photo col-xs-12 col-md-2">
            <div>
              <img src="/img/Line.svg" class="line-profil line-profil-2" alt="GRR line" loading="lazy"/>
              <img src="/img/team/gregory.svg" alt="Team GRR" loading="lazy"/>
            </div>
          </div>
          <div class="member-description col-xs-12 col-md-8">
            <div class="member-text" style="padding-top: 12px;">
              <p>
                He has a lot of ideas but most of the time they are crazy like selling all his previous companies to solo travel the world for two years with a backpack.
                He is now puting all his energy in making Web3 & metaverses building accessible to anyone everywhere.
              </p>
              <p>
                With Metadventure he wants to transform the old way of making money (work-to-earn) into “x-to-earn” like play-to-earn, learn-to-earn, create-to-earn.
              </p>
            </div>
          </div>
        </div>

        <div class="team-member row">
          <div class="member-info col-xs-12 col-md-2 ">
            <div class="member-info_name">
              Gregoire Parant
            </div>
            <div class="member-info_job">
              Co-founder & CPO
            </div>
            <div class="member-info_links">
              <ul>
                <li>
                  <a target="_blank" href="https://twitter.com/gregoireparant">
                    <img src="/img/social/013-twitter-1.svg" alt="GRP twitter gen0" loading="lazy"/>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.linkedin.com/in/gr%C3%A9goire-parant-7b607591/">
                    <img src="/img/social/031-linkedin.svg" alt="GRP libkedin gen0" loading="lazy"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="member-photo col-xs-12 col-md-2">
            <div>
              <img src="/img/Line.svg" class="line-profil line-profil-1" alt="GRP line" loading="lazy"/>
              <img src="/img/team/gregoire.svg" alt="GRP team" loading="lazy"/>
            </div>
          </div>
          <div class="member-description col-xs-12 col-md-8">
            <div class="member-text" style="padding-top: 23px;">
              <p>
                Active on all fronts day and night, he will always be there
                for your projects and will find a solution to all your problems.
              </p>
              <p>
                His slogan: "There are no problems, just solutions".
              </p>
              <p>
                At night, you can find him with a glass of Picon beer in his
                hand!
              </p>
            </div>
          </div>
        </div>

        <div class="team-member row">
          <div class="member-info col-xs-12 col-md-2 ">
            <div class="member-info_name">
              Julie Danet
            </div>
            <div class="member-info_job">
              Co-founder & CHR
            </div>
            <div class="member-info_links">
              <ul>
                <li>
                  <a target="_blank" href="https://twitter.com/julie_danet">
                    <img src="/img/social/013-twitter-1.svg" alt="CHR twitter gen0" loading="lazy"/>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.linkedin.com/in/julie-danet/">
                    <img src="/img/social/031-linkedin.svg" alt="CHR libkedin gen0" loading="lazy"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="member-photo col-xs-12 col-md-2">
            <div>
              <img src="/img/Line.svg" class="line-profil line-profil-2" alt="CHR line" loading="lazy"/>
              <img src="/img/team/julie.svg" alt="CHR team" loading="lazy"/>
            </div>
          </div>
          <div class="member-description col-xs-12 col-md-8">
            <div class="member-text" style="padding-top: 8px;">
              <p>
                Super smiling and kind of overactive, she loves to lead many projects at the same time! That's why she co-founded WorkAdventure and Metadventure, while founding her own business as a Business Coach and Management.
              </p>
              <p>
                Her passions? Learn more and more everyday and travel all around the world!
              </p>
              <p>
                Her peculiarity? She passed a psychology certification at Harvard during her year in Boston!
              </p>
            </div>
          </div>
        </div>

        <div class="team-member row">
          <div class="member-info col-xs-12 col-md-2 ">
            <div class="member-info_name">
              Sophie Maechler
            </div>
            <div class="member-info_job">
              Co-founder & CMO
            </div>
            <div class="member-info_links">
              <ul>
                <li>
                  <!-- svelte-ignore security-anchor-rel-noreferrer -->
                  <a target="_blank" href="https://twitter.com/Story_Of_Yours">
                    <img src="/img/social/013-twitter-1.svg" alt="SOY twitter gen0" loading="lazy"/>
                  </a>
                </li>
                <li>
                  <!-- svelte-ignore security-anchor-rel-noreferrer -->
                  <a target="_blank" href="https://www.linkedin.com/in/sophie-maechler/">
                    <img src="/img/social/031-linkedin.svg" alt="SOY libkedin gen0" loading="lazy"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="member-photo col-xs-12 col-md-2">
            <div>
              <img src="/img/team/sophie.svg" alt="SOY team" loading="lazy"/>
            </div>
          </div>
          <div class="member-description col-xs-12 col-md-8">
            <div class="member-text" style="padding-top: 19px;">
              <p>
                Sophie loves exploring Worlds (virtuals & reals) & believes in crazy ideas (like Gregory's one). As a fierce entrepreneur, she never stops taking part of ambitious projects.
              </p>
              <p>
                She will take care of the community and she is always happy to help & make people happy. She believes in Metadventure since day 1 (2 years ago) & craves for chicken at least once a week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <a href="/">
        <img class="footer-logo" src="/img/Logo.svg" alt="Logo Metadventu.re" loading="lazy"/>
      </a>
    </footer>
  </main>
