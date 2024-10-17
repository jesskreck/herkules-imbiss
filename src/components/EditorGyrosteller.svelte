<script lang="ts">
  import {
    Size,
    SizeValues,
    type Speise,
    type SpeiseBestellt,
    type Zutat,
  } from "$lib/types";
  import Counter from "./utils/Counter.svelte";
  import ZutatButton from "./utils/ZutatButton.svelte";
  import {
    addSpeiseToBestellung,
    updateSpeiseInBestellung,
    removeSpeiseFromBestellung,
  } from "../stores/Bestellung";
  import { closeModal } from "../stores/Editor";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import ButtonToggler from "./utils/ButtonToggler.svelte";

  export let speise: Speise | SpeiseBestellt;
  let speiseToEdit: Speise;

  let aufpreis: number;
  let einzelpreis: number;
  let gesamtpreis: number;
  let menge: number;
  let notiz: string;
  let size: string;
  let id: number;

  const hasID: boolean = "id" in speise;

  if (hasID) {
    const speiseBestellt = speise as SpeiseBestellt;
    speiseToEdit = speiseBestellt.speise;
    id = speiseBestellt.id;
    menge = speiseBestellt.menge;
    size = speiseBestellt.size || "";
    notiz = speiseBestellt.notiz || "";
    einzelpreis = speiseBestellt.speise.preis;
    aufpreis =
      speiseBestellt.gesamtpreis / menge -
      einzelpreis +
      (size === "klein" ? 2 : 0);
  } else {
    speiseToEdit = speise as Speise;
    menge = 1;
    size = "normal";
    notiz = "";
    aufpreis = 0;
    einzelpreis = speiseToEdit.preis;
  }

  function findGyrosteller(speise: Speise): Speise {
    return (
      Gyrosteller.find((gericht) =>
        gericht.zutaten.every((zutat) =>
          speise.zutaten.some(
            (s) => s.name === zutat.name && s.menge === zutat.menge
          )
        )
      ) || speise
    );
  }

  // reaktive Berechnung vom Tellerpreis abhängig von Tellerzutaten, Extras und Größe
  $: {
    const teller = findGyrosteller(speiseToEdit);
    speiseToEdit.nr = teller.nr;
    speiseToEdit.name = teller.name;
    einzelpreis = teller.preis;
    if (size === "klein") {
      einzelpreis -= 2;
    }
    gesamtpreis = (einzelpreis + aufpreis) * menge;
  }

  // Menge der an- und ausgetoggelten Zutaten abspeichern + optionalen Aufpreis einberechnen
  function updateZutat(event: CustomEvent<{ zutat: Zutat; aufpreis: number }>) {
    const updatedZutat = event.detail.zutat;
    speiseToEdit.zutaten = speiseToEdit.zutaten.map((z) =>
      z.name === updatedZutat.name ? updatedZutat : z
    );
    aufpreis = aufpreis + event.detail.aufpreis;
  }

  function saveChanges() {
    if (hasID) {
      const updatedSpeise: SpeiseBestellt = {
        ...(speise as SpeiseBestellt),
        speise: speiseToEdit,
        menge: menge,
        gesamtpreis: gesamtpreis,
        size: size,
        notiz: notiz,
      };
      updateSpeiseInBestellung(updatedSpeise);
    } else {
      const newSpeise: SpeiseBestellt = {
        id: Math.floor(Math.random() * 1000000),
        speise: speiseToEdit,
        menge: menge,
        gesamtpreis: gesamtpreis,
        size: size,
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
  <h1>Gyrosteller Nummer #{speiseToEdit.nr}</h1>
  <div class="editor-container">
    <h3>Zutaten</h3>
    <div class="editor-zutaten">
      {#each speiseToEdit.zutaten as zutat}
        <ZutatButton {zutat} on:mengeChanged={updateZutat} />
      {/each}
    </div>
  </div>

  {#if speiseToEdit.sauce}
    <div class="editor-container">
      <h3>Extras</h3>

      <div class="editor-saucen">
        {#each speiseToEdit.sauce as zutat}
          <ZutatButton on:mengeChanged={updateZutat} {zutat} />
        {/each}
      </div>
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
    <div class="container-toggler">
      {#each ["normal", "klein"] as option}
        <ButtonToggler bind:auswahl={size} {option} />
      {/each}
    </div>
    {#if hasID && menge === 0}
      <button class="btn-primary stretch" on:click={deleteSpeise}
        ><strong>löschen?</strong></button
      >
    {:else}
      <button
        class="btn-primary stretch"
        on:click={saveChanges}
        disabled={!hasID && menge === 0}
        ><strong>hinzufügen</strong> {gesamtpreis.toFixed(2)}€</button
      >
    {/if}
  </div>
</div>
