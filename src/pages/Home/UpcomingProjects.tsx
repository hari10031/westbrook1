// src/pages/Home/UpcomingProjects.tsx
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Project = {
  image: string;
  alt: string;
};

const PROJECTS: Project[] = [
  {
    image: "/img/jack.jpg",
    alt: "Jack Project",
  },
  {
    image: "/img/wind-flower.jpeg",
    alt: "Wind Flower Project",
  },
  {
    image: "/img/apollo-house-img.jpg",
    alt: "Apollo House Project",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function UpcomingProjects() {
  return (
    <section className="relative">
      {/* ink glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-30 h-80 w-170 -translate-x-1/2 rounded-full bg-(--wb-ink)/10 blur-3xl" />
        <div className="absolute -right-35 top-35 h-65 w-65 rounded-full bg-(--wb-ink)/10 blur-3xl" />
      </div>

      {/* header */}
      <div className="mx-auto max-w-[78ch] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
          className="wb-serif mt-3 text-[34px] leading-[1.1] sm:text-[44px] text-(--wb-ink)"
        >
          Featured Homes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          className="mt-4 text-[15.5px] leading-relaxed text-(--wb-ink)/78"
        >
          Explore our portfolio of luxury custom homes, each one a testament to
          our commitment to excellence and attention to detail.
        </motion.p>
      </div>

      {/* image gallery */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((p) => (
          <motion.div
            key={p.alt}
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl
              shadow-[0_18px_55px_rgba(12,24,48,0.12)]
              hover:shadow-[0_38px_120px_rgba(12,24,48,0.22)]
              transition-shadow duration-500"
          >
            {/* image container */}
            <div className="relative aspect-16/9 overflow-hidden">
              <motion.img
                src={p.image}
                alt={p.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              />

              {/* subtle overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* premium edge vignette */}
              <div className="pointer-events-none absolute inset-0 opacity-50 [box-shadow:inset_0_-60px_100px_rgba(0,0,0,0.15)]" />
            </div>

            {/* hover ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-0 ring-(--wb-ink)/0 group-hover:ring-2 group-hover:ring-(--wb-ink)/10 transition-all duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
