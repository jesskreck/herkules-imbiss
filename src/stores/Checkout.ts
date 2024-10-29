import { writable } from "svelte/store";
import { BestellTyp } from "$lib/types";

// speichert ob Checkout sichtbar sein soll und welcher Bestelltyp in Bestelluebersicht gewählt wurde
export const checkoutStore = writable<{
  showCheckout: boolean;
  auswahl: BestellTyp;
}>({ showCheckout: false, auswahl: BestellTyp.a });


export function openCheckout(auswahl: BestellTyp) {
  checkoutStore.set({ showCheckout: true, auswahl: auswahl });
}

export function closeCheckout() {
  checkoutStore.set({ showCheckout: false, auswahl: BestellTyp.a });
}