# B. Coffee Design System

Design system for **B. Coffee — be happy**, a mobile coffee-bar and barista service run by Wojciech Baranowski (Strzelce 4, 58-124 Marcinowice, NIP 8842756984). The company brings a full coffee bar, equipment and a team of baristas to corporate events, trade fairs, weddings and private parties, and also runs a lemonade bar. Coffee beans are sold separately at **bcoffee.shop**.

The system is Polish-language first. All copy in it is written in Polish.

## Sources

- **https://bcoffee.pl/** — the live WebWave site, read as text. Section structure, service names, all factual copy (phone, address, motto, offer names, `Parzyliśmy kawę dla`, the brewed-coffee counter) come from here. Images on that site are lazy-loaded behind transparent placeholders, so **no photography could be retrieved** — every image slot in this system is a labelled placeholder.
- **`assets/logo-bcoffee.webp`** — the logo, supplied by the client. A 158×158 raster: coffee-brown disc, cyan ring, white script `B. Coffee`, and `be happy` in the same cyan. Pixel-sampled, the asset contains exactly three colours — brown `rgb(74,44,28)`-ish, cyan `rgb(11,189,250)`, white. **There is no gold in the logo.** This file is the only brand asset available.
- **`B Coffee v3.dc.html`** (project root) — the redesigned site this system was extracted from. `B Coffee.dc.html` (dark, v1) and `B Coffee v2.dc.html` (light editorial, v2) are earlier directions kept for reference; **v3 is the canonical one**.
- Subpages referenced but not redesigned: `/kawa-na-event`, `/webpage_19` (Barista na targi), `/webpage_20` (Kawa na wesele), `/webpage_21` (Bar z lemoniadą), `/webpage_12` (Kontakt).

## Positioning

Stated by the client: **light, simple, and a little cheeky** (*lekka, prosta i trochę bezczelna*). Not premium, not corporate, not rustic-artisan. The design system exists to keep that tone from drifting into either polite blandness or novelty clutter.

---

## CONTENT FUNDAMENTALS

**Voice.** Plain-spoken and quick. Short sentences, no marketing abstraction. A joke every few sections, never two in a row. The brand's own motto — *B. Coffee — be happy* — sets the ceiling: warm, not zany.

**Person.** The reader is addressed directly, informally: **`Ty`/`Wy`** (`Wy tylko powiedzcie gdzie`, `Zaproś nas na swoje wydarzenie`). The company is **`my`** (`przyjeżdżamy`, `parzyliśmy`, `pilnujemy`). Never third-person corporate (`Firma B. Coffee zapewnia…`) — that is exactly the register the redesign moved away from.

**Casing.** Sentence case everywhere, including headlines. ALL CAPS is used only for the wordmark (`B. COFFEE`), the scrolling ticker, and eyebrow labels. Handwritten accents are always lowercase (`trochę o nas`, `szybka wycena`, `nie tylko kawa`) — the lowercase is what makes them read as a margin note rather than a heading.

**Headline construction.** Two lines, the second one handwritten and coloured:

> Kawa, która *robi imprezę*
> B. Coffee *— be happy*
> Kawa *na wesele*
> Obserwuj nas, *bądź na bieżąco*

**The cheek.** It lands in one short closing clause, never in the headline itself:

> Kawa na każdą sytuację. **Serio, każdą.**
> Sprzęt i ziarno traktujemy poważnie. **Siebie — trochę mniej.**
> Zadbamy o klimat. **Wy zadbajcie o gości.**
> …od pierwszego toastu do ostatniego tańca. **Ciocia będzie zachwycona.**
> Latem kawa nie zawsze wygrywa. **Wtedy przyjeżdżamy z lemoniadą.**

**CTA labels.** Verb-led and literal: `Szybka wycena`, `Skontaktuj się`, `Zapytaj o termin`, `Wyślij zapytanie`, `Pokaż numer`, `Zobacz ofertę`. Never `Dowiedz się więcej`.

**Facts stay verbatim.** Phone `604 372 787`, the address block, NIP/REGON, service names and the motto are quoted exactly as the client publishes them, never paraphrased. Numbers nobody supplied (the brewed-coffee total) sit in a placeholder and are flagged, never invented.

**Em dashes** are used, sparingly, as the pause before a punchline. **No emoji** — the one decorative glyph in the system is `✳` in the ticker, and `→` on links. Placeholders speak in lowercase monospace, plainly (`zdjęcie zespołu, pionowe 3:4`).

---

## VISUAL FOUNDATIONS

**The idea.** Printed matter, not a website: a cream sheet with a dot grid, thick ink outlines, hard offset shadows like stuck-on stickers, photos taped down slightly crooked. Loose, but held together by a strict rule set — 2px borders, one radius per role, three fonts, four colours.

**Colour.** Two of the three come straight from the logo; the third is an addition. Coffee brown `--bc-ink` is the ink: all body copy, every border, every shadow. Turquoise `--bc-turquoise` leads — primary buttons, the ticker, the contact block, the logo dot. It is a slightly deeper, less blue turquoise than the raster ring (`rgb(11,189,250)`), retuned for legible type on cream; treat the ring colour as the reference, not the token. Gold `--bc-gold` is **added**, not inherited: the logo has no third colour, and a cream page with only brown and cyan had nothing warm to sit against the coffee. It carries the sticker, the lemonade card, hover fills and focus rings. If the client rejects it, drop `--bc-gold` back to white or cyan — nothing else in the system depends on it. Cream `--bc-paper` is the page and `--bc-paper-raised` every card on it. Two full-bleed colour blocks per page maximum (the counter band and the ticker); everything else is cream with coloured parts. Never a gradient, except the photo scrim.

**Type.** Three faces, each with one job. **Bricolage Grotesque** 700/800 for anything structural — headlines, card titles, buttons, the wordmark — always with tight negative tracking (`--track-display`) and sub-1 line-height on large sizes. **Caveat** 600/700 is the handwritten voice: eyebrows, the second line of a headline, the counter caption, numerals on the wedding cards, footer column labels. It runs ~15% larger than the type it accompanies and it is always coloured (turquoise-deep or gold), never black. **Archivo** 400/500 handles body copy, form fields, small print. `ui-monospace` at 10–11px is reserved for placeholder captions and is never used in real content.

**Layout.** 1300px max width, 34px gutters (18px on mobile). Content sits on a plain 2-column or `auto-fit` grid, never a 12-column framework. Sections are separated by ~96px of air; whitespace is the only vertical rhythm device. Everything sticky is the header alone.

**Rotation.** The signature. Cards sit at `-1.2deg`/`+1deg`, polaroids at `±2deg`, stickers at `-9deg`. On hover a card rotates back to `0deg` — the interaction is *straightening the thing you're about to click*. Tilt is decorative only: it is disabled below 900px, where crooked boxes read as broken.

**Borders and radii.** Every surface carries `2px solid var(--bc-ink)` — no exceptions, no 1px hairlines, no borderless cards. Radii are role-bound: pill `999px` for anything clickable, `26px` for full blocks, `18px` for cards, `12px` for inputs and small tiles, `6px` for photo frames (paper corners are nearly square). Dashed borders mean *empty or optional* — client logo slots, the shop strip.

**Shadows.** Hard, no blur, always the ink colour, offset down-right: `3px` on small controls up to `8px` on the big blocks. Photo frames use a 16%-opacity variant so the stack reads as paper, not as ink. There is no soft shadow anywhere in the system.

**Interaction.** Buttons and cards move `translate(-2px, -2px)` toward the top-left on hover, so the shadow appears to grow; cards additionally lose their tilt. Header links and pills swap fill to gold instead of moving. `--dur-fast 0.15s` on movement, `0.2s` on colour. Focus on a field shows a gold hard shadow, no outline ring. No fades, no scale, no bounce, no press-down. The only continuous animation on the site is the 30s linear ticker.

**Photography.** None supplied. Every image slot is a diagonal-hatch box (`--texture-stripes`) with a lowercase monospace caption naming what belongs there and the aspect ratio. When real photos arrive they should be warm, daylight, people-first — baristas and guests mid-service rather than styled product shots — and they always sit inside a frame: a polaroid with a bottom lip, a bordered tile, or a full-bleed hero with the `--scrim-photo` overlay under cream type.

**Transparency and blur.** One use only: the sticky header is `--surface-page` at 88% with `backdrop-filter: blur(12px)`. Nothing else is translucent.

---

## ICONOGRAPHY

The system deliberately has **almost no icons**. This is a four-person coffee business, not a SaaS product; typography and stickers carry the meaning instead.

- **Unicode glyphs only.** `→` on every card and link CTA, `✳` as the separator in the ticker, `←` on the back link. No icon font, no SVG icon set, no CDN dependency.
- **Round stickers replace icons.** Where a UI would normally place a pictogram, this system places a `Sticker` — an outlined, rotated circle with two short handwritten words in it (`be happy`, `do domu`), echoing the shape of the logo roundel. The gold fill is this system’s addition; `tone="turquoise"` is the logo-faithful option. See `components/core/Sticker.jsx`.
- **The burger** is three 20×2px ink bars in a bordered square — drawn with divs, not an icon.
- **Social links are word labels** (`Facebook`, `Instagram`, `@bcoffeebehappy`), never platform glyphs. The live site uses platform logos; word labels were chosen because no marks were supplied and platform logos are not ours to redraw.
- **No emoji**, in UI or in copy.
- If an icon set ever becomes necessary, use Lucide via CDN at 2px stroke to match the border weight — but treat that as a last resort and flag it.

Only asset in `assets/`: `logo-bcoffee.webp`. The wordmark in the header and footer is **set in type** (Bricolage 800 + a turquoise dot), not the roundel — the roundel is a raster of unknown provenance and is too detailed at 22px. Ask the client for a vector logo.

---

## Index

| Path | What |
| --- | --- |
| `styles.css` | The entry point consumers link. `@import`s only. |
| `tokens/` | `fonts`, `colors`, `typography`, `spacing`, `borders`, `shadows`, `motion`, `texture`, `base`. |
| `components/core/` | `Button`, `Pill`, `Sticker`, `Card` |
| `components/forms/` | `Field`, `Input`, `Select`, `Textarea` |
| `components/media/` | `Polaroid`, `PhotoSlot`, `Ticker` |
| `components/content/` | `SectionHeading`, `OfferCard`, `StatBand` |
| `guidelines/` | Foundation specimen cards (Type, Colors, Spacing, Brand). |
| `ui_kits/website/` | Click-through recreation of the redesigned bcoffee.pl. |
| `assets/logo-bcoffee.webp` | Client logo. |
| `SKILL.md` | Agent-skill wrapper. |
| `B Coffee v3.dc.html` | Canonical source design. v1/v2 kept as alternates. |

**Intentional additions.**

- **`--bc-gold`** — a third accent that is *not* in the logo. Added because the palette otherwise reduces to brown and cyan, which reads cold on cream. Used for the sticker, the lemonade card, hover fills and focus. Removable in one token.
- **`PhotoSlot`** — the placeholder discipline this brand needs until real photography exists; no conventional UI kit has an equivalent.
- **`Sticker`** — the icon substitute described under ICONOGRAPHY.

No source defined a component library, so the rest of the inventory was derived from what the v3 design actually uses.

## Known gaps

- **No photography.** Every image is a placeholder.
- **No vector logo.** Raster `.webp` only, 158×158 — too small and too detailed for the 22px header mark, which is why the wordmark is set in type.
- **Fonts are Google-CDN.** No licensed brand face was supplied; Bricolage Grotesque / Caveat / Archivo are this system's proposal, not an inherited choice.
- **The brewed-coffee counter** has no real number.
- **Forms have no backend.** `Field`/`Input` are visual only; submission is a local state change.
