// src/pages/Home/PartnersSection.tsx
import React, { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────────
   Icons (no libs) — simple, premium
   ───────────────────────────────────────────────────────────── */
function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h12" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-5" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}
function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2" />
      <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}
function IconRepeat() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

const fadeUp = (d = 0, reduce = false) => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(10px)" },
  show: reduce
    ? { opacity: 1, transition: { duration: 0.25, delay: d } }
    : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE, delay: d } },
});

type Reason = { icon: React.ReactNode; title: string; desc: string };
type Get = string;

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });
  const reduce = useReducedMotion();

  const reasons: Reason[] = useMemo(
    () => [
      {
        icon: <IconShield />,
        title: "Standards-led builds",
        desc: "Clear finish benchmarks, checks, and sign-offs — quality stays consistent.",
      },
      {
        icon: <IconClipboard />,
        title: "Predictable workflow",
        desc: "Defined scope, milestones, and handoffs — fewer revisions, less friction.",
      },
      {
        icon: <IconBolt />,
        title: "Faster decisions",
        desc: "Tight communication loop — approvals move, site time doesn’t get wasted.",
      },
      {
        icon: <IconRepeat />,
        title: "Long-term pipeline",
        desc: "If the fit is strong, we repeat — steady work, not one-off chaos.",
      },
    ],
    []
  );

  const whatYouGet: Get[] = useMemo(
    () => [
      "Clear scope & deliverables",
      "Faster approvals + fewer reworks",
      "Quality-first expectations",
      "Repeatable collaboration",
    ],
    []
  );

  return (
    <section ref={ref} className="relative py-12 sm:py-16">
      {/* premium, natural glow (no harsh blocks) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-240px] h-[420px] w-[980px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/6 blur-3xl" />
        <div className="absolute right-[-240px] top-[35%] h-[360px] w-[360px] rounded-full bg-[color:var(--wb-ink)]/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          {/* LEFT */}
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp(0, !!reduce)}>
            <p className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/70">
              PARTNERSHIPS
            </p>

            <h2 className="wb-serif mt-3 text-[38px] leading-[1.06] text-[color:var(--wb-ink)] sm:text-[58px]">
              Reasons to partner with <span className="italic">WestBrook</span>.
            </h2>

            <p className="mt-3 max-w-[65ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/72">
              WestBrook builds customized, user-specific homes. We partner with teams who want premium execution without
              day-to-day confusion.
            </p>

            {/* hairline divider for luxury feel */}
            <div className="mt-6 h-px w-[240px] bg-[color:var(--wb-ink)]/14" />

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                  className="group rounded-[22px] border border-[color:var(--wb-ink)]/12 bg-white/50 p-5 backdrop-blur-sm
                             shadow-[0_16px_50px_rgba(12,24,48,0.07)]
                             transition hover:-translate-y-[2px] hover:shadow-[0_22px_70px_rgba(12,24,48,0.10)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--wb-ink)]/14 bg-white/70 text-[color:var(--wb-ink)]">
                      {r.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14.5px] font-semibold text-[color:var(--wb-ink)]">{r.title}</div>
                      <div className="mt-1 text-[13.5px] leading-relaxed text-[color:var(--wb-ink)]/70">{r.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT (premium CTA card, compact) */}
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={fadeUp(0.12, !!reduce)}
            className="lg:sticky lg:top-24"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--wb-ink)]/14 bg-white/55 p-6 backdrop-blur
                            shadow-[0_22px_70px_rgba(12,24,48,0.10)]">
              {/* subtle sweep */}
              <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/8 blur-3xl" />

              <div className="relative">
                <p className="text-[12px] font-extrabold tracking-[0.28em] text-[color:var(--wb-ink)]/70">
                  WHAT PARTNERS GET
                </p>

                <h3 className="wb-serif mt-2 text-[26px] leading-[1.15] text-[color:var(--wb-ink)]">
                  Clean collaboration.
                </h3>

                <div className="mt-4 space-y-2">
                  {whatYouGet.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-[13.5px] text-[color:var(--wb-ink)]/72">
                      <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--wb-ink)]/14 bg-white/70 text-[color:var(--wb-ink)]">
                        <IconCheck />
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/partnerships"
                    className={cx(
                      "group inline-flex w-full items-center justify-center gap-2",
                      "rounded-full px-5 py-3 text-[14px] font-semibold",
                      "bg-[color:var(--wb-ink)] text-white",
                      "shadow-[0_16px_44px_rgba(12,24,48,0.16)]",
                      "transition hover:translate-y-[-1px] hover:shadow-[0_20px_52px_rgba(12,24,48,0.20)]"
                    )}
                  >
                    Partner with us
                    <span className="transition group-hover:translate-x-[2px]">
                      <IconArrowRight />
                    </span>
                  </Link>

                  <div className="text-center text-[12.5px] text-[color:var(--wb-ink)]/55">
                    Redirects to <span className="font-semibold text-[color:var(--wb-ink)]">/partnerships</span>
                  </div>
                </div>

                <div className="mt-5 text-[12.5px] text-[color:var(--wb-ink)]/55">
                  If your team cares about quality + clarity, we’ll work well together.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
