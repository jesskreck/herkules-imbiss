<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";

  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Grillplatten } from "$lib/data/grillplatten";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import { Ueberbacken } from "$lib/data/ueberbacken";
  import { Salate } from "$lib/data/salate";

  import MenuHeader from "../../components/MenuHeader.svelte";
  import SpeiseCard from "../../components/speiseCard.svelte";
  import Dialog from "../../components/Dialog.svelte";
  import Bestelluebersicht from "../../components/Bestelluebersicht.svelte";

  import { modalStore, openModal } from "../../stores/Modal";

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
</script>


{#if showModal && selectedSpeise}
  <Dialog speise={selectedSpeise} ></Dialog>
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
