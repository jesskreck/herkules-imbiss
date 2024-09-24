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
  | "Salat"
  | "Essig Öl"
  | "French Dressing"


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
  sauce?: Zutat[];
  option?: Zutat[];
}

export interface currentSpeise {
  id: number; //wird bei Klick auf hinzufügen random generiert
  speise: Speise;
  menge: number;
  gesamtpreis: number;
  notiz?: string;
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
