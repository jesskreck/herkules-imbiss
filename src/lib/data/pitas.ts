import type { Speise, Zutat } from "$lib/types";

const PitaBasics: Zutat[] = [
        {name: "Pita", menge: 1},
        {name: "Kraut", menge: 1},
        {name: "Zwiebeln", menge: 1}
]

const PitaSaucen: Zutat[] = [
  { name: "Cocktail", menge: 1 },
  { name: "Tzaziki", menge: 0 },
];


export const Nr8: Speise = {
  nr: 8,
  name: "Gyros Pita",
  zutaten: [
    ...PitaBasics,
    { name: "Gyros", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Nr9: Speise = {
  nr: 9,
  name: "Herkulessteak Pita",
  zutaten: [
    ...PitaBasics,
    { name: "Steak", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Nr10: Speise = {
  nr: 10,
  name: "Bifteki Pita",
  zutaten: [
      ...PitaBasics,
    { name: "Bifteki", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Nr11: Speise = {
  nr: 11,
  name: "Hähnchenbrust Pita",
  zutaten: [
      ...PitaBasics,
    { name: "Hähnchen", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Nr12: Speise = {
  nr: 12,
  name: "Grillkäse Pita",
  zutaten: [
      ...PitaBasics,
    { name: "Grillkäse", menge: 1 },
],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Nr13: Speise = {
  nr: 13,
  name: "Gyros Pommes Pita",
  zutaten: [
      ...PitaBasics,
    { name: "Gyros", menge: 1 },
    { name: "Pommes", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};


//TODO - Veggie gegen saisonales Gemüse austauschen. Todo wenn Salat Kategorie als Typen angelegt und Farbkodierung gegeben
export const Nr14: Speise = {
  nr: 14,
  name: "Veggie Pita",
  zutaten: [
      ...PitaBasics,
    { name: "Veggie", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Nr15: Speise = {
  nr: 15,
  name: "Suflaki Pita",
  zutaten: [
      ...PitaBasics,
    { name: "Suflaki", menge: 1 },
  ],
  preis: 8.0,
  sauce: PitaSaucen,
  singleSauceOnly: true
};

export const Pitas = [Nr8, Nr9, Nr10, Nr11, Nr12, Nr13, Nr14, Nr15];
