import { writable } from 'svelte/store';
import type { Bestellung } from '$lib/types';

// Initialisiere einen leeren Store für die Bestellung mit einem Standardobjekt
const initialBestellung: Bestellung = {
    items: [],
    gesamtpreis: 0,
    bestellt: new Date(),
    bekommen: new Date(),
};

export const bestellungStore = writable<Bestellung>(initialBestellung);
