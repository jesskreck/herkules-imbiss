import { Gyrosteller } from "$lib/data/gyrosteller";
import type { Speise, SpeiseBestellt } from "$lib/types";

export function takeNrExact(speise: any, validNrs: number[]): boolean {
  return (
    ("nr" in speise && validNrs.includes(speise.nr)) ||
    ("id" in speise && validNrs.includes(speise.speise.nr))
  );
}

export function takeNrRange(speise: any, ...ranges: [number, number][]): boolean {
  const nr = "nr" in speise ? speise.nr : speise.speise.nr;

  // Prüfe, ob die Nummer in einem der Ranges liegt
  return ranges.some(([min, max]) => nr >= min && nr <= max);
}


export function prepareSpeiseData(speise: Speise | SpeiseBestellt) {
  let speiseToEdit: Speise;
  let menge: number;
  let notiz: string;
  let einzelpreis: number;
  let aufpreis: number = 0;
  let saucenAuswahl: string = "";
  let optionAuswahl: string = "";
  let size: string;
  let sizepreis: number = 0;

  if ("id" in speise) {
    const speiseBestellt = speise as SpeiseBestellt;
    speiseToEdit = speiseBestellt.speise;
    menge = speiseBestellt.menge;
    notiz = speiseBestellt.notiz || "";
    size = speiseBestellt.size || "";
    aufpreis = speiseBestellt.aufpreis || 0;
    einzelpreis = speiseBestellt.speise.preis;
    if (size === "klein") {
      sizepreis -=2;
    }

    saucenAuswahl =
      speiseToEdit.singleSauceOnly && speiseToEdit.sauce
        ? speiseToEdit.sauce.find((sauce) => sauce.menge === 1)?.name || ""
        : "";

    optionAuswahl =
      speiseToEdit.option
        ? speiseToEdit.option.find((option) => option.menge === 1)?.name || ""
        : "";

  } else {
    speiseToEdit = speise as Speise;
    menge = 1;
    size = "normal";
    notiz = "";
    einzelpreis = speiseToEdit.preis;
    saucenAuswahl = "";
    optionAuswahl = "";
  }

  return { speiseToEdit, menge, notiz, einzelpreis, aufpreis, saucenAuswahl, optionAuswahl, size, sizepreis };
}


export function findGyrosteller(speise: Speise): Speise {
  return (
    Gyrosteller.find((gericht) =>
      gericht.zutaten.every((zutat) =>
        speise.zutaten.some(
          (s) => s.name === zutat.name && s.menge === zutat.menge
        )
      )
    ) || speise
  );
}