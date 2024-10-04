<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";
  import { openModal } from "../stores/Modal";

  export let speiseBestellt: SpeiseBestellt;
  let id = speiseBestellt.id;

  $: zutatenliste =
    speiseBestellt.id === id
      ? getZutatenliste(speiseBestellt.speise)
      : zutatenliste;

  function getZutatenliste(speise: Speise) {
    let zutaten = [...speise.zutaten, ...(speise.sauce || [])];
    return zutaten
      .filter((zutat) => zutat.menge === 1)
      .map((zutat) => zutat.name);
  }
</script>

<button
  on:click={() => openModal(speiseBestellt)}
  class="menu_bestellung-list-item"
>
    <p class="menu_bestellung-list-item-menge">{speiseBestellt.menge}x</p>
    <h2 class="menu_bestellung-list-item-name">#{speiseBestellt.speise.nr} {speiseBestellt.speise.name}</h2>
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

<!-- ALTE VARIANTE DELETE BTN, TOGGLER MENGE, PREIS -->
<!-- <div class="bestellung-list-item-buttons">
          <button class="btn-delete">
            <Delete />
          </button>
          <Counter count={speiseBestellt.menge} />
          <h3>{speiseBestellt.gesamtpreis.toFixed(2)}€</h3>
        </div> -->
