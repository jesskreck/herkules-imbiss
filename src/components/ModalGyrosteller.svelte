<script lang="ts">
  import type { Speise } from "$lib/types";
  import { currentSpeiseStore } from "../stores/currentSpeiseStores";
  import { get } from "svelte/store";

  import Zutat from "./Zutat.svelte";

  export let speise: Speise;

  function mapZutatenToBoolean(
    speise: Speise
  ): Array<{ name: string; vorhanden: boolean }> {
    return speise.zutaten.map((zutat) => ({
      name: zutat.name,
      vorhanden: zutat.menge === 1,
    }));
  }


  let zutatenBooleans = mapZutatenToBoolean(speise);

  console.log(zutatenBooleans);
</script>

<h1>baby modal offen</h1>

{#each zutatenBooleans as zutat }
    <div
    class:selected={zutat.vorhanden}
    >
        {zutat.name}
    </div>
{/each}


<style>
    .selected {
        background-color: green;
    }
</style>