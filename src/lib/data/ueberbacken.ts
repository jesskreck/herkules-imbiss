import type { Speise, Zutat } from "$lib/types";

const ÜberbackenSaucen: Zutat[] = [
    { name: "Hollandaise", menge: 1 },
    { name: "Metaxa", menge: 0 },
]



export const Nr33: Speise = {
    nr: 33,
    name: "Gyros Pita (überbacken)",
    zutaten: [
        { name: "Gyros", menge: 1, überbacken: true, canToggle: false },
        { name: "Pita", menge: 1, überbacken: true, canToggle: false },
        { name: "Zwiebeln", menge: 1}
    ],
    preis: 9.5,
    sauce: ÜberbackenSaucen,
    singleSauceOnly: true
};

export const Nr34: Speise = {
    nr: 34,
    name: "Gyros Box (überbacken)",
    zutaten: [
        { name: "Gyros", menge: 1, überbacken: true, canToggle: false },
        { name: "Pommes", menge: 1, überbacken: true, canToggle: false },
        { name: "Zwiebeln", menge: 1}
    ],
    preis: 9.5,
    sauce: ÜberbackenSaucen,
    singleSauceOnly: true
};

export const Nr35: Speise = {
    nr: 35,
    name: "Hähnchen (überbacken)",
    zutaten: [
        { name: "Hähnchen", menge: 1, überbacken: true, canToggle: false },
        { name: "Zwiebeln", menge: 1}
    ],
    preis: 10.0,
    sauce: ÜberbackenSaucen,
    singleSauceOnly: true
};

export const Nr36: Speise = {
    nr: 36,
    name: "Gyros (überbacken)",
    zutaten: [
        { name: "Gyros", menge: 1, überbacken: true },
        { name: "Zwiebeln", menge: 1}
    ],
    preis: 10.0,
    sauce: ÜberbackenSaucen,
    singleSauceOnly: true
};

export const keineNummer: Speise = {
    nr: 37,
    name: "Pommes (überbacken)",
    zutaten: [
        { name: "Pommes", menge: 1, überbacken: true },
        { name: "Zwiebeln", menge: 1}
    ],
    preis: 6.0,
    sauce: ÜberbackenSaucen,
    singleSauceOnly: true
};


export const Ueberbacken = [Nr33, Nr34, Nr35, Nr36, keineNummer] 