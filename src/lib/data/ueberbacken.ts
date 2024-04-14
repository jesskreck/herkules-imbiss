import type { Speise, Saucen } from "$lib/types";

const ÜberbackenSaucen: Saucen = {
    sauce: ["Hollandaise", "Metaxa"]
}

export const Nr33: Speise = {
    nr: 33,
    name: "Gyros Pita (überbacken)",
    zutaten: [
        {name: "Gyros", menge: 1, überbacken: true},
        {name: "Pita", menge: 1, überbacken: true}
    ],
    preis: 9.5,
    sauce: ÜberbackenSaucen
};

export const Nr34: Speise = {
    nr: 34,
    name: "Gyros Box (überbacken)",
    zutaten: [
        {name: "Gyros", menge: 1, überbacken: true},
        {name: "Pommes", menge: 1, überbacken: true}
    ],
    preis: 9.5,
    sauce: ÜberbackenSaucen
};

export const Nr35: Speise = {
    nr: 35,
    name: "Hähnchen (überbacken)",
    zutaten: [
        {name: "Hähnchen", menge: 1, überbacken: true},
    ],
    preis: 10.0,
    sauce: ÜberbackenSaucen
};

export const Nr36: Speise = {
    nr: 36,
    name: "Gyros (überbacken)",
    zutaten: [
        {name: "Gyros", menge: 1, überbacken: true},
    ],
    preis: 10.0,
    sauce: ÜberbackenSaucen
};

export const Ueberbacken = [Nr33, Nr34, Nr35, Nr36] 