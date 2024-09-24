<script lang="ts">
  import type { Speise } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  export let speise: Speise;
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('open-modal', { speise }); // Dispatch das Event mit den Speise-Daten
  }

</script>

<button on:click={handleClick} class="card-speise">
  <div class="card-speise-top">
    <p class="card-speise-number">#{speise.nr}</p>
    <p>{speise.preis.toFixed(2)}€</p>
  </div>
  <h3>{speise.name}</h3>
</button>
