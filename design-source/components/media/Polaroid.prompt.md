One-line: the frame every photo sits in — tilted, white, with a bottom lip; alternate the tilt sign between neighbours.

```jsx
<Polaroid label="foto z eventu 1" tilt={-2} />
<Polaroid label="zdjęcie zespołu, pionowe 3:4" minHeight={620} tilt={-2} />
<Polaroid tilt={2}><img src="…" style={{ width: '100%', display: 'block' }} /></Polaroid>
```

When you set `minHeight`, the frame becomes a flex column and the slot fills it — do not give the inner element a percentage height. Tilt is switched off below 900px on the site; keep that behaviour.
