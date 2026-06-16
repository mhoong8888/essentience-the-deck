"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { assetPath } from "./shared";

type Mode = "signin" | "signup";

export function Auth({
  onAuthenticated,
  onContact,
}: {
  onAuthenticated: () => void;
  onContact: () => void;
}) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup && name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError(null);
    // Demo gate: no backend yet — any valid-looking entry enters the deck.
    onAuthenticated();
  };

  const toggleMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError(null);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="w-full max-w-md"
      >
        {/* Masthead */}
        <div className="mb-10 text-center">
          <Image
            src={assetPath("/essentience-logo.png")}
            alt="Essentience"
            width={202}
            height={22}
            priority
            className="mx-auto mb-8 h-[3.75rem] w-auto opacity-85"
          />
          <p className="eyebrow mb-4">Human Performance · The Protocol</p>
          <h1 className="font-display text-5xl leading-[0.95]">
            {isSignup ? "Join The Deck" : "Welcome Back"}
            {isSignup && <span className="align-super text-lg text-coral">™</span>}
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-slate">
            {isSignup
              ? "Create your account to train the draw you are dealt."
              : "Sign in to return to your practice."}
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={submit}
          className="rounded-[var(--radius-card)] border hairline bg-white/70 p-7 shadow-[0_30px_80px_-50px_rgba(29,0,0,0.5)]"
        >
          {isSignup && (
            <Field
              icon={<User className="h-4 w-4" />}
              label="Name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={setName}
            />
          )}

          <Field
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />

          <div className="mb-2">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-ink/40">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder={isSignup ? "At least 6 characters" : "Your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border hairline bg-paper px-11 py-3 text-sm outline-none transition-colors focus:border-coral"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 text-ink/40 transition-colors hover:text-ink"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isSignup && (
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-slate transition-colors hover:text-coral"
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <p className="mt-3 text-center text-xs font-medium text-coral">{error}</p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-white transition-colors hover:bg-coral"
          >
            <span className="text-sm font-medium tracking-wide">
              {isSignup ? "Create Account" : "Enter The Deck"}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </form>

        {/* Mode toggle */}
        <p className="mt-7 text-center text-sm text-slate">
          {isSignup ? "Already have an account?" : "New to The Deck™?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="font-medium text-ink underline-offset-4 transition-colors hover:text-coral hover:underline"
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>

        <p className="mt-4 text-center">
          <button
            type="button"
            onClick={onContact}
            className="text-xs font-medium uppercase tracking-wider text-slate transition-colors hover:text-coral"
          >
            Contact
          </button>
        </p>
      </motion.div>
    </main>
  );
}

function Field({
  icon,
  label,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 text-ink/40">{icon}</span>
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-full border hairline bg-paper px-11 py-3 text-sm outline-none transition-colors focus:border-coral"
        />
      </div>
    </div>
  );
}
