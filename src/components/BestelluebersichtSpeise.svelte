<script lang="ts">
  import type { Speise, SpeiseBestellt } from "$lib/types";
  import { openModal } from "../stores/Modal";

  import Counter from "./Counter.svelte";

  export let speiseBestellt: SpeiseBestellt;

  function getZutatenliste(speise: Speise) {
    let zutaten = [...speise.zutaten, ...(speise.sauce || [])];
    return zutaten
      .filter((zutat) => zutat.menge === 1)
      .map((zutat) => zutat.name);
  }
</script>

<div class="menu_bestellung-list-item">
  <button class="menu_bestellung-list-item-btn" on:click={() => openModal(speiseBestellt)}>
    <h2>#{speiseBestellt.speise.nr} {speiseBestellt.speise.name}</h2>
    <div class="menu_bestellung-list-item-zutaten">
      {#each getZutatenliste(speiseBestellt.speise) as zutat}
        <span>{zutat}</span>
      {/each}
    </div>
    {#if speiseBestellt.notiz}
      <p class="menu_bestellung-list-item-notiz">
        Notiz: {speiseBestellt.notiz}
      </p>
    {/if}
  </button>

  <div>
    <Counter count={speiseBestellt.menge} />
    <h3 class="menu_bestellung-list-item-preis">
      {speiseBestellt.gesamtpreis.toFixed(2)}€
    </h3>
  </div>

  <!-- ALTE VARIANTE DELETE BTN, TOGGLER MENGE, PREIS -->
  <!-- <div class="bestellung-list-item-buttons">
          <button class="btn-delete">
            <Delete />
          </button>
          <Counter count={speiseBestellt.menge} />
          <h3>{speiseBestellt.gesamtpreis.toFixed(2)}€</h3>
        </div> -->
</div>
