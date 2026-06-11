// ─────────────────────────────────────────────────────────────
// Pool-System-Service — zentrale Site-Konfiguration.
// Jede Angabe stammt von der alten Site (pool-system-service.de,
// ISO-8859-1, per iconv UTF-8-rekonstruiert) oder dem Briefing.
// Nichts erfunden. Deutsch durchgehend, Sie-Form. Telefon-Display
// verbatim alte Site. Siehe docs/JUDGEMENT_CALLS.md.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Pool-System-Service',
  slogan: 'Schwimmbad & Meer', // Wortspiel Meer/mehr — Marken-Gold, verbatim
  owner: 'Jeannette Schierl',
  leitsatz: 'Ihr kompetenter Partner rund um das Thema Schwimmbad.', // verbatim
  cta: 'Rufen Sie uns an, wir beraten Sie gerne vor Ort!', // verbatim (Typo „ab"→„an" korrigiert)
  description:
    'Pool-System-Service in Inning am Ammersee - Ihr kompetenter Partner rund um das Thema Schwimmbad. Seit 1991: Sanierung, Grundreinigung, Solartechnik, Wartung und Wasseranalytik. Persönliche Beratung vor Ort am Ammersee und im Fünfseenland.',
  url: 'https://demo-pool-system-service.pages.dev',

  // Telefon — Display verbatim alte Kontaktseite
  phoneMobile: '0171/47 55 811',
  phoneMobileIntl: '+491714755811',
  phoneLandline: '08143/9920969',
  phoneLandlineIntl: '+4981439920969',

  email: 'info@pool-system-service.de',

  // WhatsApp auf der Mobilnummer (graceful) — vom Betreiber zu bestätigen,
  // siehe JUDGEMENT_CALLS.md
  whatsappUrl: 'https://wa.me/491714755811',

  address: {
    street: 'Münchner Straße 51',
    postcode: '82266',
    city: 'Inning am Ammersee',
    region: 'Bayern',
    countryCode: 'DE',
  },
  regionNote: 'Ammersee · Fünfseenland · westlich von München',

  // Belegte Eckdaten (alte „Unternehmen"-Seite, verbatim)
  facts: {
    foundedYear: 1991,
    tuevSince: 2004,
    yearsLabel: 'über 30 Jahre', // 2026 − 1991 = 35, konservativ „über 30"
  },

  // Google — Place-ID (ftid) aus dem alten Maps-Embed, CID daraus berechnet
  googlePlaceId: '0x479c2c8a20c5c1b1:0xff0dcf3c585bc4d2',
  googleCid: '18378573512456258770',
  googleRating: '4,3', // ECHTE Google-Bewertung (verifiziert, Stand 06/2026). Keine Einzeltexte öffentlich → nicht erfunden.
  googleMapsEmbed:
    'https://www.google.com/maps?q=Pool-System-Service,+Münchner+Straße+51,+82266+Inning+am+Ammersee&z=15&output=embed',
  googleMapsUrl: 'https://www.google.com/maps?cid=18378573512456258770',
  googleReviewsUrl: 'https://www.google.com/maps?cid=18378573512456258770',
};

// ── Link-Helper ───────────────────────────────────────────────
export const telMobile = `tel:${site.phoneMobileIntl}`;
export const telLandline = `tel:${site.phoneLandlineIntl}`;
export const mailLink = `mailto:${site.email}`;
export const whatsappLink = site.whatsappUrl;

export function mailFor(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

export const nav: NavItem[] = [
  { href: '/', label: 'Start' },
  {
    href: '/leistungen',
    label: 'Leistungen',
    children: [
      { href: '/leistungen', label: 'Alle Leistungen' },
      { href: '/leistungen#sanierung', label: 'Sanierung' },
      { href: '/leistungen#grundreinigung', label: 'Grundreinigung' },
      { href: '/leistungen#solartechnik', label: 'Solartechnik' },
      { href: '/leistungen#technik', label: 'Filter & Technik' },
      { href: '/leistungen#roboter', label: 'Reinigungsroboter' },
    ],
  },
  { href: '/#ueber', label: 'Über uns' },
  { href: '/#region', label: 'Region' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const legalNav = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

// ── Hero-Trust-Strip (nur belegte/abgestimmte Begriffe) ───────
export const trustStrip = [
  'Seit 1991',
  'TÜV-geprüft',
  'Beratung vor Ort',
  'Ammersee & Fünfseenland',
];
