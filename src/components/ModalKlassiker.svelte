<script lang="ts">
  import {
    StoreSpeise,
    StoreSpeiseBestellt,
    StoreBestellungKomplett,
    resetSpeiseBestellt,
  } from "$lib/stores/stores";

  $: preisShown = $StoreSpeiseBestellt.menge * $StoreSpeise.preis;

  // Funktion, um Artikel zur Bestellung hinzuzufügen
  function addToBestellung(current) {
    StoreSpeiseBestellt.update(current) => {
      const updatedSpeise = { ...current.speise }; // Sicherstellen, dass wir die Speise richtig kopieren
      const updatedMenge = current.menge;
      const updatedPreis = preisShown;

      // Aktualisiere StoreBestellungKomplett innerhalb des Callbacks von StoreSpeiseBestellt
      StoreBestellungKomplett.update((bestellung) => {
        const updatedSpeisen = [
          ...bestellung.speisen,
          {
            speise: updatedSpeise,
            menge: updatedMenge,
            preis: updatedPreis,
            kommentar: current.kommentar,
          },
        ];
        const updatedGesamtpreis = bestellung.gesamtpreis + updatedPreis;

        return {
          ...bestellung,
          speisen: updatedSpeisen,
          gesamtpreis: updatedGesamtpreis,
        };
      });

      // Gibt den aktualisierten Zustand zurück, um den Store konsistent zu halten
      return {
        ...current,
        speise: updatedSpeise,
        menge: updatedMenge,
        preis: updatedPreis,
      };
    });

    resetSpeiseBestellt();
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
    <h2>{$StoreSpeise.nr}. {$StoreSpeise.name}</h2>
    {#each $StoreSpeise.zutaten as zutat}
      <button>{zutat.menge} {zutat.name}</button>
    {/each}
    <textarea
      bind:value={$StoreSpeiseBestellt.kommentar}
      placeholder="Sonderwünsche..."
    ></textarea>
    <div>
      <button
        on:click={() =>
          $StoreSpeiseBestellt.menge > 1 && $StoreSpeiseBestellt.menge--}
        >➖</button
      >
      {$StoreSpeiseBestellt.menge}
      <button on:click={() => $StoreSpeiseBestellt.menge++}>➕</button>
    </div>
    <button class="cta" on:click={addToBestellung(StoreSpeise)}
      >{preisShown.toFixed(2)} €</button
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
