<script lang="ts">
  import type { Speise, SpeiseBestellt, Zutat } from "$lib/types";
  import Counter from "./utils/Counter.svelte";
  import ZutatButton from "./utils/ZutatButton.svelte";
  import {
    addSpeiseToBestellung,
    updateSpeiseInBestellung,
  } from "../stores/Bestellung";
  import { closeModal } from "../stores/Editor";
  import { Gyrosteller } from "$lib/data/gyrosteller";

  export let speise: Speise | SpeiseBestellt;
  let speiseToEdit: Speise;

  let menge: number;
  let notiz: string;
  let einzelpreis: number;
  let aufpreis: number = 0;

  const hasID = "id" in speise;

  if (hasID) {
    const speiseBestellt = speise as SpeiseBestellt;
    speiseToEdit = speiseBestellt.speise;
    menge = speiseBestellt.menge;
    notiz = speiseBestellt.notiz || "";
    einzelpreis = speiseBestellt.speise.preis;
    aufpreis = speiseBestellt.gesamtpreis / menge - einzelpreis;
  } else {
    speiseToEdit = speise as Speise;
    menge = 1;
    notiz = "";
    einzelpreis = speiseToEdit.preis;
  }

  $: gesamtpreis = (einzelpreis + aufpreis) * menge;

  function findeGyrosteller(speise: Speise): Speise {
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

  $: {
    const gefundenesGyros = findeGyrosteller(speiseToEdit);
    speiseToEdit.nr = gefundenesGyros.nr;
    speiseToEdit.name = gefundenesGyros.name;
    einzelpreis = gefundenesGyros.preis;
  }

  function updateZutat(event: CustomEvent<{ zutat: Zutat; aufpreis: number }>) {
    const updatedZutat = event.detail.zutat;
    speiseToEdit.zutaten = speiseToEdit.zutaten.map((z) =>
      z.name === updatedZutat.name ? updatedZutat : z
    );
    einzelpreis = einzelpreis + event.detail.aufpreis;
  }

  function saveChanges() {
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
    <button
      class="btn-primary stretch"
      on:click={saveChanges}
      disabled={menge === 0}
      ><strong>hinzufügen</strong> {gesamtpreis.toFixed(2)}€</button
    >
  </div>
</div>
