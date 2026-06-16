import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Editorial display serif — free substitute for the source site's paid "Roslindale Display Narrow Light".
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body sans — exact match to the Essentience source site.
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Deck™ — Essentience",
  description:
    "Train by the draw. A deck-based human-performance protocol. Presence under uncertainty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
