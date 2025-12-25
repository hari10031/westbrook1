// src/pages/Home/CommercialSection.tsx
import type React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiGasStationLine,
  RiRestaurantLine,
  RiHospitalLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Card = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  to: string;
  image: string;
};

const CARDS: Card[] = [
  {
    title: "Fuel & Convenience",
    subtitle: "Gas stations • C-stores • Forecourt upgrades",
    icon: <RiGasStationLine />,
    to: "/services#fuel-convenience",
    image: "/img/wood.jpg",
  },
  {
    title: "Restaurants & Retail",
    subtitle: "Ground-up • Remodels • Tenant improvements",
    icon: <RiRestaurantLine />,
    to: "/services#restaurants-retail",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Medical & Urgent Care",
    subtitle: "Hospitals • ER • Urgent cares • Imaging",
    icon: <RiHospitalLine />,
    to: "/services#medical-healthcare",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function CommercialSection() {
  return (
    <section className="relative">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-140px] h-[340px] w-[640px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/12 blur-3xl" />
      </div>

      {/* header */}
      <div className="mx-auto max-w-[78ch] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/80"
        >
          COMMERCIAL DEVELOPMENT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.06 }}
          className="wb-serif mt-3 text-[34px] leading-[1.1] sm:text-[44px] text-[color:var(--wb-ink)]"
        >

          <span className="block">
            Building{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Dreams Into Reality</span>
              <span className="absolute left-0 bottom-[3px] h-[6px] w-full bg-[color:var(--wb-ink)]/22" />
            </span>
            .
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/78"
        >
          At Westbrook Homes, we believe that a home is more than just a structure—it's where life's most precious moments unfold. With decades of experience in luxury home building, we combine innovative design with timeless craftsmanship.
        </motion.p>
      </div>

      {/* cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: i * 0.07 }}
          >
            <Link
              to={c.to}
              className="group relative block overflow-hidden rounded-[28px]
              border border-[color:var(--wb-ink)]/18 bg-white/40 backdrop-blur
              shadow-[0_18px_55px_rgba(12,24,48,0.12)]
              hover:shadow-[0_34px_110px_rgba(12,24,48,0.22)]
              transition"
            >
              {/* image */}
              <div className="relative h-[300px]">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.78)] via-[rgba(8,16,34,0.22)] to-transparent" />
              </div>

              {/* content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white">
                      {c.icon}
                    </span>

                    <div>
                      <p className="text-[16px] font-extrabold text-white">
                        {c.title}
                      </p>
                      <p className="mt-1 text-[13.5px] text-white/80">
                        {c.subtitle}
                      </p>
                      <div className="mt-4 h-[2px] w-10 bg-white/65 group-hover:w-20 transition-all duration-300" />
                    </div>
                  </div>

                  <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white">
                    <RiArrowRightUpLine />
                  </span>
                </div>
              </div>

              {/* hover ring */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-0 ring-[color:var(--wb-ink)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-ink)]/10 transition" />
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-[13px] text-[color:var(--wb-ink)]/65">
        View full scope on Services.
      </p>
    </section>
  );
}
