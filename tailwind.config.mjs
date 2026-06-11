/** @type {import('tailwindcss').Config} */
// Pool-System-Service — Brand-Palette aus Pixel-/CSS-Analyse: Aqua/Türkis (Wasser,
// alte Site #9ed7dc + Fotos) trägt die Marke, Marine (tiefes Beckenwasser + #7788aa)
// als Dark, Sand (Stein-Coping) als Wärme, Sun (Dino-Gelb #FFF000, gezähmt) als
// Augenzwinkern-Akzent. Farben als RGB-Triplets — Single Source of Truth:
// src/styles/global.css :root.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--rgb-ink) / <alpha-value>)',
          soft: 'rgb(var(--rgb-ink-soft) / <alpha-value>)',
        },
        marine: {
          DEFAULT: 'rgb(var(--rgb-marine) / <alpha-value>)',
          deep: 'rgb(var(--rgb-marine-deep) / <alpha-value>)',
          soft: 'rgb(var(--rgb-marine-soft) / <alpha-value>)',
        },
        paper: 'rgb(var(--rgb-paper) / <alpha-value>)',
        foam: 'rgb(var(--rgb-foam) / <alpha-value>)',
        sand: 'rgb(var(--rgb-sand) / <alpha-value>)',
        muted: {
          DEFAULT: 'rgb(var(--rgb-muted) / <alpha-value>)',
          light: 'rgb(var(--rgb-muted-light) / <alpha-value>)',
        },
        line: 'rgb(var(--rgb-border) / <alpha-value>)',
        aqua: {
          DEFAULT: 'rgb(var(--rgb-aqua) / <alpha-value>)',
          bright: 'rgb(var(--rgb-aqua-bright) / <alpha-value>)',
          deep: 'rgb(var(--rgb-aqua-deep) / <alpha-value>)',
        },
        sun: 'rgb(var(--rgb-sun) / <alpha-value>)',
        green: 'rgb(var(--rgb-green) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', '"Nunito Sans"', 'system-ui', 'sans-serif'],
        serifit: ['Fraunces', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'monospace'],
      },
      borderRadius: { pill: '999px' },
      maxWidth: { '8xl': '88rem' },
    },
  },
  plugins: [],
};
