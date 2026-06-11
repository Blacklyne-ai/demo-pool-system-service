// ─────────────────────────────────────────────────────────────
// Inhalte für die interaktiven Module. Alles auf belegte Leistungen
// abgebildet (services.ts) - nichts erfunden, nur erzählerisch geordnet.
// ─────────────────────────────────────────────────────────────

// „Ihr Pool durchs Jahr" — Saison-Explorer
export interface Season {
  id: string;
  label: string;
  icon: string;
  months: string;
  title: string;
  text: string;
  jobs: string[];
  links: { slug: string; label: string }[];
  image: string;     // /images/...
  imageWebp?: string;
  imageAlt: string;
  real?: boolean;    // echtes Kundenfoto (statt Stimmungsbild)
}

export const seasons: Season[] = [
  {
    id: 'fruehling',
    label: 'Frühjahr',
    icon: 'Sun',
    months: 'März - Mai',
    title: 'Startklar in die Saison.',
    text: 'Wir wecken Ihr Becken aus dem Winterschlaf: Inbetriebnahme, Technik-Check und - wenn nötig - eine Sanierung mit passgenauer neuer Folie. Damit der erste Sprung perfekt sitzt.',
    jobs: ['Inbetriebnahme & Technik-Check', 'Sanierung / neue Folie', 'Wasser einstellen'],
    links: [{ slug: 'sanierung', label: 'Sanierung' }, { slug: 'beratung', label: 'Beratung vor Ort' }],
    image: '/images/modern-pool.jpg',
    imageWebp: '/images/modern-pool.webp',
    imageAlt: 'Frisch in Betrieb genommenes Becken an einer modernen Villa',
  },
  {
    id: 'sommer',
    label: 'Sommer',
    icon: 'Sun',
    months: 'Juni - August',
    title: 'Genießen - wir kümmern uns.',
    text: 'Kristallklares Wasser auf Knopfdruck: Mess- und Regeltechnik dosiert pH-Wert und Desinfektion automatisch, Solartechnik hält es angenehm warm, die Gegenstromanlage bringt Bewegung ins Wasser.',
    jobs: ['Automatische Wasserpflege', 'Solar-Wärme nutzen', 'Gegenstrom & Massage'],
    links: [{ slug: 'technik', label: 'Mess- & Regeltechnik' }, { slug: 'solartechnik', label: 'Solartechnik' }],
    image: '/images/hero-pool.jpg',
    imageWebp: '/images/hero-pool.webp',
    imageAlt: 'Sonnendurchflutetes, türkisfarbenes Beckenwasser',
  },
  {
    id: 'herbst',
    label: 'Herbst',
    icon: 'Leaf',
    months: 'September - Oktober',
    title: 'Gepflegt in die Pause.',
    text: 'Bevor das Laub fällt: Grundreinigung von Becken und Filteranlage, damit Algen und Keime keine Chance haben - und Ihr Pool sauber in die kältere Jahreszeit geht.',
    jobs: ['Grundreinigung Becken & Filter', 'Filtertechnik prüfen', 'Wartung'],
    links: [{ slug: 'grundreinigung', label: 'Grundreinigung' }, { slug: 'filter', label: 'Filteranlagen' }],
    image: '/images/about-pool.jpg',
    imageWebp: '/images/about-pool.webp',
    imageAlt: 'Gepflegtes Becken an einer Villa im sanften Herbstlicht',
  },
  {
    id: 'winter',
    label: 'Winter',
    icon: 'Snowflake',
    months: 'November - Februar',
    title: 'Sicher durch den Winter.',
    text: 'Fachgerechte Einwinterung schützt Becken und Technik vor Frost. Und falls doch etwas ist: Wir sind ganzjährig für Sie da - auch wenn der Schnee liegt.',
    jobs: ['Fachgerechte Einwinterung', 'Frostschutz für Technik', 'Ganzjährig erreichbar'],
    links: [{ slug: 'beratung', label: 'Beratung vor Ort' }, { slug: 'technik', label: 'Technik' }],
    image: '/images/pool-4.jpg',
    imageWebp: '/images/pool-4.webp',
    imageAlt: 'Beleuchtetes Becken in winterlicher Nacht - ganzjähriger Service',
    real: true,
  },
];

// „Wobei dürfen wir helfen?" — Concierge / Problem → Lösung
export interface ConciergeItem {
  q: string;
  icon: string;
  answerTitle: string;
  answer: string;
  slug: string;       // Ziel-Service-Anker auf /leistungen
  cta: string;
}

export const concierge: ConciergeItem[] = [
  {
    q: 'Ich möchte ein neues Becken',
    icon: 'HardHat',
    answerTitle: 'Schwimmbadbau & Planung',
    answer: 'Wir planen und bauen mit Ihnen gemeinsam - von der ersten Idee bis zum fertigen Becken. Persönliche Beratung vor Ort inklusive.',
    slug: 'beratung',
    cta: 'Bauvorhaben besprechen',
  },
  {
    q: 'Mein Wasser ist trüb',
    icon: 'Droplets',
    answerTitle: 'Wasseranalyse & Regeltechnik',
    answer: 'Wir analysieren Ihr Wasser und bringen es mit der richtigen Filter- und Dosiertechnik zurück zu kristallklarer Qualität - mit oder ohne Chlor.',
    slug: 'technik',
    cta: 'Wasser klären lassen',
  },
  {
    q: 'Mein Becken ist in die Jahre gekommen',
    icon: 'Recycle',
    answerTitle: 'Sanierung',
    answer: 'Eine passgenaue neue Folie und saubere Schweißnähte - und Ihr altes Becken ist praktisch wie neu. Kein Tropfen geht verloren.',
    slug: 'sanierung',
    cta: 'Sanierung anfragen',
  },
  {
    q: 'Der Pool ist mir zu kalt',
    icon: 'Sun',
    answerTitle: 'Solartechnik',
    answer: 'Mit einer Solarthermie-Anlage erwärmen Sie Ihr Wasser mit kostenloser Sonnenenergie - auch als Nachrüstung problemlos möglich.',
    slug: 'solartechnik',
    cta: 'Solar-Wärme entdecken',
  },
  {
    q: 'Reinigen ist mir zu mühsam',
    icon: 'Bot',
    answerTitle: 'Reinigungsroboter',
    answer: 'Schluss mit Stangen und Bürsten: Ein Reinigungsroboter säubert Ihr Becken automatisch. Wir beraten Sie zum passenden Modell.',
    slug: 'roboter',
    cta: 'Roboter kennenlernen',
  },
  {
    q: 'Mein Pool braucht einen Frühjahrsputz',
    icon: 'Sparkles',
    answerTitle: 'Grundreinigung',
    answer: 'Einmal im Jahr richtig sauber: Wir reinigen Becken und Filteranlage gründlich, damit Algen und Keime keine Chance haben.',
    slug: 'grundreinigung',
    cta: 'Reinigung buchen',
  },
];
