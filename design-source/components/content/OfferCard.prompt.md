One-line: the service tile used across the offer grid; make exactly one service `wide` when it deserves more attention.

```jsx
<OfferCard title="Kawa na event" href="/kawa-na-event" photoLabel="foto — kawa na event" tilt={-1.2} />
<OfferCard title="Barista na targi" href="/webpage_19" photoLabel="foto — barista na targach" tilt={1} />
<OfferCard wide title="Bar z lemoniadą" href="/webpage_21" eyebrow="nie tylko kawa"
  body="Latem kawa nie zawsze wygrywa. Wtedy przyjeżdżamy z lemoniadą." photoLabel="foto — bar z lemoniadą" />
```

Titles are the client's own service names, verbatim. Alternate tilt signs so no two neighbours lean the same way.
