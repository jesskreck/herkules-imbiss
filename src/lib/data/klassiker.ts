import type { Speise } from "$lib/types";

export const Nr1: Speise = {
  nr: 1,
  name: "Gyros",
  zutaten: [
    { name: "Gyros", menge: 1 },
    { name: "Zwiebeln", menge: 1 },
  ],
  preis: 9.0,
};

export const Nr2: Speise = {
  nr: 2,
  name: "Gyros Box",
  zutaten: [
    { name: "Gyros", menge: 1 },
    { name: "Pommes", menge: 1 },
    { name: "Zwiebeln", menge: 1 },
  ],
  preis: 8.5,
  sauce: [
    { name: "Cocktail", menge: 1 },
    { name: "Tzaziki", menge: 0 },
  ],
  singleSauceOnly: true
};

export const Nr3: Speise = {
  nr: 3,
  name: "XXL Bratwurst",
  zutaten: [
    { name: "Bratwurst", menge: 1 },
    { name: "Pita", menge: 1 },
  ],
  preis: 4.0,
  sauce: [{ name: "Senf", menge: 1 }],
};

export const Nr4: Speise = {
  nr: 4,
  name: "XXL Currywurst",
  zutaten: [
    { name: "Currywurst", menge: 1 },
    { name: "Pita", menge: 1 },
  ],
  preis: 4.5,
};

export const Nr5: Speise = {
  nr: 5,
  name: "Pommes",
  zutaten: [{ name: "Pommes", menge: 1 }],
  preis: 3.0,
  sauce: [
    { name: "Mayo", menge: 0, preis: 0.6 },
    { name: "Ketchup", menge: 0, preis: 0.6 },
  ],
};

export const Nr6: Speise = {
    nr: 6,
    name: "Manta-Platte",
    zutaten: [
        { name: "Pommes", menge: 1 },
        { name: "Currywurst", menge: 1 }
    ],
    preis: 8.0,
    sauce: [
      { name: "Mayo", menge: 1 },
      { name: "Ketchup", menge: 0, preis: 0.6 },
    ],
  };

export const Nr7: Speise = {
    nr: 7,
    name: "Extras (Schälchen)",
    zutaten: [
        {name: "Kraut", menge: 0, preis: 3.5},
        {name: "Tzaziki", menge: 0, preis: 3.5},
        {name: "Pita", menge: 0, preis: 1.0},
        {name: "Peperoni", menge: 0, preis: 2.5},
        {name: "Feta", menge: 0, preis: 3.5},
        {name: "Oliven", menge: 0, preis: 3.5},
    ],
    preis: 0
}

export const Klassiker = [Nr1, Nr2, Nr3, Nr4, Nr5, Nr6, Nr7];
