<script lang="ts">
  import { BestellTyp, type Bestellung, type SpeiseBestellt } from "$lib/types";
  import { onMount } from "svelte";
  import { bestellungStore } from "../stores/Bestellung";
  import { checkoutStore, closeCheckout } from "../stores/Checkout";
  import BestelluebersichtSpeise from "./BestelluebersichtSpeise.svelte";
  import CheckoutAbholung from "./CheckoutAbholung.svelte";
  import CheckoutLieferung from "./CheckoutLieferung.svelte";

  let dialog: HTMLDialogElement; // dialog wird über showCheckout aus checkoutStore auf menu/+page.svelte getriggert
  let bestellung: Bestellung;
  let orderNrLocalServer: number;
  let modal: any;
  let liefern: boolean;
  let liefergebühr = 2.5;

  let focus: HTMLElement
  // Automatische Reaktivität für den showModal Zustand aus dem Store
  $: ({ showCheckout, auswahl } = $checkoutStore);
  bestellungStore.subscribe((b) => {
    bestellung = b;
    console.log(bestellung);
  });


  // Setze das Modal automatisch in den offenen Zustand, wenn showModal true ist
  $: if (dialog && showCheckout) {
    dialog.showModal();
  }

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

  onMount(()=>{
    focus.focus()
  })

  // Bestellnummer vom lokalen Server abrufen (einmal beim Laden der Komponente)
  onMount(async () => {
    const response = await fetch("http://localhost:3001/order-number");
    const data = await response.json();
    orderNrLocalServer = data.orderNumber; // Aktuelle Bestellnummer speichern
  });

  // Bestellung sortieren
  function sortSpeisen(speisen: SpeiseBestellt[]): SpeiseBestellt[] {
    return speisen.slice().sort((a, b) => a.speise.nr - b.speise.nr);
  }

  // drucken
  async function print() {
    try {
      // Speicher Bestellnummer in Store
      bestellungStore.update((b) => {
        b.nr = orderNrLocalServer;
        return b;
      });

      // Sende Bestellung an Druckerserver
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
        console.log("Druck erfolgreich!");

         // Reset des Bestellung-Stores nach dem erfolgreichen Druck
         bestellungStore.set({
          nr: 0,
          speisen: [],
          gesamtpreis: 0,
          eingangszeit: new Date(),
          abholzeit: new Date(),
        });
        closeCheckout();

      } else {
        console.error("Druck fehlgeschlagen:", result.error);
      }
    } catch (error) {
      console.error("Fehler beim Drucken:", error);
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
      <h3>Bestellung Nr. {orderNrLocalServer}</h3>
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
        <button bind:this={focus} on:click={print} class="btn-primary"
          ><h3>als <u>{auswahl}</u> drucken</h3></button
        >
      </div>
    </div>
  </div>
</dialog>
