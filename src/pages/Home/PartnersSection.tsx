// src/pages/Home/PartnersSection.tsx
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Partner = {
  name: string;
  logo: string; // image path or URL
  href?: string; // optional link
};

const PARTNERS: Partner[] = [
  {
    name: "Chase",
    logo: "/img/chase1.svg",
    href: "https://www.chase.com/",
  },
  {
    name: "Builders Capital",
    logo: "/img/bulid1.svg",
    href: "https://www.builderscapital.com/",
  },
  {
    name: "Fidelity National Title",
    logo: "/img/fidelity.svg",
    href: "https://www.fntic.com/",
  },
  {
    name: "Winston Properties",
    logo: "/img/winston.svg",
  },
];

export default function PartnersSection() {
  return (
    <section className="relative">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/8 blur-3xl" />
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
          PARTNERS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
          className="wb-serif mt-3 text-[34px] sm:text-[44px] leading-[1.1] text-[color:var(--wb-ink)]"
        >
          Trusted collaborators
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/75"
        >
          Lenders, builders, and title partners we coordinate with to keep deals
          compliant, efficient, and predictable.
        </motion.p>
      </div>

      {/* logos */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
        className="mt-10 rounded-[28px] border border-[color:var(--wb-ink)]/14
          bg-white/55 backdrop-blur
          shadow-[0_18px_55px_rgba(12,24,48,0.10)]"
      >
        <div
          className="grid items-center divide-y divide-[color:var(--wb-ink)]/10
          sm:grid-cols-2 sm:divide-y-0 sm:divide-x
          lg:grid-cols-4"
        >
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center px-6 py-8"
            >
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p.name}
                  className="group relative w-full max-w-[220px] flex justify-center"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-14 w-auto object-contain opacity-70 grayscale
                      transition duration-300
                      group-hover:opacity-100 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute -bottom-3 left-1/2 h-[2px] w-10 -translate-x-1/2
                    bg-[color:var(--wb-ink)]/25 opacity-0
                    group-hover:opacity-100 group-hover:w-16 transition-all duration-300"
                  />
                </a>
              ) : (
                <div
                  aria-label={p.name}
                  className="group relative w-full max-w-[220px] flex justify-center"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-14 w-auto object-contain opacity-70 grayscale
                      transition duration-300
                      group-hover:opacity-100 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute -bottom-3 left-1/2 h-[2px] w-10 -translate-x-1/2
                    bg-[color:var(--wb-ink)]/25 opacity-0
                    group-hover:opacity-100 group-hover:w-16 transition-all duration-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
