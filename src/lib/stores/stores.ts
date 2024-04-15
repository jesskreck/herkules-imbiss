import { writable } from "svelte/store";
import {
    type Speise,
    type SpeiseBestellt,
    type BestellungKomplett,
} from "$lib/types";

// Initialisiere mit leeren Werten
const initialSpeise = {
    nr: 0,
    name: "",
    zutaten: [],
    preis: 0,
};

const initialSpeiseBestellt = {
    speise: initialSpeise,
    menge: 1,
    preis: 0,
    kommentar: "",
};

const initialBestellung: BestellungKomplett = {
    speisen: [],
    gesamtpreis: 0,
    bestellt: new Date(),
    bekommen: new Date(),
};

// Stores
export const StoreSpeise = writable<Speise>(initialSpeise);
export const StoreSpeiseBestellt = writable<SpeiseBestellt>(initialSpeiseBestellt);
export const StoreBestellungKomplett = writable<BestellungKomplett>(initialBestellung);

// Funktionen
export function resetSpeise() {
    StoreSpeise.set(initialSpeise);
}

export function resetSpeiseBestellt() {
    StoreSpeiseBestellt.set(initialSpeiseBestellt);
}

export function resetBestellungKomplett() {
    StoreBestellungKomplett.set(initialBestellung);
}


