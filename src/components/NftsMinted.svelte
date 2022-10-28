<script lang="ts">
    import { onMount } from "svelte";
    import { contractAddress } from "../stores/WalletStore";

    let tokens: token[] = [];
    let loading = true;

    const params = new URLSearchParams(window.location.search);

    type token = {
        tokenId: string;
        spriteUrl: string;
    };

    onMount(async () => {
        const response = await fetch(`https://workadventu.re/api/nfts/${contractAddress}/${params.get("uuid")}`, {
            method: "GET",
        });
        console.log(response);

        if (response.ok) {
            tokens = (await response.json()) as token[];
        }

        loading = false;
    });
</script>

<div class="main">
    {#if loading}
        <p>Loading...</p>
    {:else if tokens.length > 0}
        {#each tokens as token}
            <div class="slider-item">
                <img src={`/assets/nfts/${token.tokenId}.png`} draggable="false" alt="images" />
            </div>
        {/each}
    {:else}
        <p>Doesn't have nfts yet</p>
    {/if}
</div>

<style lang="scss">
    .main {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2%;
        margin: 0 1% 0 1%;

        .slider-item {
            padding: 0 2% 1% 2%;

            img {
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -o-user-select: none;
                user-select: none;
            }
        }

        .arrow-prev {
            left: -2%;
        }

        .arrow-next {
            right: -2%;
        }
    }
</style>
