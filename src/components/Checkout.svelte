<script lang="ts">
  import { BestellTyp, type Bestellung, type SpeiseBestellt } from "$lib/types";
  import { onMount } from "svelte";
  import { bestellungStore } from "../stores/Bestellung";
  import { checkoutStore, closeCheckout } from "../stores/Checkout";
  import BestelluebersichtSpeise from "./BestelluebersichtSpeise.svelte";
  import CheckoutAbholung from "./CheckoutAbholung.svelte";
  import CheckoutLieferung from "./CheckoutLieferung.svelte";
  import Gesamtpreis from "./utils/Gesamtpreis.svelte";

  let dialog: HTMLDialogElement; // dialog wird über showCheckout aus checkoutStore auf menu/+page.svelte getriggert
  let bestellung: Bestellung;
  let orderNrLocalServer: number;
  let modal: any;
  let liefern: boolean;
  let gesamtpreisTemp: number;

  // setzt Fokus auf gewähltes HTML Element da Inputfield sonst Autofocus bekommt was Keyboard auf Touchdisplay automatisch einblendet
  let focus: HTMLElement;
  onMount(() => {
    focus.focus();
  });

  bestellungStore.subscribe((b) => {
    bestellung = b;
    gesamtpreisTemp = bestellung.gesamtpreis
  });


  $: ({ showCheckout, auswahl } = $checkoutStore);


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

  // ruft beim Laden der Komponente Bestellnummer vom lokalen Druckerserver ab (Konfiguration in imbiss-app-printer > orderCounter.js)
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
      // Speicher Bestellnummer
      bestellungStore.update((b) => {
        b.nr = orderNrLocalServer;
        console.log("Bestellung für Druck:", b);
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
    <Gesamtpreis {auswahl}/>
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
