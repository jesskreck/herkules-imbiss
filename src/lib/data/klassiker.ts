import type { Speise } from "$lib/types";

export const Nr1: Speise = {
    nr: 1,
    name: "Gyros",
    zutaten: [
        {name: "Gyros", menge: 1}
    ],
    preis: 9.0
};

export const Nr2: Speise = {
    nr: 2,
    name: "Gyros Box",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1}
    ],
    preis: 8.0,
    sauce: ["Cocktail", "Tzaziki"]
}

export const Nr3: Speise = {
    nr: 3,
    name: "XXL Bratwurst",
    zutaten: [
        {name: "Bratwurst", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 3.50,
    sauce: ["Senf"]
}

export const Nr4: Speise = {
    nr: 4,
    name: "XXL Currywurst",
    zutaten: [
        {name: "Currywurst", menge: 1},
        {name: "Pita", menge: 1}
    ],
    preis: 4.0
}

export const Nr5: Speise = {
    nr: 5,
    name: "Pommes",
    zutaten: [
        {name: "Pommes", menge: 1}
    ],
    preis: 3.0
}

export const Klassiker = [Nr1, Nr2, Nr3, Nr4, Nr5]