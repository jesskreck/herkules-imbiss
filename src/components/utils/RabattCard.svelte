<script lang="ts">
  import { openModalDiscount } from "../../stores/Discount";

  export let discount: number;

</script>

<button on:click={() => openModalDiscount(discount)} class="card-speise">
  <div class="card-speise-top">
    <h1 class="card-speise-number">{discount}%</h1>
  </div>
  <h2>Rabatt</h2>
</button>
