# Herkules Imbiss-App

Eine SvelteKit-basierte Point-of-Sale-App für einen Imbiss.

## Projektübersicht

Die Herkules Imbiss-App ist ein digitales Kassensystem, speziell entwickelt für einen griechischen Imbiss. Die Anwendung ermöglicht die einfache Erfassung und Verwaltung von Bestellungen, unterstützt verschiedene Bestelltypen (vor Ort, Abholung, Lieferung) und bietet eine benutzerfreundliche Oberfläche für das Imbiss-Personal.

## Hauptfunktionen

- **Speisekarte-Verwaltung**: Anzeige aller Speisen, kategorisiert nach Typen (Klassiker, Pitas, Gyrosteller, etc.)
- **Bestellsystem**: Hinzufügen, Bearbeiten und Löschen von Speisen aus einer Bestellung
- **Bestelloptionen**: Unterstützung für verschiedene Bestell-Typen (vor Ort, Abholung, Lieferung)
- **Zutaten-Management**: Intuitive Bearbeitung von Zutaten mit Aufpreis-Berechnung
- **Rabatt-System**: Anwendung von Rabatten auf Bestellungen
- **Drucker-Integration**: Drucken von Bestellungen auf einem lokalen Drucker-Server
- **Responsive Design**: Optimiert für Touch-Displays im Imbiss-Betrieb

## Technologien

- **Frontend**: SvelteKit, TypeScript, SCSS
- **UI-Komponenten**: Eigene Komponenten-Bibliothek
- **Statemanagement**: Svelte Stores
- **API-Kommunikation**: Lokaler Drucker-Server
- **Daten-Persistenz**: Firebase (vorbereitet, aber nicht aktiv)

## Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktionsumgebung bauen
npm run build
```

## Systemvoraussetzungen

- Node.js (v14 oder höher)
- NPM (v6 oder höher)
- Für die Drucker-Funktionalität: Lokaler Drucker-Server auf Port 3001

## Projektstruktur

- **src/components**: UI-Komponenten (Editor, Checkout, etc.)
- **src/lib/data**: Speisedaten (Klassiker, Pitas, Gyrosteller, etc.)
- **src/lib/types**: TypeScript Typdefinitionen
- **src/lib/utils**: Hilfsfunktionen
- **src/routes**: SvelteKit Routing
- **src/stores**: Svelte Stores für Zustandsverwaltung
- **static**: Statische Assets (Bilder, Fonts) 

## Bestellvorgang

1. Auswahl einer Speise aus der Kategorie
2. Anpassung der Zutaten und Optionen im Editor
3. Hinzufügen zur Bestellung
4. Auswahl des Bestelltyps (vor Ort, Abholung, Lieferung)
5. Bei Bedarf: Eingabe von Kontaktdaten für Abholung/Lieferung
6. Abschluss der Bestellung und Druck des Bons

## Drucker-Integration

Die App kommuniziert mit einem lokalen Drucker-Server, der auf Port 3001 läuft. Dieser Server verarbeitet die Bestellungen und sendet sie an den angeschlossenen Kassendrucker über die ESC/POS Schnittstelle. Der Drucker-Server erzeugt:

- Kassenbons für jede Bestellung mit Speisedetails und Gesamtpreis
- Bei Lieferungen: Adresse, Kontaktdaten und Lieferhinweise
- Tagesabschlussberichte mit Gesamtumsatz und Verkaufsstatistiken

## Drucker-Server
Der Drucker-Server besteht aus folgenden Komponenten:

- **printer-server.js**: Express-Server, der Druckaufträge verarbeitet
- **orderCounter.js**: Verwaltet tagesaktuelle Bestellnummern
- **orderFileStorage.js**: Speichert Bestelldaten für Umsatzstatistiken

Der Server bietet folgende Endpunkte:

- `/order-number`: Gibt die aktuelle Bestellnummer zurück
- `/print`: Druckt eine Bestellung mit Details zu Speisen, Zutaten und Preis
- `/print-tagesumsatz`: Druckt eine Zusammenfassung des Tagesumsatzes
- `/print-tagesbericht`: Erstellt einen Bericht mit den beliebtesten Speisen des Tages

## Entwicklung

Die App verwendet ein modernes Build-System mit Vite und SvelteKit. SCSS wird für das Styling verwendet, mit einer zentralen Variablen-Datei für konsistentes Design.

```bash
# Entwicklungsserver mit Hot-Reloading starten
npm run dev

# Linting und Typüberprüfung durchführen
npm run check
```

## Firebase-Integration

Die App ist für die Integration mit Firebase vorbereitet, was aktuell jedoch nicht aktiviert ist. Für die Nutzung von Firebase müssen die entsprechenden Umgebungsvariablen in einer `.env`-Datei konfiguriert werden.

## Autoren

- Entwickelt für Herkules Grill

## Lizenz

Proprietär - Alle Rechte vorbehalten