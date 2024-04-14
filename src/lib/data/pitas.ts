import type { Speise, Saucen, Optionen } from "$lib/types";

const PitaSaucen: Saucen = {
    sauce: ["Cocktail", "Tzaziki"]
}

const PitaOptionen: Optionen = {
    option: ["Kraut", "Zwiebeln"]
}

export const Nr8: Speise = {
    nr: 8,
    name: "Gyros Pita",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.0,
    sauce: PitaSaucen,
    option: PitaOptionen,
};

export const Nr9: Speise = {
    nr: 9,
    name: "Herkulessteak Pita",
    zutaten: [
        {name: "Steak", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};

export const Nr10: Speise = {
    nr: 10,
    name: "Bifteki Pita",
    zutaten: [
        {name: "Bifteki", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};


export const Nr11: Speise = {
    nr: 11,
    name: "Hähnchenbrust Pita",
    zutaten: [
        {name: "Hähnchen", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};

export const Nr12: Speise = {
    nr: 12,
    name: "Grillkäse Pita",
    zutaten: [
        {name: "Grillkäse", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};

export const Nr13: Speise = {
    nr: 13,
    name: "Gyros Pommes Pita",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};

export const Nr14: Speise = {
    nr: 14,
    name: "Veggie Pita",
    zutaten: [
        {name: "Veggie", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 6.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};


export const Nr15: Speise = {
    nr: 15,
    name: "Suflaki Pita",
    zutaten: [
        {name: "Suflaki", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 7.5,
    sauce: PitaSaucen,
    option: PitaOptionen,
};

export const Pitas = [Nr10, Nr11, Nr12, Nr13, Nr14, Nr15]