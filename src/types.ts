/**
 * The Deck™ — core domain schemas.
 *
 * Deliberately minimal and modular so the finalized exercise library can be dropped in
 * by replacing the arrays in src/data/exercises.ts. No logic engine lives here yet — this
 * is the typed contract the UI shell renders against.
 */

export type TierKey = "time" | "strength" | "endurance";

export type MeasureType = "time" | "reps";

export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type Suit = "spades" | "hearts" | "diamonds" | "clubs";

/** One exercise in the master library. */
export interface Exercise {
  id: string;
  name: string;
  tier: TierKey;
  /** Categorical physical element, used for the post-workout breakdown (e.g. "Hinge"). */
  element: string;
  measure: MeasureType;
  /** Short coaching cue surfaced on the active card. */
  cue: string;
}

/** Presentation + classification metadata for a challenge tier. */
export interface TierMeta {
  key: TierKey;
  label: string;
  cardRange: string;
  focus: string;
  /** Signature colour, drawn from the Essentience palette. */
  color: string;
}

/** A fully-resolved card in a built deck. */
export interface DeckCard {
  id: string;
  rank: Rank;
  suit: Suit;
  tier: TierKey;
  exercise: Exercise;
  measure: MeasureType;
  /** Placeholder target — seconds for time tier, reps otherwise. Logic engine refines later. */
  target: number;
}

/** A physical training environment the user can configure. */
export interface TrainingEnvironment {
  id: string;
  label: string;
  description: string;
  /** lucide-react icon name, resolved at render time. */
  icon: string;
}

/** A selectable deck size preset. */
export interface DeckSizePreset {
  id: string;
  label: string;
  count: number;
  blurb: string;
}

export interface SessionConfig {
  environmentId: string;
  deckSize: number;
}
