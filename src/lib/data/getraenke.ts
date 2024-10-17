import type { Speise } from "$lib/types";

export const Nr38: Speise = {
    nr: 38,
    name: "Softgetränke",
    zutaten: [],
    option: [
        { name: "Cola", menge: 1 },
        { name: "Fanta", menge: 1 },
        { name: "Sprite", menge: 1 },
        { name: "Schorle", menge: 1 },
        { name: "Multi", menge: 1 },
    ],
    preis: 2.8,
};

export const Nr39: Speise = {
    nr: 39,
    name: "Wasser",
    zutaten: [{ name: "Wasser", menge: 1 }],

    preis: 2.5,
};

export const Getraenke = [Nr38, Nr39]