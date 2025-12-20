// src/pages/About.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   Utils
   ───────────────────────────────────────────────────────────── */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** ✅ deterministic PRNG (no Math.random during render) */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Particle = {
  s: number; // size
  x: number; // left %
  y: number; // top %
  d: number; // duration
  a: number; // delay
  o: number; // opacity
};

function FloatingParticles({ particles }: { particles: Particle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--wb-accent-2)]/10"
          style={{
            width: `${p.s}px`,
            height: `${p.s}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.o,
            filter: "blur(44px)",
            animation: `wbFloat ${p.d}s ease-in-out infinite`,
            animationDelay: `${p.a}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reveal on scroll
   ───────────────────────────────────────────────────────────── */
function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("wb-in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   Inline Icons (no react-icons)
   ───────────────────────────────────────────────────────────── */
function IconArrowRight() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l1.2 4.5L18 8l-4.8 1.5L12 14l-1.2-4.5L6 8l4.8-1.5L12 2Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l.9 3.3L9 17.5l-3.1 1.1L5 22l-.9-3.4L1 17.5l3.1-1.2L5 13Z"
      />
    </svg>
  );
}
function IconHome() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}
function IconShield() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 12.5l1.7 1.7 3.8-4"
      />
    </svg>
  );
}
function IconCompass() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.5 9.5l-1.4 4.2-4.2 1.4 1.4-4.2 4.2-1.4Z"
      />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 5 9-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l9 5 9-5" />
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2c1 1 2.5 1 3.5 0l2.5-2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l4-4h4l2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12l-4-4h-4l-2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8l-2 2 2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l2 2-2 2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Components
   ───────────────────────────────────────────────────────────── */
function SoftPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(27,79,214,0.16)] bg-[linear-gradient(135deg,rgba(27,79,214,0.08),rgba(11,42,111,0.04))] px-3 py-1 text-xs font-extrabold text-black/60">
      {label}
    </span>
  );
}

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
};

function FeatureCard({ f, delay }: { f: Feature; delay: number }) {
  return (
    <div
      data-reveal
      className={cx(
        "group relative overflow-hidden rounded-[22px] border border-[color:var(--wb-border)]",
        "bg-white/65 backdrop-blur p-5 sm:p-6",
        "shadow-[0_16px_40px_rgba(11,18,32,0.10)] transition-all duration-500",
        "hover:-translate-y-2 hover:bg-white/80"
      )}
      style={{
        opacity: 0,
        transform: "translateY(22px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(520px_240px_at_25%_0%,rgba(27,79,214,0.18),transparent_60%)]" />

      <div className="relative flex items-start gap-4">
        <div
          className={cx(
            "grid h-12 w-12 place-items-center rounded-2xl border border-[color:var(--wb-border)]",
            "bg-white/80 text-[color:var(--wb-accent)]",
            "shadow-[0_12px_24px_rgba(11,18,32,0.08)]"
          )}
        >
          {f.icon}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[color:var(--wb-ink)]">
              {f.title}
            </h3>
            <span className="inline-flex items-center rounded-full border border-[color:var(--wb-border)] bg-white/70 px-2.5 py-1 text-[11px] font-extrabold text-black/50">
              {f.tag}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-black/55">{f.desc}</p>
        </div>
      </div>
    </div>
  );
}

type Step = {
  k: string;
  title: string;
  desc: string;
  bullets: string[];
};

function StepCard({ step, idx, delay }: { step: Step; idx: number; delay: number }) {
  const left = idx % 2 === 0;

  return (
    <div
      data-reveal
      className="relative"
      style={{
        opacity: 0,
        transform: "translateY(22px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* fixed grid: center column constant, dot centered */}
      <div className="grid gap-4 sm:grid-cols-[1fr_64px_1fr] sm:items-stretch">
        {/* Left spacer */}
        <div className={cx(left ? "" : "hidden sm:block")} />

        {/* Center dot column (global line is outside) */}
        <div className="relative hidden sm:flex items-stretch justify-center">
          <div className="relative w-[64px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(27,79,214,0.22)] bg-white/80 backdrop-blur shadow-[0_12px_24px_rgba(11,18,32,0.10)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--wb-accent-2)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right spacer */}
        <div className={cx(left ? "hidden sm:block" : "")} />

        {/* Card */}
        <div className={cx("sm:col-span-1", left ? "sm:col-start-1" : "sm:col-start-3")}>
          <div
            className={cx(
              "group relative overflow-hidden rounded-[22px] border border-[color:var(--wb-border)]",
              "bg-white/65 backdrop-blur p-5 sm:p-6",
              "shadow-[0_16px_40px_rgba(11,18,32,0.10)]"
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(520px_240px_at_30%_0%,rgba(27,79,214,0.16),transparent_60%)]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-black/50">
                  STEP {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="text-[11px] font-extrabold tracking-[0.22em] text-[color:var(--wb-accent)]">
                  {step.k}
                </div>
              </div>

              <h4 className="mt-3 text-[16px] sm:text-[18px] font-extrabold text-[color:var(--wb-ink)]">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-black/55">{step.desc}</p>

              <div className="mt-4 grid gap-2">
                {step.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[color:var(--wb-accent-2)]">
                      <IconCheck />
                    </span>
                    <p className="text-sm leading-6 text-black/60">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile dot */}
          <div className="sm:hidden mt-4 flex justify-center">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(27,79,214,0.22)] bg-white/75 backdrop-blur shadow-[0_12px_24px_rgba(11,18,32,0.10)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--wb-accent-2)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function About() {
  const rootRef = useRevealOnScroll();

  const particles = useMemo<Particle[]>(() => {
    const rnd = mulberry32(777331);
    return Array.from({ length: 14 }).map(() => ({
      s: Math.floor(rnd() * 140 + 70),
      x: rnd() * 100,
      y: rnd() * 100,
      d: rnd() * 10 + 16,
      a: rnd() * 5,
      o: rnd() * 0.45 + 0.25,
    }));
  }, []);

  const features = useMemo<Feature[]>(
    () => [
      {
        icon: <IconCompass />,
        title: "Curated choices, not confusion",
        tag: "Curation",
        desc: "We shortlist options that actually match your lifestyle and budget—so you don’t waste weekends on wrong sites.",
      },
      {
        icon: <IconShield />,
        title: "Verified guidance end-to-end",
        tag: "Trust",
        desc: "Clear checkpoints, transparent communication, and help through the full journey—viewing to closing.",
      },
      {
        icon: <IconLayers />,
        title: "Premium feel in every detail",
        tag: "Quality",
        desc: "From layout flow to finishing touches, we focus on homes that feel calm, modern and built to last.",
      },
      {
        icon: <IconHandshake />,
        title: "Partnerships that scale",
        tag: "JV",
        desc: "Land owners & collaborators: we align on design, timelines and outcomes with a clean, structured process.",
      },
    ],
    []
  );

  const steps = useMemo<Step[]>(
    () => [
      {
        k: "DISCOVER",
        title: "We understand what you really want",
        desc: "A short conversation to capture your goal, budget, preferred localities, and timeline.",
        bullets: ["Budget + locality fitment", "Lifestyle needs (work, commute, schools)", "Shortlist criteria locked"],
      },
      {
        k: "CURATE",
        title: "We curate & share a clean shortlist",
        desc: "You get a focused set of options with key details—no endless scrolling, no random listings.",
        bullets: ["Only high-signal options", "Clear pros/cons", "Schedule visits faster"],
      },
      {
        k: "VISIT",
        title: "Site visits with clarity",
        desc: "We coordinate visits and help you compare options logically—layout, light, access, and long-term value.",
        bullets: ["Compare like-for-like", "Spot hidden issues early", "Make decisions faster"],
      },
      {
        k: "CLOSE",
        title: "Smooth closing & handover",
        desc: "From negotiation to paperwork and next steps, we keep things clean and predictable.",
        bullets: ["Negotiation support", "Paperwork checklist", "Handover & follow-ups"],
      },
    ],
    []
  );

  return (
    <main ref={rootRef} className="relative min-h-screen overflow-hidden bg-[var(--wb-bg)]">
      <style>{`
        @keyframes wbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(26px, -26px) scale(1.06); }
          50% { transform: translate(-18px, 18px) scale(0.94); }
          75% { transform: translate(16px, 24px) scale(1.03); }
        }
        @keyframes wbGradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        [data-reveal] {
          transition: opacity 850ms ease-out, transform 850ms ease-out;
        }
        .wb-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        .wb-grad {
          background: linear-gradient(135deg, var(--wb-accent) 0%, var(--wb-accent-2) 55%, var(--wb-accent) 100%);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: wbGradientShift 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { transition: none !important; }
          .wb-grad { animation: none !important; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_340px_at_16%_0%,rgba(27,79,214,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(820px_320px_at_86%_10%,rgba(11,42,111,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_360px_at_50%_120%,rgba(27,79,214,0.08),transparent_60%)]" />
      <FloatingParticles particles={particles} />

      {/* HERO */}
      <section className="relative">
        <div className="wb-container py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div
                data-reveal
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)]",
                  "bg-white/70 px-3 py-1.5 backdrop-blur"
                )}
                style={{ opacity: 0, transform: "translateY(14px)", transitionDelay: "90ms" }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white">
                  <IconSpark />
                </span>
                <span className="text-[11px] font-extrabold tracking-[0.26em] text-black/55">WESTBROOK ESTATES</span>
              </div>

              <h1
                data-reveal
                className="mt-4 wb-serif text-3xl font-bold tracking-tight text-[color:var(--wb-ink)] sm:text-5xl"
                style={{ opacity: 0, transform: "translateY(18px)", transitionDelay: "160ms" }}
              >
                Not just properties — <span className="wb-grad">a better way</span> to choose.
              </h1>

              <p
                data-reveal
                className="mt-4 max-w-2xl text-sm leading-6 text-black/55 sm:text-lg"
                style={{ opacity: 0, transform: "translateY(18px)", transitionDelay: "240ms" }}
              >
                WestBrook helps you explore premium residences and plots with clarity. We curate, verify, guide, and keep
                the process calm — so you make confident decisions without noise.
              </p>

              <div data-reveal className="mt-6 flex flex-wrap gap-2" style={{ opacity: 0, transform: "translateY(18px)", transitionDelay: "320ms" }}>
                <SoftPill label="Verified listings" />
                <SoftPill label="Premium residences" />
                <SoftPill label="Plots & investments" />
                <SoftPill label="JV partnerships" />
              </div>

              <div data-reveal className="mt-7 flex flex-wrap items-center gap-2" style={{ opacity: 0, transform: "translateY(18px)", transitionDelay: "400ms" }}>
                <Link
                  to="/explore-homes"
                  className={cx(
                    "group inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                    "text-sm font-extrabold shadow-[0_16px_34px_rgba(27,79,214,0.22)]",
                    "hover:brightness-110 transition"
                  )}
                >
                  Explore homes
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrowRight />
                  </span>
                </Link>

                <Link
                  to="/partnerships"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "border border-[color:var(--wb-border)] bg-white/75 backdrop-blur",
                    "text-sm font-extrabold text-black/65 hover:bg-white/90 transition"
                  )}
                >
                  Partnerships
                </Link>

                <Link
                  to="/contact"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "border border-[color:var(--wb-border)] bg-white/55 backdrop-blur",
                    "text-sm font-extrabold text-black/55 hover:bg-white/80 transition"
                  )}
                >
                  Get a callback
                </Link>
              </div>
            </div>

            {/* Right hero card */}
            <div
              data-reveal
              className={cx(
                "relative overflow-hidden rounded-[26px] border border-[color:var(--wb-border)]",
                "bg-white/65 backdrop-blur p-6 sm:p-7",
                "shadow-[0_22px_60px_rgba(11,18,32,0.12)]"
              )}
              style={{ opacity: 0, transform: "translateY(18px)", transitionDelay: "260ms" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_320px_at_50%_0%,rgba(27,79,214,0.16),transparent_60%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.26em] text-black/55">
                  OUR PROMISE
                </div>

                <div className="mt-4 grid gap-3">
                  {[
                    { icon: <IconHome />, t: "Premium options", d: "Homes & plots that feel modern, calm and valuable." },
                    { icon: <IconShield />, t: "Transparency", d: "Clear updates, clean checklists, no confusion." },
                    { icon: <IconCompass />, t: "Guidance", d: "We help you compare and decide, not just browse." },
                  ].map((x) => (
                    <div key={x.t} className="flex items-start gap-3 rounded-2xl border border-[color:var(--wb-border)] bg-white/70 p-4">
                      <div className="mt-0.5 text-[color:var(--wb-accent)]">{x.icon}</div>
                      <div>
                        <div className="text-[14px] font-extrabold text-[color:var(--wb-ink)]">{x.t}</div>
                        <div className="mt-1 text-sm leading-6 text-black/55">{x.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Fast shortlists", "Site visit support", "Closing checklist"].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-[rgba(27,79,214,0.16)] bg-[linear-gradient(135deg,rgba(27,79,214,0.08),rgba(11,42,111,0.04))] px-3 py-1 text-xs font-extrabold text-black/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.22),transparent)]" />
        </div>
      </section>

      {/* WHY WESTBROOK */}
      <section className="relative">
        <div className="wb-container pb-14 sm:pb-18">
          <div className="mx-auto max-w-4xl text-center">
            <div
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/65 px-4 py-2 backdrop-blur"
              style={{ opacity: 0, transform: "translateY(14px)", transitionDelay: "90ms" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
              <span className="text-xs font-extrabold tracking-[0.22em] text-black/55">WHY US</span>
            </div>

            <h2
              data-reveal
              className="mt-4 wb-serif text-2xl font-bold text-[color:var(--wb-ink)] sm:text-4xl"
              style={{ opacity: 0, transform: "translateY(14px)", transitionDelay: "160ms" }}
            >
              Built for people who want clarity.
            </h2>

            <p
              data-reveal
              className="mt-2 text-sm leading-6 text-black/55 sm:text-base"
              style={{ opacity: 0, transform: "translateY(14px)", transitionDelay: "240ms" }}
            >
              If you like clean design, straight answers, and a calm process — you’ll feel at home with WestBrook.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {features.map((f, idx) => (
              <FeatureCard key={f.title} f={f} delay={110 + idx * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="relative">
        <div className="wb-container pb-14 sm:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <div
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/65 px-4 py-2 backdrop-blur"
              style={{ opacity: 0, transform: "translateY(14px)", transitionDelay: "90ms" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
              <span className="text-xs font-extrabold tracking-[0.22em] text-black/55">PROCESS</span>
            </div>

            <h2
              data-reveal
              className="mt-4 wb-serif text-2xl font-bold text-[color:var(--wb-ink)] sm:text-4xl"
              style={{ opacity: 0, transform: "translateY(14px)", transitionDelay: "160ms" }}
            >
              A clean journey — from first call to keys.
            </h2>
          </div>

          {/* ✅ Global rail wrapper: this is what makes the line truly CONNECT */}
          <div className="relative mt-10">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 sm:block">
              {/* glow */}
              <div className="absolute inset-y-0 left-1/2 w-[12px] -translate-x-1/2 bg-[color:var(--wb-accent)]/10 blur-xl" />
              {/* solid line */}
              <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-[color:var(--wb-accent)]/35" />
              {/* gradient shine */}
              <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom,transparent,rgba(27,79,214,0.55),transparent)]" />
            </div>

            <div className="grid gap-6">
              {steps.map((s, idx) => (
                <StepCard key={s.k} step={s} idx={idx} delay={120 + idx * 90} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative pb-16 sm:pb-24">
        <div className="wb-container">
          <div
            data-reveal
            className={cx(
              "relative overflow-hidden rounded-[28px] border border-[color:var(--wb-border)]",
              "bg-white/65 backdrop-blur p-7 sm:p-10",
              "shadow-[0_22px_60px_rgba(11,18,32,0.12)]"
            )}
            style={{ opacity: 0, transform: "translateY(18px)", transitionDelay: "120ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_320px_at_50%_0%,rgba(27,79,214,0.18),transparent_60%)]" />

            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.26em] text-black/55">
                  NEXT STEP
                </div>
                <h3 className="mt-3 wb-serif text-2xl sm:text-3xl font-bold text-[color:var(--wb-ink)]">
                  Explore, shortlist, and decide — the calm way.
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-6 text-black/55">
                  Browse premium residences & plots, and schedule a call whenever you’re ready.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <Link
                  to="/explore-homes"
                  className={cx(
                    "group inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                    "text-sm font-extrabold shadow-[0_16px_34px_rgba(27,79,214,0.22)]",
                    "hover:brightness-110 transition"
                  )}
                >
                  Explore homes
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrowRight />
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "border border-[color:var(--wb-border)] bg-white/70 backdrop-blur",
                    "text-sm font-extrabold text-black/65 hover:bg-white/90 transition"
                  )}
                >
                  Get a callback
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-black/45">
            © {new Date().getFullYear()} WestBrook Estates
          </div>
        </div>
      </section>
    </main>
  );
}
