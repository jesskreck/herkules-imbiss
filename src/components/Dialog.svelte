<script lang="ts">
  import type { Speise } from "$lib/types";
  import ModalGyrosteller from "./ModalGyrosteller.svelte";
  import ModalKlassiker from "./ModalKlassiker.svelte";
  import ModalPitas from "./ModalPitas.svelte";

  export let showModal: boolean;
  export let speise: Speise;

  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();

  let modal;
  $: {
    switch (true) {
      case speise.nr >= 1 && speise.nr <= 6:
        modal = ModalGyrosteller;
        break;
      case speise.nr >= 8 && speise.nr <= 15:
        modal = ModalPitas;
        break;
      case speise.nr >= 16 && speise.nr <= 22:
        modal = ModalGyrosteller;
        break;
      default:
        modal = null; // Optionaler Fallback
    }
  }

  function closeModal() {
    showModal = false;
    dialog.close
  }
  
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={closeModal}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    {#if modal}
    <svelte:component this={modal} {speise} on:closeModal={closeModal}/>
  {:else}
    <p>Diese Speise hat keine spezifischen Inhalte.</p> <!-- Optionaler Fallback -->
  {/if}

    
  </div>
</dialog>
