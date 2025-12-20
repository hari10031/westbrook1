// src/pages/Home/WhyWestBrookSection.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrustStrip from "./WhyWestBrookSection";
import {
  RiSearchEyeLine,
  RiFileList3Line,
  RiRoadMapLine,
  RiUserHeartLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

const WHY = [
  {
    icon: <RiSearchEyeLine />,
    title: "Clarity-first shortlists",
    desc: "We filter aggressively so you only see properties that match your budget, location, and timeline.",
  },
  {
    icon: <RiFileList3Line />,
    title: "Verified documentation",
    desc: "Titles, surveys, zoning, and utilities are checked before you waste time or money.",
  },
  {
    icon: <RiRoadMapLine />,
    title: "Local market guidance",
    desc: "We explain what really matters: growth pockets, resale potential, and risk factors.",
  },
  {
    icon: <RiUserHeartLine />,
    title: "Buyer-first support",
    desc: "No pressure, no upselling — just calm guidance from shortlist to closing.",
  },
];

export default function WhyWestBrookSection() {
  return (
    <section className="relative">
      {/* Trust strip (top) */}
      <TrustStrip />

      {/* Why content */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left */}
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.32em] text-black/45">
            WHY WESTBROOK
          </p>
          <h2 className="wb-serif mt-3 text-[36px] sm:text-[44px] text-[color:var(--wb-ink)]">
            Trust built on process, not promises.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-black/55">
            Buying real estate shouldn’t feel overwhelming. We simplify decisions
            with verified listings, clean paperwork, and clear next steps —
            so you move forward with confidence.
          </p>

          <div className="mt-6 flex gap-3">
            <Link to="/contact" className="wb-btn-primary">
              Get a shortlist
            </Link>
            <Link to="/explorehomes" className="wb-btn-ghost bg-white/60 backdrop-blur">
              Explore listings
            </Link>
          </div>
        </div>

        {/* Right cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-[color:var(--wb-border)]
                bg-white/55 backdrop-blur p-6
                shadow-[0_22px_60px_rgba(11,18,32,0.10)]"
            >
              <div className="flex gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl
                  border border-[color:var(--wb-border)]
                  bg-white/70 text-[color:var(--wb-ink)]">
                  {w.icon}
                </div>

                <div>
                  <p className="text-[16px] font-extrabold text-[color:var(--wb-ink)]">
                    {w.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                    {w.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
