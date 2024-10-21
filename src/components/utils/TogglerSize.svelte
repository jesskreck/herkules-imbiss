<!-- NOTE
 gehört in   
    <div class="container-toggler">
        {#each ["normal", "klein"] as option}
            <ButtonToggler bind:auswahl {option} />
        {/each}
    </div> 
-->

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let option: string;
  export let auswahl: string;

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (option === auswahl) return;
    else 
    auswahl = option;
    dispatch("sizeChange", { auswahl });
  }
</script>

<button
  class="btn-toggler"
  class:active={auswahl == option}
  on:click={handleClick}
>
  {option}
</button>
