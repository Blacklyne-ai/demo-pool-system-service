# Pool-System-Service — Schwimmbad & Meer (2026 Redesign)

Moderne Astro-5-Website für **Pool-System-Service**, Inning am Ammersee
(Inhaberin Jeannette Schierl). Ersetzt die alte statische Site
(pool-system-service.de) - Inhalte 1:1 belegt übernommen, Design komplett neu
im Editorial-Stil (Route66 / Aston-Niveau).

## Stack
- **Astro 5** (static, kein SSR/Adapter) · **Tailwind v3.4** (`@astrojs/tailwind`)
- `@lucide/astro` Icons · `@fontsource` (Manrope · Nunito Sans · Fraunces · Caveat · JetBrains Mono)
- Deploy: **Cloudflare Pages** (Preset Astro · Build `npm run build` · Output `dist`)

## Entwicklung
```bash
npm install
npm run dev      # http://localhost:4406  (siehe ~/.claude/launch.json)
npm run build    # → dist/
npm run preview
```

## Struktur
- `src/data/site.ts` — zentrale Geschäftsdaten (belegt, deutsch, Sie-Form)
- `src/data/services.ts` — Leistungen & Produkte (komplett von der alten Site belegt)
- `src/styles/global.css` — „Wasser & Stein"-Designsystem (`:root` = Single Source of Truth)
- `src/pages/` — Start, Leistungen, Kontakt, Impressum, Datenschutz, 404

## Brand-Gold (bleibt)
- Slogan **„Schwimmbad & Meer"** (Wortspiel Meer/mehr)
- **Dino-Maskottchen** (`public/dino.png`) — 1:1, in Header, Footer, Favicon, OG-Bild

## Doku
- `docs/STYLE-GUIDE.md` — pixel-/CSS-extrahierte Palette, Typografie, Motive
- `docs/JUDGEMENT_CALLS.md` — Entscheidungen & Operator-TODOs vor Live-Gang
