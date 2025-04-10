<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Zutat } from "$lib/types";
  import ZutatIcon from "./ZutatIcon.svelte";

  export let zutat: Zutat;
  export let disabled: boolean = false;
  export let canToggle: boolean = true;

  const dispatch = createEventDispatcher();

  function toggleMenge() {
    if (!canToggle) return;

    let aufpreis = 0;

    // Spezielles Verhalten für Mayo (3-stufiger Toggle)
    if (zutat.name === "Mayo") {
      // Zyklus 0 -> 1 -> 2 -> 0
      zutat.menge = (zutat.menge + 1) % 3;

      // Preisberechnung basierend auf der Änderung
      if (zutat.menge === 1 && zutat.preis) {
        aufpreis = zutat.preis;
      } else if (zutat.menge === 2 && zutat.preis) {
        aufpreis = zutat.preis; // Zusätzlicher Preis für zweite Mayo
      } else if (zutat.menge === 0 && zutat.preis) {
        aufpreis = -zutat.preis * 2; // Beide Preise abziehen
      }
    } else {
      zutat.menge = zutat.menge === 0 ? 1 : 0;

      if (zutat.menge === 1 && zutat.preis) {
        aufpreis = zutat.preis;
      } else if (zutat.menge === 0 && zutat.preis) {
        aufpreis = -zutat.preis;
      }
    }

    dispatch("mengeChanged", { zutat, aufpreis });
  }
</script>

<button
  class="btn-zutat {zutat.name}"
  class:deactived={zutat.menge === 0 && !disabled}
  class:double={zutat.name === "Mayo" && zutat.menge === 2}
  class:ueberbacken={zutat.überbacken}
  on:click={toggleMenge}
>
  <ZutatIcon name={zutat.name} />
  {zutat.name}
  {#if zutat.preis}
    +{(zutat.preis * (zutat.menge > 0 ? zutat.menge : 1)).toFixed(2)}€
  {/if}
</button>
