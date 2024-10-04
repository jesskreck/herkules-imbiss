<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Zutat } from "$lib/types";
  import ZutatIcon from "./ZutatIcon.svelte";

  export let zutat: Zutat;
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();

  function toggleMenge() {
    let aufpreis = 0;
    zutat.menge = zutat.menge === 0 ? 1 : 0;

    if (zutat.menge === 1 && zutat.preis) {
      aufpreis = zutat.preis;
    } else if (zutat.menge === 0 && zutat.preis) {
      aufpreis = -zutat.preis;
    }

    dispatch("mengeChanged", { zutat, aufpreis });
  }
</script>

<button
  class="btn-zutat {zutat.name}"
  class:deactived={zutat.menge === 0 && !disabled}
  class:ueberbacken={zutat.überbacken}
  on:click={toggleMenge}
>
  <ZutatIcon name={zutat.name} />
  {zutat.name}
  {#if zutat.preis}
    +{zutat.preis.toFixed(2)}€
  {/if}
</button>
