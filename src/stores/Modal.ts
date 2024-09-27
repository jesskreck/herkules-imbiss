import { writable } from "svelte/store";
import type { Speise, SpeiseBestellt } from "$lib/types";

// Initialisiere den Store mit dem Zustand des Modals und der ausgewählten Speise
export const modalStore = writable<{
  showModal: boolean;
  selectedSpeise: Speise | SpeiseBestellt | null;
}>({ showModal: false, selectedSpeise: null });

// Funktion zum Öffnen des Modals mit der ausgewählten Speise
export function openModal(speise: Speise | SpeiseBestellt) {
  modalStore.set({ showModal: true, selectedSpeise: speise });
  console.log("check");
}

// Funktion zum Schließen des Modals
export function closeModal() {
  modalStore.set({ showModal: false, selectedSpeise: null });
}
