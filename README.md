# St. Joseph Group, Inc.

Marketing website for **St. Joseph Group, Inc.** — a diversified holding company of nine business units, built to communicate the group's purpose: _creating meaningful lives_.

## Tech stack

- **[Next.js 14](https://nextjs.org/)** (App Router) + **React 18** + **TypeScript**
- **[Three.js](https://threejs.org/)** via **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** & **drei** — the hero solar-system scene
- **[Framer Motion](https://www.framer.com/motion/)** — animations, parallax, reveals
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scrolling
- **[Tailwind CSS](https://tailwindcss.com/)** — styling

## Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:3200)
npm run dev

# production build
npm run build

# serve the production build (http://localhost:3200)
npm run start
```

> The dev and start scripts run on **port 3200**.

## Features

- **Hero** with an interactive Three.js solar system (orbiting business-unit "planets"), scroll-driven tilt, and mouse parallax
- **Alternating light/dark themed sections** for visual rhythm
- **Floating section-nav rail** that tracks the active section and adapts its label color to the section theme
- **Scroll-driven parallax decor** — drifting orbs and geometric shapes
- **Animated stat counters**, testimonial carousel, EOS® orbital diagram, and a company timeline
- **Business-unit detail pages** (`/business-units/[slug]`) and an **investor relations** page

## Project structure

```
app/                     # Next.js App Router pages
  page.tsx               # home page
  business-units/[slug]/ # per-unit detail pages
  investor-relations/    # IR page
  globals.css            # global styles + light-section theme
components/
  sections/              # home-page sections (Hero, BusinessUnits, EOS, …)
  three/                 # Three.js scenes (HeroScene, UnitScene)
  SectionNav.tsx         # floating section rail
  ScrollDecor.tsx        # scroll-driven parallax layer
lib/content.ts           # all site copy & business-unit data
```

## Deployment

Optimized for **[Vercel](https://vercel.com/)**. Connect the repository (or run `vercel`) and it deploys with zero configuration.
