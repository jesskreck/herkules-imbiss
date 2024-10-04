<script lang="ts">
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Grillplatten } from "$lib/data/grillplatten";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import { Ueberbacken } from "$lib/data/ueberbacken";
  import { Salate } from "$lib/data/salate";

  import MenuHeader from "../../components/MenuHeader.svelte";
  import SpeiseCard from "../../components/utils/SpeiseCard.svelte";
  import Editor from "../../components/Editor.svelte";
  import Bestelluebersicht from "../../components/Bestelluebersicht.svelte";

  import { modalStore } from "../../stores/Modal";
  import { checkoutStore } from "../../stores/Checkout";
  import Checkout from "../../components/Checkout.svelte";

  // States
  let kategorien = [
    { name: "Klassiker", speisen: Klassiker },
    { name: "Pitas", speisen: Pitas },
    { name: "Gyrosteller", speisen: Gyrosteller },
    { name: "Grillplatten", speisen: Grillplatten },
    { name: "Überbacken", speisen: Ueberbacken },
    { name: "Salate", speisen: Salate },
    // { name: "Getränke", speisen: },
  ];

  $: ({ showModal, selectedSpeise } = $modalStore);
  $: ({ showCheckout } = $checkoutStore)
</script>


{#if showModal && selectedSpeise}
  <Editor speise={selectedSpeise} ></Editor>
{/if}

{#if showCheckout}
  <Checkout />
{/if}

<div class="menu">
  <div class="menu_header">
    <MenuHeader />
  </div>

  <div class="menu_kategorien" id="style-2">
    {#each kategorien as kategorie, i}
      <section id={kategorien[i].name}>
        <h3 class="menu_kategorien-heading">{kategorie.name}</h3>
        <div class="container-card-speise">
          {#each kategorie.speisen as speise}
            <SpeiseCard {speise} />
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>

<div class="menu_bestellung">
  <Bestelluebersicht />
</div>
