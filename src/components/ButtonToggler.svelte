<script lang="ts">
  export let option: string;
  export let auswahl: string;

</script>

<button class="btn-toggler" class:active={auswahl==option} on:click={() => auswahl = option}>
  {option}
</button>
