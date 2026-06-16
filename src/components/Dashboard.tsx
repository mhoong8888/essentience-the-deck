"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { DECK_SIZES, ENVIRONMENTS, TIERS } from "@/data/exercises";
import type { SessionConfig } from "@/types";
import { assetPath, EnvironmentIcon } from "./shared";

export function Dashboard({ onBegin }: { onBegin: (config: SessionConfig) => void }) {
  const [environmentId, setEnvironmentId] = useState<string>("home");
  const [deckSize, setDeckSize] = useState<number>(12);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
      {/* Masthead */}
      <header className="mb-16 text-center">
        <Image
          src={assetPath("/essentience-logo.png")}
          alt="Essentience"
          width={202}
          height={22}
          priority
          className="mx-auto mb-9 h-5 w-auto opacity-85"
        />
        <p className="eyebrow mb-5">Human Performance · The Protocol</p>
        <h1 className="font-display text-6xl leading-[0.95] md:text-8xl">
          The Deck<span className="align-super text-2xl text-coral">™</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate">
          Train the draw you are dealt. Configure your environment, choose your deck, and
          meet each card with presence.
        </p>
      </header>

      {/* Environment selection */}
      <section className="mb-14">
        <div className="mb-6 flex items-baseline justify-between border-b hairline pb-3">
          <h2 className="font-display text-2xl">Training Environment</h2>
          <span className="eyebrow">Step 01</span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {ENVIRONMENTS.map((env) => {
            const active = env.id === environmentId;
            return (
              <motion.button
                key={env.id}
                onClick={() => setEnvironmentId(env.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`group relative overflow-hidden rounded-[var(--radius-card)] border p-5 text-left transition-colors ${
                  active
                    ? "border-coral bg-white shadow-[0_12px_40px_-18px_rgba(242,117,114,0.6)]"
                    : "hairline bg-white/40 hover:bg-white/70"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <EnvironmentIcon
                    name={env.icon}
                    className={`h-7 w-7 ${active ? "text-coral" : "text-ink/70"}`}
                  />
                  {active && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="font-medium">{env.label}</p>
                <p className="mt-1 text-sm leading-snug text-slate">{env.description}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Deck size selection */}
      <section className="mb-14">
        <div className="mb-6 flex items-baseline justify-between border-b hairline pb-3">
          <h2 className="font-display text-2xl">Deck Size</h2>
          <span className="eyebrow">Step 02</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {DECK_SIZES.map((d) => {
            const active = d.count === deckSize;
            return (
              <motion.button
                key={d.id}
                onClick={() => setDeckSize(d.count)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`rounded-[var(--radius-card)] border p-6 text-left transition-colors ${
                  active ? "border-coral bg-white" : "hairline bg-white/40 hover:bg-white/70"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xl">{d.label}</span>
                  <span className="font-display text-4xl text-coral">{d.count}</span>
                </div>
                <p className="mt-2 text-sm leading-snug text-slate">{d.blurb}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Face-down deck preview */}
      <section className="mb-14">
        <div className="mb-8 flex items-baseline justify-between border-b hairline pb-3">
          <h2 className="font-display text-2xl">Your Deck Awaits</h2>
          <span className="eyebrow">Face Down</span>
        </div>
        <FaceDownDeck />
        <div className="mt-7 flex flex-wrap justify-center gap-6">
          {Object.values(TIERS).map((t) => (
            <div key={t.key} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
              <span className="font-medium">{t.label}</span>
              <span className="text-slate">{t.cardRange}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Begin */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => onBegin({ environmentId, deckSize })}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-white transition-colors hover:bg-coral"
        >
          <span className="text-sm font-medium tracking-wide">Begin the Draw</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </main>
  );
}

function FaceDownDeck() {
  const cards = Array.from({ length: 7 });
  return (
    <div className="flex h-52 items-center justify-center">
      <div className="relative h-44 w-32">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18, rotate: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: (i - cards.length / 2) * 5,
              x: (i - cards.length / 2) * 10,
            }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 220, damping: 22 }}
            className="card-back absolute inset-0 rounded-[var(--radius-card)] border border-ink/10 shadow-[0_18px_50px_-24px_rgba(29,0,0,0.55)]"
            style={{ zIndex: i }}
          >
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-3xl text-ink/30">E</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
