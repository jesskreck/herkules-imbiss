import { writable } from "svelte/store";
import type { Speise, SpeiseBestellt } from "$lib/types";

// Initialisiere den Store mit dem Zustand des Modals und der ausgewählten Speise
export const editorStore = writable<{
  showEditor: boolean;
  selectedSpeise: Speise | SpeiseBestellt | null;
}>({ showEditor: false, selectedSpeise: null });

// Funktion zum Öffnen des Modals mit der ausgewählten Speise
export function openModal(speise: Speise | SpeiseBestellt) {
  const speiseCopy = structuredClone(speise);
  editorStore.set({ showEditor: true, selectedSpeise: speiseCopy });
}

// Funktion zum Schließen des Modals
export function closeModal() {
  editorStore.set({ showEditor: false, selectedSpeise: null });
}

