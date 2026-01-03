// src/pages/Home/ProcessRoadmap.tsx
import React, { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Step = {
  number: string;
  label: string; // small heading
  title: string; // main heading
  description: string;
  icon: React.ReactNode;
  accent: "a" | "b";
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────────
   Icons (no extra libraries)
   ───────────────────────────────────────────────────────────── */
function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
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
   Steps (kept simple + clear)
   ───────────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    number: "01",
    label: "CONSULTATION",
    title: "We start by listening",
    description: "Your vision, routine, and must haves understood before we move ahead.",
    icon: <IconCompass />,
    accent: "a",
  },
  {
    number: "02",
    label: "DESIGN",
    title: "We lock the plan with you",
    description: "Layouts + 3D views so the home feels right on paper before it’s built.",
    icon: <IconBlueprint />,
    accent: "b",
  },
  {
    number: "03",
    label: "CONSTRUCTION",
    title: "We build with discipline",
    description: "Clear milestones, quality checks, and steady on-site execution.",
    icon: <IconBuild />,
    accent: "a",
  },
  {
    number: "04",
    label: "MOVE IN",
    title: "We hand over, complete",
    description: "Final inspection, finishing touches, and a clean key handover.",
    icon: <IconKey />,
    accent: "b",
  },
];

/* ─────────────────────────────────────────────────────────────
   Subtle tilt hover (kept)
   ───────────────────────────────────────────────────────────── */
const tiltHover = {
  rest: { rotateX: 0, rotateY: 0, y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    rotateX: -2,
    rotateY: 2,
    transition: { duration: 0.45, ease: EASE },
  },
};

export default function ProcessRoadmap() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  // Scroll-linked “progress spine”
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 26 });
  const spineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(progress, [0, 0.15, 1], [0, 1, 1]);

  const header = useMemo(
    () => ({
      initial: { opacity: 0, y: 14, filter: "blur(8px)" },
      animate: inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
      transition: (d = 0) => ({ duration: 0.78, ease: EASE, delay: d }),
    }),
    [inView]
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Premium animated atmosphere (still clean) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(10,20,40,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,20,40,0.10) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* animated soft orbs */}
        {!reduce && (
          <>
            <motion.div
              className="absolute -top-28 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(27,79,214,0.20), transparent 62%)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: EASE }}
            />
            <motion.div
              className="absolute -bottom-36 -right-40 h-[560px] w-[560px] rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle at 40% 40%, rgba(11,42,111,0.16), transparent 62%)",
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            />
            <motion.div
              className="absolute left-1/2 top-10 h-[220px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55), transparent 70%)",
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.05),transparent_55%)]" />
      </div>

      <div className="wb-container">
        {/* Header */}
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
            A clear path from first call to move-in.
          </motion.h2>

          <motion.p
            {...header}
            transition={header.transition(0.14)}
            className="mt-4 text-[14.5px] leading-relaxed text-black/60 sm:text-[15.5px]"
          >
            Simple steps. Clear updates. A finished home, delivered with care.
          </motion.p>
        </div>

        {/* Roadmap */}
        <div className="mt-10 sm:mt-12 lg:mt-14">
          <div className="relative">
            {/* spine base */}
            <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-[color:var(--wb-border)]/70 md:left-1/2 md:-translate-x-[1px]" />

            {/* scroll-progress spine */}
            <motion.div
              className="absolute left-[18px] top-0 w-[2px] md:left-1/2 md:-translate-x-[1px]"
              style={{
                height: spineHeight,
                background:
                  "linear-gradient(to bottom, rgba(27,79,214,0.0), rgba(27,79,214,0.70), rgba(11,42,111,0.60), rgba(27,79,214,0.0))",
              }}
            />

            {/* glow around spine (scroll linked) */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                className="absolute left-[18px] top-0 w-[18px] -translate-x-1/2 md:left-1/2 md:-translate-x-1/2"
                style={{ height: spineHeight, opacity: glowOpacity }}
              >
                <div className="h-full w-full rounded-full blur-xl bg-[color:var(--wb-accent-2)]/12" />
              </motion.div>
            )}

            <div className="space-y-7 sm:space-y-10 md:space-y-12">
              {STEPS.map((s, idx) => {
                const even = idx % 2 === 0;
                const delayBase = 0.18 + idx * 0.12;

                return (
                  <div
                    key={s.number}
                    className={cx(
                      "relative",
                      "md:flex md:items-center",
                      even ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* marker */}
                    <div className="absolute left-[18px] top-3 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                        animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                          delay: delayBase,
                        }}
                        className="relative"
                      >
                        <div
                          className={cx(
                            "grid h-11 w-11 place-items-center rounded-full text-white font-extrabold text-[12px]",
                            "shadow-[0_18px_40px_rgba(27,79,214,0.18)]",
                            s.accent === "a"
                              ? "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))]"
                              : "bg-[linear-gradient(135deg,var(--wb-accent-2),var(--wb-accent))]"
                          )}
                        >
                          {s.number}
                        </div>

                        {/* pulse ring */}
                        {!reduce && (
                          <motion.div
                            className={cx(
                              "absolute inset-0 rounded-full",
                              s.accent === "a"
                                ? "bg-[color:var(--wb-accent)]/22"
                                : "bg-[color:var(--wb-accent-2)]/22"
                            )}
                            initial={{ scale: 1, opacity: 0.45 }}
                            animate={inView ? { scale: 2.2, opacity: 0 } : {}}
                            transition={{
                              duration: 1.55,
                              ease: "easeOut",
                              delay: delayBase + 0.18,
                            }}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* content */}
                    <div
                      className={cx(
                        "pl-12 md:pl-0",
                        "md:w-[calc(50%-52px)]",
                        even ? "md:pr-10" : "md:pl-10"
                      )}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.8, ease: EASE, delay: delayBase + 0.06 }}
                      >
                        <motion.div
                          initial="rest"
                          animate="rest"
                          whileHover={reduce ? "rest" : "hover"}
                          variants={tiltHover}
                          className={cx(
                            "group relative overflow-hidden rounded-[22px]",
                            "border border-[color:var(--wb-border)] bg-white/70 backdrop-blur",
                            "shadow-[0_18px_60px_rgba(11,18,32,0.10)] hover:shadow-[0_30px_110px_rgba(11,18,32,0.16)]",
                            "transition"
                          )}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* premium sheen sweep */}
                          {!reduce && (
                            <motion.div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.25, ease: EASE }}
                            >
                              <motion.div
                                className="absolute -inset-y-10 -left-1/2 w-[55%] rotate-12"
                                style={{
                                  background:
                                    "linear-gradient(110deg, transparent, rgba(255,255,255,0.35), transparent)",
                                }}
                                animate={{ x: ["-120%", "120%"] }}
                                transition={{
                                  duration: 1.05,
                                  ease: EASE,
                                  repeat: Infinity,
                                  repeatDelay: 1.6,
                                }}
                              />
                            </motion.div>
                          )}

                          {/* soft highlight */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                            style={{
                              background:
                                "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.60), transparent 44%), radial-gradient(circle at 80% 30%, rgba(27,79,214,0.14), transparent 52%)",
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
                                style={{ transform: "translateZ(12px)" }}
                              >
                                <motion.div
                                  initial={{ rotate: -6, scale: 0.96 }}
                                  whileHover={reduce ? {} : { rotate: 0, scale: 1.05 }}
                                  transition={{ duration: 0.35, ease: EASE }}
                                >
                                  {s.icon}
                                </motion.div>
                              </div>
                            </div>

                            <p className="mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-black/60">
                              {s.description}
                            </p>

                            {/* ✅ removed underline bar completely */}
                          </div>

                          <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="hidden md:block md:w-[calc(50%-52px)]" />
                  </div>
                );
              })}
            </div>

            {/* footer line (kept, slightly cleaner) */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
              className="mt-10 text-center text-[13px] text-black/55"
            >
              Consultation → Design → Construction → Move-in.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
