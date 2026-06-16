"use client";

import { motion } from "framer-motion";
import { Camera, RotateCcw, Send, Share2 } from "lucide-react";
import type { DeckCard, TierKey } from "@/types";
import { ENVIRONMENTS, TIERS } from "@/data/exercises";
import { formatTarget, HomeButton } from "./shared";

export function Summary({
  deck,
  environmentId,
  onRestart,
  onHome,
}: {
  deck: DeckCard[];
  environmentId: string;
  onRestart: () => void;
  onHome: () => void;
}) {
  const env = ENVIRONMENTS.find((e) => e.id === environmentId);

  const totalSeconds = deck
    .filter((c) => c.measure === "time")
    .reduce((sum, c) => sum + c.target, 0);
  const totalReps = deck
    .filter((c) => c.measure === "reps")
    .reduce((sum, c) => sum + c.target, 0);

  const byTier = (Object.keys(TIERS) as TierKey[]).map((key) => ({
    meta: TIERS[key],
    count: deck.filter((c) => c.tier === key).length,
  }));

  // Categorical breakdown of the qualities each drawn card develops.
  const elementCounts = deck.reduce<Record<string, number>>((acc, c) => {
    acc[c.exercise.element] = (acc[c.exercise.element] ?? 0) + 1;
    return acc;
  }, {});
  const elements = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
  const maxElement = Math.max(...elements.map(([, n]) => n), 1);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-6 flex justify-start">
        <HomeButton onClick={onHome} />
      </div>
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="eyebrow mb-4">Session Complete</p>
        <h1 className="font-display text-6xl leading-none md:text-7xl">Deck Cleared</h1>
        <p className="mt-5 text-slate">
          {env ? `${env.label} · ` : ""}
          {deck.length} cards met with presence.
        </p>
      </motion.header>

      {/* Headline stats */}
      <div className="mb-10 grid grid-cols-3 gap-3">
        <Stat label="Cards" value={`${deck.length}`} />
        <Stat label="Time Under Tension" value={formatTarget(totalSeconds, "time")} />
        <Stat label="Total Reps" value={`${totalReps}`} />
      </div>

      {/* Tier breakdown */}
      <section className="mb-10">
        <h2 className="mb-5 border-b hairline pb-3 font-display text-2xl">Challenge Tiers</h2>
        <div className="grid grid-cols-3 gap-3">
          {byTier.map(({ meta, count }) => (
            <div
              key={meta.key}
              className="rounded-[var(--radius-card)] border hairline bg-white/50 p-5 text-center"
            >
              <span className="font-display text-4xl" style={{ color: meta.color }}>
                {count}
              </span>
              <p className="mt-1 text-sm font-medium">{meta.label}</p>
              <p className="text-xs text-slate">{meta.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Elemental breakdown */}
      <section className="mb-12">
        <h2 className="mb-5 border-b hairline pb-3 font-display text-2xl">Qualities Developed</h2>
        <div className="space-y-3">
          {elements.map(([name, n], i) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-40 shrink-0 text-sm">{name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full rounded-full bg-coral"
                  initial={{ width: 0 }}
                  animate={{ width: `${(n / maxElement) * 100}%` }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <span className="w-6 text-right text-sm tabular-nums text-slate">{n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Share block */}
      <section className="rounded-[var(--radius-card)] border border-coral/40 bg-white p-7 text-center">
        <Share2 className="mx-auto mb-3 h-6 w-6 text-coral" strokeWidth={1.5} />
        <p className="font-display text-2xl">Share your draw</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
          Presence under uncertainty. Carry the practice beyond the deck.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <ShareButton icon={<Camera className="h-4 w-4" />} label="Instagram" />
          <ShareButton icon={<Send className="h-4 w-4" />} label="X / Twitter" />
        </div>
      </section>

      <div className="mt-10 flex justify-center">
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-ink px-7 py-3.5 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          New Draw
        </motion.button>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border hairline bg-white/50 p-5 text-center">
      <p className="font-display text-3xl tabular-nums md:text-4xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-slate">{label}</p>
    </div>
  );
}

function ShareButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-coral hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}
