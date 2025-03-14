<script lang="ts">
  import { BestellTyp, type Bestellung } from "$lib/types";
  import { bestellungStore } from "../../stores/Bestellung";
  import { calculatedDiscount, discountedPrice } from "../../stores/Discount";

  export let auswahl;

  //Stores
  let bestellung: Bestellung;

  bestellungStore.subscribe((b) => {
    bestellung = b;
  });

  //Lieferung
  let liefergebühr = 3;
  $: liefern = auswahl === BestellTyp.c;

  // Liefergebühr nur, wenn Gesamtpreis ≤ 30 €
  $: bestellung.liefergebuehr =
    liefern && bestellung.gesamtpreis < 30 ? liefergebühr : 0;

  // Berechne Preis inklusive optionaler Liefergebühr und optionalem Discount
  $: gesamtpreisMitOptionen =
    $discountedPrice + (bestellung.liefergebuehr ?? 0);
</script>

{#if liefern}
  {#if bestellung.discountRate}
    <!-- zeige Rabatt -->
    <div class="menu_bestellung-preis">
      <p>Vorläufiger Preis:</p>
      <h3 class="thin">{bestellung.gesamtpreis.toFixed(2)}€</h3>
    </div>
    <div class="menu_bestellung-preis">
      <p>Rabatt:</p>
      <h3 class="secondary">− {$calculatedDiscount.toFixed(2)}€</h3>
    </div>
  {/if}

  <!-- zeige Liefergebuehr -->
  <div class="menu_bestellung-preis">
    <p>Liefergebühr:</p>
    <h3>{(bestellung.liefergebuehr ?? 0).toFixed(2)}€</h3>
  </div>
{/if}

<div class="menu_bestellung-preis">
  <p>Gesamtpreis:</p>

  {#if bestellung.discountRate && !liefern}
    <!-- finaler Preis mit Rabatt -->
    <h3 class="thin">
      {bestellung.gesamtpreis.toFixed(2)}€&nbsp;
    </h3>
    <h3 class="secondary">− {$calculatedDiscount.toFixed(2)}€</h3>
  {/if}
  <!-- finaler Preis -->
  <h2>{gesamtpreisMitOptionen.toFixed(2)}€</h2>
</div>
