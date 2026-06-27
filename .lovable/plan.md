
# Portfolio — Abdelhamed Nada (Apple-grade, Glassmorphism + Motion)

A world-class, single-developer portfolio built on the project's TanStack Start stack (compiles & deploys cleanly to Vercel), with a complete glassmorphism design system, cinematic motion in every layer, and AR/EN bilingual support. Zero fake data — every number, label, link and project detail comes from your CV and the GitHub Bot docs you provided.

## 1. Design System (built first, before any UI)

A locked design system file drives every component. No ad-hoc colors, no inline values.

- **Tokens** (`src/styles.css` via `@theme inline`):
  - Color: AMOLED `--bg: oklch(0 0 0)` + layered glass surfaces (`--glass-1..4`) with `backdrop-filter: blur + saturate`; light mode pure `oklch(1 0 0)` with frosted neutral glass. Accent gradient pulled from your logo: `#7d6cff → #5fc8e8 → #e89cd8`.
  - Typography: **Latin** — *Instrument Serif* (display) + *Inter Tight* (UI) + *JetBrains Mono* (code). **Arabic** — *Rubik* / *IBM Plex Sans Arabic* (display+body). Loaded via `@fontsource` packages; never CDN.
  - Spacing: 4px base, type scale 12→96 (modular 1.25).
  - Radii: 12 / 20 / 28 / 9999. Glass shadows: layered `inset` + `0 30px 60px -20px`.
- **Glassmorphism standard**: every surface = `bg-glass/X` + `backdrop-blur-2xl` + `border border-white/8` + subtle noise overlay. One `<GlassCard>` primitive enforces it.
- **Motion guidelines**: easing `cubic-bezier(0.16,1,0.3,1)` (Apple), durations 200/350/600/1200ms tiers. Every component declares an `enter`, `hover`, and `scroll` motion intent.
- **A11y**: WCAG AA contrast in both themes, `prefers-reduced-motion` short-circuits intros & parallax, full keyboard focus rings, semantic landmarks.
- **Responsive**: mobile-first; iPhone safe-area insets honored; container queries on hero & cards.

## 2. Architecture & Stack

```
TanStack Start (React 19 + Vite 7)
 ├─ Framer Motion        → component & layout motion
 ├─ GSAP + ScrollTrigger → scroll choreography, text morphing
 ├─ React Three Fiber    → hero 3D glass orb + monogram intro
 ├─ @react-three/drei    → environment, MeshTransmissionMaterial
 ├─ lenis                → smooth scroll
 ├─ next-themes-style    → theme via class strategy (system default)
 ├─ i18next + react-i18next → AR/EN with RTL switching
 ├─ @vercel/analytics    → Analytics
 └─ @vercel/speed-insights
```

Deploys to Vercel out of the box (TanStack Start has a Vercel preset). No Node-only deps.

## 3. Routes (file-based, src/routes/)

```
__root.tsx          Theme + i18n + smooth scroll + analytics + global glass canvas
index.tsx           Home (Hero → About → Skills → Projects → Process → Contact)
projects.index.tsx  Projects index (currently 1 project — GitHub Bot)
projects.$slug.tsx  Project detail (full case study)
about.tsx           Extended bio + education timeline
contact.tsx         Contact form + WhatsApp deep-link
dev.tsx             "Developer Mode" — stack/architecture/libraries viewer
404 (notFound)      Glass 404 with text-morph animation
```

Every route ships its own `head()`: unique title, description, og:title/desc/type, og:image (monogram OG card), twitter card, canonical, JSON-LD (Person + WebSite + BreadcrumbList on detail).

## 4. Intro Experience (2s, skippable)

A 2-second cinematic overlay before the hero on first visit (sessionStorage gate, respects `prefers-reduced-motion`):
1. Black frame → monogram **AN** strokes draw on (SVG path-length animation).
2. Glass orb (R3F) materializes behind it.
3. Camera dolly + scale → seamless handoff into hero (shared-layout via Framer `layoutId`).

## 5. Hero (the make-or-break)

- **Background**: full-bleed R3F scene — a single transmission-material glass torus + subtle aurora light, parallax to cursor (+ gyroscope on mobile, throttled).
- **Foreground glass card**: name in Instrument Serif w/ gradient mask, animated role rotator ("Full-Stack Developer · Frontend Specialist · AI Tools Expert" — from your CV), two CTAs (`View Projects`, `Contact`).
- **Trust strip**: real chips — *React · Next.js · TypeScript · Supabase · Python* (from CV, no fake counters like "10K+ users").
- **Scroll hint** with magnetic mouse follow.

## 6. Sections (home)

1. **About** — split glass panel: your professional summary verbatim from the CV; education stack (Tanta Univ. CS+AI 2024–present, PUA CS 2022–2024).
2. **Skills Matrix** — categorized glass tiles (Frontend / Backend / AI & Tools / DevOps / Languages) directly from CV.
3. **Featured Project (GitHub Bot)** — large bento card with live preview iframe of `giit-website.vercel.app` (lazy) + CTA → project detail.
4. **Process** — 4-step glass timeline (Discover → Architect → Build → Ship) — generic process copy, not fake metrics.
5. **Contact** — form + WhatsApp button.

## 7. Project Detail — `/projects/github-bot`

Full case study built entirely from the documentation you provided:
- Hero: project title, role (Designer + Developer), year 2024, stack chips, live link, GitHub link.
- Overview, Features (8 from docs: Secure GitHub link, Repo management, ZIP upload, Privacy toggle, Fetch public repos, Safe deletion, Multi-user SaaS, Deploy-ready).
- Architecture diagram section (Telegram Interface / Bot Logic / GitHub Service / User Mgmt / File Processing).
- Security considerations (PAT encryption, safe file handling, token validation).
- Tech stack split into Bot (Python 3.11, python-telegram-bot, PyGithub, cryptography, SQLite, Docker, Railway) and Website (React, Vite, TS, Tailwind, shadcn/ui, framer-motion).
- Gallery: your 3 uploaded screenshots (hero / features / commands) in a glass lightbox.
- Video embed if you send it; otherwise the slot stays unmounted (no placeholder).
- Links: Live site, GitHub `abbn7/GIT5`, website repo `abbn7/github-bot-website`.

## 8. Logo / Monogram System

Your SVG is wired everywhere: Navbar, Favicon (rasterized to .ico + .png), Loading screen, OG image (1200×630 generated glass card with the monogram + name), Intro animation, Footer.

## 9. Contact + WhatsApp

- **Floating WhatsApp button** (bottom-end, safe-area aware): pulses subtly; on click opens `https://wa.me/201096144345?text=<encoded>` where text is bilingual: "مرحباً عبدالحميد، جئت من موقع البورتفوليو الخاص بك — Hi Abdelhamed, I came from your portfolio and would like to discuss…".
- **Contact form** (in `/contact` and inline section): name + email + message, validated with Zod, submits via a TanStack server function that emails via Resend (you'll add `RESEND_API_KEY` as a secret), success/error glass toasts. No backend lock-in beyond email send.

## 10. Theming & i18n

- Theme: `system` default (matches `prefers-color-scheme`); manual toggle persisted in localStorage. Both themes are fully glassmorphic.
- i18n: AR + EN with full RTL flip (`dir` on `<html>`), all copy in `src/i18n/{ar,en}.json`, language toggle in nav.

## 11. Error / Empty / Loading States

- **404**: glass scene with GSAP text morph ("404 ⇄ Lost in space ⇄ Let's go home"). Returns CTA.
- **Loading**: route-level Suspense skeletons styled as shimmering glass.
- **Empty**: e.g., projects filter no-results — glass illustration + reset action.

## 12. Developer Mode

A small floating monogram dot (bottom-start). Click opens a glass drawer showing:
- Architecture tree (routes + key modules).
- Tech stack list (versions read at build time).
- Libraries used with one-line purpose each.
Closes with ESC. Hidden in print.

## 13. Marketing Psychology Hooks

Applied subtly (no dark patterns, no fake stats):
- Cinematic intro = commitment-and-consistency (sunk attention).
- Hero gradient + motion = peak-end rule.
- Scarcity-of-attention CTA copy ("Let's build something the web remembers").
- Reciprocity: a downloadable CV button in About (uses your real CV).
- Social proof: real GitHub link + live project link in hero strip.

## 14. SEO / Share

- Per-route meta (title ≤60c, desc ≤160c), Open Graph + Twitter card, canonical, JSON-LD (Person on home, CreativeWork on project), `robots.txt`, generated `sitemap.xml`.
- Generated 1200×630 OG image using the monogram + gradient.

## 15. Performance

- Lighthouse target ≥95 mobile. Lazy R3F (dynamic import + intersection observer), font subset, preconnect to fonts, image `loading="lazy" + decoding="async"`, route-level code splitting, no blocking third-parties.

## 16. Deliverables checklist

- Design tokens + `<GlassCard>`, `<MagneticButton>`, `<TextMorph>`, `<SectionReveal>` primitives
- Intro overlay (2s, skippable, session-gated)
- 3D hero scene
- Home with 5 sections, all glass + motion
- Projects index + GitHub Bot detail page (all real data, your 3 screenshots wired)
- About, Contact, Dev Mode, 404
- Floating WhatsApp + Contact form (Resend server fn)
- AR/EN + RTL + system theme
- Analytics + Speed Insights
- OG image + favicon from monogram
- Vercel-ready build

---

### What I still need from you (only if available — otherwise I ship without)

1. The **GitHub Bot video** you mentioned (drop in chat; I'll embed it in the case study).
2. Approval for me to add `RESEND_API_KEY` as a Lovable Cloud secret when wiring the contact form (or pick a different email provider).

Everything else is locked from your CV, the GitHub Bot docs, the three screenshots, and your monogram SVG.
