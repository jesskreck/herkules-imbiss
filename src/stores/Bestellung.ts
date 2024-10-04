import { writable } from "svelte/store";
import type { Bestellung, Speise, SpeiseBestellt } from "$lib/types";
import { closeModal } from "./Modal";

export const bestellungStore = writable<Bestellung>({
  nr: 0,
  speisen: [],
  gesamtpreis: 0,
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
  closeModal();
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