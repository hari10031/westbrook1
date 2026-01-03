// src/pages/ExploreHomes.tsx
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine } from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type Project = {
  id: string;
  title: string;
  tag: string;      // ✅ better tags
  blurb: string;    // ✅ nicer short caption
  image: string;
};

const HOMES: Project[] = [
  {
    id: "jack",
    title: "Jack Residence",
    tag: "Signature",
    blurb: "Crisp lines • Everyday luxury",
    image: "/img/jack.jpg",
  },
  {
    id: "luxury-villa-1",
    title: "Luxury Villa",
    tag: "Estate",
    blurb: "Resort calm • Statement silhouette",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "modern-residence",
    title: "Modern Residence",
    tag: "Modern",
    blurb: "Glass + stone • Clean geometry",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "contemporary-home",
    title: "Contemporary Home",
    tag: "Bespoke",
    blurb: "Bright, open • Quiet confidence",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "courtyard-build",
    title: "Courtyard Build",
    tag: "Courtyard",
    blurb: "Private green • Light-filled core",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2200&q=90",
  },
];

const INTERIORS: Project[] = [
  {
    id: "interior-kitchen",
    title: "Modern Kitchen",
    tag: "Kitchen",
    blurb: "Bright counters • Seamless storage",
    image: "/img/interior-2.jpg",
  },
  {
    id: "interior-living",
    title: "Signature Living",
    tag: "Living",
    blurb: "Soft layers • Effortless comfort",
    image: "/img/living-room.jpg",
  },
  {
    id: "interior-bedroom",
    title: "Luxury Bedroom",
    tag: "Bedroom",
    blurb: "Hotel calm • Warm textures",
    image: "/img/interior-3.jpg",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function normalizeImageSrc(src: string) {
  if (!src) return src;
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

function fallbackSvgDataUri(label: string) {
  const safe = (label || "Image")
    .slice(0, 28)
    .replace(/&/g, "and")
    .replace(/</g, "")
    .replace(/>/g, "");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#0b1220"/>
        <stop offset="1" stop-color="#111a2e"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="52%" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="44" fill="rgba(255,255,255,0.82)">${safe}</text>
    <text x="50%" y="60%" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="20" fill="rgba(255,255,255,0.55)">Preview unavailable</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function TagPill({ tag }: { tag: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/20 px-3 py-1 text-[11px] font-extrabold tracking-[0.16em] text-white/85 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-(--wb-accent-2)/80" />
      {tag.toUpperCase()}
    </div>
  );
}

export default function ExploreHomes() {
  const reduceMotion = useReducedMotion();

  const combined = useMemo(() => [...HOMES, ...INTERIORS], []);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const current = combined[idx];

  const openAt = (absoluteIndex: number) => {
    setIdx(absoluteIndex);
    setOpen(true);
  };
  const close = () => setOpen(false);

  const prev = () => setIdx((i) => (i === 0 ? combined.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === combined.length - 1 ? 0 : i + 1));

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, combined.length]);

  // only load/scroll-in animation; hover effects are CSS-only
  const v = {
    card: {
      hidden: { opacity: 0, y: 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
      },
    },
  } as const;

  function Card({
    p,
    absoluteIndex,
    tone,
  }: {
    p: Project;
    absoluteIndex: number;
    tone: "homes" | "interiors";
  }) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);

    const src = errored ? fallbackSvgDataUri(p.title) : normalizeImageSrc(p.image);

    return (
      <motion.button
        variants={v.card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        onClick={() => openAt(absoluteIndex)}
        className={cx(
          "group relative overflow-hidden rounded-2xl sm:rounded-3xl text-left outline-none",
          "border border-(--wb-border) bg-white/22 backdrop-blur",
          "shadow-[0_18px_55px_rgba(12,24,48,0.10)]",
          "transition-all duration-500",
          // ✅ premium hover effects (NOT framer hover animation)
          "hover:shadow-[0_45px_140px_rgba(12,24,48,0.22)] hover:border-(--wb-accent-2)/35",
          "focus-visible:ring-2 focus-visible:ring-(--wb-accent-2)/35"
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* skeleton */}
          <div
            className={cx(
              "absolute inset-0",
              "bg-linear-to-r from-(--wb-ink)/[0.04] via-(--wb-accent-2)/[0.10] to-(--wb-ink)/[0.04]",
              "animate-pulse",
              loaded ? "opacity-0" : "opacity-100"
            )}
            aria-hidden="true"
          />

          {/* image */}
          <img
            src={src}
            alt={p.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setErrored(true);
              setLoaded(true);
            }}
            className={cx(
              "h-full w-full object-cover",
              // ✅ subtle hover zoom to highlight image
              "transition-transform duration-[900ms] ease-out will-change-transform",
              "group-hover:scale-[1.045]"
            )}
            style={{
              opacity: loaded ? 1 : 0,
              filter: loaded ? "blur(0px)" : "blur(10px)",
              transition: reduceMotion ? "none" : "opacity 450ms ease, filter 450ms ease",
            }}
          />

          {/* ✅ refined overlay (only a touch, image stays hero) */}
          <div
            className={cx(
              "pointer-events-none absolute inset-0",
              "bg-linear-to-t from-black/45 via-black/10 to-transparent",
              "opacity-70 transition-opacity duration-500",
              "group-hover:opacity-85"
            )}
          />

          {/* ✅ top-left tag (clean, not too many) */}
          <div className="absolute left-4 top-4">
            <TagPill tag={p.tag} />
          </div>

          {/* ✅ bottom caption (nicer, still short) */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="inline-flex max-w-[92%] flex-col gap-1 rounded-2xl border border-white/14 bg-black/18 px-3.5 py-2.5 backdrop-blur">
              <div className="wb-serif text-[18px] sm:text-[20px] leading-tight text-white">
                {p.title}
              </div>
              <div className="text-[12px] font-semibold tracking-[0.02em] text-white/70">
                {p.blurb}
              </div>
            </div>
          </div>

          {/* ✅ blue ring */}
          <div
            className={cx(
              "pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl",
              "ring-1 ring-white/10 transition-[box-shadow,ring-color] duration-500",
              tone === "homes"
                ? "group-hover:ring-(--wb-accent-2)/28"
                : "group-hover:ring-(--wb-accent)/24"
            )}
          />
        </div>
      </motion.button>
    );
  }

  return (
    <main className="min-h-screen bg-(--wb-bg) text-(--wb-ink)">
      {/* HERO — richer copy */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -top-56 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-(--wb-accent-2)/[0.16] blur-3xl" />
          <div className="absolute -right-44 top-16 h-[320px] w-[320px] rounded-full bg-(--wb-accent)/[0.14] blur-3xl" />
          <div className="absolute -left-44 bottom-10 h-[280px] w-[280px] rounded-full bg-(--wb-ink)/[0.05] blur-3xl" />
        </div>

        <div className="wb-container pt-14 pb-10 sm:pt-20 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}
            className="mx-auto max-w-[92ch] text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-(--wb-border) bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-(--wb-ink)/65 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-(--wb-accent-2)/80" />
              CURATED PORTFOLIO
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.95, ease: EASE, delay: 0.06 }}
              className="wb-serif mt-6 text-[34px] leading-[1.06] sm:text-[54px] lg:text-[66px]"
            >
              Homes & Interiors
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: 0.12 }}
              className="mx-auto mt-4 max-w-[72ch] text-[14px] sm:text-[16px] leading-relaxed text-(--wb-ink)/70"
            >
              A quiet, premium gallery — crafted forms outside, calm experiences inside.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* HOMES — nicer heading block */}
      <section className="wb-container pb-14 sm:pb-18">
        <div className="mb-6 sm:mb-8 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] text-(--wb-ink)/60">
              EXTERIORS
            </div>
            <h2 className="wb-serif mt-2 text-[24px] sm:text-[34px]">
              Signature Homes
            </h2>
            <p className="mt-2 max-w-[68ch] text-[13px] sm:text-[14px] text-(--wb-ink)/65">
              Architecture that feels personal — proportion, light, and detail held in balance.
            </p>
          </div>

          <div className="rounded-full border border-(--wb-border) bg-white/55 px-3 py-1 text-[12px] font-semibold text-(--wb-ink)/70 backdrop-blur">
            {HOMES.length}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOMES.map((p, i) => (
            <Card key={p.id} p={p} absoluteIndex={i} tone="homes" />
          ))}
        </div>
      </section>

      {/* INTERIORS — nicer heading block */}
      <section className="wb-container pb-20 sm:pb-24">
        <div className="mb-6 sm:mb-8 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] text-(--wb-ink)/60">
              INTERIORS
            </div>
            <h2 className="wb-serif mt-2 text-[24px] sm:text-[34px]">
              Interior Experiences
            </h2>
            <p className="mt-2 max-w-[68ch] text-[13px] sm:text-[14px] text-(--wb-ink)/65">
              Refined spaces where comfort is designed — not decorated.
            </p>
          </div>

          <div className="rounded-full border border-(--wb-border) bg-white/55 px-3 py-1 text-[12px] font-semibold text-(--wb-ink)/70 backdrop-blur">
            {INTERIORS.length}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INTERIORS.map((p, j) => (
            <Card key={p.id} p={p} absoluteIndex={HOMES.length + j} tone="interiors" />
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open && current ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 bg-black/88 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-4 top-4 z-50 rounded-full border border-white/15 bg-white/10 p-2 text-white hover:bg-white/15 transition"
              aria-label="Close"
            >
              <RiCloseLine className="text-2xl" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 sm:left-5 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 sm:p-3 text-white hover:bg-white/15 transition"
              aria-label="Previous"
            >
              <RiArrowLeftSLine className="text-3xl" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 sm:right-5 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 sm:p-3 text-white hover:bg-white/15 transition"
              aria-label="Next"
            >
              <RiArrowRightSLine className="text-3xl" />
            </button>

            <div className="relative z-40 flex h-full w-full items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.985, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { scale: 0.99, opacity: 0, y: 8 }}
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: EASE }}
                className="w-full max-w-[1200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/12 bg-black/35 shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
                  <img
                    src={normalizeImageSrc(current.image)}
                    alt={current.title}
                    className="max-h-[72vh] w-full object-contain bg-black"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = fallbackSvgDataUri(current.title);
                    }}
                  />
                  <div className="border-t border-white/10 bg-black/35 p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="mb-2">
                          <TagPill tag={current.tag} />
                        </div>
                        <h3 className="wb-serif text-[20px] sm:text-[24px] text-white leading-tight">
                          {current.title}
                        </h3>
                        <p className="mt-1 text-[13px] text-white/65">{current.blurb}</p>
                      </div>
                      <div className="text-[12px] font-semibold text-white/60">
                        {idx + 1} / {combined.length}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-[12px] text-white/45">← / → • Esc</p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
