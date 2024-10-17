<script lang="ts">
  import Timer from "./utils/Timer.svelte";

  let telefon: string;
</script>

<div class="checkout checkout-abholung">
  <div class="gridbox">
    <h3>Telefon (optional)</h3>

      <input bind:value={telefon} placeholder="Nummer...|" />

  </div>
  <div class="gridbox">
    <h3 class="checkout-abholung-zeit">Abholzeit</h3>
    <Timer />
  </div>
</div>
