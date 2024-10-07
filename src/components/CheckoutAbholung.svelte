<script lang="ts">
  import Timer from "./utils/Timer.svelte";

  let telefon: string;
</script>

<div class="checkout checkout-abholung">
  <div class="gridbox">
    <h4>Telefon (optional)</h4>

      <input bind:value={telefon} placeholder="Nummer...|" />

  </div>
  <div class="gridbox">
    <h4 class="checkout-abholung-zeit">Abholzeit</h4>
    <Timer />
  </div>
</div>
