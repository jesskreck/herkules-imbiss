<script lang="ts">
  import { Grillplatten } from "$lib/data/grillplatten";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Ueberbacken } from "$lib/data/ueberbacken";
  import type { Bestellung, Speise } from "$lib/types";

  import { bestellungStore } from "$lib/stores/stores";
  let bestellung: Bestellung;
  bestellungStore.subscribe((value) => {
    bestellung = value;
  });

  import ModalKlassiker from "../../components/ModalKlassiker.svelte";

  let itemSelected: Speise;
  let showModal = false;

  function openModal(item: Speise) {
    showModal = true;
    itemSelected = item;
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
    {#if bestellung.items.length > 0}
      <h2>Neue Bestellung</h2>
      <button>❌</button>
      <div>
        {#each bestellung.items as item}
          <h4>{item.menge} x {item.speise.name}</h4>
          <p>{item.kommentar}</p>
        {/each}
        <h3>Gesamtpreis: {bestellung.gesamtpreis.toFixed(2)} €</h3>
      </div>
      <button>Bestellung aufnehmen</button>
    {/if}
  </div>
</div>

{#if itemSelected}
  <ModalKlassiker bind:showModal speise={itemSelected} />
{/if}

<style>
  .home {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .menu {
    grid-area: auto / span 3;
  }
</style>
