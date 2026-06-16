"use client";

import { useState } from "react";
import { Auth } from "@/components/Auth";
import { Contact } from "@/components/Contact";
import { Dashboard } from "@/components/Dashboard";
import { ActiveWorkout } from "@/components/ActiveWorkout";
import { Summary } from "@/components/Summary";
import { buildDeck } from "@/data/exercises";
import type { DeckCard, SessionConfig } from "@/types";

type Phase = "config" | "active" | "summary";

export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [phase, setPhase] = useState<Phase>("config");
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [config, setConfig] = useState<SessionConfig | null>(null);

  const begin = (cfg: SessionConfig) => {
    setConfig(cfg);
    setDeck(buildDeck(cfg.deckSize));
    setPhase("active");
  };

  const restart = () => {
    setPhase("config");
    setDeck([]);
    setConfig(null);
  };

  if (!authed) {
    if (showContact) return <Contact onBack={() => setShowContact(false)} />;
    return (
      <Auth
        onAuthenticated={() => setAuthed(true)}
        onContact={() => setShowContact(true)}
      />
    );
  }

  if (phase === "active") {
    return <ActiveWorkout deck={deck} onFinish={() => setPhase("summary")} onHome={restart} />;
  }

  if (phase === "summary" && config) {
    return (
      <Summary
        deck={deck}
        environmentId={config.environmentId}
        onRestart={restart}
        onHome={restart}
      />
    );
  }

  return <Dashboard onBegin={begin} />;
}
