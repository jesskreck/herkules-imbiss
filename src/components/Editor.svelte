<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";
  import { editorStore, closeModal } from "../stores/Editor";
  import EditorDefault from "./EditorDefault.svelte";
  import EditorGyrosteller from "./EditorGyrosteller.svelte";
  import EditorOptions from "./EditorOptions.svelte";

  export let speise: Speise | SpeiseBestellt;

  let dialog: HTMLDialogElement;

  // Automatische Reaktivität für den showEditor Zustand aus dem Store
  $: ({ showEditor } = $editorStore);

  // Setze das Modal automatisch in den offenen Zustand, wenn showEditor true ist
  $: if (dialog && showEditor) {
    dialog.showModal();
  }

  let modal: any;

  const speisenMitOptionen =
    ("nr" in speise && speise.nr === 28) ||
    ("id" in speise && speise.speise.nr === 28) ||
    ("nr" in speise && speise.nr === 37) ||
    ("id" in speise && speise.speise.nr === 37);

  const baustelle =
    ("nr" in speise && speise.nr === 38) ||
    ("id" in speise && speise.speise.nr === 38) ||
  ("nr" in speise && speise.nr === 39) ||
    ("id" in speise && speise.speise.nr === 39);

  $: {
    switch (true) {
      case "nr" in speise && speise.nr >= 16 && speise.nr <= 22:
        modal = EditorGyrosteller;
        break;
      case "id" in speise && speise.speise.nr >= 16 && speise.speise.nr <= 22:
        modal = EditorGyrosteller;
        break;
      case speisenMitOptionen:
        modal = EditorOptions;
        break;
      case baustelle:
        break;
      default:
        modal = EditorDefault;
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog class="editor" bind:this={dialog} on:click|self={closeModal}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    {#if modal}
      <svelte:component this={modal} {speise} />
    {:else}
      <p>Hier is noch nix!</p>
      <!-- Optionaler Fallback -->
    {/if}
  </div>
</dialog>
