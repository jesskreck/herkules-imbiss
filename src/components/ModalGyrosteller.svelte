<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Speise, Zutat } from "$lib/types";
  import Counter from "./Counter.svelte";
  import ZutatButton from "./ZutatButton.svelte";
  import { bestellungStore } from "../stores/Bestellung";

  export let speise: Speise;

  let menge: number = 1;
  let notiz: string = "";
  let einzelpreis: number = speise.preis;
  let aufpreis: number = 0;
  $: gesamtpreis = (einzelpreis + aufpreis) * menge;

  const dispatch = createEventDispatcher();

  function updateZutat(event: CustomEvent<{ zutat: Zutat; aufpreis: number }>) {
    const updatedZutat = event.detail.zutat;
    // aktualisier die Menge der betroffenen Zutat
    speise.zutaten = speise.zutaten.map((z) =>
      z.name === updatedZutat.name ? updatedZutat : z
    );
    // update den Einzelpreis falls ein Aufpreis mitgeschickt wurde
    einzelpreis = einzelpreis + event.detail.aufpreis;
  }

  function addSpeiseToBestellung() {
    const toAdd = {
      id: Math.floor(Math.random() * 1000000),
      speise: speise,
      menge: menge,
      gesamtpreis: gesamtpreis,
      notiz: notiz,
    };

    bestellungStore.update((bestellung) => {
      return {
        ...bestellung,
        speisen: [...bestellung.speisen, toAdd],
        gesamtpreis: bestellung.gesamtpreis + gesamtpreis,
      };
    });

    dispatch('closeModal')
  }
</script>

<h1>#{speise.nr} {speise.name}</h1>

<h3>Zutaten</h3>
<div class="modal-container modal-container--zutaten">
  {#each speise.zutaten as zutat}
    <ZutatButton on:mengeChanged={updateZutat} {zutat} />
  {/each}
</div>

{#if speise.sauce}
  <h3>Saucen</h3>
  <div class="modal-container modal-container--saucen">
    {#each speise.sauce as zutat}
      <ZutatButton on:mengeChanged={updateZutat} {zutat} />
    {/each}
  </div>
{/if}

<h3>Notiz</h3>
<div class="modal-container modal-container--notiz">
  <input bind:value={notiz} placeholder="Bestellhinweis...|" />
</div>

<div class="flex">
  <Counter bind:count={menge} />
  <button
    class="btn-primary"
    on:click={addSpeiseToBestellung}
    disabled={menge === 0}
    ><strong>hinzufügen</strong> {gesamtpreis.toFixed(2)}€</button
  >
</div>
