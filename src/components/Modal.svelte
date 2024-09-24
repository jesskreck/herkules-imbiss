<script lang="ts">
  import type { Speise } from "$lib/types";
  import Counter from "./Counter.svelte";
  import ModalGyrosteller from "./ModalGyrosteller.svelte";
  import ModalKlassiker from "./ModalKlassiker.svelte";
  import ModalPitas from "./ModalPitas.svelte";

  export let showModal: boolean;
  export let speise: Speise;

  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();

  let component;
  $: {
    switch (true) {
      case speise.nr >= 1 && speise.nr <= 6:
        component = ModalKlassiker;
        break;
      case speise.nr >= 8 && speise.nr <= 15:
        component = ModalPitas;
        break;
      case speise.nr >= 16 && speise.nr <= 22:
        component = ModalGyrosteller;
        break;
      default:
        component = null; // Optionaler Fallback
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <h1>#{speise.nr} {speise.name}</h1>

    {#if component}
    <svelte:component this={component} {speise} />
  {:else}
    <p>Diese Speise hat keine spezifischen Inhalte.</p> <!-- Optionaler Fallback -->
  {/if}

    <div class="flex">
        <Counter />
        <button class="btn-primary"><strong>hinzufügen</strong> {speise.preis.toFixed(2)}€</button>
    </div>
  </div>
</dialog>
