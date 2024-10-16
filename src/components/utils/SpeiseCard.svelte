<script lang="ts">
  import type { Speise } from "$lib/types";
  import { openModal } from "../../stores/Editor";

  export let speise: Speise;

</script>

<button on:click={() => openModal(speise)} class="card-speise">
  <div class="card-speise-top">
    <h1 class="card-speise-number">#{speise.nr}</h1>
    <p>{speise.preis.toFixed(2)}€</p>
  </div>
  <h2>{speise.name}</h2>
</button>
