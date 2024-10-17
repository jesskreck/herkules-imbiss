<script lang="ts">
  import { BestellTyp, type Bestellung, type SpeiseBestellt } from "$lib/types";
  import { bestellungStore } from "../stores/Bestellung";
  import { checkoutStore, closeCheckout } from "../stores/Checkout";
  import BestelluebersichtSpeise from "./BestelluebersichtSpeise.svelte";
  import CheckoutAbholung from "./CheckoutAbholung.svelte";
  import CheckoutLieferung from "./CheckoutLieferung.svelte";

  // dialog wird über showCheckout aus checkoutStore auf menu/+page.svelte getriggert
  let dialog: HTMLDialogElement;

  // Automatische Reaktivität für den showModal Zustand aus dem Store
  $: ({ showCheckout, auswahl } = $checkoutStore);
  let bestellung: Bestellung;
  bestellungStore.subscribe((b) => {
    bestellung = b;
  });

  // Setze das Modal automatisch in den offenen Zustand, wenn showModal true ist
  $: if (dialog && showCheckout) {
    dialog.showModal();
  }

  let modal: any;
  let liefern: boolean;
  let liefergebühr = 2.5;

  $: {
    switch (true) {
      case auswahl === BestellTyp.b:
        modal = CheckoutAbholung;
        break;
      case auswahl === BestellTyp.c:
        liefern = true;
        modal = CheckoutLieferung;
        break;
      default:
        modal = null;
    }
  }

  //Bestellung sortieren
  function sortSpeisen(speisen: SpeiseBestellt[]): SpeiseBestellt[] {
    return speisen.slice().sort((a, b) => a.speise.nr - b.speise.nr);
  }

  // drucken
  async function print() {
    try {
      const response = await fetch("http://localhost:3001/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auswahl,
          bestellung,
        }),
      });
      const result = await response.json();

      if (result.success) {
        console.log("Print successful!");
      } else {
        console.error("Print failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred while printing:", error);
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="dialog_checkout"
  bind:this={dialog}
  on:click|self={closeCheckout}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="menu-bestellung" on:click|stopPropagation>
    <div class="menu_bestellung-header">
      <h3>Bestellung Nr. {bestellung.nr}</h3>
      <div class="container-toggler">
        <div class="btn-toggler">{auswahl}</div>
      </div>
    </div>

    <div class="menu_bestellung-list">
      {#each sortSpeisen(bestellung.speisen) as speiseBestellt (speiseBestellt.id)}
        <BestelluebersichtSpeise {speiseBestellt} />
      {/each}
    </div>
    {#if liefern}
      <div class="menu_bestellung-preis">
        <p>Liefergebühr:</p>
        <h3>{liefergebühr.toFixed(2)}€</h3>
      </div>
    {/if}
    <div class="menu_bestellung-preis">
      <p>Gesamtpreis:</p>
      <h2>{bestellung.gesamtpreis.toFixed(2)}€</h2>
    </div>
    {#if modal}
      <svelte:component this={modal} />
    {/if}
    <div>
      <div class="flex">
        <button on:click={print} class="btn-primary"
          ><h3>als <u>{auswahl}</u> drucken</h3></button
        >
      </div>
    </div>
  </div>
</dialog>
