// place files you want to import through the `$lib` alias in this folder.

import type { Writable } from "svelte/store";

export enum BestellTyp {
  a = "Hier Essen",
  b = "Abholung",
  c = "Lieferung",
}

export const BestellTypen = Object.values(BestellTyp)

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
  singleSauceOnly?: boolean;
  option?: Zutat[];
}

export interface SpeiseBestellt {
  id: number; 
  speise: Speise;
  menge: number;
  gesamtpreis: number;
  notiz?: string;
}

export interface Bestellung {
  nr: Number,
  speisen: SpeiseBestellt[];
  gesamtpreis: number;
  eingangszeit: Date;
  abholzeit: Date;
  telefon?: string;
  adresse?: string;
}

export interface ButtonGroupContext {
  selectButton: (value: string) => void;
  activeButton: Writable<string>;
}