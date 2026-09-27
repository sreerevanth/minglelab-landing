# MingleLab

Landing page for MingleLab, a cross-domain network for young people.

Built with React, TypeScript, Vite, Tailwind CSS v4, and [ReactBits](https://reactbits.dev).

```bash
npm install
npm run dev
```

## How the page works

The site is a deck: one full-screen page at a time (`src/deck/`). Wheel, swipe, arrow/Page keys and in-page links
turn the page, and each page arrives with its own transition (`cover`, `wipe`, `zoom`, `slide`, `iris` in
`src/deck/transitions.ts`). Long pages scroll inside themselves first, and scroll-driven ReactBits components measure
against that page via `src/lib/slide-scroller.ts`.

Dark and light themes live in `src/theme.tsx` (CSS tokens in `src/index.css`); switching grows the new theme out of
the toggle as a circle. Logo assets are in `public/brand/`, extracted from `minglelab-logo.webp`.

## Structure

- `src/data/content.ts` holds all copy and repeated content (domains, people, connections, activity).
- `src/sections/` has one file per page section.
- `src/components/reactbits/` holds ReactBits components (TS + Tailwind variants), pulled from the registry with
  `node scripts/add-reactbits.mjs <Name> ...` and then lightly adapted for the brand. Each change is marked with a
  `MingleLab:` comment or is limited to colors and content slots.

## Where each ReactBits component is used

| Section | Components |
| --- | --- |
| Navbar | PillNav, StarBorder |
| Hero | Threads, DecryptedText, SplitText, BlurText, Magnet, StarBorder, ShinyText, CountUp |
| Domains | ScrollVelocity, FlowingMenu, BlurText, AnimatedContent |
| Knowledge exchange | SpotlightCard, CardSwap |
| Connections | MagicBento |
| Activity | AnimatedList |
| Core idea | ScrollReveal, LightRays |
| People | ChromaGrid |
| Final CTA | DotGrid, SplitText, Magnet, StarBorder |
| Page counter | Counter |
| Whole page | ClickSpark |
