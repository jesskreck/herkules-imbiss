<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";
  import { openModal } from "../stores/Editor";

  export let speiseBestellt: SpeiseBestellt;
  let id = speiseBestellt.id;
  let zutatenliste: string[] = [];


  $: zutatenliste =
    speiseBestellt.id === id
      ? getZutatenliste(speiseBestellt.speise)
      : zutatenliste;


  function getZutatenliste(speise: Speise): string[] {
    console.log(speise);
    let zutaten = [...speise.zutaten, ...(speise.option || []), ...(speise.sauce || [])];
    return zutaten
      .filter((zutat) => zutat.menge >= 1)
      .map((zutat) => zutat.menge >= 2 ? `${zutat.menge}x ${zutat.name}` : zutat.name);
  }

</script>

<button
  on:click={() => openModal(speiseBestellt)}
  class="menu_bestellung-list-item"
>
  <h2 class="menu_bestellung-list-item-name">
    #{speiseBestellt.speise.nr}
    {#if speiseBestellt.size === "klein"}
    <span class="menu_bestellung-list-item-size">klein</span>
    {/if}
    {speiseBestellt.speise.name}
  </h2>
  <p class="menu_bestellung-list-item-menge">{speiseBestellt.menge}x</p>
  <h3 class="menu_bestellung-list-item-preis">
    {speiseBestellt.gesamtpreis.toFixed(2)}€
  </h3>
  <div class="menu_bestellung-list-item-zutaten">
    {#each zutatenliste as zutat, index}
      <span>{zutat}</span>
    {/each}
  </div>
  {#if speiseBestellt.notiz}
    <p class="menu_bestellung-list-item-notiz">
      Notiz: {speiseBestellt.notiz}
    </p>
  {/if}
</button>