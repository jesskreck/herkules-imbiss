<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Zutat } from "$lib/types";
  import ZutatIcon from "./ZutatIcon.svelte";

  export let option: Zutat;
  export let auswahl: string;
  
  const dispatch = createEventDispatcher();

  function handleToggle() {
    auswahl = option.name;
    let aufpreis = 0;
    option.menge = option.menge === 0 ? 1 : 0;

    if (option.menge === 1 && option.preis) {
      aufpreis = option.preis;
    } else if (option.menge === 0 && option.preis) {
      aufpreis = -option.preis;
    }

    dispatch("mengeChanged", { option, aufpreis });
  }
</script>

<button
  class="btn-zutat {option.name}"
  class:untoggled={auswahl !== option.name}
  class:ueberbacken={option.überbacken}
  on:click={handleToggle}
>
  <ZutatIcon name={option.name} />
  {option.name}
  {#if option.preis}
    +{option.preis}€
  {/if}
</button>
