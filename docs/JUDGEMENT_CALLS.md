# Judgement Calls & Operator-TODOs — Pool-System-Service

Entscheidungen und offene Punkte aus dem Redesign. Alles Inhaltliche stammt belegt
von der alten Site (pool-system-service.de, ISO-8859-1 → per `iconv` UTF-8
rekonstruiert) oder dem Briefing. **Nichts erfunden.**

---

## Wichtige Erkenntnis: Die alte Site hatte VIEL mehr Content als erwartet
Das Briefing ging von einer Mini-Site (Home + Kontakt) aus. Tatsächlich existieren über
`script/nav.js` belegte Unterseiten mit echtem Inhalt: `about`, `features` + 4 Leistungs-
Unterseiten, `products` + 6 Produkt-Unterseiten, `contact`, `impressum`. Daraus ist eine
**inhaltlich ehrliche, volle Site** entstanden - ganz ohne Erfindungen.

## Operator-TODOs (vor Live-Gang mit Kundin klären)
| # | Thema | Status / Vorschlag |
|---|---|---|
| 1 | **Öffnungszeiten** | Auf alter Site nicht vorhanden → „Termine nach Vereinbarung" als Status. Falls feste Zeiten existieren: ergänzen. |
| 2 | **USt-IdNr / Steuernummer** | Im alten Impressum nicht gelistet. Einzelunternehmen - bei Umsatzsteuerpflicht USt-IdNr im Impressum ergänzen. |
| 3 | **WhatsApp** | Kontakt-Tile + Buttons verlinken `wa.me/491714755811` (die Mobilnummer). **Bitte bestätigen, dass diese Nummer WhatsApp nutzt** - sonst Button entfernen (Datei `src/data/site.ts`, `whatsappUrl`). |
| 4 | **Google-Bewertungen (live)** | Echte Reviews lassen sich nur über die **Google Places API (API-Key, kostenpflichtig)** einbetten. Ohne Key wurden **keine Reviews erfunden** - stattdessen verlinkt Abschnitt „Stimmen unserer Kunden" auf das echte Google-Profil. Operator: Places-API-Key liefern, dann Live-Section nachrüsten. |
| 5 | **Datenschutzerklärung** | DSGVO-Template (alte Site hatte keine). Vor Live-Gang juristisch prüfen lassen; Hosting-Provider (Cloudflare Pages) ggf. konkret benennen, Auftragsverarbeitung. |
| 6 | **Service-Radius** | Nicht exakt belegt → Region als „Ammersee · Fünfseenland · westlich von München" benannt, konkreter Radius offen gelassen („sprechen Sie uns an"). Bei Bedarf präzisieren. |
| 7 | **Credentials aktuell?** | Belegt aus alter Site: „Partner des Gesundheitsamts München", „Zusammenarbeit Institut Fresenius (Mikrobiologie)", „TÜV-geprüft seit 2004". Bitte bestätigen, dass diese noch aktuell sind. |
| 8 | **Produkt-Modellnamen** | Bambo/Coco/Juno/Libra/Trevil (Gegenstrom), Smart/Comfort/Deluxe/Liberty/S-BIO (Roboter), Swim-Tec Clearline DOS, Aquacontrol - alle von der alten Site übernommen. Falls Sortiment veraltet: aktualisieren. |

## Bewusste Korrekturen (dokumentiert)
- **Typo „Rufen Sie uns ab" → „Rufen Sie uns an"** (Briefing-Vorgabe, belegt auf contact.html).
- Stille Tippfehler-Korrekturen der Vorlage: `mehrjärige→mehrjährige`, `eimal→einmal`,
  `Solartermie→Solarthermie`, `vielzahl→Vielzahl`, „Meß.-→Mess-". Inhalt unverändert.
- „seit über 20 Jahren" (Stand 2017) → **„seit 1991" / „über 30 Jahre"** (aus belegtem Gründungsjahr abgeleitet, konservativ).

## Design-Entscheidungen
- **Kein Kontaktformular**: statische Astro-Site ohne Backend + bewährte Vorgabe → Kontakt
  über Telefon (2×), E-Mail, WhatsApp als Tiles. Kein toter Formular-Submit.
- **Logo**: Die alte Site hatte **kein Logo-File** (nur Text + Dino). Brand-Mark daher =
  Wortmarke „Pool-System-Service" (Manrope) **+ Original-Dino 1:1** (Header, Footer, Favicon,
  OG-Bild). Dino-Pixel: Knall-Gelb #FFF000 + schwarze Outline.
- **Farben** pixel-/CSS-extrahiert: Aqua/Türkis (Wasser, alte Site `#9ed7dc` + Fotos) trägt,
  Marine (tiefes Wasser + `#7788aa`) als Dark, Sand (Stein-Coping) Wärme, Sun (Dino-Gelb)
  Augenzwinkern. Details in `STYLE-GUIDE.md`.
- **Schriften**: alte Site nutzte System-`arial` → moderne Wahl Manrope + Nunito Sans +
  Fraunces Italic (Akzent) + Caveat (Signatur Jeannette Schierl).
- **Hero-Bild**: `bg_water.jpg` (1000×667, einziges großes Asset, enthält eine Drachen-Statue -
  echoet den Dino) hochskaliert zu responsivem Set. Die 5 Original-Fotos (≤480px) im Showcase
  bei moderater Größe; 2 Winter-Fotos ehrlich als „Ganzjährig" gelabelt (zeigen Schnee).
- **Interaktiv**: Foto-Showcase mit Pill-Filter (Alle/Garten/Ganzjährig) + Lightbox.

## Deploy
Cloudflare **Pages** · Framework-Preset Astro · Build `npm run build` · Output `dist` ·
kein SSR/Adapter. `site`-URL in `astro.config.mjs` ggf. auf finale Domain anpassen.
