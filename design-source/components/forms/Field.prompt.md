One-line: wraps a control with its uppercase label; the label text is authored in sentence case and uppercased by CSS.

```jsx
<Field label="Data wydarzenia" htmlFor="f-date"><Input id="f-date" type="date" /></Field>
<Field label="Wiadomość" htmlFor="f-msg" span="full"><Textarea id="f-msg" rows={4} /></Field>
```

Forms are a two-column grid with `gap: var(--field-gap)`; e-mail and message always span full width. Placeholders give an example, never repeat the label: `np. 120`, `np. Wrocław`.
