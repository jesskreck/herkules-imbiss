// place files you want to import through the `$lib` alias in this folder.

import type { Writable } from "svelte/store";

export enum BestellTyp {
  a = "vor Ort",
  b = "Abholung",
  c = "Lieferung",
}

export enum Size {
  a = "normal",
  b = "klein",
}

export const BestellTypen = Object.values(BestellTyp)
export const SizeValues = Object.values(Size)

export type ZutatT =
| "ohne"
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
  | "Cola"
  | "Fanta"
  | "Sprite"
  | "Schorle"
  | "Multi"
  | "Wasser"
  | "Joghurt"
  | "Cocktail"
  | "Essig Öl"
  | "Granatapfel"
  


export interface Zutat {
  name: ZutatT;
  menge: number;
  überbacken?: boolean;
  preis?: number;
  canToggle?: boolean;
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
  aufpreis?: number;
  size?: string;
  notiz?: string;
}

export interface Bestellung {
  nr: Number,
  speisen: SpeiseBestellt[];
  gesamtpreis: number;
  eingangszeit: Date;
  abholzeit: Date;
  discountRate?: number | null;
  discountValue?: number;
  discountedPrice?: number;
  liefern?: boolean;
  liefergebuehr?: number;
  name?: string;
  telefon?: string;
  strasse?: string;
  hausnummer?: string;
  liefernotiz?: string;
}

export interface ButtonGroupContext {
  selectButton: (value: string) => void;
  activeButton: Writable<string>;
}