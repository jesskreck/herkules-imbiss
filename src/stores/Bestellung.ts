import { writable } from "svelte/store";
import type { Bestellung, SpeiseBestellt } from "$lib/types";

export const bestellungStore = writable<Bestellung>({
  speisen: [],
  gesamtpreis: 0,
  angenommen: new Date(),
  ausgegeben: new Date(),
});

export const addSpeiseToBestellung = (speiseBestellt: SpeiseBestellt) => {
  bestellungStore.update((current) => {
    const speisenNeu = [...current.speisen, speiseBestellt];

    const gesamtpreisNeu = speisenNeu.reduce(
      (sum, item) => sum + item.gesamtpreis,
      0
    );

    return {
      ...current,
      speisen: speisenNeu,
      gesamtpreis: gesamtpreisNeu,
    };
  });
};
