/**
 * Essentience design tokens — isolated source of truth.
 *
 * Reverse-engineered from the cosmetic design system of https://www.essentience.net/
 * (Kajabi storefront). Hex values were extracted directly from the live site's inline
 * styles. This file is the single place to adjust the palette; globals.css mirrors these
 * same values into Tailwind v4 `@theme` tokens for class-based usage.
 *
 * Type display font on the source site is the paid "Roslindale Display Narrow Light".
 * We substitute the free, variable, editorially-matched "Fraunces" and keep their exact
 * body font, "Inter".
 */

export const palette = {
  // Neutrals — warm, paper-like
  paper: "#f1ede4", // dominant page background (warm cream)
  sand: "#e5dece", // secondary surface / card faces / hairline borders
  white: "#ffffff",
  ink: "#1d0000", // primary text — warm near-black with a red undertone
  black: "#0a0a0a",

  // Accents
  coral: "#f27572", // primary accent + CTA
  coralLight: "#ff9280", // hover / highlight
  blue: "#5774b8", // secondary accent
  blueDeep: "#01308a", // rare deep accent
  sage: "#85a196", // tertiary / calm
  slate: "#7f8ea1", // muted supporting text
} as const;

/** Map a challenge tier to its signature colour, drawn from the Essentience palette. */
export const tierColor = {
  time: palette.blue, // Cards Ace–5 — cardio / flow
  strength: palette.coral, // Cards 6–10 — control / tension
  endurance: palette.sage, // Cards J/Q/K — fatigue resistance
} as const;

export const fonts = {
  display: "var(--font-display)", // Fraunces (editorial serif) → maps Roslindale
  body: "var(--font-body)", // Inter (exact match to source site)
} as const;

export const radius = {
  card: "18px",
  control: "9999px", // pill buttons, matching the site's rounded CTAs
} as const;

export type Palette = typeof palette;
export type TierKey = keyof typeof tierColor;
