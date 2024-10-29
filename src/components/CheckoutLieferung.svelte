<script lang="ts">
  import { tick } from "svelte";
  import Timer from "./utils/Timer.svelte";
  import Fuse from "fuse.js";
  import streets from "$lib/data/streets_joined.json";
  import { bestellungStore, updateField } from "../stores/Bestellung";

  let name: string | undefined;
  let telefon: string | undefined;
  let strasse: string | undefined;
  let hausnummer: string | undefined;
  let liefernotiz: string | undefined;

  bestellungStore.subscribe(
    (b) => (
      (name = b.name),
      (telefon = b.telefon),
      (strasse = b.strasse),
      (hausnummer = b.hausnummer),
      (liefernotiz = b.liefernotiz)
    ),
  );

  let list = streets.map((street) => ({
    name: street.name,
    postalCode: street.postalCode,
    fullDisplay: `${street.name}, ${street.postalCode}`,
  }));

  const options = {
    includeScore: true,
    keys: ["name", "postalCode"],
  };

  let fuse = new Fuse(list, options);
  let searchResults: {
    name: string;
    postalCode: string;
    fullDisplay: string;
  }[] = [];

  function handleInput(event: Event, field: keyof Bestellung) {
    const input = event.target as HTMLInputElement;
    updateField(field, input.value); // Generische Funktion zum Aktualisieren im Store
  }

  function handleStrasseInput(event) {
    strasse = event.target.value;
    if (strasse) {
      // Führe die Suche aus und beschränke auf die ersten 5 Treffer
      searchResults = fuse
        .search(strasse)
        .map((result) => result.item)
        .slice(0, 5);
    } else {
      // Leere die Ergebnisse, wenn die Adresse leer ist
      searchResults = [];
    }
  }

  async function selectAddress(choice) {
    strasse = choice.fullDisplay;
    await tick();
    updateField("strasse", strasse);
    searchResults = [];
  }
</script>

<div class="checkout checkout-lieferung">
  <div class="gridbox">
    <h3>Straße</h3>
    <input
      tabindex="-1"
      bind:value={strasse}
      placeholder="Straße...|"
      on:input={handleStrasseInput}
    />

    {#if searchResults.length > 0}
      <div class="checkout-streets-container">
        <div class="checkout-streets-list">
          {#each searchResults as suggestion}
            <button on:click={() => selectAddress(suggestion)}
              >{suggestion.fullDisplay}</button
            >
          {/each}
        </div>
      </div>
    {/if}
  </div>
  <div class="gridbox">
    <h3>Nr.</h3>
    <input
      bind:value={hausnummer}
      placeholder="Hausnummer...|"
      on:input={(event) => handleInput(event, "hausnummer")}
    />
  </div>
  <div class="gridbox">
    <h3>Name an der Klingel</h3>
    <input
      tabindex="-1"
      bind:value={name}
      placeholder="Name...|"
      on:input={(event) => handleInput(event, "name")}
    />
  </div>
  <div class="gridbox">
    <h3>Telefon</h3>
    <input
      tabindex="-1"
      bind:value={telefon}
      placeholder="Telefonnummer...|"
      on:input={(event) => handleInput(event, "telefon")}
    />
  </div>
  <div class="gridbox">
    <h3>Notiz</h3>
    <input
      tabindex="-1"
      bind:value={liefernotiz}
      placeholder="Lieferhinweis...|"
      on:input={(event) => handleInput(event, "liefernotiz")}
    />
  </div>
  <div class="gridbox">
    <h3 class="checkout-lieferung-zeit">Lieferzeit</h3>
    <Timer />
  </div>
</div>
