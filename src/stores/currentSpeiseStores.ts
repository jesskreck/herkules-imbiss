import { writable } from 'svelte/store';
import type { currentSpeise } from '$lib/types';

// Initialisierung eines leeren Stores für die aktuelle Speise
export const currentSpeiseStore = writable<currentSpeise | null>(null);
