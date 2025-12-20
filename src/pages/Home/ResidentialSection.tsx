import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Kind = "Residential" | "Land";

type Property = {
  id: string;
  kind: Kind;
  title: string;
  city: string;
  state: string;
  price: string;
  image: string;
  summary: string; // still used in Featured right panel
  facts: string[];
  featured?: boolean;
};

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];
const AUTO_MS = 5200;

/* -------------------------------- data -------------------------------- */
/** ✅ Only exterior homes + land/plots. Unique images. */
const PROPERTIES: Property[] = [
  // Featured
  {
    id: "f1",
    kind: "Residential",
    featured: true,
    title: "Modern Family Residence",
    city: "Frisco",
    state: "TX",
    price: "$785,000",
    facts: ["4 Beds", "3 Baths", "2,480 Sq Ft", "2019 Build"],
    summary:
      "Bright open-plan interiors with a calm street presence and strong curb appeal.\nGreat for families who want space, comfort, and a clean long-term investment.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "f2",
    kind: "Residential",
    featured: true,
    title: "Suburban Executive Home",
    city: "Plano",
    state: "TX",
    price: "$645,000",
    facts: ["3 Beds", "2 Baths", "2,050 Sq Ft", "Move-in Ready"],
    summary:
      "A polished exterior and a practical layout that’s easy to compare during tours.\nIdeal for buyers who want a dependable, low-risk upgrade in a prime suburb.",
    image:
      "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "f3",
    kind: "Land",
    featured: true,
    title: "Build-Ready Residential Plot",
    city: "Celina",
    state: "TX",
    price: "$295,000",
    facts: ["0.42 Acres", "Road Access", "Utilities Nearby", "Clear Title"],
    summary:
      "Flat, accessible land with clean documentation and flexible build potential.\nA confident choice for custom home plans and long-term appreciation.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80",
  },

  // Mosaic items
  {
    id: "m1",
    kind: "Residential",
    title: "Contemporary Townhome",
    city: "Austin",
    state: "TX",
    price: "$520,000",
    facts: ["3 Beds", "2.5 Baths", "1,740 Sq Ft", "2021 Build"],
    summary:
      "Low-maintenance living with a modern facade and strong rental upside.\nGreat fit for professionals, first-time buyers, and long-term holds.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "m2",
    kind: "Residential",
    title: "Brick Classic, Updated Frontage",
    city: "McKinney",
    state: "TX",
    price: "$612,000",
    facts: ["4 Beds", "3 Baths", "2,260 Sq Ft", "Quiet Street"],
    summary:
      "Timeless exterior with a family-friendly layout and great curb appeal.\nA stable, comfortable option in a quiet street with steady demand.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "m3",
    kind: "Land",
    title: "Corner Lot Opportunity",
    city: "Prosper",
    state: "TX",
    price: "$365,000",
    facts: ["0.75 Acres", "Residential Zone", "Survey Ready", "Clear Title"],
    summary:
      "Premium parcel with flexibility for custom plans and future resale value.\nCorner positioning offers better access, visibility, and layout options.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "m4",
    kind: "Residential",
    title: "Bright Two-Story Home",
    city: "Irving",
    state: "TX",
    price: "$708,000",
    facts: ["4 Beds", "3 Baths", "2,410 Sq Ft", "2020 Build"],
    summary:
      "Refined exterior presence with a modern footprint and premium feel.\nPerfect if you want space and style without going over the top.",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "m5",
    kind: "Land",
    title: "Future Home Site",
    city: "Denton",
    state: "TX",
    price: "$248,000",
    facts: ["0.55 Acres", "Level Terrain", "Road Access", "Utilities Nearby"],
    summary:
      "Quiet surroundings with simple access and nearby utilities for smoother builds.\nA clean entry into land ownership with solid upside potential.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "m6",
    kind: "Residential",
    title: "Minimal Modern Exterior",
    city: "Round Rock",
    state: "TX",
    price: "$498,000",
    facts: ["3 Beds", "2 Baths", "1,920 Sq Ft", "Well-kept"],
    summary:
      "Simple, clean lines and a well-kept exterior—easy to personalize over time.\nGreat for smart upgrades and practical, everyday comfort.",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80",
  },
];

/* ================================ shared styles ================================ */
/** ✅ Transparent / glass chips everywhere */
const CHIP_GLASS =
  "rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[11px] font-extrabold text-white/90 backdrop-blur shadow-[0_10px_28px_rgba(11,18,32,0.18)]";

const PRICE_PILL =
  "rounded-full border border-white/35 bg-white/92 px-4 py-2 text-[13px] font-extrabold text-[color:var(--wb-ink)] shadow-[0_16px_40px_rgba(11,18,32,0.18)]";

const TITLE_PILL =
  "inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 backdrop-blur";

/* ================================ SECTION ================================ */
export default function ResidentialSection() {
  const featured = useMemo(
    () => PROPERTIES.filter((p) => p.featured).slice(0, 3),
    []
  );
  const rest = useMemo(() => PROPERTIES.filter((p) => !p.featured), []);

  return (
    <section className="relative">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <p className="text-[12px] font-extrabold tracking-[0.32em] text-black/45">
          RESIDENTIAL & LAND
        </p>
        <h2 className="wb-serif mt-3 text-[36px] sm:text-[44px] text-[color:var(--wb-ink)]">
          Clean selections — presented with clarity.
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-black/55">
          Location, pricing, and type — visible first. No clutter.
        </p>
      </div>

      <FeaturedCarousel items={featured} />

      {/* ✅ Banner REMOVED — only mosaic grid remains */}
      <MosaicGrid items={rest} />
    </section>
  );
}

/* ============================== Featured Carousel ============================== */
function FeaturedCarousel({ items }: { items: Property[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1) return;
    if (paused) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [items.length, paused]);

  const current = items[index];
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[36px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur shadow-[0_40px_110px_rgba(11,18,32,0.18)] mb-14"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="grid md:grid-cols-[1.15fr_0.85fr]"
        >
          {/* media */}
          <div className="relative h-[340px] sm:h-[420px] md:h-[460px] overflow-hidden">
            <motion.img
              src={current.image}
              alt={current.title}
              className="absolute inset-0 h-full w-full object-cover object-center"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.9, ease: EASE }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.34),transparent_60%)]" />

            {/* chips */}
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className={CHIP_GLASS}>{current.kind}</span>
              <span className={CHIP_GLASS}>
                📍 {current.city}, {current.state}
              </span>
            </div>

            {/* price */}
            <div className={["absolute right-5 bottom-5", PRICE_PILL].join(" ")}>
              {current.price}
            </div>

            {/* title */}
            <div className="absolute left-5 bottom-5 right-[150px]">
              <div className={TITLE_PILL}>
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                <p className="truncate text-[12.5px] font-extrabold text-white/92">
                  {current.title}
                </p>
              </div>
            </div>
          </div>

          {/* details panel */}
          <div className="p-7 sm:p-8 md:p-10">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-extrabold tracking-[0.28em] text-black/45">
                FEATURED
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[11px] font-extrabold text-black/60">
                <span className={paused ? "opacity-70" : "opacity-40"}>⏵</span>
                {paused ? "PAUSED" : "AUTO"}
              </span>
            </div>

            <h3 className="wb-serif mt-3 text-[28px] sm:text-[32px] text-[color:var(--wb-ink)] leading-tight">
              {current.title}
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {current.facts.slice(0, 4).map((f) => (
                <span
                  key={f}
                  className="rounded-xl border border-[color:var(--wb-border)] bg-white/75 px-3 py-2 text-[12px] font-extrabold text-black/65"
                >
                  {f}
                </span>
              ))}
            </div>

            <p className="mt-5 text-[13.5px] leading-relaxed text-black/55 whitespace-pre-line">
              {current.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Link to="/explorehomes" className="wb-btn-primary">
                View details
              </Link>
              <Link to="/contact" className="wb-btn-ghost bg-white/60 backdrop-blur">
                Schedule a call
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* arrows */}
      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--wb-border)] bg-white/60 backdrop-blur text-[color:var(--wb-ink)] hover:bg-white transition"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--wb-border)] bg-white/60 backdrop-blur text-[color:var(--wb-ink)] hover:bg-white transition"
      >
        →
      </button>

      {/* dots */}
      <div className="absolute bottom-4 right-5 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={[
              "h-2.5 w-2.5 rounded-full transition",
              i === index ? "bg-[color:var(--wb-accent)]" : "bg-black/15 hover:bg-black/25",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================== Mosaic Grid ============================== */
/** ✅ Same mosaic layout spans. NO banner above it. */
function MosaicGrid({ items }: { items: Property[] }) {
  const patterns = useMemo(
    () => [
      "xl:col-span-7 xl:row-span-2",
      "xl:col-span-5 xl:row-span-1",
      "xl:col-span-5 xl:row-span-1",
      "xl:col-span-4 xl:row-span-1",
      "xl:col-span-4 xl:row-span-1",
      "xl:col-span-4 xl:row-span-1",
      "xl:col-span-6 xl:row-span-1",
      "xl:col-span-6 xl:row-span-1",
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, margin: "-120px" }}
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[220px]"
    >
      {items.map((p, idx) => {
        const pat = patterns[idx % patterns.length];
        const tall = pat.includes("row-span-2");
        return (
          <div key={p.id} className={["md:col-span-1", pat].join(" ")}>
            <ImageCard p={p} tall={tall} />
          </div>
        );
      })}
    </motion.div>
  );
}

/* ============================== Image Card ============================== */
function ImageCard({ p, tall }: { p: Property; tall: boolean }) {
  const crop =
    p.kind === "Land"
      ? "object-top sm:object-center"
      : "object-[50%_42%] sm:object-center";

  const heightClass = tall ? "h-[520px] xl:h-full" : "h-[300px] xl:h-full";

  return (
    <Link
      to="/explorehomes"
      className={[
        "group relative block overflow-hidden rounded-[34px]",
        "border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl",
        "shadow-[0_28px_80px_rgba(11,18,32,0.14)] transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-[0_44px_120px_rgba(11,18,32,0.22)]",
        heightClass,
      ].join(" ")}
    >
      <motion.img
        src={p.image}
        alt={p.title}
        loading="lazy"
        className={["absolute inset-0 h-full w-full object-cover", crop].join(" ")}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.95, ease: EASE }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.34),transparent_60%)]" />

      {/* chips */}
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <span className={CHIP_GLASS}>{p.kind}</span>
        <span className={CHIP_GLASS}>
          📍 {p.city}, {p.state}
        </span>
      </div>

      {/* price */}
      <div className={["absolute right-4 bottom-4", PRICE_PILL].join(" ")}>
        {p.price}
      </div>

      {/* title */}
      <div className="absolute left-4 bottom-4 right-[132px] sm:right-[150px]">
        <div className={TITLE_PILL}>
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <p className="truncate text-[12.5px] font-extrabold text-white/92">
            {p.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
