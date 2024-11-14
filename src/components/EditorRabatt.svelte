<script lang="ts">
    import { applyDiscount, removeDiscount } from "../stores/Discount";
    import { closeModalDiscount } from "../stores/Discount";
    
    export let discount: number;
  
    let dialog: HTMLDialogElement;

  
    function handleAddDiscount() {
      applyDiscount(discount);
      closeModalDiscount();
    }
  
    function handleRemoveDiscount() {
      removeDiscount();
      closeModalDiscount();
    }
  
    // Öffnet das Dialogfeld, wenn `EditorRabatt` angezeigt wird
    $: if (dialog) dialog.showModal();
  </script>
  
  <dialog class="editor" bind:this={dialog} on:click|self={closeModalDiscount}>
    <div on:click|stopPropagation>
      <h1>{discount}% Rabatt</h1>
      <button class="btn-primary" on:click={handleAddDiscount}>Hinzufügen</button>
      <button class="btn-secondary" on:click={handleRemoveDiscount}>Entfernen</button>
    </div>
  </dialog>
  