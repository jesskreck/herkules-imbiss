<!-- NOTE
 gehört in   
    <div class="container-toggler">
      {#each BestellTypen as option}
        <ButtonToggler bind:auswahl {option} />
      {/each}
    </div> 
-->

<script lang="ts">
  import type { Zutat } from "$lib/types";

  export let option: string | Zutat;
  export let auswahl: string;

  const optionString = typeof option === "string" ? option : option.name;
</script>

<button
  class="btn-toggler"
  class:active={auswahl == optionString}
  on:click={() => (auswahl = optionString)}
>
  {optionString}
</button>
