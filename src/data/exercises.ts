/**
 * The Deck™ — master library + configuration data.
 *
 * MODULARITY CONTRACT: to swap in the client's finalized library, replace `EXERCISE_LIBRARY`
 * below (and only that). Everything else — deck building, tier mapping, the entire UI — reads
 * from it generically. Each exercise just needs a `tier` so it lands in the right card range.
 *
 * v3 — a FULL 52-CARD PACK. One exercise per card: 20 Time (Ace–5 × 4 suits),
 *   20 Strength (6–10 × 4 suits), 12 Endurance (Jack–King × 4 suits). Each exercise stores the
 *   primary quality it develops in `element` (drawn from the client's own "these develop" lists),
 *   so the summary breaks down by quality trained while `tier` assigns it to a card range.
 * Exercises expand the client's official movement categories (Hanging, Crawling, Pressing,
 *   Lunging, Pull Ups, etc.) into specific variations. The variations, cues, and quality mappings
 *   are a PROPOSAL pending client review — swap names/cues freely without touching the UI.
 */

import type {
  DeckCard,
  DeckSizePreset,
  Exercise,
  Rank,
  Suit,
  TierKey,
  TierMeta,
  TrainingEnvironment,
} from "@/types";
import { palette } from "@/styles/theme";

/* ----------------------------------------------------------------------------------------- */
/* Tiers                                                                                       */
/* ----------------------------------------------------------------------------------------- */

export const TIERS: Record<TierKey, TierMeta> = {
  time: {
    key: "time",
    label: "Time",
    cardRange: "Ace – 5",
    focus: "Cardio · coordination · flow",
    color: palette.blue,
  },
  strength: {
    key: "strength",
    label: "Strength",
    cardRange: "6 – 10",
    focus: "Strength · stability · control",
    color: palette.coral,
  },
  endurance: {
    key: "endurance",
    label: "Endurance",
    cardRange: "Jack – King",
    focus: "Fatigue resistance · grit",
    color: palette.sage,
  },
};

/** Maps a card rank to its challenge tier — the spine of the Deck philosophy. */
export function tierForRank(rank: Rank): TierKey {
  if (["A", "2", "3", "4", "5"].includes(rank)) return "time";
  if (["6", "7", "8", "9", "10"].includes(rank)) return "strength";
  return "endurance";
}

/* ----------------------------------------------------------------------------------------- */
/* Master exercise library (PLACEHOLDER — replace wholesale with finalized list)               */
/* ----------------------------------------------------------------------------------------- */

export const EXERCISE_LIBRARY: Exercise[] = [
  // TIME — Ace–5 (20 cards) · cardio, movement quality & coordination · measured in seconds
  { id: "dead-hang", name: "Dead Hang", tier: "time", element: "Recovery capacity", measure: "time", cue: "Let the spine decompress. Breathe into the hang." },
  { id: "active-hang", name: "Active Hang", tier: "time", element: "Coordination", measure: "time", cue: "Pull the shoulders down. Own the bar." },
  { id: "scap-pull-hang", name: "Scapular Pull Hang", tier: "time", element: "Movement quality", measure: "time", cue: "Glide the shoulder blades. Small and controlled." },
  { id: "bear-crawl", name: "Bear Crawl", tier: "time", element: "Coordination", measure: "time", cue: "Knees an inch off the floor. Quiet hands." },
  { id: "crab-crawl", name: "Crab Crawl", tier: "time", element: "Coordination", measure: "time", cue: "Hips high. Travel without collapsing." },
  { id: "lateral-crawl", name: "Lateral Crawl", tier: "time", element: "Movement quality", measure: "time", cue: "Stay low. Lead with the hip." },
  { id: "shadow-jab-cross", name: "Shadow Boxing — Jab & Cross", tier: "time", element: "Cardiovascular fitness", measure: "time", cue: "Light feet. Exhale on every strike." },
  { id: "shadow-hooks", name: "Shadow Boxing — Hooks", tier: "time", element: "Cardiovascular fitness", measure: "time", cue: "Rotate the hips. Keep the guard up." },
  { id: "slip-roll-flow", name: "Slip & Roll Flow", tier: "time", element: "Emotional regulation", measure: "time", cue: "Breathe, slip, reset. Stay loose." },
  { id: "inchworm-walkout", name: "Inchworm Walkout", tier: "time", element: "Movement quality", measure: "time", cue: "Walk the hands out. Brace the midline." },
  { id: "spiderman-flow", name: "Spiderman Lunge Flow", tier: "time", element: "Movement quality", measure: "time", cue: "Step wide, open the hip, flow back." },
  { id: "sun-salutation", name: "Sun Salutation Flow", tier: "time", element: "Emotional regulation", measure: "time", cue: "Move with the breath. No rush." },
  { id: "cossack-flow", name: "Cossack Flow", tier: "time", element: "Movement quality", measure: "time", cue: "Shift side to side. Sink and float." },
  { id: "greatest-stretch", name: "World's Greatest Stretch", tier: "time", element: "Recovery capacity", measure: "time", cue: "Open the chest. Reach to the sky." },
  { id: "farmer-carry", name: "Farmer Carry", tier: "time", element: "Recovery capacity", measure: "time", cue: "Tall posture, slow steps. Own the load." },
  { id: "front-rack-carry", name: "Front-Rack Carry", tier: "time", element: "Recovery capacity", measure: "time", cue: "Elbows high, ribs down. Walk tall." },
  { id: "overhead-carry", name: "Overhead Carry", tier: "time", element: "Coordination", measure: "time", cue: "Lock the arms out. Stack the joints." },
  { id: "suitcase-carry", name: "Suitcase Carry", tier: "time", element: "Recovery capacity", measure: "time", cue: "Resist the lean. Stay square." },
  { id: "mountain-climbers", name: "Mountain Climbers", tier: "time", element: "Cardiovascular fitness", measure: "time", cue: "Drive the knees. Keep the hips level." },
  { id: "high-knees", name: "High-Knee Locomotion", tier: "time", element: "Cardiovascular fitness", measure: "time", cue: "Quick feet. Stay light and tall." },

  // STRENGTH — 6–10 (20 cards) · strength, stability & control · measured in reps
  { id: "push-up", name: "Push-Up", tier: "strength", element: "Strength", measure: "reps", cue: "One straight line. Lock the ribcage." },
  { id: "pike-push-up", name: "Pike Push-Up", tier: "strength", element: "Strength", measure: "reps", cue: "Hips high. Crown toward the floor." },
  { id: "decline-push-up", name: "Decline Push-Up", tier: "strength", element: "Strength", measure: "reps", cue: "Feet elevated. Control the descent." },
  { id: "pseudo-planche", name: "Pseudo-Planche Push-Up", tier: "strength", element: "Control", measure: "reps", cue: "Hands by the hips. Lean forward." },
  { id: "forward-lunge", name: "Forward Lunge", tier: "strength", element: "Stability", measure: "reps", cue: "Vertical shin. Soft knee kiss." },
  { id: "reverse-lunge", name: "Reverse Lunge", tier: "strength", element: "Stability", measure: "reps", cue: "Step back long. Drive the front heel." },
  { id: "walking-lunge", name: "Walking Lunge", tier: "strength", element: "Stability", measure: "reps", cue: "Travel tall. Control each step." },
  { id: "curtsy-lunge", name: "Curtsy Lunge", tier: "strength", element: "Stability", measure: "reps", cue: "Cross behind. Keep the hips square." },
  { id: "air-squat", name: "Air Squat", tier: "strength", element: "Strength", measure: "reps", cue: "Sit between the hips. Drive the floor away." },
  { id: "sumo-squat", name: "Sumo Squat", tier: "strength", element: "Strength", measure: "reps", cue: "Wide stance. Knees track the toes." },
  { id: "bulgarian-split", name: "Bulgarian Split Squat", tier: "strength", element: "Control", measure: "reps", cue: "Rear foot up. Sink straight down." },
  { id: "cossack-squat", name: "Cossack Squat", tier: "strength", element: "Control", measure: "reps", cue: "Sink to one side. Keep the heel down." },
  { id: "single-leg-rdl", name: "Single-Leg RDL", tier: "strength", element: "Control", measure: "reps", cue: "Hinge tall. Reach the heel back." },
  { id: "glute-bridge", name: "Glute Bridge", tier: "strength", element: "Strength", measure: "reps", cue: "Squeeze the glutes. Ribs down." },
  { id: "sl-glute-bridge", name: "Single-Leg Glute Bridge", tier: "strength", element: "Control", measure: "reps", cue: "Drive one heel. Keep the hips level." },
  { id: "good-morning", name: "Good Morning", tier: "strength", element: "Control", measure: "reps", cue: "Hips back, flat spine. Feel the hamstrings." },
  { id: "russian-twist", name: "Russian Twist", tier: "strength", element: "Stability", measure: "reps", cue: "Rotate from the trunk. Stay tall." },
  { id: "windmill", name: "Windmill", tier: "strength", element: "Stability", measure: "reps", cue: "Eyes on the top hand. Hinge to the floor." },
  { id: "rotational-chop", name: "Rotational Chop", tier: "strength", element: "Control", measure: "reps", cue: "Drive across the body. Brace the core." },
  { id: "thread-the-needle", name: "Thread-the-Needle", tier: "strength", element: "Stability", measure: "reps", cue: "Reach under and through. Control the rotation." },

  // ENDURANCE — Jack–King (12 cards) · fatigue resistance & mental toughness · measured in reps
  { id: "pull-ups", name: "Pull-Ups", tier: "endurance", element: "Fatigue resistance", measure: "reps", cue: "Full hang to chin. Control every descent." },
  { id: "chin-ups", name: "Chin-Ups", tier: "endurance", element: "Fatigue resistance", measure: "reps", cue: "Palms toward you. Pull the elbows down." },
  { id: "wide-pull-ups", name: "Wide-Grip Pull-Ups", tier: "endurance", element: "Fatigue resistance", measure: "reps", cue: "Wide hands. Lead with the chest." },
  { id: "commando-pull-ups", name: "Commando Pull-Ups", tier: "endurance", element: "Mental toughness", measure: "reps", cue: "Pull side to side. Stay composed." },
  { id: "goblet-squats", name: "Goblet Squats", tier: "endurance", element: "Muscular endurance", measure: "reps", cue: "Elbows inside the knees. Chest proud." },
  { id: "tempo-goblet", name: "Tempo Goblet Squats", tier: "endurance", element: "Mental toughness", measure: "reps", cue: "Three counts down. Own the burn." },
  { id: "goblet-pulses", name: "Goblet Squat Pulses", tier: "endurance", element: "Muscular endurance", measure: "reps", cue: "Stay low. Small, relentless pulses." },
  { id: "pause-goblet", name: "Pause Goblet Squats", tier: "endurance", element: "Mental toughness", measure: "reps", cue: "Hold the bottom. Breathe through it." },
  { id: "push-ups", name: "Push-Ups", tier: "endurance", element: "Muscular endurance", measure: "reps", cue: "One straight line. Find calm in the burn." },
  { id: "diamond-push-ups", name: "Diamond Push-Ups", tier: "endurance", element: "Muscular endurance", measure: "reps", cue: "Hands together. Elbows tight." },
  { id: "wide-push-ups", name: "Wide Push-Ups", tier: "endurance", element: "Muscular endurance", measure: "reps", cue: "Hands wide. Chest to the floor." },
  { id: "tempo-push-ups", name: "Tempo Push-Ups", tier: "endurance", element: "Mental toughness", measure: "reps", cue: "Lower slow. Stay in control." },
];

/* ----------------------------------------------------------------------------------------- */
/* Configuration data                                                                          */
/* ----------------------------------------------------------------------------------------- */

export const ENVIRONMENTS: TrainingEnvironment[] = [
  { id: "home", label: "Home", description: "Minimal space, bodyweight-first.", icon: "House" },
  { id: "hotel", label: "Hotel", description: "Travel-ready, quiet and compact.", icon: "BedDouble" },
  { id: "corporate", label: "Corporate Wellness", description: "Office-floor sessions, low-sweat options.", icon: "Building2" },
  { id: "boutique", label: "Boutique Studio", description: "Curated equipment, small-group flow.", icon: "Sparkles" },
  { id: "commercial", label: "Commercial Gym", description: "Full rack of tools at your disposal.", icon: "Dumbbell" },
  { id: "outdoor", label: "Outdoor Training", description: "Open ground, bars and the elements.", icon: "Trees" },
];

export const DECK_SIZES: DeckSizePreset[] = [
  { id: "primer", label: "Primer", count: 4, blurb: "A single hand of four to arrive and warm up." },
  { id: "session", label: "Session", count: 12, blurb: "Three hands. The standard practice, balanced across tiers." },
  { id: "full", label: "Full Pack", count: 52, blurb: "All thirteen hands — a complete pass through the deck." },
];

export const PHILOSOPHY_QUOTES: string[] = [
  "Presence under uncertainty",
  "Emotional regulation",
  "Train the draw you are dealt",
  "Composure is a skill, not a trait",
  "Meet the unknown with intent",
];

/* ----------------------------------------------------------------------------------------- */
/* Deck building — a real 52-card pack, one fixed exercise per card                            */
/* ----------------------------------------------------------------------------------------- */

const RANK_VALUE: Record<Rank, number> = {
  A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13,
};

const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

/** Placeholder target: seconds for time-tier, reps otherwise. Scales gently with rank. */
function targetFor(rank: Rank, measure: "time" | "reps"): number {
  const v = RANK_VALUE[rank];
  return measure === "time" ? 20 + v * 8 : Math.max(5, v * 2);
}

/**
 * The canonical 52-card pack. Each card (rank × suit) gets one fixed exercise: the library is
 * walked tier by tier so the 20 Time cards take the 20 Time exercises, etc. — a stable 1:1 map.
 */
export function fullPack(): DeckCard[] {
  const byTier: Record<TierKey, Exercise[]> = { time: [], strength: [], endurance: [] };
  for (const ex of EXERCISE_LIBRARY) byTier[ex.tier].push(ex);

  const counters: Record<TierKey, number> = { time: 0, strength: 0, endurance: 0 };
  const cards: DeckCard[] = [];
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      const tier = tierForRank(rank);
      const pool = byTier[tier];
      const exercise = pool[counters[tier]++ % pool.length];
      cards.push({
        id: `${rank}-${suit}`,
        rank,
        suit,
        tier,
        exercise,
        measure: exercise.measure,
        target: targetFor(rank, exercise.measure),
      });
    }
  }
  return cards;
}

/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Shuffle the full pack and deal the requested number of unique cards (no repeats). */
export function buildDeck(size: number): DeckCard[] {
  return shuffle(fullPack()).slice(0, size);
}
