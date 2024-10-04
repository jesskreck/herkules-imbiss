import { writable } from "svelte/store";
import { BestellTyp } from "$lib/types";
import { bestellungStore } from "./Bestellung";


// Initialisiere den Store mit dem Zustand des Modals und der ausgewählten Speise
export const checkoutStore = writable<{
  showCheckout: boolean;
  auswahl: BestellTyp;
}>({ showCheckout: false, auswahl: BestellTyp.a });


// Funktion zum Öffnen des Modals mit der ausgewählten Speise
export function openCheckout(auswahl: BestellTyp) {
  bestellungStore.update((bestellung) => {
    return {
      ...bestellung,
      nr: bestellung.nr =+ 1,
    };
  });
  checkoutStore.set({ showCheckout: true, auswahl: auswahl });
}

// Funktion zum Schließen des Modals
export function closeCheckout() {
  checkoutStore.set({ showCheckout: false, auswahl: BestellTyp.a });
}