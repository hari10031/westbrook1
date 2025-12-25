// src/pages/Home/ProcessRoadmap.tsx
import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Step = {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: "a" | "b";
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────────
   Premium, architectural icons (no extra libraries)
   ───────────────────────────────────────────────────────────── */
function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M14.8 9.2 13.6 13.6 9.2 14.8 10.4 10.4 14.8 9.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 3v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M21 12h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 21v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 12h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconBlueprint() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3V4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M7 7h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 10h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 13h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconBuild() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M6 20V9.5L12 6l6 3.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 11h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7.5 14.5a5 5 0 1 1 3.9 1.9H10l-2 2H6v2H4v-2l3.5-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M16.8 8.2h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Steps (impactful + relatable headers)
   ───────────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    number: "01",
    label: "DISCOVERY",
    title: "We map your life first — then design around it",
    description:
      "We understand your routine, priorities, budget, and future plans — so every decision later feels obvious and aligned.",
    icon: <IconCompass />,
    accent: "a",
  },
  {
    number: "02",
    label: "DESIGN",
    title: "We perfect flow, light, and space — before we build",
    description:
      "Layouts, elevations, and details are refined with you until movement feels natural, storage is smart, and proportions feel premium.",
    icon: <IconBlueprint />,
    accent: "b",
  },
  {
    number: "03",
    label: "BUILD",
    title: "We build with discipline — timelines, checks, and clarity",
    description:
      "Clear milestones, quality gates, and progress updates keep the project steady — without surprises or last-minute chaos.",
    icon: <IconBuild />,
    accent: "a",
  },
  {
    number: "04",
    label: "HANDOVER",
    title: "You walk in confident — everything finished and verified",
    description:
      "Final inspections, detailing, and a clean handover — your home delivered exactly as planned, ready to live in.",
    icon: <IconKey />,
    accent: "b",
  },
];

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */
export default function ProcessRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const header = useMemo(
    () => ({
      initial: { opacity: 0, y: 14, filter: "blur(6px)" },
      animate: inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
      transition: (d = 0) => ({ duration: 0.75, ease: EASE, delay: d }),
    }),
    [inView]
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* ✅ NO BACKGROUND COLOR: only clean, premium, subtle overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* subtle grid only (no fill colors) */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(10,20,40,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,20,40,0.10) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* soft vignette using transparent black (no colored bg) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.05),transparent_55%)]" />
      </div>

      {/* Header */}
      <div className="wb-container">
        <div className="mx-auto max-w-[72ch] text-center">
          <motion.p
            {...header}
            transition={header.transition(0)}
            className="text-[11px] font-extrabold tracking-[0.34em] text-black/45"
          >
            THE WESTBROOK METHOD
          </motion.p>

          <motion.h2
            {...header}
            transition={header.transition(0.06)}
            className="wb-serif mt-3 text-[28px] leading-[1.08] sm:text-[38px] lg:text-[44px] text-[color:var(--wb-ink)]"
          >
            From vision to keys —{" "}
            <span className="relative inline-block">
              <span className="relative z-10">a disciplined build journey</span>
              <span className="absolute left-0 bottom-[4px] h-[8px] w-full rounded-full bg-[color:var(--wb-accent-2)]/18" />
            </span>
            .
          </motion.h2>

          <motion.p
            {...header}
            transition={header.transition(0.14)}
            className="mt-4 text-[14.5px] leading-relaxed text-black/60 sm:text-[15.5px]"
          >
            A clear, premium workflow that keeps decisions sharp, timelines steady, and quality
            uncompromised.
          </motion.p>
        </div>

        {/* Roadmap */}
        <div className="mt-10 sm:mt-12 lg:mt-14">
          <div className="relative">
            {/* Spine */}
            <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-[color:var(--wb-border)]/70 md:left-1/2 md:-translate-x-[1px]" />
            <motion.div
              className="absolute left-[18px] top-0 w-[2px] md:left-1/2 md:-translate-x-[1px]"
              initial={{ height: 0, opacity: 0.9 }}
              animate={inView ? { height: "100%", opacity: 1 } : { height: 0, opacity: 0.9 }}
              transition={{ duration: 2.1, ease: "easeOut", delay: 0.25 }}
              style={{
                background:
                  "linear-gradient(to bottom, rgba(27,79,214,0.0), rgba(27,79,214,0.65), rgba(11,42,111,0.55), rgba(27,79,214,0.0))",
              }}
            />

            <div className="space-y-7 sm:space-y-10 md:space-y-12">
              {STEPS.map((s, idx) => {
                const even = idx % 2 === 0;
                return (
                  <div
                    key={s.number}
                    className={cx(
                      "relative",
                      "md:flex md:items-center",
                      even ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Marker */}
                    <div className="absolute left-[18px] top-3 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                      <motion.div
                        initial={{ scale: 0.72, opacity: 0, rotate: -12 }}
                        animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                          delay: 0.18 + idx * 0.12,
                        }}
                        className="relative"
                      >
                        <div
                          className={cx(
                            "grid h-11 w-11 place-items-center rounded-full text-white font-extrabold text-[12px] shadow-[0_18px_40px_rgba(27,79,214,0.18)]",
                            s.accent === "a"
                              ? "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))]"
                              : "bg-[linear-gradient(135deg,var(--wb-accent-2),var(--wb-accent))]"
                          )}
                        >
                          {s.number}
                        </div>

                        <motion.div
                          initial={{ scale: 1, opacity: 0.45 }}
                          animate={inView ? { scale: 2.1, opacity: 0 } : {}}
                          transition={{
                            duration: 1.6,
                            ease: "easeOut",
                            delay: 0.36 + idx * 0.12,
                          }}
                          className={cx(
                            "absolute inset-0 rounded-full",
                            s.accent === "a"
                              ? "bg-[color:var(--wb-accent)]/22"
                              : "bg-[color:var(--wb-accent-2)]/22"
                          )}
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div
                      className={cx(
                        "pl-12 md:pl-0",
                        "md:w-[calc(50%-52px)]",
                        even ? "md:pr-10" : "md:pl-10"
                      )}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{
                          duration: 0.75,
                          ease: EASE,
                          delay: 0.22 + idx * 0.14,
                        }}
                        className={cx(
                          "group relative overflow-hidden rounded-[22px] border border-[color:var(--wb-border)]",
                          "bg-white/70 backdrop-blur",
                          "shadow-[0_18px_60px_rgba(11,18,32,0.10)] hover:shadow-[0_28px_90px_rgba(11,18,32,0.16)]",
                          "transition"
                        )}
                      >
                        {/* sheen */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                          style={{
                            background:
                              "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.6), transparent 44%), radial-gradient(circle at 80% 30%, rgba(27,79,214,0.14), transparent 52%)",
                          }}
                        />

                        <div className="relative p-4 sm:p-5 lg:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-[10px] font-extrabold tracking-[0.28em] text-black/45">
                                {s.label}
                              </div>
                              <div className="wb-serif mt-2 text-[18px] sm:text-[20px] lg:text-[22px] leading-tight text-[color:var(--wb-ink)]">
                                {s.title}
                              </div>
                            </div>

                            <div
                              className={cx(
                                "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border",
                                "bg-white/55 backdrop-blur",
                                s.accent === "a"
                                  ? "border-[color:var(--wb-accent)]/18 text-[color:var(--wb-accent)]"
                                  : "border-[color:var(--wb-accent-2)]/18 text-[color:var(--wb-accent-2)]"
                              )}
                            >
                              <motion.div
                                initial={{ rotate: -6, scale: 0.96 }}
                                whileHover={{ rotate: 0, scale: 1.02 }}
                                transition={{ duration: 0.35, ease: EASE }}
                              >
                                {s.icon}
                              </motion.div>
                            </div>
                          </div>

                          <p className="mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-black/60">
                            {s.description}
                          </p>

                          <div className="mt-5">
                            <div className="h-[2px] w-10 bg-[color:var(--wb-ink)]/18 group-hover:w-20 transition-all duration-300" />
                          </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
                      </motion.div>
                    </div>

                    <div className="hidden md:block md:w-[calc(50%-52px)]" />
                  </div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
              className="mt-10 text-center text-[13px] text-black/55"
            >
              Clear decisions. Clean execution. Confident handover.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
