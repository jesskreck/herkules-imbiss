<script lang="ts">
  import type { Speise } from "$lib/types";

  import { onMount } from "svelte";
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Grillplatten } from "$lib/data/grillplatten";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import { Ueberbacken } from "$lib/data/ueberbacken";
  import { Salate } from "$lib/data/salate";

  import SpeiseCard from "../../components/speiseCard.svelte";
  import Dialog from "../../components/Dialog.svelte";
  import Bestelluebersicht from "../../components/Bestelluebersicht.svelte";


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

  let kategorieSelected = "";
  let showModal = false;
  let selectedSpeise: Speise | null = null;


  // Datumanzeige
  let time = new Date();
  let timeformat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  $: date = time.toLocaleDateString("de-DE", timeformat);
  $: hours = time.getHours().toString().padStart(2, "0");
  $: minutes = time.getMinutes().toString().padStart(2, "0");
  $: seconds = time.getSeconds().toString().padStart(2, "0");

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });


  // Functions
  function jumpToKategorie(kategorie: string) {
    kategorieSelected = kategorie;

    const element = document.getElementById(kategorie);
    if (element) {
      element.scrollIntoView();
    }
  }

  function openModal(speise: Speise) {
    selectedSpeise = speise;
    showModal = true;
  }

</script>

{#if showModal && selectedSpeise}
    <Dialog speise={selectedSpeise} bind:showModal>
    </Dialog>
{/if}

  <div class="menu">
    <div class="menu-header">
      <p>{date}</p>
      <p>{hours}:{minutes}:{seconds} Uhr</p>
      <div class="container-kategorien">
        {#each kategorien as kategorie}
          <button
            class:selected={kategorieSelected === kategorie.name}
            class="btn-kategorie"
            on:click={() => jumpToKategorie(kategorie.name)}
          >
            {kategorie.name}
          </button>
        {/each}
      </div>
    </div>

    <div class="menu-sections">
      {#each kategorien as kategorie, i}
        <section id={kategorien[i].name}>
          <div class="header-kategorie">{kategorie.name}</div>
          <div class="container-speisen">
            {#each kategorie.speisen as speise}
              <SpeiseCard {speise} on:open-modal={(event) => openModal(event.detail.speise)} />
            {/each}
          </div>
        </section>
      {/each}

   
    </div>
  </div>

  <div class="sum">
    <Bestelluebersicht />
  </div>


