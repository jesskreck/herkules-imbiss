import type { Speise, Zutat } from "$lib/types";

const GrillplattenSaucen: Zutat[] = [
    {name: "Tzaziki", menge: 1},
    {name: "Mayo", menge: 0, preis: 0.6 },
    {name: "Ketchup", menge: 0, preis: 0.6 },
]

export const Nr23: Speise = {
    nr: 23,
    name: "Gyros-Manta-Platte",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Currywurst", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 10.0,
    sauce: [
        {name: "Tzaziki", menge: 1},
        {name: "Mayo", menge: 1, preis: 0 },
        {name: "Ketchup", menge: 0, preis: 0.6 },
    ],
};

export const Nr24: Speise = {
    nr: 24,
    name: "Suflaki-Platte",
    zutaten: [
        {name: "Suflaki", menge: 2},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 13.0,
    sauce: GrillplattenSaucen
};

export const Nr25: Speise = {
    nr: 25,
    name: "Hähnchenbrust-Platte",
    zutaten: [
        {name: "Hähnchen", menge: 2},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 13.0,
    sauce: GrillplattenSaucen
};

export const Nr26: Speise = {
    nr: 26,
    name: "Herkulessteak-Platte",
    zutaten: [
        {name: "Steak", menge: 2},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 13.0,
    sauce: GrillplattenSaucen
};

export const Nr27: Speise = {
    nr: 27,
    name: "Bifteki-Platte",
    zutaten: [
        {name: "Bifteki", menge: 2},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 14.0,
    sauce: GrillplattenSaucen
};

export const Nr28: Speise = {
    nr: 28,
    name: "Leichte Grillplatte",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    option: [
        {name: "Suflaki", menge: 1},
        {name: "Hähnchen", menge: 0},
    ],
    preis: 13.0,
    sauce: GrillplattenSaucen
};

export const Nr29: Speise = {
    nr: 29,
    name: "Grillkäse-Platte",
    zutaten: [
        {name: "Grillkäse", menge: 1},
        {name: "Feta mit Salat", menge: 1},
        {name: "Pita", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 13.0,
    sauce: GrillplattenSaucen
};

export const Nr30: Speise = {
    nr: 30,
    name: "Bifteki-Feta-Platte",
    zutaten: [
        {name: "Bifteki", menge: 2, überbacken: true},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 16.0,
    sauce: GrillplattenSaucen
};

export const Nr31: Speise = {
    nr: 31,
    name: "Herkules-Platte",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Bifteki", menge: 1},
        {name: "Steak", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 16.0,
    sauce: GrillplattenSaucen
};

export const Nr32: Speise = {
    nr: 32,
    name: "Trio-Platte",
    zutaten: [
        {name: "Bifteki", menge: 1, überbacken: true},
        {name: "Suflaki", menge: 1},
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1}
    ],
    preis: 17.0,
    sauce: GrillplattenSaucen
};

export const Grillplatten = [Nr23, Nr24, Nr25, Nr26, Nr27, Nr28, Nr29, Nr30, Nr31, Nr32]