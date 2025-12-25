import { motion } from "framer-motion";
import {
  RiFileSearchLine,
  RiShieldCheckLine,
  RiMapPin2Line,
  RiScales3Line,
  RiCheckboxCircleLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

/* ✅ Strong, gun-point copy for WestBrook custom homes */
const PILLARS = [
  {
    no: "01",
    icon: <RiFileSearchLine />,
    title: "Built around your life",
    desc: "No templates. We design for your routines, privacy, light, and future needs — room by room.",
  },
  {
    no: "02",
    icon: <RiShieldCheckLine />,
    title: "Zero-surprise execution",
    desc: "Scope, specs, and decisions get locked early — so timelines don’t drift and quality doesn’t drop.",
  },
  {
    no: "03",
    icon: <RiMapPin2Line />,
    title: "Site-smart design",
    desc: "Sun path, setbacks, access, slope, utilities — the plan fits the land (and avoids costly rework).",
  },
  {
    no: "04",
    icon: <RiScales3Line />,
    title: "Pricing that makes sense",
    desc: "Clear cost breakup + honest trade-offs — you know what moves budget before we pour concrete.",
  },
];

const CHECKS = [
  "Lifestyle brief → space plan",
  "3D visuals + material palette",
  "Detailed estimate + scope lock",
  "Milestones + quality checks",
];

export default function WhyWestBrookSection() {
  return (
    <section className="relative py-12 sm:py-16">
      {/* theme glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-160px] h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/14 blur-3xl" />
        <div className="absolute right-[-120px] top-[120px] h-[260px] w-[260px] rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

            {/* ✅ KEEP THIS HEADING EXACTLY SAME */}
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
              WestBrook creates custom homes end-to-end — planned, priced, and built with clarity from day one.
              Every key decision is verified before execution begins.
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
                if it can’t be built cleanly within scope, timeline, and budget — it doesn’t move forward.
              </p>
            </motion.div>

            {/* Verified basics */}
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
            {/* ✅ MOBILE: premium vertical stack list (best readability) */}
            <div className="space-y-3 sm:hidden">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.no}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.06 }}
                  className="
                    relative overflow-hidden rounded-[22px]
                    border border-[color:var(--wb-ink)]/16
                    bg-white/65 backdrop-blur
                    shadow-[0_16px_48px_rgba(12,24,48,0.10)]
                  "
                >
                  <div className="flex gap-4 p-4">
                    {/* icon */}
                    <div
                      className="
                        grid h-11 w-11 shrink-0 place-items-center rounded-2xl
                        border border-[color:var(--wb-ink)]/26
                        bg-[color:var(--wb-ink)]/7 text-[color:var(--wb-ink)]
                      "
                    >
                      <span className="text-[20px]">{p.icon}</span>
                    </div>

                    {/* content */}
                    <div className="min-w-0">
                      <p className="text-[15.5px] font-extrabold leading-snug text-[color:var(--wb-ink)] break-normal whitespace-normal hyphens-none">
                        {p.title}
                      </p>
                      <p className="mt-1 text-[14.3px] leading-relaxed text-[color:var(--wb-ink)]/72 break-normal whitespace-normal hyphens-none">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  {/* number pill */}
                  <div className="absolute right-3 top-3 rounded-full border border-[color:var(--wb-ink)]/16 bg-white/70 px-3 py-1 text-[12px] font-extrabold tracking-[0.18em] text-[color:var(--wb-ink)]/65">
                    {p.no}
                  </div>

                  {/* subtle bottom hairline */}
                  <div className="h-[1px] w-full bg-[color:var(--wb-ink)]/10" />
                </motion.div>
              ))}
            </div>

            {/* ✅ DESKTOP/TABLET: 2×2 premium cards */}
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.no}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="
                    group relative rounded-[28px]
                    border border-[color:var(--wb-ink)]/18
                    bg-white/65 backdrop-blur p-6
                    shadow-[0_18px_55px_rgba(12,24,48,0.12)]
                    hover:shadow-[0_30px_95px_rgba(12,24,48,0.20)]
                    transition
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

                  <p className="mt-4 text-[16px] font-extrabold leading-snug text-[color:var(--wb-ink)] break-normal whitespace-normal hyphens-none">
                    {p.title}
                  </p>

                  <div className="mt-2 h-[2px] w-10 bg-[color:var(--wb-ink)]/45 group-hover:w-16 transition-all duration-300" />

                  <p className="mt-3 text-[14.6px] leading-relaxed text-[color:var(--wb-ink)]/72 break-normal whitespace-normal hyphens-none">
                    {p.desc}
                  </p>

                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
