<script lang="ts">
  import { bestellungStore, updateField } from "../stores/Bestellung";
  import Timer from "./utils/Timer.svelte";

  let telefon: string | undefined;

  bestellungStore.subscribe((b) => (telefon = b.telefon));

  function handleTelefonInput(event: Event) {
    const input = event.target as HTMLInputElement;
    telefon = input.value;
    updateField("telefon", telefon); // Telefonnummer im Store aktualisieren
  }

</script>

<div class="checkout checkout-abholung">
  <div class="gridbox">
    <h3>Telefon (optional)</h3>

    <input
      bind:value={telefon}
      on:input={handleTelefonInput}
      type="tel"
      placeholder="Nummer...|"
    />
  </div>
  <div class="gridbox">
    <h3 class="checkout-abholung-zeit">Abholzeit</h3>
    <Timer />
  </div>
</div>
