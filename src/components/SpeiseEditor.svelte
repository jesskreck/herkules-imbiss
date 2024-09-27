<script lang="ts">
  import type { Speise, Zutat } from "$lib/types";
  import Counter from "./Counter.svelte";
  import ZutatButton from "./ZutatButton.svelte";
  import { bestellungStore } from "../stores/Bestellung";
  import ButtonToggler from "./ButtonToggler.svelte";
  import { closeModal } from "../stores/Modal";

  export let speise: Speise;

  let menge: number = 1;
  let notiz: string = "";
  let einzelpreis: number = speise.preis;
  let aufpreis: number = 0;
  $: gesamtpreis = (einzelpreis + aufpreis) * menge;


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
    closeModal();
  }

  let saucenAuswahl = "";
  $: if (speise.sauce && speise.singleSauceOnly) {
    saucenAuswahl === speise.sauce[0].name;
  }
</script>

<div class="editor">
  <h1>#{speise.nr} {speise.name}</h1>

  <div class="editor-container">
    <h3>Zutaten</h3>

    <div class="editor-zutaten">

      <!-- Zwiebeln und Kraut kleiner rendern (für Pitas) -->
      {#if speise.nr >= 8 && speise.nr <= 15}
        {#each speise.zutaten.filter((zutat) => zutat.name !== "Zwiebeln" && zutat.name !== "Kraut") as zutat}
          <ZutatButton on:mengeChanged={updateZutat} {zutat} />
        {/each}

        <div class="editor-extras">
          {#each speise.zutaten.filter((zutat) => zutat.name === "Zwiebeln" || zutat.name === "Kraut") as zutat}
            <ZutatButton on:mengeChanged={updateZutat} {zutat} />
          {/each}
        </div>

      <!-- alle Zutaten gleich groß rendern -->
      {:else}
        {#each speise.zutaten as zutat}
          <ZutatButton on:mengeChanged={updateZutat} {zutat} />
        {/each}
      {/if}
    </div>
  </div>

  {#if speise.sauce}
    <div class="editor-container">
      <h3>Saucen</h3>
      {#if speise.singleSauceOnly}
        <div class="container-toggler">
          {#each speise.sauce as zutat}
            <ButtonToggler bind:auswahl={saucenAuswahl} option={zutat} />
          {/each}
        </div>
      {:else}
        <div class="editor-saucen">
          {#each speise.sauce as zutat}
            <ZutatButton on:mengeChanged={updateZutat} {zutat} />
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  <div class="editor-container">
    <h3>Notiz</h3>
    <div class="editor-notiz">
      <input bind:value={notiz} placeholder="Bestellhinweis...|" />
    </div>
  </div>

  <div class="flex">
    <Counter bind:count={menge} bigger={true} />
    <button
      class="btn-primary stretch"
      on:click={addSpeiseToBestellung}
      disabled={menge === 0 || (speise.singleSauceOnly && saucenAuswahl === "")}
      ><strong>hinzufügen</strong> {gesamtpreis.toFixed(2)}€</button
    >
  </div>
</div>
