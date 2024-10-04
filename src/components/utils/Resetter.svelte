<script>
    import { resetBestellungKomplett } from "$lib/stores/stores";

    let confirmed = false;

    function confirm(){
        confirmed = true;
    }
</script>



{#if confirmed}
<button on:click={resetBestellungKomplett}>✔️ ja, löschen</button>
<button on:click={()=> confirmed = false}>❌ doch nicht</button>
{:else}
<button on:click={confirm}>
    🆕 Bestellung löschen
</button>
{/if}