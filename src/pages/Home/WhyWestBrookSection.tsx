import { motion } from "framer-motion";
import {
  RiFileSearchLine,
  RiShieldCheckLine,
  RiMapPin2Line,
  RiScales3Line,
  RiCheckboxCircleLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

const PILLARS = [
  {
    no: "01",
    icon: <RiFileSearchLine />,
    title: "Verification before visits",
    desc: "We screen fundamentals first — so you don’t waste weekends on weak options.",
  },
  {
    no: "02",
    icon: <RiShieldCheckLine />,
    title: "Risk flags surfaced early",
    desc: "Approvals, access, ambiguity — we call it out upfront, not after you’re invested.",
  },
  {
    no: "03",
    icon: <RiMapPin2Line />,
    title: "Local reality explained",
    desc: "Approach roads, livability, noise, utilities, and future impact — clearly explained.",
  },
  {
    no: "04",
    icon: <RiScales3Line />,
    title: "Pricing logic made clear",
    desc: "We justify price using comps + demand signals + trade-offs — no pressure tactics.",
  },
];

const CHECKS = [
  "Title flow & ownership chain",
  "Survey / boundaries / access",
  "Approvals, zoning & land-use",
  "Utilities: water, power, drainage",
];

export default function WhyWestBrookSection() {
  return (
    <section className="relative py-14 sm:py-16">
      {/* theme glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-150px] h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/14 blur-3xl" />
        <div className="absolute right-[-120px] top-[120px] h-[260px] w-[260px] rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/80"
          >
            WHY WESTBROOK
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
            className="wb-serif mt-3 text-[34px] leading-[1.06] sm:text-[48px] text-[color:var(--wb-ink)]"
          >
            Trust is{" "}
            <span className="relative inline-block">
              <span className="relative z-10">verified</span>
              <span className="absolute left-0 bottom-[4px] h-[8px] w-full bg-[color:var(--wb-ink)]/22" />
            </span>
            , not claimed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="mt-4 max-w-[62ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/78"
          >
            We shortlist only what can be checked, explained, and defended — before you spend time or emotion.
          </motion.p>

          {/* Our rule */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
            className="mt-5 rounded-[22px] border border-[color:var(--wb-ink)]/20 bg-white/60 backdrop-blur p-4
              shadow-[0_16px_45px_rgba(12,24,48,0.10)]"
          >
            <p className="text-[14.5px] leading-relaxed text-[color:var(--wb-ink)]/88">
              <span className="font-extrabold underline decoration-[color:var(--wb-ink)]/70 underline-offset-[6px]">
                Our rule:
              </span>{" "}
              if it can’t be verified and explained clearly, it doesn’t make the shortlist.
            </p>
          </motion.div>

          {/* basics as chips (small + scanable) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
            className="mt-4"
          >
            <p className="text-[12px] font-extrabold tracking-[0.28em] text-[color:var(--wb-ink)]/70">
              VERIFIED BASICS
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {CHECKS.map((c) => (
                <span
                  key={c}
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-[color:var(--wb-ink)]/16 bg-white/60
                    px-3 py-2
                    text-[12.8px] font-extrabold text-[color:var(--wb-ink)]/82
                    break-normal whitespace-normal hyphens-none
                  "
                >
                  <RiCheckboxCircleLine className="text-[color:var(--wb-ink)]/70" />
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* mobile fade hint */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-white/90 to-transparent sm:hidden" />

          <div
            className="
              grid gap-5 sm:grid-cols-2
              max-sm:flex max-sm:gap-4 max-sm:overflow-x-auto
              max-sm:snap-x max-sm:snap-mandatory max-sm:px-1 max-sm:pb-3
              max-sm:[scrollbar-width:none] max-sm:[-ms-overflow-style:none]
            "
          >
            {/* hide scrollbar (webkit) */}
            <style>{`
              @media (max-width: 639px){
                .wb-hidebar::-webkit-scrollbar{ display:none; }
              }
            `}</style>

            <div className="contents wb-hidebar">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.no}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="
                    group relative min-h-[190px] rounded-[28px]
                    border border-[color:var(--wb-ink)]/18
                    bg-white/65 backdrop-blur p-6
                    shadow-[0_18px_55px_rgba(12,24,48,0.12)]
                    hover:shadow-[0_30px_95px_rgba(12,24,48,0.20)]
                    transition
                    max-sm:min-w-[92%] max-sm:snap-start
                  "
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-extrabold tracking-[0.22em] text-[color:var(--wb-ink)]/60">
                      {p.no}
                    </p>

                    <div
                      className="
                        grid h-11 w-11 place-items-center rounded-2xl
                        border border-[color:var(--wb-ink)]/28
                        bg-[color:var(--wb-ink)]/7 text-[color:var(--wb-ink)]
                        group-hover:bg-[color:var(--wb-ink)]/12 transition
                      "
                    >
                      <span className="text-[20px]">{p.icon}</span>
                    </div>
                  </div>

                  {/* TITLE (fix vertical letter breaking) */}
                  <p
                    className="
                      mt-4 text-[16px] font-extrabold leading-snug text-[color:var(--wb-ink)]
                      break-normal whitespace-normal hyphens-none
                    "
                  >
                    {p.title}
                  </p>

                  <div className="mt-2 h-[2px] w-10 bg-[color:var(--wb-ink)]/45 group-hover:w-16 transition-all duration-300" />

                  {/* DESC (fix vertical letter breaking) */}
                  <p
                    className="
                      mt-3 text-[14.6px] leading-relaxed text-[color:var(--wb-ink)]/72
                      break-normal whitespace-normal hyphens-none
                    "
                  >
                    {p.desc}
                  </p>

                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-2 text-center text-[12.5px] text-[color:var(--wb-ink)]/55 sm:hidden">
            Swipe to view all →
          </p>
        </div>
      </div>
    </section>
  );
}
