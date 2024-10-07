<script lang="ts">
  import {tick} from 'svelte'
  import Timer from "./utils/Timer.svelte";
  import Fuse from "fuse.js";
  import streets from "$lib/data/unique_streets.json";

  let name: string;
  let telefon: string;
  let adresse: string = "";
  let hausnummer: string;
  let notiz: string;

  let list = streets.features.map((feature) => ({
    name: feature.properties.name,
  }));

  const options = {
    includeScore: true,
    keys: ["name"],
  };

  let fuse = new Fuse(list, options);
  let searchResults: string[] = [];

  $: if (adresse) {
    searchResults = fuse
      .search(adresse)
      .map((result) => result.item.name)
      .slice(0, 5);
  }

  function handleInput(event) {
    adresse = event.target.value;
    if (adresse) {
      // Führe die Suche aus und beschränke auf die ersten 5 Treffer
      searchResults = fuse
        .search(adresse)
        .map((result) => result.item.name)
        .slice(0, 5);
    } else {
      // Leere die Ergebnisse, wenn die Adresse leer ist
      searchResults = [];
    }
  }

  async function selectAddress(choice: string) {
    adresse = choice;
    await tick();
    searchResults = [];
  }

</script>

<div class="checkout checkout-lieferung">
  <div class="gridbox">
    <h4>Straße</h4>
    <input
      bind:value={adresse}
      placeholder="Straße...|"
      on:input={handleInput}
    />

    {#if searchResults.length > 0}
      {#each searchResults as suggestion}
        <button on:click={() => selectAddress(suggestion)}>{suggestion}</button>
      {/each}
    {/if}
  </div>
  <div class="gridbox">
    <h4>Nr.</h4>
    <input bind:value={hausnummer} placeholder="Hausnummer...|" />
  </div>
  <div class="gridbox">
    <h4>Name an der Klingel</h4>
    <input bind:value={name} placeholder="Name...|" />
  </div>
  <div class="gridbox">
    <h4>Telefon</h4>
    <input bind:value={telefon} placeholder="Telefonnummer...|" />
  </div>
  <div class="gridbox">
    <h4>Notiz</h4>
    <input bind:value={notiz} placeholder="Notiz...|" />
  </div>
  <div class="gridbox">
    <h4 class="checkout-lieferung-zeit">Abholzeit</h4>
    <Timer />
  </div>
</div>
