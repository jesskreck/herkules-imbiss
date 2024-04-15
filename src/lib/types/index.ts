// place files you want to import through the `$lib` alias in this folder.

export type ZutatT = 'Gyros' | 'Pommes' | 'Tzaziki' | 'Kraut' | 'Steak' | 'Bifteki' | 'Suflaki' | 'Hähnchen' | 'Grillkäse' | 'Pita' | 'Bratwurst' | 'Currywurst' | 'Veggie' | 'Zwiebeln';
export type ExtraT = 'Mayo' | 'Ketchup' | 'Tzaziki';
export type SauceT = 'Cocktail' | 'Tzaziki' | 'Hollandaise' | 'Metaxa' | 'Senf'

export interface Zutat {
    name: ZutatT,
    menge: number,
    überbacken?: boolean
}

// kann in Kategorie importiert werden um übergreifend Saucen für alle zu definieren
export interface Saucen {
    sauce: SauceT[]
}

export interface Optionen {
    option: ZutatT[]
}

export interface Speise {
    nr: number;
    name: string;
    zutaten: Zutat[];
    preis: number;

    // entweder übergreifend Saucen für Kategorie definieren | oder individuelles Array mit Saucen
    sauce?: Saucen | SauceT[];
    option?: Optionen | Zutat[];
}

export interface Extra {
    name: ExtraT;
    preis: number;
}


export interface SpeiseBestellt {
    speise: Speise;
    menge: number;
    extras?: Extra[];
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
