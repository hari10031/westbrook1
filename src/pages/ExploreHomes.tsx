// src/pages/ExploreHomes.tsx
import { useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBuilding2Line,
  RiCloseLine,
  RiExternalLinkLine,
  RiHome4Line,
  RiMapPin2Line,
  RiPhoneLine,
  RiPlantLine,
  RiRuler2Line,
  RiShieldCheckLine,
  RiStarSmileLine,
  RiTimeLine,
  RiWhatsappLine,
  RiCheckLine,
  RiSearch2Line,
  RiFilter3Line,
} from "react-icons/ri";

/* =========================================================
   Types
========================================================= */
type HomeType = "Residential" | "Plot";
type HomeStatus = "Ready" | "Under Construction" | "Pre-Launch";

type HomeItem = {
  id: string;
  title: string;
  location: string;
  type: HomeType;
  status: HomeStatus;

  priceLabel: string;
  areaLabel: string;

  bedrooms?: number;
  bathrooms?: number;
  possession?: string;

  description: string;
  highlights: string[];
  amenities: string[];

  specs: Array<{
    label: string;
    value: string;
    icon?: "home" | "ruler" | "building" | "plant";
  }>;

  gallery: string[];
  mapLink?: string;
};

/* =========================================================
   Helpers
========================================================= */
function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "slate" | "ok" | "warn" | "info";
}) {
  const cls =
    tone === "ok"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : tone === "warn"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : tone === "info"
      ? "bg-indigo-50 text-indigo-700 border-indigo-100"
      : "bg-slate-50 text-slate-700 border-slate-100";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold",
        cls
      )}
    >
      {children}
    </span>
  );
}

function SpecIcon({
  kind,
}: {
  kind?: "home" | "ruler" | "building" | "plant";
}) {
  const cls = "text-lg text-slate-700";
  if (kind === "home") return <RiHome4Line className={cls} />;
  if (kind === "ruler") return <RiRuler2Line className={cls} />;
  if (kind === "building") return <RiBuilding2Line className={cls} />;
  if (kind === "plant") return <RiPlantLine className={cls} />;
  return <RiCheckLine className={cls} />;
}

function statusTone(s: HomeStatus): "ok" | "warn" | "info" {
  if (s === "Ready") return "ok";
  if (s === "Under Construction") return "warn";
  return "info";
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

/* =========================================================
   Demo Data (swap with API later)
========================================================= */
const HOMES: HomeItem[] = [
  {
    id: "wb-res-01",
    title: "Crest Villas",
    location: "Frisco, TX 76227",
    type: "Residential",
    status: "Ready",
    priceLabel: "$589k+",
    areaLabel: "2350 - 3150 sq.ft",
    bedrooms: 4,
    bathrooms: 3,
    possession: "Immediate",
    description:
      "Premium villa community with airy interiors, curated greens, and quick access to schools & shopping. Clean elevations and family-first layouts.",
    highlights: [
      "Gated community + security",
      "Open living + modern kitchen",
      "Corner units available",
      "Excellent connectivity",
    ],
    amenities: [
      "Clubhouse",
      "Fitness center",
      "Kids play zone",
      "Jogging track",
      "Community lawn",
      "Power backup (common)",
    ],
    specs: [
      { label: "Configuration", value: "4BHK", icon: "home" },
      { label: "Built-up Area", value: "2350 - 3150 sq.ft", icon: "ruler" },
      { label: "Floors", value: "G+1", icon: "building" },
      { label: "Green Spaces", value: "Pocket parks", icon: "plant" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753051-f0e5ee3bd8f0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
    ],
    mapLink: "https://www.google.com/maps/search/?api=1&query=Frisco+TX+76227",
  },
  {
    id: "wb-plot-01",
    title: "Meadow Plots",
    location: "Prosper, TX 75078",
    type: "Plot",
    status: "Under Construction",
    priceLabel: "$199k+",
    areaLabel: "150 - 280 sq.yd",
    possession: "Q3 2026",
    description:
      "Premium plotted development with wide roads, planned open spaces, and a clean masterplan. Great for custom builds and long-term value.",
    highlights: [
      "Clear title + approvals",
      "Wide roads + smart layout",
      "Multiple plot sizes",
      "Near upcoming infrastructure",
    ],
    amenities: [
      "Entrance feature (planned)",
      "Landscaped medians",
      "Street lighting (planned)",
      "Drainage (planned)",
      "Community park (planned)",
    ],
    specs: [
      { label: "Plot Sizes", value: "150 - 280 sq.yd", icon: "ruler" },
      { label: "Road Width", value: "30–40 ft (planned)", icon: "building" },
      { label: "Type", value: "Residential plots", icon: "home" },
      { label: "Open Space", value: "Green belts (planned)", icon: "plant" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    ],
    mapLink: "https://www.google.com/maps/search/?api=1&query=Prosper+TX+75078",
  },
  {
    id: "wb-res-02",
    title: "Parkview Residences",
    location: "Little Elm, TX 75068",
    type: "Residential",
    status: "Under Construction",
    priceLabel: "$449k+",
    areaLabel: "1650 - 2450 sq.ft",
    bedrooms: 3,
    bathrooms: 2,
    possession: "Q2 2026",
    description:
      "Modern homes with practical floor plans, bright living zones, and community-first amenities. Built for comfortable everyday living.",
    highlights: [
      "Contemporary elevation",
      "Efficient floor plans",
      "Amenities focused community",
      "Great daily connectivity",
    ],
    amenities: [
      "Multi-purpose hall",
      "Basketball court",
      "Kids play area",
      "Walking trail",
      "Seating plazas",
    ],
    specs: [
      { label: "Configuration", value: "3BHK", icon: "home" },
      { label: "Built-up Area", value: "1650 - 2450 sq.ft", icon: "ruler" },
      { label: "Floors", value: "G+1 / G+2 (select)", icon: "building" },
      { label: "Landscape", value: "Central greens", icon: "plant" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1600&q=80",
    ],
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Little+Elm+TX+75068",
  },
  {
    id: "wb-plot-02",
    title: "Horizon Plots",
    location: "Aubrey, TX 76227",
    type: "Plot",
    status: "Pre-Launch",
    priceLabel: "$169k+",
    areaLabel: "120 - 220 sq.yd",
    possession: "TBD",
    description:
      "Upcoming plotted community in a high-growth corridor. Early entry opportunity with flexible plot sizes for custom builds.",
    highlights: [
      "Pre-launch pricing window",
      "Flexible plot sizes",
      "Masterplanned layout",
      "High growth corridor",
    ],
    amenities: [
      "Community park (planned)",
      "Walkways (planned)",
      "Street lighting (planned)",
      "Entrance feature (planned)",
    ],
    specs: [
      { label: "Plot Sizes", value: "120 - 220 sq.yd", icon: "ruler" },
      { label: "Development", value: "Masterplanned", icon: "building" },
      { label: "Type", value: "Residential plots", icon: "home" },
      { label: "Phase", value: "Pre-launch", icon: "plant" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    ],
    mapLink: "https://www.google.com/maps/search/?api=1&query=Aubrey+TX+76227",
  },
];

/* =========================================================
   Modal (NO useEffect; avoids react-hooks/set-state-in-effect lint)
========================================================= */
function HomeDetailsModal({
  open,
  home,
  onClose,
}: {
  open: boolean;
  home: HomeItem | null;
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = useMemo(() => home?.gallery ?? [], [home]);

  // No effects: close on overlay, navigation works via buttons only.
  if (!open || !home) return null;

  const tone = statusTone(home.status);

  return (
    <AnimatePresence>
      {open && home && (
        <>
          <motion.button
            aria-label="Close details"
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* header */}
              <div className="flex items-start justify-between gap-4 border-b p-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-xl font-semibold text-slate-900">
                      {home.title}
                    </h3>
                    <Badge>{home.type}</Badge>
                    <Badge tone={tone}>{home.status}</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <RiMapPin2Line />
                    <span className="truncate">{home.location}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl border px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>

              {/* body */}
              <div className="grid lg:grid-cols-[1.35fr_1fr]">
                {/* left */}
                <div className="p-5">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={images[imgIdx]}
                      alt={home.title}
                      className="h-[320px] w-full object-cover sm:h-[440px]"
                      loading="lazy"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setImgIdx((p) => Math.max(0, p - 1))
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                          aria-label="Previous image"
                        >
                          <RiArrowLeftSLine className="text-2xl" />
                        </button>
                        <button
                          onClick={() =>
                            setImgIdx((p) =>
                              Math.min(images.length - 1, p + 1)
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                          aria-label="Next image"
                        >
                          <RiArrowRightSLine className="text-2xl" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-xl bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                        {home.priceLabel}
                      </span>
                      <span className="rounded-xl bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                        {home.areaLabel}
                      </span>
                      {home.possession && (
                        <span className="rounded-xl bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                          Possession: {home.possession}
                        </span>
                      )}
                    </div>
                  </div>

                  {images.length > 1 && (
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {images.slice(0, 4).map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setImgIdx(i)}
                          className={cx(
                            "overflow-hidden rounded-xl border bg-slate-50",
                            i === imgIdx
                              ? "border-slate-900"
                              : "border-transparent"
                          )}
                          aria-label={`Image ${i + 1}`}
                        >
                          <img
                            src={src}
                            alt={`thumb-${i}`}
                            className="h-16 w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Overview
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {home.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Highlights
                    </h4>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {home.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-2 rounded-xl bg-slate-50 p-3"
                        >
                          <RiCheckLine className="mt-0.5 text-lg text-slate-900" />
                          <span className="text-sm text-slate-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* right */}
                <div className="border-t lg:border-l lg:border-t-0">
                  <div className="p-5">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <h4 className="text-sm font-semibold text-slate-900">
                        Key Details
                      </h4>

                      <div className="mt-3 grid gap-3">
                        {home.specs.map((s) => (
                          <div
                            key={s.label}
                            className="flex items-start gap-3 rounded-xl bg-white p-3"
                          >
                            <div className="mt-0.5">
                              <SpecIcon kind={s.icon} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-slate-500">
                                {s.label}
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                {s.value}
                              </div>
                            </div>
                          </div>
                        ))}

                        {home.type === "Residential" && (
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white p-3">
                              <div className="text-xs font-medium text-slate-500">
                                Bedrooms
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                {home.bedrooms ?? "—"}
                              </div>
                            </div>
                            <div className="rounded-xl bg-white p-3">
                              <div className="text-xs font-medium text-slate-500">
                                Bathrooms
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                {home.bathrooms ?? "—"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-slate-900">
                        Amenities
                      </h4>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {home.amenities.map((a) => (
                          <div
                            key={a}
                            className="flex items-center gap-2 rounded-xl border p-3"
                          >
                            <RiCheckLine className="text-lg text-slate-900" />
                            <span className="text-sm text-slate-700">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        Want full availability & brochure?
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Call / WhatsApp for details & site visit.
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-95">
                          <RiPhoneLine className="text-lg" />
                          Call Now
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                          <RiWhatsappLine className="text-lg" />
                          WhatsApp
                        </button>
                      </div>

                      {home.mapLink && (
                        <a
                          href={home.mapLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                        >
                          <RiExternalLinkLine className="text-lg" />
                          Open Location
                        </a>
                      )}
                    </div>

                    <div className="mt-4 text-xs text-slate-500">
                      Tip: Tap outside to close
                    </div>
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="flex items-center justify-between gap-3 border-t p-4">
                <div className="text-xs text-slate-500">
                  WestBrook • Explore Homes
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   Page (NO useEffect; avoids react-hooks/set-state-in-effect lint)
========================================================= */
export default function ExploreHomes() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<HomeType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<HomeStatus | "All">("All");
  const [selected, setSelected] = useState<HomeItem | null>(null);

  // Optional UX: press "/" to focus search (NO useEffect – onKeyDown attached to main)
  const searchRef = useRef<HTMLInputElement | null>(null);

  const homes = HOMES;

  const filtered = useMemo(() => {
    const q = normalize(query);
    return homes.filter((h) => {
      const matchesQuery =
        q.length === 0 ||
        normalize(h.title).includes(q) ||
        normalize(h.location).includes(q) ||
        normalize(h.type).includes(q) ||
        normalize(h.status).includes(q);

      const matchesType = typeFilter === "All" ? true : h.type === typeFilter;
      const matchesStatus =
        statusFilter === "All" ? true : h.status === statusFilter;

      return matchesQuery && matchesType && matchesStatus;
    });
  }, [homes, query, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = homes.length;
    const residential = homes.filter((x) => x.type === "Residential").length;
    const plots = homes.filter((x) => x.type === "Plot").length;
    return { total, residential, plots };
  }, [homes]);

  return (
    <main
      className="wb-container py-10"
      onKeyDown={(e) => {
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          searchRef.current?.focus();
        }
      }}
      tabIndex={-1}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Explore Homes
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Clean listings with a neat details popup. Press{" "}
              <span className="font-semibold">/</span> to focus search.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>
              <RiHome4Line /> {stats.total} Listings
            </Badge>
            <Badge>
              <RiBuilding2Line /> {stats.residential} Residential
            </Badge>
            <Badge>
              <RiRuler2Line /> {stats.plots} Plots
            </Badge>
          </div>
        </div>

        {/* Trust row (subtle, normal) */}
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
            <div className="rounded-xl bg-slate-50 p-2">
              <RiShieldCheckLine className="text-xl text-slate-900" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Verified listings
              </div>
              <div className="text-xs text-slate-600">
                Neat details & specs
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
            <div className="rounded-xl bg-slate-50 p-2">
              <RiTimeLine className="text-xl text-slate-900" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Fast viewing
              </div>
              <div className="text-xs text-slate-600">Popup + gallery</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
            <div className="rounded-xl bg-slate-50 p-2">
              <RiStarSmileLine className="text-xl text-slate-900" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Premium feel
              </div>
              <div className="text-xs text-slate-600">
                Smooth, calm animations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-5 grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-[1.3fr_.9fr_.9fr_auto]">
        <div className="relative">
          <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-500" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, location, status..."
            className="w-full rounded-xl border bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        <div className="flex items-center gap-2">
          <RiFilter3Line className="text-lg text-slate-600" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as HomeType | "All")}
            className="w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="All">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <RiFilter3Line className="text-lg text-slate-600" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as HomeStatus | "All")
            }
            className="w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="All">All Status</option>
            <option value="Ready">Ready</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Pre-Launch">Pre-Launch</option>
          </select>
        </div>

        <button
          onClick={() => {
            setQuery("");
            setTypeFilter("All");
            setStatusFilter("All");
          }}
          className="rounded-xl border px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {/* Grid */}
      <section className="grid gap-4 md:grid-cols-12">
        {filtered.map((h, idx) => {
          const span =
            idx % 7 === 0
              ? "md:col-span-7 md:row-span-2"
              : idx % 7 === 1
              ? "md:col-span-5"
              : idx % 7 === 2
              ? "md:col-span-5"
              : idx % 7 === 3
              ? "md:col-span-4"
              : idx % 7 === 4
              ? "md:col-span-4"
              : idx % 7 === 5
              ? "md:col-span-4"
              : "md:col-span-6";

          const tone = statusTone(h.status);

          return (
            <motion.button
              key={h.id}
              onClick={() => setSelected(h)}
              className={cx(
                "group relative overflow-hidden rounded-2xl border bg-white text-left shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-slate-900/20",
                "hover:shadow-xl",
                span
              )}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.22 }}
              whileHover={{ y: -2 }}
            >
              <div className="relative h-52 w-full sm:h-60">
                <img
                  src={h.gallery[0]}
                  alt={h.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                    {h.type}
                  </span>
                  <span
                    className={cx(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      tone === "ok" && "bg-emerald-100 text-emerald-800",
                      tone === "warn" && "bg-amber-100 text-amber-800",
                      tone === "info" && "bg-indigo-100 text-indigo-800"
                    )}
                  >
                    {h.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-lg font-semibold text-white">
                    {h.title}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/90">
                    <RiMapPin2Line />
                    <span className="truncate">{h.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] font-medium text-slate-500">
                    Price
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {h.priceLabel}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] font-medium text-slate-500">
                    Area
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {h.areaLabel}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] font-medium text-slate-500">
                    Possession
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {h.possession ?? "—"}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </section>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border bg-white p-6 text-center">
          <div className="text-sm font-semibold text-slate-900">
            No homes found
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Try a different search or reset filters.
          </div>
        </div>
      )}

      {/* Modal (key remount resets img idx naturally) */}
      <HomeDetailsModal
        key={selected?.id ?? "closed"}
        open={!!selected}
        home={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
