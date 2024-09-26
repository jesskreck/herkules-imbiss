<script lang="ts">
  import type { Bestellung, Speise } from "$lib/types";
  import { bestellungStore } from "../stores/Bestellung";
  import ButtonToggler from "./ButtonToggler.svelte";
  import Counter from "./Counter.svelte";

  //Toggler Bestelloptionen
  let bestellOptionen = ["Hier essen", "Abholung", "Lieferung"];

  let bestellAuswahl = "Hier essen";

  //Store Bestellung
  let bestellung: Bestellung;

  bestellungStore.subscribe((b) => {
    bestellung = b;
  });

  function getZutatenliste(speise: Speise) {
    let zutaten = [...speise.zutaten, ...(speise.sauce || [])];
    return zutaten
      .filter((zutat) => zutat.menge === 1)
      .map((zutat) => zutat.name);
  }

  // Lieferung
  let liefergebühr = 2.5;
  let liefern = false;
  $: liefern = bestellAuswahl === "Lieferung";
  $: gesamtpreisTemp = bestellung.gesamtpreis + (liefern ? +liefergebühr : 0);
</script>

<div class="bestellung">
  <div>
    <h2>Neue Bestellung</h2>

    <div class="container-toggler">
      {#each bestellOptionen as option}
        <ButtonToggler bind:auswahl={bestellAuswahl} {option} />
      {/each}
    </div>
  </div>

  <div class="bestellung-speisen">
    {#each bestellung.speisen as speiseBestellt}
      <div class="bestellung-speisen">
        <h3>#{speiseBestellt.speise.nr} {speiseBestellt.speise.name}</h3>

        <div class="bestellung-speisen-text">
          {#each getZutatenliste(speiseBestellt.speise) as zutat}
            <span class="bestellung-speisen-zutaten">{zutat}</span>
          {/each}
          {#if speiseBestellt.notiz}
            <p>Notiz: {speiseBestellt.notiz}</p>
          {/if}
        </div>
        
        <div class="bestellung-speisen-buttons">
          <Counter count={speiseBestellt.menge} />
          <p>{speiseBestellt.gesamtpreis.toFixed(2)}€</p>
          <button class="btn-delete">
            <img src="/src/lib/assets/webp/delete.png" alt="Trash" />
          </button>
        </div>

      </div>
    {/each}
  </div>

  <div>
    {#if liefern}
      <div class="bestellung-preis">
        <p>Liefergebühr:</p>
        <h3>{liefergebühr.toFixed(2)}€</h3>
      </div>
    {/if}
    <div class="bestellung-preis">
      <p>Gesamtpreis:</p>
      <h2>{gesamtpreisTemp.toFixed(2)}€</h2>
    </div>
    <div class="flex">
      <button class="btn-primary stretch"><h4>Bestellung aufnehmen</h4></button>
    </div>
  </div>
</div>
