
## 1. Fix the horizontal page shift (IMG_9657 / IMG_9658)

Root cause: `body { overflow-x: hidden }` alone doesn't stop iOS Safari from letting `html` scroll horizontally when a descendant is wider than the viewport. Something on the projects and contact routes (very likely the `SectionReveal` initial `x`/scale transforms, the `aurora` blob with `inset:-20%`, or the fixed nav rendering wider than viewport when scrollbar is absent) pushes the layout past `100vw`, so mobile Safari parks the viewport with a non-zero `scrollLeft` — the page appears "shoved to the side".

Fix:
- In `src/styles.css`, add `overflow-x: clip` on `html` (and keep it on `body`); `clip` beats `hidden` because it also disables programmatic scroll and doesn't create a scroll container that Lenis/iOS can latch onto.
- Wrap every route's outermost `<div className="relative">` in a `overflow-x: clip` container OR add a single `.route-shell { overflow-x: clip; position: relative; isolation: isolate }` utility and apply it in `RootComponent`'s `<main>`.
- The `aurora` utility uses `inset: -20%` on an `absolute` element — safe only if its parent clips. Add `overflow: hidden` to the direct `.relative` wrapper of every `.aurora` (routes/index, about, projects.index, projects.$slug, contact, dev, __root NotFound/Error).
- Nav: it's `fixed inset-x-0` with inner `max-w-5xl` — fine, no change.

## 2. Fix the Dev Mode drawer alignment (IMG_9662)

The overlay uses `grid place-items-end`. `place-items-end` maps to `justify-items: end + align-items: end`, and in RTL `justify-items: end` = physical LEFT — so on Arabic the sheet snaps to the left edge and clips on the right. Even in LTR, "end" pins it to the right edge instead of centering.

Fix in `src/components/dev-mode.tsx`:
- Replace `grid place-items-end` with `flex items-end justify-center` so the sheet is bottom-centered in both directions.
- Give the `<motion.aside>` `mx-auto w-[calc(100%-1.5rem)] max-w-md` so it always sits centered with equal side gutters, and drop the RTL-sensitive `m-3 sm:m-6`.
- Add `max-h-[85dvh] overflow-y-auto overscroll-contain` so long content scrolls inside the sheet instead of the page.

## 3. FAB physical anchoring (IMG_9657 / IMG_9659)

WhatsApp uses `insetInlineEnd`, Dev Mode uses `insetInlineStart`. In RTL these swap physical sides, which is why the two buttons look "moved" between LTR and RTL screenshots and why the Dev Mode button appears near the right edge in the Arabic contact screenshot. The user reads this as a bug.

Fix:
- Pin them to physical sides: WhatsApp → `right: 1rem`, Dev Mode → `left: 1rem` (always, regardless of `dir`). Keep both at `bottom: 1.25rem` + `safe-bottom` on the wrapper.
- Keep the `size-12` glass-strong disks and the outer WhatsApp halo already in place.

## 4. Restore the hero 3D color

The 3D torus knot in `src/components/hero-canvas.tsx` currently forces `color="#a89cff"` on `MeshTransmissionMaterial`, tinting the whole background purple/blue. Revert to the original glass look: remove the `color` prop (falls back to white so the transmission stays clean glass), and lower `chromaticAberration` slightly if the rainbow is too heavy. Directional lights (`#7d6cff` + `#5fc8e8`) stay — they gave the original the subtle purple/cyan gradient the user liked.

## 5. Lighthouse / Core Web Vitals pass

Run a headless Lighthouse via Chromium against `http://localhost:8080` (mobile preset, throttled), save the JSON to `/tmp/browser/lh/`, and act only on the flagged items. Targeted low-risk wins to apply upfront:
- Add `fetchpriority="high"` and `decoding="async"` on the LCP image (hero doesn't have one — LCP is the H1; keep as is), and `loading="lazy"` on the project gallery `<img>` already present.
- Defer the R3F canvas: it already lazy-mounts, but also gate it behind `IntersectionObserver` so it only initialises when the hero is in view; unmount when it scrolls fully out of view to free the GPU on long-scroll pages.
- Move `@vercel/speed-insights` and `@vercel/analytics` to a `React.lazy` + `Suspense` island so they don't block hydration (they log an INP hit on the theme toggle — visible in current console logs).
- Preload the Instrument Serif 400 woff2 (LCP text uses it) via `head().links` in `__root.tsx`.
- Confirm `overflow-x: clip` (from §1) removes CLS from the horizontal-shift jump.

## 6. Visual regression harness

Add a lightweight Playwright-based screenshot check under `tests/visual/`:
- `tests/visual/snap.spec.ts` visits `/`, `/about`, `/projects`, `/projects/portfolio`, `/contact` at 390×844 and 1280×900, screenshots each, and compares against baselines in `tests/visual/__snapshots__/`.
- Add `@playwright/test` as a dev dep, a `playwright.config.ts` (Chromium only, `expect.toHaveScreenshot` with `maxDiffPixelRatio: 0.01`), and an npm script `test:visual`.
- Baselines are committed once; subsequent runs fail on FAB size/position drift or section-spacing regressions. Not wired into CI here — user runs `bun run test:visual` locally.

## 7. Code review + unused-dep sweep

- Scan `src/**` with `rg` for imports of each dependency. Drop packages with zero references from `package.json` via `bun remove`. Known suspects to verify: `gsap` (only referenced in DevMode copy, no actual `import gsap`), `recharts`, `embla-carousel-react`, `input-otp`, `vaul`, `react-day-picker`, `react-resizable-panels`, `cmdk`, `date-fns` — most ship in the shadcn template but this portfolio doesn't use them. Only remove after confirming zero imports (including transitive from `src/components/ui/*`); if a ui file imports it but the ui file itself is unused, delete the ui file too.
- `Nav.tsx` has `{...({} as object)}` on `MagneticButton` — a workaround for a missing prop type. Fix the `MagneticButton` prop typing so the cast can go.
- `dev.tsx` route duplicates the `DevModeButton` drawer content; keep both but extract the STACK/ARCH arrays into `src/lib/dev-manifest.ts` so they can't drift.
- `Footer` links to `/dev` but the route sets `robots: noindex` — fine, but add `rel="nofollow"` on that footer link so crawlers don't chase it.
- `__root.tsx` `themeBootstrap` reads `localStorage` in a try/catch — good. Add `prefers-reduced-motion` respect to `IntroExperience` (skip the 2s animation entirely under reduced motion).
- Fix the console warning: `theme-color` should have two entries (`media="(prefers-color-scheme: dark)"` → `#000`, light → `#fff`) so iOS status bar matches the active theme.
- Type: `Project.repos` already made optional last turn — verify `projects.$slug.tsx` renders it under `p.repos && p.repos.length`.

## 8. Verification

After edits:
- `bun run build` (must pass).
- Playwright script: for each of `/`, `/about`, `/projects`, `/projects/portfolio`, `/contact`, at 390×844 (LTR + `?lang=ar` RTL) and 1280×900, assert `document.documentElement.scrollWidth === document.documentElement.clientWidth` (no horizontal overflow), screenshot, and open the Dev Mode drawer to confirm it's bottom-centered in both directions. Save screenshots to `/tmp/browser/verify/`.
- Run `bun run test:visual` once to commit baselines.
- Run Lighthouse mobile once, report the four core scores back to the user.

## Out of scope

No copy rewrites, no design-token recoloring, no removal of intro/hero/nav/footer/case-study features. Everything is additive or a bug fix on existing behavior.
