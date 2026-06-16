"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Camera, Check, Mail, Phone, Send } from "lucide-react";
import { assetPath } from "./shared";

/**
 * Mirrors the essentience.net /contact page: a "leave your details" form plus direct
 * contacts and social links. Demo only — no backend; submitting shows a confirmation.
 */
const CONTACTS = [
  {
    name: "Tarik Elmetaal",
    email: "Tarik@essentience.net",
    phones: ["UK: +44 7865 434 585"],
  },
  {
    name: "Sebastiaan Kerckhof",
    email: "Sebastiaan@essentience.net",
    phones: ["UAE: +971 55 708 9798", "NL: +31 6 424 55 651"],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/essentience_official", icon: Camera },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/essentience/", icon: ArrowUpRight },
];

export function Contact({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="mb-8 flex justify-start">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to sign in"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-3.5 py-2 text-xs font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
          Back
        </button>
      </div>

      {/* Masthead */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <Image
          src={assetPath("/essentience-logo.png")}
          alt="Essentience"
          width={202}
          height={22}
          priority
          className="mx-auto mb-8 h-8 w-auto opacity-85"
        />
        <h1 className="font-display text-6xl leading-none md:text-7xl">Contact</h1>
        <p className="mx-auto mt-5 max-w-md text-slate">
          Contact requests and social media — reach out for collaborations.
        </p>
      </motion.header>

      {/* Form */}
      <section className="mb-12 rounded-[var(--radius-card)] border hairline bg-white/70 p-7 shadow-[0_30px_80px_-50px_rgba(29,0,0,0.5)]">
        <h2 className="font-display text-2xl">Let us get back to you</h2>
        <p className="mt-1 text-sm text-slate">
          Simply leave your details and we will reach out to you.
        </p>

        {sent ? (
          <div className="mt-7 flex flex-col items-center rounded-[var(--radius-card)] border hairline bg-paper px-6 py-10 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white">
              <Check className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <p className="font-display text-2xl">Thank you</p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-slate">
              Your details are in. We will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" type="text" autoComplete="name" placeholder="Your name" />
              <Field label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            </div>
            <div className="mt-4">
              <Field label="Phone" type="tel" autoComplete="tel" placeholder="Optional" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="w-full resize-none rounded-[var(--radius-card)] border hairline bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-coral"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-white transition-colors hover:bg-coral"
            >
              <span className="text-sm font-medium tracking-wide">Submit</span>
              <Send className="h-4 w-4" />
            </motion.button>
          </form>
        )}
      </section>

      {/* Direct contacts */}
      <section className="mb-12">
        <h2 className="mb-5 border-b hairline pb-3 font-display text-2xl">Or contact us directly</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <div
              key={c.name}
              className="rounded-[var(--radius-card)] border hairline bg-white/50 p-5"
            >
              <p className="font-medium">{c.name}</p>
              <a
                href={`mailto:${c.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-coral"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {c.email}
              </a>
              {c.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^+\d]/g, "")}`}
                  className="mt-2 flex items-center gap-2 text-sm text-slate transition-colors hover:text-coral"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {p}
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="text-center">
        <h2 className="mb-5 border-b hairline pb-3 text-left font-display text-2xl">Social</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-coral hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  type,
  autoComplete,
  placeholder,
}: {
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate">
        {label}
      </label>
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-full border hairline bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-coral"
      />
    </div>
  );
}
