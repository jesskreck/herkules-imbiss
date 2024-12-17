import { writable } from "svelte/store";
import type { Bestellung, Speise, SpeiseBestellt } from "$lib/types";

export const bestellungStore = writable<Bestellung>({
  nr: 0,
  speisen: [],
  gesamtpreis: 0,
  liefergebuehr: 0,
  discountRate: null,
  eingangszeit: new Date(),
  abholzeit: new Date(),
});

export function addSpeiseToBestellung(speiseToAdd: SpeiseBestellt) {
  bestellungStore.update((bestellung) => {
    return {
      ...bestellung,
      speisen: [...bestellung.speisen, speiseToAdd],
      gesamtpreis: bestellung.gesamtpreis + speiseToAdd.gesamtpreis,
    };
  });
}

export function updateSpeiseInBestellung(updatedSpeise: SpeiseBestellt) {
  bestellungStore.update((bestellung) => {
    // Finde die zu aktualisierende Speise anhand der ID
    const updatedSpeisen = bestellung.speisen.map((speiseBestellt) =>
      speiseBestellt.id === updatedSpeise.id ? updatedSpeise : speiseBestellt
    );

    // Neuberechnung des Gesamtpreises
    const neuerGesamtpreis = updatedSpeisen.reduce((acc, curr) => acc + curr.gesamtpreis, 0);

    return {
      ...bestellung,
      speisen: updatedSpeisen,
      gesamtpreis: neuerGesamtpreis,
    };
  });
}

export function saveChanges(
  speise: Speise | SpeiseBestellt,
  speiseToEdit: Speise,
  menge: number,
  gesamtpreis: number,
  notiz: string,
  saucenAuswahl: string,
  size: string,
  aufpreis: number,
) {
  // Sauce handling for single sauce option
  if (speiseToEdit.sauce && speiseToEdit.singleSauceOnly) {
    speiseToEdit.sauce = speiseToEdit.sauce.map((sauce) => ({
      ...sauce,
      menge: sauce.name === saucenAuswahl ? 1 : 0,
    }));
  }

  const hasID = "id" in speise;

  if (hasID) {
    // Update existing SpeiseBestellt
    const updatedSpeise: SpeiseBestellt = {
      ...(speise as SpeiseBestellt),
      speise: speiseToEdit,
      menge,
      gesamtpreis,
      notiz,
      size,
      aufpreis
    };
    updateSpeiseInBestellung(updatedSpeise);

  } else {
    // Add new SpeiseBestellt
    const newSpeise: SpeiseBestellt = {
      id: Math.floor(Math.random() * 1000000), // Example ID generation
      speise: speiseToEdit,
      menge,
      gesamtpreis,
      notiz,
      size,
      aufpreis
    };
    addSpeiseToBestellung(newSpeise);
  }
}

export function removeSpeiseFromBestellung(speiseToRemove: SpeiseBestellt) {
  bestellungStore.update((bestellung) => {
    const remainingSpeisen = bestellung.speisen.filter(
      (speiseBestellt) => speiseBestellt.id !== speiseToRemove.id
    );

    const neuerGesamtpreis = remainingSpeisen.reduce(
      (acc: number, curr: SpeiseBestellt) => acc + curr.gesamtpreis,
      0
    );

    return {
      ...bestellung,
      speisen: remainingSpeisen,
      gesamtpreis: neuerGesamtpreis
    }
  })
}

export function updateField<T extends keyof Bestellung>(field: T, value: Bestellung[T]) {
  bestellungStore.update((bestellung) => ({
    ...bestellung,
    [field]: value,
  }));
}

export function setAbholzeit(time: string) {
  bestellungStore.update((bestellung) => {
    const [hours, minutes] = time.split(":").map(Number);
    const abholzeit = new Date();
    abholzeit.setHours(hours, minutes, 0, 0);

    return {
      ...bestellung,
      abholzeit
    }
  })
}

