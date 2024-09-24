<script lang="ts">
    import type { Speise } from "$lib/types";
  
    export let speise: Speise;
  </script>
  
  <div>
    <h1>Pitas</h1>
    <h3>Zutaten für {speise.name}</h3>
    <ul>
      {#each speise.zutaten as zutat}
        <li>{zutat.name}: {zutat.menge}</li>
      {/each}
    </ul>
    <!-- Weitere pitaspezifische Inhalte -->
  </div>
  