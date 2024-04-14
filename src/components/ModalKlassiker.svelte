<script lang="ts">
  import { bestellungStore } from "$lib/stores/stores";
  import type { Speise, BestellItem } from "$lib/types";

  export let speise: Speise;
  let menge = 1;
  let kommentar = "";

  // Funktion zur Berechnung des Gesamtpreises
  function calculateGesamtpreis(preis: number, menge: number): number {
    return preis * menge;
  }

  // Funktion, um Artikel zur Bestellung hinzuzufügen
  function addToBestellung() {
    const preis = calculateGesamtpreis(speise.preis, menge);
    const newItem: BestellItem = {
      speise,
      menge,
      preis,
      kommentar,
    };
    bestellungStore.update((bestellung) => ({
      ...bestellung,
      items: [...bestellung.items, newItem],
      gesamtpreis: bestellung.gesamtpreis + preis,
    }));
    menge = 1;
    kommentar = "";
    closeDialog();
  }

  // Modalsteuerung
  export let showModal: boolean;
  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) {
    dialog.showModal();
  } else if (dialog && !showModal) {
    dialog.close();
  }

  function closeDialog() {
    showModal = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->

  <div on:click|stopPropagation>
    <h2>{speise.nr}. {speise.name}</h2>
    {#each speise.zutaten as zutat}
      <button>{zutat.menge} {zutat.name}</button>
    {/each}
    <textarea bind:value={kommentar} placeholder="Sonderwünsche..."></textarea>
    <div>
      <button on:click={() => menge > 1 && menge--}>-</button>
      {menge}
      <button on:click={() => menge++}>+</button>
    </div>
    <button class="cta" on:click={addToBestellung}
      >{calculateGesamtpreis(speise.preis, menge).toFixed(2)} €</button
    >
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
