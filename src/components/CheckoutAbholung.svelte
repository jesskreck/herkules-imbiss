<script lang="ts">
  import Counter from "./utils/Counter.svelte";
  import Timer from "./utils/Timer.svelte";

  let telefon: string;
</script>

<div class="checkout-abholung">
  <h4>Telefon (optional)</h4>
  <div class="checkout-abholung-nummer">
    <input bind:value={telefon} placeholder="Nummer...|" />
  </div>
  <h4 class="checkout-abholung-zeit">Abholzeit</h4>
  <Timer />
</div>
