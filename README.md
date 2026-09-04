# Bikram Paul — Portfolio

Personal portfolio built with React + Vite + Tailwind CSS v4.

## Content notes

All project descriptions and metrics in `App.jsx` are pulled directly from
real work at Weevils Drones Private Limited. Two rules to keep this true
going forward:

1. Every metric shown (drone count, system count, timing) should be a real
   number you can defend if someone asks about it directly. If you don't
   have a real number for something new, leave it out rather than
   estimating one that sounds better.
2. Before adding anything from internship work, check it's not something
   Weevils considers internal/proprietary (infra details, internal naming,
   credentials).

## Structure

- `App.jsx` — all page content and layout lives here, data objects at the
  top (`personalInfo`, `specSheet`, `projects`, `experience`, `education`)
  so content updates don't require touching markup.
- `index.css` — design tokens (colors, fonts) as CSS variables, toggled
  between light/dark via the `.dark` class on `<html>`.
- `App.css` — small, targeted overrides that don't fit as Tailwind
  utilities (nav active state, the `.tag` chip style).

## Run locally

```bash
npm install
npm run dev
```

## Updating the GitHub link

`personalInfo.github` currently points at the profile root
(`github.com/Bikram-20-9`). Once the UAV video/tracking/telemetry project
has its own public repo, point this at that repo directly instead —
that's the actual proof-of-work link, not just a profile page.
