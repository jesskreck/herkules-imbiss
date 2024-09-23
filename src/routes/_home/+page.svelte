<script lang="ts">
  import { Grillplatten } from "$lib/data/grillplatten";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Ueberbacken } from "$lib/data/ueberbacken";
  import type { Speise } from "$lib/types";

  import {
    StoreSpeise,
    StoreSpeiseBestellt,
    StoreBestellungKomplett,
  } from "$lib/stores/stores";

  import ModalKlassiker from "../../components/ModalKlassiker.svelte";
  import Resetter from "../../components/Resetter.svelte";

  let showModal = false;

  function openModal(item: Speise) {
    StoreSpeise.set(item);
    console.log($StoreSpeise);
    showModal = true;
  }

  $: {
    console.log("Speise", $StoreSpeise)
    console.log("SpeiseBestellt", $StoreSpeiseBestellt)
    console.log("BestellungKomplett", $StoreBestellungKomplett)
  }


</script>

<h1>Bestellaufnahme</h1>
<div class="home">
  <div class="menu">
    <h2>Klassiker</h2>
    {#each Klassiker as item}
      <button on:click={() => openModal(item)}>
        {item.nr}
        {item.name}
      </button>
    {/each}

    <h2>Pitas</h2>
    {#each Pitas as item}
      <button>
        {item.nr}
        {item.name}
      </button>
    {/each}

    <h2>Gyrosteller</h2>
    {#each Gyrosteller as item}
      <button>
        {item.nr}
        {item.name}
      </button>
    {/each}

    <h2>Grillplatten</h2>
    {#each Grillplatten as item}
      <button>
        {item.nr}
        {item.name}
      </button>
    {/each}

    <h2>Überbacken</h2>
    {#each Ueberbacken as item}
      <button>
        {item.nr}
        {item.name}
      </button>
    {/each}
  </div>

  <div class="bestellung">
    {#if $StoreBestellungKomplett.speisen.length > 0}
      <h2>Neue Bestellung</h2>
      <Resetter />
      <div>
        {#each $StoreBestellungKomplett.speisen as SpeiseBestellt}
          <h4>{SpeiseBestellt.menge} x {SpeiseBestellt.speise.name}</h4>
          <p>{SpeiseBestellt.kommentar}</p>
        {/each}
        <h3>
          Gesamtpreis: {$StoreBestellungKomplett.gesamtpreis.toFixed(2)} €
        </h3>
      </div>
      <button>Bestellung aufnehmen</button>
    {/if}
  </div>
</div>


{#if showModal}
  <ModalKlassiker bind:showModal />
{/if}



<style>
  .home {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .menu {
    grid-area: auto / span 3;
    background-color: beige;
  }

  .bestellung {
    background-color: darkseagreen;
  }
</style>
