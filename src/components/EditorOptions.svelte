<script lang="ts">
  import type { Speise, SpeiseBestellt, Zutat } from "$lib/types";
  import Counter from "./utils/Counter.svelte";
  import ZutatButton from "./utils/ZutatButton.svelte";
  import {
    addSpeiseToBestellung,
    removeSpeiseFromBestellung,
    updateSpeiseInBestellung,
  } from "../stores/Bestellung";
  import ButtonToggler from "./utils/ButtonToggler.svelte";
  import { closeModal } from "../stores/Editor";
  import ZutatToggler from "./utils/ZutatToggler.svelte";

  export let speise: Speise | SpeiseBestellt;
  let speiseToEdit: Speise;

  let menge: number;
  let notiz: string;
  let einzelpreis: number;
  let aufpreis: number = 0;
  let saucenAuswahl: string;
  let optionAuswahl: string;

  $: console.log(optionAuswahl);

  
  const hasID = "id" in speise;

  if (hasID) {
    const speiseBestellt = speise as SpeiseBestellt;
    speiseToEdit = speiseBestellt.speise;
    menge = speiseBestellt.menge;
    notiz = speiseBestellt.notiz || "";
    einzelpreis = speiseBestellt.speise.preis;
    aufpreis = speiseBestellt.gesamtpreis / menge - einzelpreis;
    saucenAuswahl =
      speiseToEdit.singleSauceOnly && speiseToEdit.sauce
        ? speiseToEdit.sauce.find((sauce) => sauce.menge === 1)?.name || ""
        : "";
  } else {
    speiseToEdit = speise as Speise;
    menge = 1;
    notiz = "";
    einzelpreis = speiseToEdit.preis;
    saucenAuswahl = "";
  }

  $: gesamtpreis = (einzelpreis + aufpreis) * menge;

  function updateZutat(event: CustomEvent<{ zutat: Zutat; aufpreis: number }>) {
    const updatedZutat = event.detail.zutat;
    speiseToEdit.zutaten = speiseToEdit.zutaten.map((z) =>
      z.name === updatedZutat.name ? updatedZutat : z
    );
    einzelpreis = einzelpreis + event.detail.aufpreis;
  }

  function saveChanges() {
    if (speiseToEdit.sauce && speiseToEdit.singleSauceOnly) {
      speiseToEdit.sauce = speiseToEdit.sauce.map((sauce) => ({
        ...sauce,
        menge: sauce.name === saucenAuswahl ? 1 : 0,
      }));
    }

    if (hasID) {
      const updatedSpeise: SpeiseBestellt = {
        ...(speise as SpeiseBestellt),
        speise: speiseToEdit,
        menge: menge,
        gesamtpreis: gesamtpreis,
        notiz: notiz,
      };
      updateSpeiseInBestellung(updatedSpeise);
    } else {
      const newSpeise: SpeiseBestellt = {
        id: Math.floor(Math.random() * 1000000),
        speise: speiseToEdit,
        menge: menge,
        gesamtpreis: gesamtpreis,
        notiz: notiz,
      };
      addSpeiseToBestellung(newSpeise);
    }
    closeModal();
  }

  function deleteSpeise() {
    const speiseBestellt = speise as SpeiseBestellt;
    removeSpeiseFromBestellung(speiseBestellt);
    closeModal();
  }
</script>

<div class="editor">
  <h1>#{speiseToEdit.nr} {speiseToEdit.name}</h1>

  <div class="editor-container">
    <h3>Zutaten</h3>

    <div class="editor-zutaten">
      <!-- für Pitas: Zwiebeln und Kraut kleiner rendern -->
      {#if (speiseToEdit.nr >= 8 && speiseToEdit.nr <= 15) || (speiseToEdit.nr >= 23 && speiseToEdit.nr <= 32)}
        {#each speiseToEdit.zutaten.filter((zutat) => zutat.name !== "Zwiebeln" && zutat.name !== "Kraut") as zutat}
          <ZutatButton on:mengeChanged={updateZutat} {zutat} />
        {/each}

        <div class="editor-extras">
          {#each speiseToEdit.zutaten.filter((zutat) => zutat.name === "Zwiebeln" || zutat.name === "Kraut") as zutat}
            <ZutatButton on:mengeChanged={updateZutat} {zutat} />
          {/each}
        </div>

        <!-- alle anderen: alle Zutaten gleich groß rendern -->
      {:else}
        {#each speiseToEdit.zutaten as zutat}
          <ZutatButton on:mengeChanged={updateZutat} {zutat} />
        {/each}
      {/if}

      <!-- für Zutatenoptionen (zB Salat Topping) -->
      {#if speiseToEdit.option}
        <div class="container-toggler">
          {#each speiseToEdit.option as zutat}
            <ZutatToggler bind:auswahl={optionAuswahl} option={zutat} />
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if speiseToEdit.sauce}
    <div class="editor-container">
      <h3>Saucen</h3>
      {#if speiseToEdit.singleSauceOnly}
        <div class="container-toggler">
          {#each speiseToEdit.sauce as zutat}
            <ButtonToggler on:mengeChanged={updateZutat} bind:auswahl={saucenAuswahl} option={zutat} />
          {/each}
        </div>
      {:else}
        <div class="editor-saucen">
          {#each speiseToEdit.sauce as zutat}
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
    {#if hasID && menge === 0}
      <button class="btn-primary stretch" on:click={deleteSpeise}
        ><strong>löschen?</strong></button
      >
    {:else}
      <button
        class="btn-primary stretch"
        on:click={saveChanges}
        disabled={menge === 0 ||
          optionAuswahl === undefined ||
          (speiseToEdit.singleSauceOnly && saucenAuswahl === "")}
        ><strong>hinzufügen</strong> {gesamtpreis.toFixed(2)}€</button
      >
    {/if}
  </div>
</div>
