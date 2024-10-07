<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";
  
  import { editorStore, closeModal } from "../stores/Editor";
  import EditorDefault from "./EditorDefault.svelte";

  import ModalEditor from "./EditorDefault.svelte";
  import EditorGyrosteller from "./EditorGyrosteller.svelte";
  import ModalEditorGyrosteller from "./EditorGyrosteller.svelte";

  export let speise: Speise | SpeiseBestellt;

  let dialog: HTMLDialogElement;

  // Automatische Reaktivität für den showEditor Zustand aus dem Store
  $: ({ showEditor } = $editorStore);
  
  // Setze das Modal automatisch in den offenen Zustand, wenn showEditor true ist
  $: if (dialog && showEditor) {
    console.log("check modal");
    dialog.showModal();
  }
  
  let modal: any;
  
  $: {
    switch (true) {
      case "nr" in speise && speise.nr >= 16 && speise.nr <= 22:
        modal = EditorGyrosteller;
        break;
      case "id" in speise && speise.speise.nr >= 16 && speise.speise.nr <= 22:
        modal = EditorGyrosteller;
        break;
      default:
        modal = EditorDefault;
    }
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
class="editor"
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
