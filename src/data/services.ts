// ─────────────────────────────────────────────────────────────
// Leistungen & Produkte — komplett aus der alten Site belegt
// (features.html, f_*.html, products.html, p_*.html). Typos der
// Vorlage still korrigiert, Inhalt unverändert. Nichts erfunden.
// ─────────────────────────────────────────────────────────────

export interface Service {
  slug: string;
  name: string;
  icon: string;
  kind: 'leistung' | 'produkt';
  tagline: string;
  blurb: string;
  points?: string[]; // belegte Modelle/Details
  home?: boolean;    // erscheint im Homepage-Grid
}

export const services: Service[] = [
  {
    slug: 'beratung',
    name: 'Beratung vor Ort',
    icon: 'MessageCircle',
    kind: 'leistung',
    home: true,
    tagline: 'Persönlich, direkt, am Becken.',
    blurb:
      'Im Mittelpunkt steht die persönliche und intensive Beratung vor Ort. Wir unterstützen Sie, Ihren Badetraum zu planen, zu bauen oder zu pflegen - und helfen, Probleme zu erkennen und zu beseitigen.',
  },
  {
    slug: 'sanierung',
    name: 'Sanierung',
    icon: 'Recycle',
    kind: 'leistung',
    home: true,
    tagline: 'Geben Sie Ihrem Becken ein zweites Leben.',
    blurb:
      'Auch in die Jahre gekommene Becken lassen sich relativ einfach reaktivieren. Wir bringen passgenau eine neue Folie in Ihr bestehendes Becken ein. Durch hochwertige Schweißnähte geht kein Tropfen Wasser verloren - abschließend wird verfugt, und Sie haben praktisch ein neues Becken.',
  },
  {
    slug: 'grundreinigung',
    name: 'Grundreinigung',
    icon: 'Sparkles',
    kind: 'leistung',
    home: true,
    tagline: 'Damit Algen und Keime keine Chance haben.',
    blurb:
      'Jeder Pool muss gereinigt werden. Durch die regelmäßige Säuberung von Becken und Filteranlage bleibt die Wasserqualität hoch und der Badespaß gleichbleibend. Becken und Filter sollten mindestens einmal im Jahr einer Grundreinigung unterzogen werden.',
  },
  {
    slug: 'solartechnik',
    name: 'Solartechnik',
    icon: 'Sun',
    kind: 'leistung',
    home: true,
    tagline: 'Nutzen Sie die Kraft der Sonne.',
    blurb:
      'Mit einer Solarthermie-Anlage erwärmen Sie Ihren Pool mit kostenloser Sonnenenergie. Ein ausgeklügeltes System führt das Wasser über Solarkollektoren und wieder zurück ins Becken - auch das Nachrüsten einer bestehenden Anlage ist problemlos möglich.',
    points: ['Solaranlage', 'Solarabdeckung'],
  },
  {
    slug: 'filter',
    name: 'Filteranlagen',
    icon: 'Funnel',
    kind: 'produkt',
    home: true,
    tagline: 'Für dauerhaft kristallklares Wasser.',
    blurb:
      'Für eine gleichbleibend hohe Wasserqualität bieten wir Filteranlagen der Extraklasse - passend ausgelegt und fachgerecht für Sie eingebaut.',
  },
  {
    slug: 'roboter',
    name: 'Reinigungsroboter',
    icon: 'Bot',
    kind: 'produkt',
    home: true,
    tagline: 'Schluss mit Stangen und Bürsten.',
    blurb:
      'Reinigungsroboter säubern Ihr Schwimmbecken einfach und gründlich. Vorbei sind die Zeiten des mühsamen Hantierens mit langen Stangen. Wir beraten Sie umfassend zu den passenden Modellen.',
    points: ['Smart', 'Comfort', 'Deluxe', 'Liberty', 'S-BIO'],
  },
  {
    slug: 'technik',
    name: 'Mess- & Regeltechnik',
    icon: 'Gauge',
    kind: 'produkt',
    tagline: 'Steuern. Messen. Regeln. Dosieren.',
    blurb:
      'Automatische Systeme überprüfen und regulieren die Wasserqualität für Sie. Dosieranlagen kontrollieren täglich den pH-Wert und die Desinfektion und geben bei Bedarf exakt die richtige Menge zu - für jederzeit kristallklares Wasser, mit oder ohne Chlor.',
    points: ['Aquacontrol', 'Swim-Tec Clearline DOS'],
  },
  {
    slug: 'gegenstrom',
    name: 'Gegenstromanlagen',
    icon: 'Wind',
    kind: 'produkt',
    tagline: 'Sport oder Massage - Bewegung ins Wasser.',
    blurb:
      'Ein wenig Sport gefällig, oder darf es eine Massage sein? Mit einer Gegenstrom- bzw. Massageanlage kommt Bewegung in Ihr Wasser.',
    points: ['Bambo', 'Coco', 'Juno', 'Libra', 'Trevil'],
  },
];

export const homeServices = services.filter((s) => s.home);

// „Weiteres" — verbatim aus f_misc.html / p_misc.html
export const weitereLeistungen = ['Schwimmbadbau', 'Wartung', 'Wasseranalytik'];
export const weitereProdukte = [
  'Beleuchtung',
  'Schwimmbecken',
  'Abdeckungen',
  'Schwimmbadpflege',
  'Niveauregulierung',
  'Leitern + Treppen',
  'Hallen',
  'Zubehör',
];
