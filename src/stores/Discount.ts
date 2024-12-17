import { derived, writable } from "svelte/store";
import { bestellungStore } from "./Bestellung";

// Initialisiere den Store mit dem Zustand des Modals und der ausgewählten Speise
export const discountStore = writable<{
    showEditorDiscount: boolean;
    selectedDiscount: number | null;
}>({ showEditorDiscount: false, selectedDiscount: null });


// Funktion zum Öffnen des Rabatt-Modals mit dem ausgewählten Rabatt
export function openModalDiscount(discount: number) {
    discountStore.set({ showEditorDiscount: true, selectedDiscount: discount });
}

// Funktion zum Schließen des Rabatt-Modals
export function closeModalDiscount() {
    discountStore.set({ showEditorDiscount: false, selectedDiscount: null });
}

export function applyDiscount(percent: number) {
    bestellungStore.update(bestellung => ({ ...bestellung, discountRate: percent }))
}

export function removeDiscount() {
    bestellungStore.update(bestellung => ({ ...bestellung, discountRate: null }))
}

export const calculatedDiscount = derived(bestellungStore, $bestellung => {
    return $bestellung.discountRate
        ? $bestellung.gesamtpreis * ($bestellung.discountRate / 100)
        : 0;
});

export const discountedPrice = derived([bestellungStore, calculatedDiscount], ([$bestellung, $calculatedDiscount]) => {
    return $bestellung.gesamtpreis - $calculatedDiscount;
});