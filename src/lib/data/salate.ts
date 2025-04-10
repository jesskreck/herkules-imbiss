import type { Speise } from "$lib/types";

export const Nr37: Speise = {
    nr: 37,
    name: "Greek Bowl",
    zutaten: [
        { name: "Salat", menge: 1 },
    ],
    option: [
        { name: "Feta", menge: 0 },
        { name: "Gyros", menge: 0, preis: 2.0 },
        { name: "Hähnchen", menge: 0, preis: 2.0 },
        { name: "Suflaki", menge: 0, preis: 2.0 },
        { name: "Bifteki", menge: 0, überbacken: true, preis: 2.5 },
    ],
    preis: 9.0,
    sauce: [
        { name: "Joghurt", menge: 1 },
        { name: "Cocktail", menge: 1 },
        { name: "Essig Öl", menge: 1 },
        { name: "Granatapfel", menge: 1 },
    ],
    singleSauceOnly: true
};

export const Salate = [Nr37]