import {
  BedDouble,
  Building2,
  Dumbbell,
  House,
  Sparkles,
  Trees,
  type LucideIcon,
} from "lucide-react";
import type { Suit } from "@/types";

/**
 * Prefix a /public asset path with the deploy base path (set on GitHub Pages).
 * Keeps src strings working both locally (root) and on a project sub-path.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

const ENV_ICONS: Record<string, LucideIcon> = {
  House,
  BedDouble,
  Building2,
  Sparkles,
  Dumbbell,
  Trees,
};

export function EnvironmentIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ENV_ICONS[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.4} aria-hidden />;
}

const SUIT_GLYPH: Record<Suit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

export function suitGlyph(suit: Suit): string {
  return SUIT_GLYPH[suit];
}

/** Traditional playing-card colour: hearts & diamonds red, spades & clubs black. */
const SUIT_COLOR: Record<Suit, string> = {
  spades: "var(--ink)",
  clubs: "var(--ink)",
  hearts: "#c1121f",
  diamonds: "#c1121f",
};

export function suitColor(suit: Suit): string {
  return SUIT_COLOR[suit];
}

/** Persistent control to return to the start / configuration screen. */
export function HomeButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to start"
      className={`inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-3.5 py-2 text-xs font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink ${className ?? ""}`}
    >
      <House className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
      Home
    </button>
  );
}

/** "00:45" for time targets, "12 reps" for rep targets. */
export function formatTarget(target: number, measure: "time" | "reps"): string {
  if (measure === "reps") return `${target} reps`;
  const m = Math.floor(target / 60);
  const s = target % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
