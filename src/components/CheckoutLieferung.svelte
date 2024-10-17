<script lang="ts">
  import {tick} from 'svelte'
  import Timer from "./utils/Timer.svelte";
  import Fuse from "fuse.js";
  import streets from "$lib/data/streets_joined.json";

  let name: string;
  let telefon: string;
  let adresse: string = "";
  let hausnummer: string;
  let notiz: string;

  let list = streets.map((street) => ({
    name: street.name,
    postalCode: street.postalCode,
    fullDisplay: `${street.name}, ${street.postalCode}`
  }));

  const options = {
    includeScore: true,
    keys: ["name", "postalCode"],
  };

  let fuse = new Fuse(list, options);
  let searchResults: {name: string, postalCode: string, fullDisplay: string}[] = [];

  function handleInput(event) {
    adresse = event.target.value;
    if (adresse) {
      // Führe die Suche aus und beschränke auf die ersten 5 Treffer
      searchResults = fuse
        .search(adresse)
        .map((result) => result.item)
        .slice(0, 5);
    } else {
      // Leere die Ergebnisse, wenn die Adresse leer ist
      searchResults = [];
    }
  }

  async function selectAddress(choice) {
    adresse = choice.fullDisplay;
    await tick();
    searchResults = [];
  }

</script>

<div class="checkout checkout-lieferung">
  <div class="gridbox">
    <h3>Straße</h3>
    <input
      bind:value={adresse}
      placeholder="Straße...|"
      on:input={handleInput}
    />

    {#if searchResults.length > 0}
      <div class="checkout-streets-container">
        <div class="checkout-streets-list">
          {#each searchResults as suggestion}
            <button on:click={() => selectAddress(suggestion)}>{suggestion.fullDisplay}</button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  <div class="gridbox">
    <h3>Nr.</h3>
    <input bind:value={hausnummer} placeholder="Hausnummer...|" />
  </div>
  <div class="gridbox">
    <h3>Name an der Klingel</h3>
    <input bind:value={name} placeholder="Name...|" />
  </div>
  <div class="gridbox">
    <h3>Telefon</h3>
    <input bind:value={telefon} placeholder="Telefonnummer...|" />
  </div>
  <div class="gridbox">
    <h3>Notiz</h3>
    <input bind:value={notiz} placeholder="Notiz...|" />
  </div>
  <div class="gridbox">
    <h3 class="checkout-lieferung-zeit">Abholzeit</h3>
    <Timer />
  </div>
</div>
