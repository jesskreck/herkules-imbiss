<script lang="ts">
  import type { Speise } from "$lib/types";
  import { openModal } from "../stores/Modal";

  export let speise: Speise;

</script>

<button on:click={() => openModal(speise)} class="card-speise">
  <div class="card-speise-top">
    <p class="card-speise-number">#{speise.nr}</p>
    <p>{speise.preis.toFixed(2)}€</p>
  </div>
  <h3>{speise.name}</h3>
</button>
