# Ausgaben Tracker 💰

Persönliche Ausgaben-App als Progressive Web App (PWA) – optimiert für iPhone und Android.

## Features

- **Ausgaben erfassen** – Betrag, Beschreibung, Kategorie, Person, Datum & Notiz
- **Kategorien** – frei anpassbar mit eigener Farbe
- **Personen** – mehrere Nutzer (z.B. Haushaltsmitglieder) pflegbar
- **Budget-Limits** – monatliche Limits pro Kategorie mit Warnungen bei 80% und 100%
- **Monats- & Jahresübersicht** – Metriken auf einen Blick
- **Diagramme** – Ausgaben nach Kategorie (Donut), Monatsverlauf (gestapelter Balken), Ausgaben nach Person
- **Dark Mode** – automatisch nach System-Einstellung
- **Offline-fähig** – Service Worker cached alle Assets
- **Datenspeicherung** – dauerhaft im localStorage des Geräts

## Installation auf iPhone (Safari)

1. Seite in **Safari** öffnen (z.B. via GitHub Pages)
2. Tippe auf das **Teilen-Symbol** (Quadrat mit Pfeil)
3. Wähle **„Zum Home-Bildschirm"**
4. Namen bestätigen → **Hinzufügen**

Die App erscheint dann als eigenes Icon auf dem Home-Bildschirm und läuft vollbildschirmig ohne Browser-Leiste.

## Deployment via GitHub Pages

1. Dieses Repository auf GitHub hochladen
2. Unter **Settings → Pages** → Source: `main` Branch, Root `/`
3. Die App ist erreichbar unter `https://<dein-username>.github.io/<repo-name>/`

## Lokale Nutzung

Die `index.html` kann direkt im Browser geöffnet werden. Für den Service Worker (Offline-Support) wird ein lokaler Webserver benötigt:

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .
```

Dann im Browser: `http://localhost:8080`

## Dateistruktur

```
ausgaben-app/
├── index.html       # Haupt-App (HTML + CSS + JS, alles in einer Datei)
├── manifest.json    # PWA Web App Manifest
├── sw.js            # Service Worker (Offline-Cache)
├── icons/
│   ├── icon.svg     # Quell-Icon
│   ├── icon-192.png # App-Icon 192×192
│   └── icon-512.png # App-Icon 512×512
└── README.md
```

## Technologien

- Vanilla HTML/CSS/JavaScript – keine Frameworks, keine Build-Tools
- [Chart.js](https://www.chartjs.org/) – Diagramme
- [Tabler Icons](https://tabler.io/icons) – Icon-Font
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) – Schriftart
- Service Worker API – Offline-Support
- localStorage – Datenpersistenz
