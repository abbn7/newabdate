import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SectionReveal } from "@/components/section-reveal";
import { SectionHeader } from "@/components/section-header";
import { GlassCard } from "@/components/glass-card";

const STACK = [
  ["TanStack Start", "React 19 full-stack framework, file-based routing, SSR."],
  ["TypeScript", "End-to-end type safety from server functions to JSX."],
  ["Tailwind CSS v4", "Design tokens via @theme, glass utilities, custom variants."],
  ["Framer Motion", "Layout, gesture, and AnimatePresence transitions."],
  ["GSAP-style choreography", "Easing curves tuned to Apple's [0.16,1,0.3,1]."],
  ["React Three Fiber", "Declarative WebGL — hero torus, transmission material."],
  ["@react-three/drei", "Environment, Float, MeshTransmissionMaterial."],
  ["Lenis", "Smooth scroll with reduced-motion fallback."],
  ["i18next + react-i18next", "AR / EN, with full RTL flip."],
  ["Vercel Analytics + Speed Insights", "Privacy-first product telemetry."],
  ["Zod", "Schema validation for the contact form."],
];

const ROUTES = [
  "/",
  "/about",
  "/projects",
  "/projects/$slug",
  "/contact",
  "/dev",
];

export const Route = createFileRoute("/dev")({
  head: () => ({
    meta: [
      { title: "Developer Mode — Abdelhamed Nada" },
      {
        name: "description",
        content: "What's running under the hood — architecture, stack, and libraries.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DevPage,
});

function DevPage() {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div aria-hidden className="aurora" />
      <section className="relative z-[1] px-4 pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <SectionHeader
              kicker={t("dev.title")}
              title="Under the hood."
              sub={t("dev.subtitle")}
            />
          </SectionReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <SectionReveal>
              <GlassCard className="p-8">
                <h3 className="font-display text-2xl">{t("dev.arch")}</h3>
                <ul className="mt-5 space-y-1 font-mono text-xs text-foreground/85">
                  <li>src/routes ────── file-based routes</li>
                  {ROUTES.map((r) => (
                    <li key={r} className="ms-4">
                      ├── {r}
                    </li>
                  ))}
                  <li>src/components ── design system primitives</li>
                  <li className="ms-4">├── glass-card · magnetic-button · text-morph</li>
                  <li className="ms-4">├── nav · footer · intro · whatsapp-fab</li>
                  <li className="ms-4">└── hero-canvas (R3F, lazy)</li>
                  <li>src/lib ──────── i18n · data · utils</li>
                  <li>src/locales ──── en.json · ar.json</li>
                </ul>
              </GlassCard>
            </SectionReveal>

            <SectionReveal delay={0.06}>
              <GlassCard className="p-8">
                <h3 className="font-display text-2xl">{t("dev.libs")}</h3>
                <ul className="mt-5 space-y-2.5">
                  {STACK.map(([n, d]) => (
                    <li key={n} className="grid gap-0.5">
                      <span className="text-sm font-medium">{n}</span>
                      <span className="text-xs text-muted-foreground">{d}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
