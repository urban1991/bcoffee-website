import * as React from "react";
import type { LegalBlock, LegalDoc } from "@/lib/legal";

const page: React.CSSProperties = {
  maxWidth: "var(--page-max)",
  margin: "0 auto",
  padding: "56px var(--gut) 96px",
};

// `--text-base` to rozmiar, `--text-body` to kolor — nazwy są mylące, bo obie rodziny
// tokenów zaczynają się tak samo (styles/tokens/typography.css vs colors.css).
const paragraph: React.CSSProperties = {
  fontSize: "var(--text-base)",
  lineHeight: "var(--leading-body)",
  color: "var(--text-body)",
  margin: "0 0 14px",
};

/**
 * Nagłówki w kroju domowym. SectionHeading się tu nie nadaje — renderuje wyłącznie `h2`
 * i dokłada afordancje sekcji marketingowej (nadtytuł, linia odręczna, uwaga z boku),
 * a dokument prawny potrzebuje zwykłej hierarchii h1/h2 i niczego więcej.
 */
function headingStyle(fontSize: string, margin: string): React.CSSProperties {
  return {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
    fontSize,
    letterSpacing: "var(--track-display)",
    lineHeight: "var(--leading-heading)",
    margin,
  };
}

/**
 * „2024-10-10" → „10.10.2024". Ręcznie, nie przez `Intl` — formatowanie zależne od
 * lokalizacji potrafi dać inny wynik na serwerze niż w przeglądarce i wtedy React
 * zgłasza rozjazd hydratacji. Przy jednej stałej dacie nie ma po co ryzykować.
 */
function formatDate(iso: string): string {
  const [rok, miesiac, dzien] = iso.split("-");
  return `${dzien}.${miesiac}.${rok}`;
}

function Block({ data }: { data: LegalBlock }) {
  if (data.kind === "subheading") {
    return (
      <h3
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--weight-strong)" as React.CSSProperties["fontWeight"],
          color: "var(--text-strong)",
          margin: "22px 0 12px",
        }}
      >
        {data.text}
      </h3>
    );
  }

  if (data.kind === "bullets") {
    return (
      <ul style={{ ...paragraph, paddingLeft: 22, listStyle: "disc" }}>
        {/* Klucz z indeksu, nie z treści: punkty regulaminu powstają przez skopiowanie
            sąsiedniego, więc dwa identyczne wiersze w jednej liście są realne. Kolejność
            jest stała, bo treść leży w repozytorium. */}
        {data.items.map((item, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <p style={paragraph}>{data.text}</p>;
}

/**
 * Regulamin i polityka prywatności. Jeden układ na oba dokumenty — różnią się
 * wyłącznie treścią, więc dwa osobne komponenty rozjechałyby się przy pierwszej
 * poprawce w jednym z nich.
 */
export function LegalScreen({ doc }: { doc: LegalDoc }) {
  return (
    <article style={page}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={headingStyle("var(--text-h2)", "0")}>{doc.title}</h1>
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: "var(--text-hand)",
            color: "var(--text-accent)",
            margin: "6px 0 0",
          }}
        >
          {doc.subtitle}
        </p>
        <p style={{ fontSize: "var(--text-caption)", color: "var(--text-faint)", margin: "18px 0 0" }}>
          Obowiązuje od {formatDate(doc.effectiveFrom)}
        </p>
      </header>

      {/* `bc-prose` trzyma wiersz w granicach czytelności. Przy tekście prawnym
          liczy się to podwójnie: nikt nie przebrnie przez akapit na całą szerokość ekranu. */}
      <div className="bc-prose">
        {doc.sections.map((s) => (
          <section key={s.heading} style={{ marginBottom: 34 }}>
            <h2 style={headingStyle("var(--text-h4)", "0 0 16px")}>{s.heading}</h2>
            {s.blocks.map((b, i) => (
              <Block key={i} data={b} />
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
