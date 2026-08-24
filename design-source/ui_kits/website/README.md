# UI kit — bcoffee.pl (redesign)

Click-through recreation of the redesigned B. Coffee website. Two views plus a shared
contact section, switched in-page with no routing:

| File | What |
| --- | --- |
| `App.jsx` | View state (`home` / `wesele`), hero A/B switch, mobile menu, phone reveal, form submit |
| `SiteHeader.jsx` | Sticky header, wordmark, nav, burger + mobile panel |
| `HomeScreen.jsx` | Hero (two variants), ticker, intro, client logos, offer grid + wide lemonade card, counter, about, gallery, shop strip, Instagram grid |
| `WeddingScreen.jsx` | `Kawa na wesele` subpage: hero, three service cards, photo strip |
| `ContactSection.jsx` | Quote form (10 fields) + Wojciech card with "Pokaż numer" |
| `SiteFooter.jsx` | Four-column footer, company data verbatim |

All of it composes the design-system components (`Button`, `Pill`, `Sticker`, `Card`,
`Field`/`Input`/`Select`/`Textarea`, `Polaroid`, `PhotoSlot`, `Ticker`,
`SectionHeading`, `OfferCard`, `StatBand`) from `_ds_bundle.js`. Nothing is
re-implemented locally.

Source of truth: `B Coffee v3.dc.html` at the project root.

**Not real:** the form has no backend (submit flips local state), the brewed-coffee
counter shows a placeholder 50 000, and every image is a `PhotoSlot`.
