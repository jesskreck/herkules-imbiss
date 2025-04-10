<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Zutat } from "$lib/types";
  import ZutatIcon from "./ZutatIcon.svelte";

  export let option: Zutat;
  export let auswahl: string;

  const dispatch = createEventDispatcher();

  function handleToggle() {
    // Wenn es Mayo ist und bereits ausgewählt
    if (option.name === "Mayo" && option.name === auswahl) {
      // Zyklus für Mayo: 1 -> 2 -> 0 (deselektiert)
      if (option.menge === 1) {
        option.menge = 2;
        let aufpreis = option.preis || 0;
        dispatch("mengeChanged", { option, aufpreis });
      } else if (option.menge === 2) {
        // Reset auf 0 und deselektieren
        auswahl = "";
        option.menge = 0;
        let aufpreis = option.preis ? -option.preis * 2 : 0;
        dispatch("mengeChanged", { option, aufpreis });
      }
      return;
    }

    // Standard-Verhalten für andere Zutaten oder wenn Mayo erstmals ausgewählt wird
    if (option.name === auswahl) return;

    auswahl = option.name;
    option.menge = 1;

    let aufpreis = option.preis || 0;

    dispatch("mengeChanged", { option, aufpreis });
  }
</script>

<button
  class="btn-zutat {option.name}"
  class:untoggled={auswahl !== option.name}
  class:double={option.name === "Mayo" && option.menge === 2}
  class:ueberbacken={option.überbacken}
  on:click={handleToggle}
>
  <ZutatIcon name={option.name} />
  {option.name}
  {#if option.preis}
    +{(
      option.preis * (option.name === "Mayo" && option.menge === 2 ? 2 : 1)
    ).toFixed(2)}€
  {/if}
</button>
