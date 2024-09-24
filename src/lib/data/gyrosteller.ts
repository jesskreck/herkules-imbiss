import type { Speise, Zutat } from "$lib/types";

const GyrostellerSaucen: Zutat[] = [
    {name: "Mayo", menge: 0, preis: 0.6 },
    {name: "Ketchup", menge: 0, preis: 0.6 },
]

export const Nr16: Speise = {
    nr: 16,
    name: "Gyros mit Pommes",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 0},
        {name: "Tzaziki", menge: 0},
    ],
    preis: 9.5,    
    sauce: GyrostellerSaucen
};

export const Nr17: Speise = {
    nr: 17,
    name: "Gyros mit Tzaziki",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 0},
        {name: "Kraut", menge: 0},
        {name: "Tzaziki", menge: 1},
    ],
    preis: 9.5,    
    sauce: GyrostellerSaucen
};

export const Nr18: Speise = {
    nr: 18,
    name: "Gyros mit Krautsalat",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 0},
        {name: "Kraut", menge: 1},
        {name: "Tzaziki", menge: 0},
    ],
    preis: 9.5,    
    sauce: GyrostellerSaucen
};

export const Nr19: Speise = {
    nr: 19,
    name: "Gyros mit Krautsalat und Pommes",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 1},
        {name: "Tzaziki", menge: 0},
    ],
    preis: 10.0,    
    sauce: GyrostellerSaucen
};

export const Nr20: Speise = {
    nr: 20,
    name: "Gyros mit Tzaziki und Pommes",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Kraut", menge: 0},
        {name: "Tzaziki", menge: 1},
    ],
    preis: 10.0,    
    sauce: GyrostellerSaucen
};

export const Nr21: Speise = {
    nr: 21,
    name: "Gyros mit Krautsalat und Tzaziki",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Pommes", menge: 0},
        {name: "Kraut", menge: 1},
        {name: "Tzaziki", menge: 1},
    ],
    preis: 10.0,    
    sauce: GyrostellerSaucen
};

export const Nr22: Speise = {
    nr: 22,
    name: "Gyros mit Krautsalat, Pommes und Tzaziki",
    zutaten: [
        {name: "Gyros", menge: 1},
        {name: "Kraut", menge: 1},
        {name: "Pommes", menge: 1},
        {name: "Tzaziki", menge: 1},
    ],
    preis: 11.0,    
    sauce: GyrostellerSaucen
};

export const Gyrosteller = [Nr16, Nr17, Nr18, Nr19, Nr20, Nr21, Nr22]