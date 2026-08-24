One-line: the outlined, hard-shadowed surface everything else sits inside; give it a small `tilt` so it does not sit straight.

```jsx
<Card tone="paper" tilt={-1.2} shadow="lg" padding={44}>…</Card>
<Card tone="accent" radius="block" shadow="2xl" padding={58}>…</Card>
<Card tone="dark" radius="block" padding={74}>…</Card>
```

Never a borderless or blurred-shadow card. Use `tone="dark"` or `tone="accent"` at most twice per page — the page is cream, the colour is the exception.
