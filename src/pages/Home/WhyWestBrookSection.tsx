// src/pages/Home/WhyWestBrookSection.tsx
import { motion, useReducedMotion } from "framer-motion";
import {
  RiFileSearchLine,
  RiShieldCheckLine,
  RiMapPin2Line,
  RiScales3Line,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

const PILLARS = [
  {
    no: "01",
    icon: <RiFileSearchLine />,
    title: "Designed for your life",
    desc: "Planned around light, privacy, flow, and future needs.",
  },
  {
    no: "02",
    icon: <RiShieldCheckLine />,
    title: "Tight execution",
    desc: "Scope and specifications are fixed early.",
  },
  {
    no: "03",
    icon: <RiMapPin2Line />,
    title: "Built for your site",
    desc: "Orientation, access, and setbacks guide the plan.",
  },
  {
    no: "04",
    icon: <RiScales3Line />,
    title: "Clear pricing",
    desc: "Transparent costs with informed trade-offs.",
  },
];

export default function WhyWestBrookSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-14 sm:py-18 lg:py-22">
      {/* subtle atmosphere (no “background blocks”) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-56 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/8 blur-3xl" />
        <div className="absolute -right-40 top-20 h-[360px] w-[360px] rounded-full bg-[color:var(--wb-ink)]/6 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* centered header (kept) */}
        <div className="mx-auto max-w-[72ch] text-center">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
            className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/65"
          >
            WHY WESTBROOK
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
            className="wb-serif mt-3 text-[34px] leading-[1.04] sm:text-[48px] text-[color:var(--wb-ink)]"
          >
            Trust is{" "}
            <span className="relative inline-block">
              <span className="relative z-10">verified</span>
              <span className="absolute left-0 bottom-[4px] h-[8px] w-full bg-[color:var(--wb-ink)]/16" />
            </span>
            , not claimed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            className="mt-5 mx-auto max-w-[60ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/72"
          >
            We build custom homes end-to-end — planned deliberately, priced clearly,
            and executed with discipline.
          </motion.p>
        </div>

        {/* =========================
            DESKTOP / TABLET (2x2 -> 4x1)
           ========================= */}
        <div className="relative mt-12 hidden sm:block">
          {/* baseline only on large screens where it looks premium */}
          <div className="hidden lg:block absolute left-0 right-0 top-[26px] h-px bg-[color:var(--wb-ink)]/14" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.no}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.07 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="
                  relative rounded-[22px]
                  border border-[color:var(--wb-ink)]/16
                  bg-white/60 backdrop-blur
                  shadow-[0_18px_55px_rgba(12,24,48,0.08)]
                  hover:shadow-[0_28px_90px_rgba(12,24,48,0.14)]
                  transition
                "
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] font-extrabold tracking-[0.24em] text-[color:var(--wb-ink)]/55">
                      {p.no}
                    </div>

                    <div
                      className="
                        grid h-11 w-11 place-items-center rounded-full
                        border border-[color:var(--wb-ink)]/20
                        bg-white text-[color:var(--wb-ink)]
                      "
                    >
                      <span className="text-[18px]">{p.icon}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-[16px] font-extrabold text-[color:var(--wb-ink)]">
                    {p.title}
                  </div>

                  <p className="mt-2 text-[14.4px] leading-relaxed text-[color:var(--wb-ink)]/70">
                    {p.desc}
                  </p>

                  <div className="mt-4 h-px w-10 bg-[color:var(--wb-ink)]/18" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================
            MOBILE: CLEAN TIMELINE
           ========================= */}
        <div className="relative mt-10 sm:hidden">
          {/* vertical spine */}
          <div className="absolute left-[18px] top-1 bottom-1 w-px bg-[color:var(--wb-ink)]/18" />

          <div className="space-y-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.no}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.06 }}
                className="relative pl-12"
              >
                {/* marker */}
                <div className="absolute left-[18px] top-2 -translate-x-1/2">
                  <div
                    className="
                      grid h-10 w-10 place-items-center rounded-full
                      border border-[color:var(--wb-ink)]/22
                      bg-white text-[color:var(--wb-ink)]
                      shadow-[0_14px_40px_rgba(12,24,48,0.10)]
                    "
                  >
                    <span className="text-[18px]">{p.icon}</span>
                  </div>
                </div>

                {/* content */}
                <div
                  className="
                    rounded-[18px]
                    border border-[color:var(--wb-ink)]/14
                    bg-white/60 backdrop-blur
                    shadow-[0_16px_46px_rgba(12,24,48,0.08)]
                  "
                >
                  <div className="p-4">
                    <div className="text-[11px] font-extrabold tracking-[0.24em] text-[color:var(--wb-ink)]/55">
                      {p.no}
                    </div>

                    <div className="mt-1 text-[15.5px] font-extrabold text-[color:var(--wb-ink)]">
                      {p.title}
                    </div>

                    <p className="mt-1.5 text-[14px] leading-relaxed text-[color:var(--wb-ink)]/70">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* OUR RULE (highlighted, premium) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          className="mt-14 text-center"
        >
          <div className="mx-auto max-w-[66ch]">
            <div className="h-px w-full bg-[color:var(--wb-ink)]/14" />

            <p className="py-5 text-[15px] leading-relaxed text-[color:var(--wb-ink)]/85">
              <span className="font-extrabold">Our rule:</span>{" "}
              if scope, cost, or timeline isn’t clear — we pause and resolve it before moving.
            </p>

            <div className="h-px w-full bg-[color:var(--wb-ink)]/14" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
