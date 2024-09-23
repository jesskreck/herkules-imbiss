// place files you want to import through the `$lib` alias in this folder.

export type ZutatT =
  | "Gyros"
  | "Pommes"
  | "Tzaziki"
  | "Kraut"
  | "Steak"
  | "Bifteki"
  | "Suflaki"
  | "Hähnchen"
  | "Grillkäse"
  | "Pita"
  | "Bratwurst"
  | "Currywurst"
  | "Veggie"
  | "Zwiebeln"
  | "Mayo"
  | "Ketchup"
  | "Cocktail"
  | "Metaxa"
  | "Senf"
  | "Hollandaise"
  | "Feta mit Salat"
  | "Peperoni"
  | "Feta"
  | "Oliven"
export type SauceT = "Cocktail" | "Tzaziki" | "Hollandaise" | "Metaxa" | "Senf";

export interface Zutat {
  name: ZutatT;
  menge: number;
  überbacken?: boolean;
  preis?: number;
}

export interface Speise {
  nr: number;
  name: string;
  zutaten: Zutat[];
  preis: number;

  // entweder übergreifend Saucen für Kategorie definieren | oder individuelles Array mit Saucen
  sauce?: Zutat[];
}

export interface SpeiseBestellt {
  speise: Speise;
  menge: number;
  // extras?: Extra[];
  preis: number;
  kommentar?: string;
}

export interface BestellungKomplett {
  speisen: SpeiseBestellt[];
  gesamtpreis: number;
  bestellt: Date;
  bekommen: Date;
  kunde?: {
    telefon?: string;
    adresse?: string;
  };
}
