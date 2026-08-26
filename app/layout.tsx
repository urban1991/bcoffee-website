import { Bricolage_Grotesque, Caveat, Archivo } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-family",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hand-family",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-family",
  display: "swap",
});

/**
 * Layout korzenia trzyma tylko <html>/<body> i fonty. Style strony i chrome
 * (header, stopka) siedzą w app/(site)/layout.tsx, żeby Studio pod /studio
 * dostało czystą karte.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${display.variable} ${hand.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
