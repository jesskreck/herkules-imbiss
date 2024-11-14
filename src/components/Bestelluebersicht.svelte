<script lang="ts">
  import { BestellTyp, BestellTypen, type Bestellung } from "$lib/types";
  import { bestellungStore } from "../stores/Bestellung";
  import { openCheckout } from "../stores/Checkout";
  import ButtonToggler from "./utils/TogglerTextButton.svelte";
  import BestelluebersichtSpeise from "./BestelluebersichtSpeise.svelte";
  import {
    openModalDiscount,
    calculatedDiscount,
    totalPrice,
  } from "../stores/Discount";

  //Toggler Bestelloptionen
  let auswahl: BestellTyp = BestellTyp.a;

  //Stores
  let bestellung: Bestellung;
  bestellungStore.subscribe((b) => {
    bestellung = b;
  });

  function handleDiscountClick() {
    if (bestellung.discount != null) {
      openModalDiscount(bestellung.discount);
    }
  }

  //Lieferung
  let liefergebühr = 3;
  let liefern = false;
  $: liefern = auswahl === BestellTyp.c;
  $: gesamtpreisLiefern = $totalPrice + (liefern ? +liefergebühr : 0);
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
  {#if bestellung.discount != null}
    <button
      on:click={handleDiscountClick}
      class="menu_bestellung-list-item secondary"
      ><h2 class="menu_bestellung-list-item-name">Rabatt</h2>
      <h3 class="menu_bestellung-list-item-preis">{bestellung.discount}%</h3>
    </button>
  {/if}
</div>

<div>
  {#if liefern}
    {#if bestellung.discount}
      <div class="menu_bestellung-preis">
        <p>Rabatt auf Essen:</p>
        <h3 class="secondary">− {$calculatedDiscount.toFixed(2)}€</h3>
      </div>
    {/if}
    <div class="menu_bestellung-preis">
      <p>Liefergebühr:</p>
      <h3>{liefergebühr.toFixed(2)}€</h3>
    </div>
    <div class="menu_bestellung-preis">
      <p>Gesamtpreis:</p>
      <h2>{gesamtpreisLiefern.toFixed(2)}€</h2>
    </div>

  {:else if bestellung.discount}
  <div class="menu_bestellung-preis">
      <p>Gesamtpreis:</p>
      <div class="menu_bestellung-preis--discount">
        <h3>
          {bestellung.gesamtpreis.toFixed(2)}€&nbsp;
        </h3>
        <h3 class="secondary">− {$calculatedDiscount.toFixed(2)}€ =&nbsp;</h3>
        <h2>{$totalPrice.toFixed(2)}€</h2>
      </div>
    </div>

    {:else}
    <div class="menu_bestellung-preis">
      <p>Gesamtpreis:</p>
      <h2>{$totalPrice.toFixed(2)}€</h2>
    </div>
    {/if}

  <div class="flex">
    <button class="btn-primary stretch" on:click={() => openCheckout(auswahl)}
      ><h3>OK?</h3></button
    >
  </div>
</div>
