<script lang="ts">
  import type { Speise, SpeiseBestellt, Zutat } from "$lib/types";
  import {
    findGyrosteller,
    prepareSpeiseData,
    takeNrExact,
    takeNrRange,
  } from "$lib/utils/editorUtils";
  import {
    removeSpeiseFromBestellung,
    saveChanges,
  } from "../stores/Bestellung";
  import { editorStore, closeModal } from "../stores/Editor";
  import Counter from "./utils/Counter.svelte";
  import ZutatButton from "./utils/ZutatButton.svelte";
  import TogglerTextButton from "./utils/TogglerTextButton.svelte";
  import TogglerSize from "./utils/TogglerSize.svelte";
  import TogglerZutatOption from "./utils/TogglerZutatOption.svelte";

  export let speise: Speise | SpeiseBestellt;

  let dialog: HTMLDialogElement;
  let modal: any;
  let speiseToEdit: Speise;
  let menge: number;
  let notiz: string;
  let einzelpreis: number;
  let gesamtpreis: number;
  let aufpreis: number = 0;
  let sizepreis: number = 0;
  let size: string;
  let saucenAuswahl: string;
  let optionAuswahl: string;

  
  // Speisegruppen
  const speisenMitGyrosteller = takeNrRange(speise, [16, 22]);
  const speisenMitSize = takeNrRange(speise, [16, 32]) || takeNrExact(speise, [2, 6]);
  const KrautZwiebelnKlein = takeNrRange(speise, [8, 15], [23, 32]);
  const baustelle = takeNrExact(speise, [38, 39]);

  // Speisendaten aufbereiten
  const hasID = "id" in speise;
  ({
    speiseToEdit,
    menge,
    notiz,
    einzelpreis,
    aufpreis,
    saucenAuswahl,
    optionAuswahl,
    size,
    sizepreis,
  } = prepareSpeiseData(speise));

  // Reaktives Öffnen und Schließen vom Modal abhängig von Werten editorStore
  $: ({ showEditor } = $editorStore);
  $: if (dialog && showEditor) {
    dialog.showModal();
  }

  // Reaktives Preisberechnen
  $: if (speisenMitGyrosteller) {
    const teller = findGyrosteller(speiseToEdit);
    speiseToEdit.nr = teller.nr;
    speiseToEdit.name = teller.name;
    einzelpreis = teller.preis;
    gesamtpreis = (einzelpreis + sizepreis + aufpreis) * menge;
  } else {
    gesamtpreis = (einzelpreis + sizepreis + aufpreis) * menge;
  }



  function updateZutat(event: CustomEvent<{ zutat: Zutat; aufpreis: number }>) {
    const updatedZutat = event.detail.zutat;
    speiseToEdit.zutaten = speiseToEdit.zutaten.map((z) =>
      z.name === updatedZutat.name ? updatedZutat : z
    );
    aufpreis = aufpreis += event.detail.aufpreis;
  }

  function updateOption(
    event: CustomEvent<{ option: Zutat; aufpreis: number }>
  ) {
    const updatedZutat = event.detail.option;

    if (speiseToEdit.option) {
      speiseToEdit.option = speiseToEdit.option.map((zutat) => {
        if (zutat.name === updatedZutat.name) {
          return { ...zutat, menge: 1 };
        } else {
          return { ...zutat, menge: 0 };
        }
      });
    }
    aufpreis = event.detail.aufpreis;
  }

  function updateSize(event: { detail: { auswahl: string } }) {
    size = event.detail.auswahl;
    if (size === "klein") {
      sizepreis -= 2;
    } else if (size === "normal") {
      sizepreis = 0;
    }
  }

  function handleSaveChanges() {
    saveChanges(
      speise,
      speiseToEdit,
      menge,
      gesamtpreis,
      notiz,
      saucenAuswahl,
      size,
      aufpreis
    );
    closeModal();
  }

  function handleDelete() {
    const speiseBestellt = speise as SpeiseBestellt;
    removeSpeiseFromBestellung(speiseBestellt);
    closeModal();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog class="editor" bind:this={dialog} on:click|self={closeModal}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>

    {#if speisenMitGyrosteller}
      <h1>Gyrosteller Nummer #{speiseToEdit.nr}</h1>
    {:else}
      <h1>#{speiseToEdit.nr} {speiseToEdit.name}</h1>
    {/if}

    <div class="editor-container">
      <h3>Zutaten</h3>

      <!-- <svelte:component this={modal} {speise} /> -->

      <div class="editor-zutaten">
        <!-- Zwiebeln und Kraut kleiner rendern (für Pitas) -->
        {#if KrautZwiebelnKlein}
          {#each speiseToEdit.zutaten.filter((zutat) => zutat.name !== "Zwiebeln" && zutat.name !== "Kraut") as zutat}
            <ZutatButton
              on:mengeChanged={updateZutat}
              {zutat}
              canToggle={zutat.canToggle !== false}
            />
          {/each}

          <div class="editor-extras">
            {#each speiseToEdit.zutaten.filter((zutat) => zutat.name === "Zwiebeln" || zutat.name === "Kraut") as zutat}
              <ZutatButton on:mengeChanged={updateZutat} {zutat} />
            {/each}
          </div>

          <!-- alle Zutaten gleich groß rendern -->
        {:else}
          {#each speiseToEdit.zutaten as zutat}
            <ZutatButton
              on:mengeChanged={updateZutat}
              {zutat}
              canToggle={zutat.canToggle !== false}
            />
          {/each}
        {/if}

        <!-- für Zutatenoptionen (zB Salat Topping) -->
        {#if speiseToEdit.option}
          <div class="container-toggler">
            {#each speiseToEdit.option as zutat}
              <TogglerZutatOption
                on:mengeChanged={updateOption}
                bind:auswahl={optionAuswahl}
                option={zutat}
              />
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
              <TogglerTextButton bind:auswahl={saucenAuswahl} option={zutat} />
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

      <!-- für Größentoggler -->
      {#if speisenMitSize}
      <div class="container-toggler">
        {#each ["normal", "klein"] as option}
          <TogglerSize
            on:sizeChange={updateSize}
            bind:auswahl={size}
            {option}
          />
        {/each}
      </div>
      {/if}

      {#if hasID && menge === 0}
        <button class="btn-primary stretch" on:click={handleDelete}
          ><strong>löschen?</strong></button
        >
      {:else}
        <button
          class="btn-primary stretch"
          on:click={handleSaveChanges}
          disabled={(!hasID && menge === 0) ||
            (speiseToEdit.option && optionAuswahl === undefined) ||
            (speiseToEdit.singleSauceOnly && saucenAuswahl === "")}
          ><strong>hinzufügen</strong> {gesamtpreis.toFixed(2)}€</button
        >
      {/if}
    </div>
  </div>
</dialog>
