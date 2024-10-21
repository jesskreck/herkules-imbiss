<script lang="ts">
  import { BestellTyp, BestellTypen, type Bestellung, type SpeiseBestellt } from "$lib/types";
  import { bestellungStore } from "../stores/Bestellung";
  import ButtonToggler from "./utils/TogglerTextButton.svelte";
  import BestelluebersichtSpeise from "./BestelluebersichtSpeise.svelte";
  import { openCheckout } from "../stores/Checkout";

  //Toggler Bestelloptionen
  let auswahl: BestellTyp = BestellTyp.a;

  //Store Bestellung
  let bestellung: Bestellung;
  bestellungStore.subscribe((b) => {
    bestellung = b;
  });


  //Lieferung
  let liefergebühr = 2.5;
  let liefern = false;
  $: liefern = auswahl === BestellTyp.c;
  $: gesamtpreisTemp = bestellung.gesamtpreis + (liefern ? +liefergebühr : 0);


</script>

<div class="menu_bestellung-header">
  <h3>Neue Bestellung</h3>

  <div class="container-toggler">
    {#each BestellTypen as option}
      <ButtonToggler bind:auswahl {option} />
    {/each}
  </div>
</div>

<div class="menu_bestellung-list" class:liefern>
  {#each bestellung.speisen as speiseBestellt (speiseBestellt.id)}
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
    <button class="btn-primary stretch" 
    on:click={() => openCheckout(auswahl)}
    
      ><h3>Bestellung aufnehmen</h3></button
    >
  </div>
</div>
