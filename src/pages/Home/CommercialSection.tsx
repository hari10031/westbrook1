// src/pages/Home/CommercialSection.tsx
import type React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  RiPencilRuler2Line,
  RiShieldCheckLine,
  RiUserHeartLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Card = {
  title: string;
  subtitle: string;
  highlight: string;
  desc: string;
  icon: React.ReactNode;
  to: string;
  image: string;
};

const CARDS: Card[] = [
  {
    title: "Custom Design",
    subtitle: "Layouts • Elevations • Lifestyle-first planning",
    highlight: "Designed around you",
    desc: "We translate your requirements into a clean plan—practical, premium, and build-ready.",
    icon: <RiPencilRuler2Line />,
    to: "/services#custom-design",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Premium Quality",
    subtitle: "Materials • Finishes • Site discipline",
    highlight: "Built to last",
    desc: "Quality isn’t a claim—it’s a checklist. We keep the finish sharp and the process tight.",
    icon: <RiShieldCheckLine />,
    to: "/services#premium-quality",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Personalized Service",
    subtitle: "Clear updates • Timelines • Smooth handover",
    highlight: "Guided end-to-end",
    desc: "From first meeting to final keys—one team, one flow, no confusion.",
    icon: <RiUserHeartLine />,
    to: "/services#personalized-service",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
  },
];

function UnderlineInk({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-[3px] h-[7px] w-full rounded-full bg-[color:var(--wb-ink)]/22" />
    </span>
  );
}

function UnderlineSoft({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-[2px] h-[6px] w-full rounded-full bg-[color:var(--wb-accent-2)]/18" />
    </span>
  );
}

export default function CommercialSection() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const card = {
    rest: {
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: EASE },
    },
    hover: reduce
      ? { transition: { duration: 0.25 } }
      : {
          y: -8,
          scale: 1.015,
          rotate: -0.2,
          transition: { duration: 0.45, ease: EASE },
        },
  };

  const img = {
    rest: {
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
    hover: reduce
      ? { transition: { duration: 0.25 } }
      : {
          scale: 1.06,
          y: -6,
          transition: { duration: 0.7, ease: EASE },
        },
  };

  const underline = {
    rest: { width: "42px", opacity: 0.75 },
    hover: { width: "88px", opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };

  const sheen = {
    rest: { x: "-120%", opacity: 0 },
    hover: {
      x: "120%",
      opacity: 1,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section className="relative">
      {/* elevated background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-160px] h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/12 blur-3xl" />
        <div className="absolute right-[-140px] top-[120px] h-[320px] w-[320px] rounded-full bg-[color:var(--wb-accent-2)]/12 blur-3xl" />
      </div>

      {/* header */}
      <div className="mx-auto max-w-[84ch] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/80"
        >
          WESTBROOK HOMES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.06 }}
          className="wb-serif mt-3 text-[34px] leading-[1.08] sm:text-[46px] text-[color:var(--wb-ink)]"
        >
          Building <UnderlineInk>Dreams Into Reality</UnderlineInk>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
          className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/78"
        >
          A home isn’t just a structure—it’s where life happens. We align on your
          requirements, refine the design with you, then build with discipline,
          finish, and a confident handover.
        </motion.p>
      </div>

      {/* cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-6 md:grid-cols-3"
      >
        {CARDS.map((c, i) => (
          <motion.div key={c.title} variants={item}>
            <motion.div
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={card}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                to={c.to}
                className="group relative block overflow-hidden rounded-[30px]
                border border-[color:var(--wb-ink)]/18 bg-white/55 backdrop-blur
                shadow-[0_18px_55px_rgba(12,24,48,0.12)]
                hover:shadow-[0_38px_130px_rgba(12,24,48,0.24)]
                transition"
              >
                {/* top image */}
                <div className="relative h-[220px] sm:h-[260px]">
                  <motion.img
                    variants={img}
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  {/* readability overlay (stronger, premium) */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,16,34,0.86),rgba(8,16,34,0.28),rgba(8,16,34,0.10))]" />

                  {/* moving sheen */}
                  <motion.div
                    variants={sheen}
                    className="pointer-events-none absolute inset-y-0 left-0 w-[45%]
                      bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.30),transparent)]
                      rotate-[12deg]"
                  />

                  {/* top chip */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[11px] font-extrabold tracking-[0.10em] text-white/90 backdrop-blur">
                    <span className="text-[16px]">{c.icon}</span>
                    {c.title.toUpperCase()}
                  </div>

                  {/* bottom overlay content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="wb-serif text-[20px] leading-tight text-white sm:text-[22px]">
                          <UnderlineSoft>{c.highlight}</UnderlineSoft>
                        </div>
                        <div className="mt-1 text-[13px] font-semibold text-white/80">
                          {c.subtitle}
                        </div>

                        <motion.div
                          variants={underline}
                          className="mt-3 h-[2px] bg-white/75"
                        />
                      </div>

                      <motion.span
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white"
                        whileHover={reduce ? undefined : { rotate: 8 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <RiArrowRightUpLine />
                      </motion.span>
                    </div>
                  </div>

                  {/* premium edge vignette */}
                  <div className="pointer-events-none absolute inset-0 opacity-70 [box-shadow:inset_0_-40px_80px_rgba(0,0,0,0.25)]" />

                  {/* hover ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
                </div>

                {/* BODY (make heading BIG + dominant) */}
                <div className="p-5">
                  <h3 className="wb-serif text-[22px] sm:text-[24px] leading-tight text-[color:var(--wb-ink)]">
                    <span className="relative inline-block">
                      <span className="relative z-10">{c.title}</span>
                      <span className="absolute left-0 bottom-[3px] h-[7px] w-full rounded-full bg-[color:var(--wb-accent-2)]/25" />
                    </span>
                  </h3>

                  <p className="mt-1 text-[13px] font-semibold tracking-wide text-[color:var(--wb-ink)]/65">
                    {c.subtitle}
                  </p>

                  <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--wb-ink)]/75">
                    {c.desc}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold text-[color:var(--wb-ink)]">
                    Explore details
                    <span className="opacity-70 group-hover:opacity-100 transition">→</span>
                  </div>
                </div>
              </Link>

              {/* subtle floating glow under card */}
              {!reduce && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 -z-10 rounded-[34px] opacity-0 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(27,79,214,0.18), transparent 55%)",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-6 text-center text-[13px] text-[color:var(--wb-ink)]/65">
        Explore the full scope in Services.
      </p>
    </section>
  );
}
