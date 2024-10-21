<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Zutat } from "$lib/types";
  import ZutatIcon from "./ZutatIcon.svelte";

  export let option: Zutat;
  export let auswahl: string;
  
  const dispatch = createEventDispatcher();

  function handleToggle() {
    if (option.name === auswahl) return;
    else auswahl = option.name;
    let aufpreis;
    option.menge = 1;

    if (option.preis) {
      aufpreis = option.preis;
    } else aufpreis = 0;

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
