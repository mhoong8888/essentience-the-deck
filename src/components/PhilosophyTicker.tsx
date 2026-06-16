"use client";

import { motion } from "framer-motion";
import { PHILOSOPHY_QUOTES } from "@/data/exercises";

/** A slow horizontal ticker of core philosophy quotes — the editorial heartbeat of a session. */
export function PhilosophyTicker() {
  const line = [...PHILOSOPHY_QUOTES, ...PHILOSOPHY_QUOTES];

  return (
    <div className="relative overflow-hidden border-y hairline py-3">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {line.map((quote, i) => (
          <span key={i} className="flex items-center gap-10 text-sm text-slate">
            <span className="font-display italic text-ink/70">{quote}</span>
            <span className="text-coral">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
