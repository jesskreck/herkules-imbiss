<script lang="ts">
  import type { Bestellung } from "$lib/types";
  import { bestellungStore } from "../stores/Bestellung";
  import ButtonToggler from "./ButtonToggler.svelte";
  import BestelluebersichtSpeise from './BestelluebersichtSpeise.svelte';

  //Toggler Bestelloptionen
  let bestellOptionen = ["Hier essen", "Abholung", "Lieferung"];
  let bestellAuswahl = "Hier essen";

  //Store Bestellung
  let bestellung: Bestellung;
  bestellungStore.subscribe((b) => {
    bestellung = b;
  });

  // Lieferung
  let liefergebühr = 2.5;
  let liefern = false;
  $: liefern = bestellAuswahl === "Lieferung";
  $: gesamtpreisTemp = bestellung.gesamtpreis + (liefern ? +liefergebühr : 0);


</script>

<div class="menu_bestellung-header">
  <h3>Neue Bestellung</h3>

  <div class="container-toggler">
    {#each bestellOptionen as option}
      <ButtonToggler bind:auswahl={bestellAuswahl} {option} />
    {/each}
  </div>
</div>

<div class="menu_bestellung-list">
  {#each bestellung.speisen as speiseBestellt}
    <BestelluebersichtSpeise {speiseBestellt} />
  {/each}
</div>

<div>
  {#if liefern}
    <div class="menu_bestellung-preis">
      <p>Liefergebühr:</p>
      <h3>{liefergebühr.toFixed(2)}€</h3>
    </div>
  {/if}
  <div class="menu_bestellung-preis">
    <p>Gesamtpreis:</p>
    <h2>{gesamtpreisTemp.toFixed(2)}€</h2>
  </div>
  <div class="flex">
    <button class="btn-primary stretch"><h4>Bestellung aufnehmen</h4></button>
  </div>
</div>
