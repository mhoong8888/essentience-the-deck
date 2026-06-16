"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, Flag } from "lucide-react";
import type { DeckCard } from "@/types";
import { TIERS } from "@/data/exercises";
import { PhilosophyTicker } from "./PhilosophyTicker";
import { formatTarget, HomeButton, suitColor, suitGlyph } from "./shared";

const HAND_SIZE = 4;

/** Split the dealt deck into successive hands of four. */
function toHands(deck: DeckCard[]): DeckCard[][] {
  const hands: DeckCard[][] = [];
  for (let i = 0; i < deck.length; i += HAND_SIZE) {
    hands.push(deck.slice(i, i + HAND_SIZE));
  }
  return hands;
}

export function ActiveWorkout({
  deck,
  onFinish,
  onHome,
}: {
  deck: DeckCard[];
  onFinish: () => void;
  onHome: () => void;
}) {
  const hands = toHands(deck);
  const [handIndex, setHandIndex] = useState(0);
  const [revealed, setRevealed] = useState(0); // cards turned face-up in the current hand

  const hand = hands[handIndex];
  const allRevealed = revealed >= hand.length;
  const isLastHand = handIndex === hands.length - 1;
  const revealedTotal = handIndex * HAND_SIZE + revealed;
  const progress = (revealedTotal / deck.length) * 100;

  const advance = () => {
    if (!allRevealed) {
      setRevealed((r) => Math.min(r + 1, hand.length));
    } else if (isLastHand) {
      onFinish();
    } else {
      setHandIndex((i) => i + 1);
      setRevealed(0);
    }
  };

  const buttonLabel = !allRevealed
    ? revealed === 0
      ? "Reveal First Card"
      : "Reveal Next Card"
    : isLastHand
      ? "Complete Session"
      : "Next Hand";

  const ButtonIcon = !allRevealed ? Eye : isLastHand ? Flag : ArrowRight;

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top bar: progress */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <HomeButton onClick={onHome} />
            <span className="eyebrow hidden sm:inline">The Deck™ · Active</span>
          </div>
          <span className="font-display text-lg">
            Hand {handIndex + 1}
            <span className="text-slate"> / {hands.length}</span>
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="h-full rounded-full bg-coral"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </div>
        {/* Per-card tier pips across the whole deck */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {deck.map((c, i) => (
            <span
              key={c.id}
              className="h-1.5 flex-1 rounded-full transition-opacity"
              style={{
                background: TIERS[c.tier].color,
                opacity: i < revealedTotal ? 1 : 0.18,
                minWidth: 6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hand stage — four cards, revealed one at a time */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={handIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="grid w-full max-w-5xl grid-cols-4 gap-4"
          >
            {hand.map((card, i) => (
              <CardTile key={card.id} card={card} revealed={i < revealed} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Philosophy ticker */}
      <PhilosophyTicker />

      {/* Navigation */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-7">
        <span className="text-sm text-slate">
          {Math.min(revealed, hand.length)} / {hand.length} revealed
        </span>
        <motion.button
          onClick={advance}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-white transition-colors hover:bg-coral"
        >
          <span className="text-sm font-medium">{buttonLabel}</span>
          <ButtonIcon className="h-4 w-4" />
        </motion.button>
      </div>
    </main>
  );
}

function CardTile({ card, revealed }: { card: DeckCard; revealed: boolean }) {
  const tier = TIERS[card.tier];
  const color = suitColor(card.suit);

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        className="relative h-72 w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        {/* Face-down back */}
        <div
          className="card-back absolute inset-0 flex items-center justify-center rounded-[20px] border border-ink/10 shadow-[0_24px_60px_-32px_rgba(29,0,0,0.55)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-display text-4xl text-ink/30">E</span>
        </div>

        {/* Face-up content */}
        <div
          className="absolute inset-0 flex flex-col rounded-[20px] border border-ink/10 bg-white p-4 shadow-[0_24px_60px_-32px_rgba(29,0,0,0.55)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Top-left rank + suit, tier badge */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-center leading-none" style={{ color }}>
              <span className="font-display text-xl">{card.rank}</span>
              <span className="text-base">{suitGlyph(card.suit)}</span>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white"
              style={{ background: tier.color }}
            >
              {tier.label}
            </span>
          </div>

          {/* Centre: exercise + target */}
          <div className="flex flex-1 flex-col items-center justify-center px-1 text-center">
            <h3 className="font-display text-lg leading-tight">{card.exercise.name}</h3>
            <p
              className="mt-2 font-display text-4xl tabular-nums"
              style={{ color: tier.color }}
            >
              {formatTarget(card.target, card.measure)}
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate">
              {card.measure === "time" ? "Hold / Move" : "Reps"}
            </p>
            <p className="mt-2 text-[11px] italic leading-snug text-ink/70">
              {card.exercise.cue}
            </p>
          </div>

          {/* Bottom-right rank + suit, rotated like a traditional card */}
          <div className="flex justify-end">
            <div
              className="flex rotate-180 flex-col items-center leading-none"
              style={{ color }}
            >
              <span className="font-display text-xl">{card.rank}</span>
              <span className="text-base">{suitGlyph(card.suit)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
