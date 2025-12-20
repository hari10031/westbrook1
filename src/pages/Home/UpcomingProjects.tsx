// src/pages/Home/UpcomingProjects.tsx
import type React from "react";
import { motion } from "framer-motion";
import {
  RiMapPin2Line,
  RiTimeLine,
  RiArrowRightUpLine,
  RiStackLine,
  RiHome4Line,
  RiLandscapeLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type UpcomingProject = {
  title: string;
  location: string;
  distanceOrEta: string;
  summary: string;
  badges: string[];
  image: string;
  icon: React.ReactNode;
};

const PROJECTS: UpcomingProject[] = [
  {
    title: "East Dallas Townhomes",
    location: "Dallas, TX • off Forney Rd",
    distanceOrEta: "10 mins from Downtown Dallas",
    summary:
      "Modern townhomes with commuter convenience, clean layouts, and strong demand pockets nearby.",
    badges: ["Townhomes", "East Dallas", "Near Downtown"],
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80",
    icon: <RiHome4Line />,
  },
  {
    title: "Verified Plots Release",
    location: "DFW Area",
    distanceOrEta: "Launching Soon",
    summary:
      "Plots shortlisted with access clarity, utilities readiness, and straightforward next steps.",
    badges: ["Plots", "Access Ready", "Utilities"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80",
    icon: <RiLandscapeLine />,
  },
  {
    title: "Homes Collection",
    location: "North Dallas",
    distanceOrEta: "Next Pipeline",
    summary:
      "Family-friendly homes focused on livability, practical layouts, and stable growth signals.",
    badges: ["Homes", "Family", "Growth Pockets"],
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1800&q=80",
    icon: <RiStackLine />,
  },
];

export default function UpcomingProjects() {
  return (
    <section className="relative">
      {/* ink glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[320px] w-[680px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
        <div className="absolute right-[-140px] top-[140px] h-[260px] w-[260px] rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
      </div>

      {/* header */}
      <div className="mx-auto max-w-[78ch] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/80"
        >
          UPCOMING PROJECTS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
          className="wb-serif mt-3 text-[34px] leading-[1.1] sm:text-[44px] text-[color:var(--wb-ink)]"
        >
          What’s launching next
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/78"
        >
          A quick preview of what’s in the pipeline — shortlisted locations and formats
          worth watching.
        </motion.p>
      </div>

      {/* better cards */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 + i * 0.07 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-[30px]
              border border-[color:var(--wb-ink)]/18 bg-white/40 backdrop-blur
              shadow-[0_18px_55px_rgba(12,24,48,0.12)]
              hover:shadow-[0_38px_120px_rgba(12,24,48,0.22)]
              transition"
          >
            {/* IMAGE */}
            <div className="relative h-[260px]">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.82)] via-[rgba(8,16,34,0.20)] to-transparent" />

              {/* floating meta pill */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-white backdrop-blur">
                <span className="text-[18px]">{p.icon}</span>
                <span className="text-[12px] font-extrabold tracking-[0.12em]">
                  UPCOMING
                </span>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[18px] font-extrabold text-[color:var(--wb-ink)]">
                    {p.title}
                  </p>

                  {/* underline accent */}
                  <div className="mt-2 h-[2px] w-10 bg-[color:var(--wb-ink)]/45 group-hover:w-16 transition-all duration-300" />
                </div>

                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl
                  border border-[color:var(--wb-ink)]/18 bg-white/55 text-[color:var(--wb-ink)]/80
                  group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition"
                  aria-hidden="true"
                >
                  <RiArrowRightUpLine />
                </div>
              </div>

              {/* location + eta row */}
              <div className="mt-4 grid gap-2">
                <div className="flex items-center gap-2 text-[13.5px] text-[color:var(--wb-ink)]/75">
                  <RiMapPin2Line />
                  <span className="font-bold">{p.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[13.5px] text-[color:var(--wb-ink)]/70">
                  <RiTimeLine />
                  <span>{p.distanceOrEta}</span>
                </div>
              </div>

              <p className="mt-4 text-[14.8px] leading-relaxed text-[color:var(--wb-ink)]/76">
                {p.summary}
              </p>

              {/* badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {p.badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-[color:var(--wb-ink)]/18 bg-white/55
                      px-3 py-1 text-[12px] font-extrabold text-[color:var(--wb-ink)]/75"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* hover ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
