# Style Guide — Pool-System-Service

**Schwimmbad & Meer** · Inning am Ammersee · Inhaberin Jeannette Schierl
Redesign 2026 (Astro 5 · Tailwind v3.4). Vorbild-Niveau: route66-hh.de · astonservicehamburg.de · auto-motorrad-freigang.de.

---

## Brand-Quellen (pixel-/CSS-extrahiert — nichts erfunden)

| Quelle | Befund |
|---|---|
| Dino `dino.png` (86×40, Pixel-Analyse) | Knall-Gelb `#FFF000`, schwarze Outline `#101010`, oliv-grüne Schattierung `#C0B040` — das Maskottchen-Gold |
| Alte Site `style/style.css` | `background-color: #9ed7dc` (Wasser-Aqua), Nav/Border `#7788aa` (Schiefer-Blau), `bg_water.jpg` |
| Fotos (5×) + `bg_water.jpg` | Türkis-Wasser, cremefarbenes Stein-Coping, grüner Garten, Ammersee-Stimmung |

**Charakter:** Wasser (Aqua/Türkis) trägt die Marke · Stein/Sand bringt Wärme · das Gelb des Dinos ist der Augenzwinkern-Akzent. Persönlich, bodenständig-bayerisch, Premium-Region Fünfseenland — aber nie abgehoben.

---

## Farbpalette (Single Source of Truth: `src/styles/global.css :root`, RGB-Triplets)

| Rolle | Hex | RGB | Herkunft / Einsatz |
|---|---|---|---|
| **Marine** (Ink/Dark) | `#092A31` | 9 42 49 | Dunkle Sektionen, Footer, CtaBand — aus tiefem Beckenwasser + `#7788aa` |
| Marine-deep | `#06201F`→`#05181C` | 5 24 28 | tiefste Ebene, Schlagschatten |
| Marine-soft | `#123E46` | 18 62 70 | Hover/Elevated auf Dark |
| **Aqua** (Primär-Akzent) | `#0DA5BC` | 13 165 188 | DAS Markensignal — Akzentwort, CTAs, Highlights, Hover. Aus Türkis-Wasser |
| Aqua-bright | `#40CFE0` | 64 207 224 | Glow/Schimmer-Spitze auf Dark |
| Aqua-deep | `#0B6E7C` | 11 110 124 | Aqua als **Text auf Hell** (AA ≥ 5:1) |
| **Sun** (Dino-Gelb) | `#F5C523` | 245 197 35 | Sparsam: Sterne (Gold), warme Funken, Dino-Bezug. Gezähmt aus `#FFF000` |
| Ink (Headline-Text) | `#0D292F` | 13 41 47 | Überschriften auf Hell (wärmer als Schwarz, wasser-getönt) |
| Muted (Body) | `#4A6066` | 74 96 102 | Fließtext auf Weiß (AA 6.5:1) |
| Muted-light | `#7A8E94` | 122 142 148 | Captions, Meta |
| Paper (Light-BG) | `#F4FAFB` | 244 250 251 | Haupt-Hellfläche — frisch, Wasser-Charakter (~80 % der Site) |
| Foam | `#E8F4F6` | 232 244 246 | zweite Hell-Ebene |
| Sand (warm) | `#EAE0CF` | 234 224 207 | warmer Neutral-Akzent aus Stein-Coping (Tags, vereinzelt) |
| Border | `#DBE8EA` | 219 232 234 | Aqua-getönte Haarlinien |
| Green | `#1FA968` | 31 169 104 | NUR WhatsApp + „nach Vereinbarung"-Status |

**Verteilung:** ~80 % Hell (Paper/Foam/Weiß). Dunkel (Marine) nur Foto-Showcase, CtaBand, Footer — wie die Vorbilder.

---

## Typografie (alte Site = System-Default `arial` → moderne Wahl, dokumentiert)

| Rolle | Schrift | Einsatz |
|---|---|---|
| Display / Headlines | **Manrope** 700–800 | H1–H3, Buttons, Nav — clean, modern, freundlich-geometrisch |
| Body | **Nunito Sans** 400–700 | Fließtext — warm, rund, gut lesbar (passt zu „persönlich") |
| Akzent-Serif italic | **Fraunces** italic | Akzentwort in Headlines (editorial, wie Aston „britische Klassiker") |
| Signatur | **Caveat** | Handschrift „Jeannette Schierl" — persönlicher Anker (wie Klaus @ Route66) |
| Mono | **JetBrains Mono** | Eyebrows, Trust-Strip-Labels, Kennzahlen |

Alle via `@fontsource` (nur `latin`-Subsets). Akzentwort-Idee Hero: **„Schwimmbad & _Meer_."** — „Meer" als Aqua-Fraunces-Italic (das Wortspiel Meer/mehr trägt).

---

## Motive & Komponenten
- **Wasser-Motive** statt Elektro-Gimmicks: Caustics-Schimmer, Wellen-/Ripple-Divider, Aqua-Glow am Horizont dunkler Sektionen.
- Floating Glass-Trust-Cards auf dem Hero-Foto · Trust-Strip mit `·`-Trennern · Light/Dark-Wechsel.
- **Dino**: 1:1 als Brand-Mark neben dem Wordmark (Header + Footer), im Favicon, dezent als Augenzwinkern. Nicht aufgeblasen, nicht versteckt.
- Lucide-Icons (keine Emojis): MessageCircle (Beratung), Wrench (Service/Wartung), Waves (Wasser/Pool), Sun (Solar), MapPin (vor Ort), Phone, Droplets (Wasseranalyse), Bot (Reiniger-Roboter), Filter (Filteranlagen).

## Hero-Asset
`bg_water.jpg` (1000×667, Türkiswasser + kleine Drachen-Statue — echoet den Dino) → upskaliert zu `hero-water-{768,1280,1920}.{jpg,webp}`, responsive srcset, preloaded. LCP-Ziel < 2.5 s.
