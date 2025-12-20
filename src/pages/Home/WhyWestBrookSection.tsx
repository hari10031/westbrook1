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
    <section className="relative py-16">
      {/* theme-aligned navy glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-150px] h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/14 blur-3xl" />
        <div className="absolute right-[-120px] top-[120px] h-[260px] w-[260px] rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
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
            className="wb-serif mt-3 text-[36px] leading-[1.08] sm:text-[48px] text-[color:var(--wb-ink)]"
          >
            Trust is{" "}
            <span className="relative inline-block">
              <span className="relative z-10">verified</span>
              <span className="absolute left-0 bottom-[4px] h-[7px] w-full bg-[color:var(--wb-ink)]/22" />
            </span>
            , not claimed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/78"
          >
            We reduce uncertainty by screening fundamentals, explaining trade-offs clearly,
            and keeping every step structured.
          </motion.p>

          {/* Our rule */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
            className="mt-6 rounded-[22px] border border-[color:var(--wb-ink)]/20 bg-white/55 backdrop-blur p-4
              shadow-[0_16px_45px_rgba(12,24,48,0.10)]"
          >
            <p className="text-[14.5px] leading-relaxed text-[color:var(--wb-ink)]/88">
              <span className="font-extrabold underline decoration-[color:var(--wb-ink)]/70 underline-offset-[6px]">
                Our rule:
              </span>{" "}
              if a deal can’t be verified and explained clearly, it doesn’t make the shortlist.
            </p>
          </motion.div>

          {/* What we verify */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
            className="mt-4 rounded-[22px] border border-[color:var(--wb-ink)]/20 bg-[color:var(--wb-ink)]/6 p-4"
          >
            <p className="text-[12px] font-extrabold tracking-[0.28em] text-[color:var(--wb-ink)]/80">
              WHAT WE VERIFY (BASICS)
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {CHECKS.map((c) => (
                <div
                  key={c}
                  className="group flex items-start gap-2 rounded-2xl border border-[color:var(--wb-ink)]/18
                    bg-white/55 px-3 py-3 transition hover:bg-white/70"
                >
                  <span className="mt-[2px] text-[color:var(--wb-ink)]/90 group-hover:scale-[1.06] transition">
                    <RiCheckboxCircleLine />
                  </span>
                  <p className="text-[13.5px] font-bold leading-snug text-[color:var(--wb-ink)]/85">
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative min-h-[190px] rounded-[28px]
                border border-[color:var(--wb-ink)]/18
                bg-white/60 backdrop-blur p-6
                shadow-[0_18px_55px_rgba(12,24,48,0.12)]
                hover:shadow-[0_30px_95px_rgba(12,24,48,0.20)]
                transition"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-extrabold tracking-[0.22em] text-[color:var(--wb-ink)]/60">
                  {p.no}
                </p>

                <div
                  className="grid h-11 w-11 place-items-center rounded-2xl
                  border border-[color:var(--wb-ink)]/28
                  bg-[color:var(--wb-ink)]/7 text-[color:var(--wb-ink)]
                  group-hover:bg-[color:var(--wb-ink)]/12 transition"
                >
                  <span className="text-[20px]">{p.icon}</span>
                </div>
              </div>

              <p className="mt-4 text-[16px] font-extrabold text-[color:var(--wb-ink)]">
                {p.title}
              </p>

              <div className="mt-2 h-[2px] w-10 bg-[color:var(--wb-ink)]/45 group-hover:w-16 transition-all duration-300" />

              <p className="mt-3 text-[14.6px] leading-relaxed text-[color:var(--wb-ink)]/72">
                {p.desc}
              </p>

              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
