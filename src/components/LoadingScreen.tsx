// src/components/LoadingScreen.tsx
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.2, 0.9, 0.25, 1];

const CAPTIONS = [
  "Designing around your needs",
  "Finalising spatial flow",
  "Refining materials & finishes",
  "Preparing for build execution",
  "Crafted, not rushed",
] as const;

type Caption = (typeof CAPTIONS)[number];

function stableIndex(max: number) {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] % max;
  } catch {
    return Date.now() % max;
  }
}

function splitGraphemes(text: string) {
  return Array.from(text);
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();

  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  // init caption index
  useEffect(() => {
    const t = setTimeout(() => setIdx(stableIndex(CAPTIONS.length)), 0);
    return () => clearTimeout(t);
  }, []);

  // rotate caption
  useEffect(() => {
    if (reduce) return;
    const i = setInterval(() => setIdx((v) => (v + 1) % CAPTIONS.length), 1750);
    return () => clearInterval(i);
  }, [reduce]);

  // hold -> trigger exit (NO manual "done" timeout)
  useEffect(() => {
    const holdMs = reduce ? 650 : 3600;
    const t = setTimeout(() => setVisible(false), holdMs);
    return () => clearTimeout(t);
  }, [reduce]);

  const caption: Caption = useMemo(() => CAPTIONS[idx] ?? CAPTIONS[0], [idx]);

  const brandA = "WestBrook";
  const brandB = "Homes";
  const lettersA = useMemo(() => splitGraphemes(brandA), []);
  const lettersB = useMemo(() => splitGraphemes(brandB), []);

  return (
    <AnimatePresence mode="wait" onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] grid place-items-center bg-[var(--wb-bg)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {/* ─────────────── ATMOSPHERIC GLASS BACKDROP (NO BOX) ─────────────── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 backdrop-blur-[26px]"
              animate={reduce ? { opacity: 0.7 } : { opacity: [0.55, 0.8, 0.55] }}
              transition={reduce ? { duration: 0 } : { duration: 6.5, ease: "easeInOut", repeat: Infinity }}
            />

            <motion.div
              className="absolute -inset-[24%]"
              style={{
                background:
                  "radial-gradient(900px 520px at 50% 34%, rgba(255,255,255,0.14), transparent 62%)",
              }}
              animate={reduce ? {} : { x: [-18, 18, -18], y: [-12, 12, -12] }}
              transition={{ duration: 10.5, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-[24%]"
              style={{
                background:
                  "radial-gradient(860px 520px at 18% 18%, rgba(0,0,0,0.10), transparent 64%)",
              }}
              animate={reduce ? {} : { x: [16, -16, 16], y: [10, -10, 10] }}
              transition={{ duration: 12.5, ease: "easeInOut", repeat: Infinity }}
            />

            <motion.div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                opacity: 0.075,
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.14) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
              animate={
                reduce
                  ? { opacity: 0.075 }
                  : {
                      opacity: [0.055, 0.095, 0.055],
                      backgroundPosition: [
                        "0px 0px, 0px 0px",
                        "26px 18px, 26px 18px",
                        "0px 0px, 0px 0px",
                      ],
                    }
              }
              transition={{ duration: 9.5, ease: "easeInOut", repeat: Infinity }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(1200px_740px_at_50%_46%,transparent_54%,rgba(0,0,0,0.18))]" />

            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          {/* ─────────────── FLOATING BRAND CONTENT ─────────────── */}
          <motion.div
            className="relative flex flex-col items-center px-4 text-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: EASE }}
          >
            {/* LOGO */}
            <motion.div
              className="relative"
              animate={reduce ? { y: 0 } : { y: [0, -8, 0] }}
              transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity }}
            >
              <motion.div
                className="absolute -inset-10 rounded-[44px]"
                style={{
                  background: "radial-gradient(closest-side, rgba(176,141,87,0.18), transparent 72%)",
                }}
                animate={reduce ? { opacity: 0.35 } : { opacity: [0.18, 0.33, 0.18], scale: [0.98, 1.03, 0.98] }}
                transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
              />

              <img
                src="/img/logo.jfif"
                alt="WestBrook Homes"
                className="relative h-[72px] w-[72px] sm:h-[94px] sm:w-[94px] rounded-[22px] sm:rounded-[26px] shadow-[0_26px_120px_rgba(11,18,32,0.28)]"
              />
            </motion.div>

            {/* WORDMARK */}
            <div className="mt-7 w-full max-w-[92vw]">
              <h1 className="leading-[0.98] text-[clamp(30px,8vw,66px)] font-semibold tracking-[-0.03em] text-[color:var(--wb-ink)]">
                <span className="inline-flex flex-wrap justify-center">
                  {lettersA.map((ch, i) => (
                    <motion.span
                      key={`a-${i}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.55, ease: EASE_SOFT, delay: 0.12 + i * 0.02 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
                <span className="inline-block w-2 sm:w-3" />
                <span className="inline-flex flex-wrap justify-center">
                  {lettersB.map((ch, i) => (
                    <motion.span
                      key={`b-${i}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.55,
                        ease: EASE_SOFT,
                        delay: 0.18 + (lettersA.length + i) * 0.02,
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <div className="mx-auto mt-3 w-[min(560px,88vw)] h-px bg-[color:var(--wb-ink)]/18" />
            </div>

            {/* CAPTION */}
            <div className="mt-8 h-[26px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={caption}
                  className="text-[12.5px] sm:text-[14px] font-semibold tracking-[0.28em] sm:tracking-[0.34em] text-[color:var(--wb-ink)]/60"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE_SOFT }}
                >
                  {caption}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STATUS */}
            <motion.div
              className="mt-10 text-[11px] sm:text-[12px] tracking-[0.26em] uppercase text-[color:var(--wb-ink)]/78"
              animate={reduce ? { opacity: 1 } : { opacity: [0.68, 1, 0.68] }}
              transition={{ duration: 2.0, ease: "easeInOut", repeat: Infinity }}
            >
              Preparing your experience
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
