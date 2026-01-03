// src/pages/About.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  // RiSparkling2Line,
  RiRuler2Line,
  RiShieldCheckLine,
  RiTimeLine,
  RiVerifiedBadgeLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function BlueHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-linear-to-r from-(--wb-accent-2) to-(--wb-accent) bg-clip-text text-transparent">
      {children}
    </span>
  );
}

type Value = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type Slide = {
  id: string;
  kind: "EXTERIOR" | "INTERIOR" | "HOME";
  title: string;
  sub: string;
  image: string;
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

export default function About() {
  const reduceMotion = useReducedMotion();

  const values: Value[] = [
    {
      icon: <RiRuler2Line className="text-xl" />,
      title: "Bespoke planning",
      desc: "Your routine drives the layout — never templates.",
    },
    {
      icon: <RiVerifiedBadgeLine className="text-xl" />,
      title: "Material clarity",
      desc: "Balanced palette, premium finishes, clean detailing.",
    },
    {
      icon: <RiTimeLine className="text-xl" />,
      title: "Trackable milestones",
      desc: "Clear stages, realistic timelines, consistent updates.",
    },
    {
      icon: <RiShieldCheckLine className="text-xl" />,
      title: "Quality checks",
      desc: "Craft reviewed from structure to final fit.",
    },
  ];

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "s1",
        kind: "EXTERIOR",
        title: "Signature exterior presence",
        sub: "Proportion-led • Quiet confidence",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
      },
      {
        id: "s2",
        kind: "HOME",
        title: "Light-first planning",
        sub: "Flow + daylight • Clean geometry",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90",
      },
      {
        id: "s3",
        kind: "INTERIOR",
        title: "Living Space",
        sub: "Layered Comfort",
        image:
          "/img/interior-2.jpg",
      },
      {
        id: "s4",
        kind: "EXTERIOR",
        title: "Jack Residence ",
        sub: "Crisp lines • Quiet luxury",
        image:
          "/img/jack.jpg",
      },
    ],
    []
  );

  // Slider state
  const [idx, setIdx] = useState(0);
  const active = slides[idx];

  const next = useCallback(() => setIdx((i) => clampIndex(i + 1, slides.length)), [slides.length]);
  const prev = useCallback(() => setIdx((i) => clampIndex(i - 1, slides.length)), [slides.length]);

  // Auto-advance (subtle)
  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setInterval(() => next(), 5200);
    return () => window.clearInterval(t);
  }, [next, reduceMotion]);

  return (
    <main className={cx("min-h-screen", "bg-(--wb-bg) text-(--wb-ink)")}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* ambient glows — same vibe as ExploreHomes */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -top-44 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-(--wb-ink)/10 blur-3xl" />
          <div className="absolute -right-44 top-20 h-[360px] w-[360px] rounded-full bg-(--wb-accent-2)/14 blur-3xl" />
          <div className="absolute -left-44 bottom-10 h-[300px] w-[300px] rounded-full bg-(--wb-accent)/12 blur-3xl" />
        </div>

        <div className="wb-container pt-14 pb-10 sm:pt-20 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}
            className="mx-auto max-w-[92ch] text-center"
          >
            {/* BANGING CAPTION */}
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-(--wb-border) bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-black/55 backdrop-blur">
              <RiSparkling2Line className="text-(--wb-ink)/55" />
              QUIET LUXURY • CUSTOM BUILT • CLEAN EXECUTION
            </div> */}

            {/* Better headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.95, ease: EASE, delay: 0.05 }}
              className="wb-serif mt-6 text-[34px] leading-[1.08] sm:text-[52px] lg:text-[64px]"
            >
              Designed to feel  <BlueHighlight>right</BlueHighlight>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: 0.12 }}
              className="mx-auto mt-5 max-w-[74ch] text-[15px] sm:text-[18px] leading-relaxed text-(--wb-ink)/70"
            >
              WestBrook designs and builds custom homes around how you live — layout, flow, light and
              materials — with a process that stays{" "}
              <BlueHighlight>calm</BlueHighlight>,{" "}
              <BlueHighlight>trackable</BlueHighlight>, and{" "}
              <BlueHighlight>premium</BlueHighlight>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: 0.18 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--wb-ink) px-6 py-3 text-[12px] font-extrabold tracking-[0.16em] text-white shadow-[0_18px_55px_rgba(12,24,48,0.22)] hover:shadow-[0_28px_85px_rgba(12,24,48,0.30)] transition"
              >
                START A CONVERSATION <RiArrowRightUpLine className="text-lg" />
              </a>

              <Link
                to="/explore-homes"
                className="inline-flex items-center justify-center rounded-2xl border border-(--wb-border) bg-white/60 px-6 py-3 text-[12px] font-extrabold tracking-[0.16em] text-(--wb-ink)/75 hover:text-(--wb-ink) hover:bg-white/80 transition backdrop-blur"
              >
                VIEW PORTFOLIO
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ORGANIZED GRID: SLIDER + CONTENT */}
      <section className="wb-container pb-18 sm:pb-22">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* SLIDER CARD (left) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}
            className="lg:col-span-5"
          >
            <div
              className={cx(
                "relative overflow-hidden rounded-3xl",
                "border border-(--wb-border) bg-white/40 backdrop-blur",
                "shadow-[0_18px_60px_rgba(12,24,48,0.10)]"
              )}
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-[10/12] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* blue wash (NOT black) */}
                <div className="absolute inset-0 bg-linear-to-t from-(--wb-ink)/35 via-(--wb-accent-2)/10 to-transparent opacity-70" />

                {/* Kind pill */}
                <div className="absolute left-5 top-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-[11px] font-extrabold tracking-[0.18em] text-white/90 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--wb-accent-2)/90" />
                    {active.kind}
                  </div>
                </div>

                {/* Arrows */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-white/10 p-2 text-white/90 backdrop-blur hover:bg-white/15 transition"
                >
                  <RiArrowLeftSLine className="text-2xl" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-white/10 p-2 text-white/90 backdrop-blur hover:bg-white/15 transition"
                >
                  <RiArrowRightSLine className="text-2xl" />
                </button>

                {/* Bottom caption */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id + "-cap"}
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                      className="inline-flex max-w-[92%] flex-col gap-1 rounded-2xl border border-white/16 bg-white/10 px-3.5 py-3 backdrop-blur"
                    >
                      <div className="wb-serif text-[20px] text-white leading-tight">{active.title}</div>
                      <div className="text-[13px] text-white/80">{active.sub}</div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Dots */}
                  <div className="mt-3 flex items-center gap-2">
                    {slides.map((s, i) => {
                      const on = i === idx;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          aria-label={`Go to slide ${i + 1}`}
                          onClick={() => setIdx(i)}
                          className={cx(
                            "h-2.5 w-2.5 rounded-full border transition",
                            on
                              ? "border-white/40 bg-(--wb-accent-2)/90"
                              : "border-white/25 bg-white/20 hover:bg-white/30"
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="h-[2px] w-full bg-linear-to-r from-(--wb-accent)/50 via-(--wb-accent-2)/45 to-transparent" />
            </div>
          </motion.div>

          {/* CONTENT CARD (right) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-(--wb-border) bg-white/55 backdrop-blur shadow-[0_18px_60px_rgba(12,24,48,0.10)] overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-(--wb-border) bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-black/55 backdrop-blur">
                  OUR APPROACH
                </div>

                <h2 className="wb-serif mt-4 text-[22px] sm:text-[28px]">
                  Premium design, <BlueHighlight>without the noise</BlueHighlight>.
                </h2>

                <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-(--wb-ink)/70">
                  We keep decisions intentional — proportion, materials, and execution — so your home feels
                  composed, not crowded. You’ll always know what’s happening, what’s next, and what matters.
                </p>

                {/* Mini highlight chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Light-led layouts", "Balanced materials", "Clean detailing", "Transparent stages"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-(--wb-border) bg-white/60 px-3 py-1.5 text-[12px] font-semibold text-(--wb-ink)/70 backdrop-blur"
                      >
                        <span className="bg-linear-to-r from-(--wb-accent-2) to-(--wb-accent) bg-clip-text text-transparent font-extrabold">
                          {t}
                        </span>
                      </span>
                    )
                  )}
                </div>

                {/* Value grid */}
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {values.map((v) => (
                    <div
                      key={v.title}
                      className="rounded-2xl border border-(--wb-border) bg-white/55 p-4 backdrop-blur"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl border border-(--wb-border) bg-white/60 p-2 text-(--wb-ink)/75">
                          {v.icon}
                        </div>
                        <div>
                          <p className="text-[13px] font-extrabold tracking-[0.08em] text-(--wb-ink)">
                            {v.title}
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-(--wb-ink)/65">
                            {v.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--wb-ink) px-5 py-3 text-[12px] font-extrabold tracking-[0.16em] text-white shadow-[0_18px_55px_rgba(12,24,48,0.22)] hover:shadow-[0_28px_85px_rgba(12,24,48,0.30)] transition"
                  >
                    BOOK A CONSULTATION <RiArrowRightUpLine className="text-lg" />
                  </a>

                  <Link
                    to="/process"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--wb-border) bg-white/60 px-5 py-3 text-[12px] font-extrabold tracking-[0.16em] text-(--wb-ink)/75 hover:text-(--wb-ink) hover:bg-white/80 transition backdrop-blur"
                  >
                    VIEW PROCESS
                  </Link>
                </div>
              </div>

              <div className="h-[2px] w-full bg-linear-to-r from-(--wb-accent)/50 via-(--wb-accent-2)/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="wb-container pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
          className="rounded-3xl border border-(--wb-border) bg-white/55 backdrop-blur shadow-[0_18px_60px_rgba(12,24,48,0.10)] overflow-hidden"
        >
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[76ch]">
              <div className="inline-flex items-center gap-2 rounded-full border border-(--wb-border) bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-black/55 backdrop-blur">
                NEXT STEP
              </div>
              <h3 className="wb-serif mt-4 text-[22px] sm:text-[28px]">
                Ready to build something <BlueHighlight>uniquely yours</BlueHighlight>?
              </h3>
              <p className="mt-2 text-(--wb-ink)/70 text-[14px] sm:text-[15px] leading-relaxed">
                Tell us what you need — we’ll guide the plan, the look, and the execution with a calm,
                premium process.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--wb-ink) px-6 py-3 text-[12px] font-extrabold tracking-[0.16em] text-white shadow-[0_18px_55px_rgba(12,24,48,0.22)] hover:shadow-[0_28px_85px_rgba(12,24,48,0.30)] transition"
              >
                CONTACT <RiArrowRightUpLine className="text-lg" />
              </a>
              <Link
                to="/explore-homes"
                className="inline-flex items-center justify-center rounded-2xl border border-(--wb-border) bg-white/60 px-6 py-3 text-[12px] font-extrabold tracking-[0.16em] text-(--wb-ink)/75 hover:text-(--wb-ink) hover:bg-white/80 transition backdrop-blur"
              >
                EXPLORE HOMES
              </Link>
            </div>
          </div>

          <div className="h-[2px] w-full bg-linear-to-r from-(--wb-accent)/50 via-(--wb-accent-2)/40 to-transparent" />
        </motion.div>
      </section>
    </main>
  );
}
