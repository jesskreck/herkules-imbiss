<script lang="ts">
  import Gesamtpreis from './utils/Gesamtpreis.svelte';

  import { BestellTyp, BestellTypen, type Bestellung } from "$lib/types";
  import { bestellungStore } from "../stores/Bestellung";
  import { openCheckout } from "../stores/Checkout";
  import ButtonToggler from "./utils/TogglerTextButton.svelte";
  import BestelluebersichtSpeise from "./BestelluebersichtSpeise.svelte";
  import {
    openModalDiscount,
  } from "../stores/Discount";

  //Toggler Bestelloptionen
  let auswahl: BestellTyp = BestellTyp.a;

  //Stores
  let bestellung: Bestellung;
  bestellungStore.subscribe((b) => {
    bestellung = b;
  });

  function handleDiscountClick() {
    if (bestellung.discountRate != null) {
      openModalDiscount(bestellung.discountRate);
    }
  }

  //Bei Lieferung true wird Container #menu-bestellung-list in max-height verringert
  $: liefern = auswahl === BestellTyp.c;

</script>

<div class="menu_bestellung-header">
  <h3>Neue Bestellung</h3>

  <div class="container-toggler">
    {#each BestellTypen as option}
      <ButtonToggler bind:auswahl {option} />
    {/each}
  </div>
</div>

<div class="menu_bestellung-list" id="menu-bestellung-list" class:liefern>
  {#each bestellung.speisen as speiseBestellt (speiseBestellt.id)}
    <BestelluebersichtSpeise {speiseBestellt} />
  {/each}
  {#if bestellung.discountRate != null}
    <button
      on:click={handleDiscountClick}
      class="menu_bestellung-list-item secondary"
      ><h2 class="menu_bestellung-list-item-name">Rabatt</h2>
      <h3 class="menu_bestellung-list-item-preis">
        {bestellung.discountRate}%
      </h3>
    </button>
  {/if}
</div>

<div>
  <Gesamtpreis {auswahl} />

  <div class="flex">
    <button 
    class="btn-primary stretch" 
    on:click={() => openCheckout(auswahl)}
    disabled={auswahl === BestellTyp.c && bestellung.gesamtpreis < 20}
  >
    <h3>
      {#if auswahl === BestellTyp.c && bestellung.gesamtpreis < 20}
        Lieferung erst ab 20€
      {:else}
        OK?
      {/if}
    </h3>
  </button>
  </div>
</div>
