<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";
  import SpeiseEditor from "./SpeiseEditor.svelte";

  import { modalStore, closeModal } from "../stores/Modal";
  import SpeiseBestelltEditor from "./SpeiseBestelltEditor.svelte";

  export let speise: Speise | SpeiseBestellt;

  let dialog: HTMLDialogElement;

  // Automatische Reaktivität für den showModal Zustand aus dem Store
  $: ({ showModal } = $modalStore);

  // Setze das Modal automatisch in den offenen Zustand, wenn showModal true ist
  $: if (dialog && showModal) dialog.showModal();
  let modal: any;
  
  $: {
    switch (true) {
      case "id" in speise:
        modal = SpeiseBestelltEditor;
      case "nr" in speise && speise.nr >= 1 && speise.nr <= 37:
        modal = SpeiseEditor;
        break;
      case "nr" in speise && speise.nr >= 8 && speise.nr <= 15:
        // modal = ModalPitas;
        break;
      default:
        modal = null; // Optionaler Fallback
    }
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:click|self={closeModal}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    {#if modal}
      <svelte:component this={modal} {speise} />
    {:else}
      <p>Diese Speise hat keine spezifischen Inhalte.</p>
      <!-- Optionaler Fallback -->
    {/if}
  </div>
</dialog>
