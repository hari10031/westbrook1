// src/pages/Projects.tsx
import type React from "react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiTimeLine,
  RiCalendar2Line,
  RiMapPin2Line,
  RiBuilding2Line,
  RiCheckLine,
  RiArrowRightUpLine,
  RiRoadMapLine,
  RiSparkling2Line,
  RiArrowUpSLine,
  RiHome4Line,
} from "react-icons/ri";
import { IoBedOutline, IoCarOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type ProjectStatus = "upcoming" | "completed";

type Project = {
  id: string;
  status: ProjectStatus;
  name: string;
  location: string;
  eta: string;
  image: string;
  beds: number;
  baths: number;
  garage: number;
  sqft: number;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-extrabold tracking-[0.34em] text-[color:var(--wb-ink)]/80">
      {children}
    </p>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10 px-3 py-1 text-[11.5px] font-extrabold text-[color:var(--wb-accent)]">
      {text}
    </span>
  );
}

function StatPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-ink)]/14 bg-white/65 px-4 py-2 text-[12px] font-extrabold text-[color:var(--wb-ink)]/72 backdrop-blur">
      <span className="text-[15px]">{icon}</span>
      {text}
    </span>
  );
}

function PropertyStat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[12px] text-[color:var(--wb-ink)]/70">
      <span className="text-[14px] text-[color:var(--wb-accent)]">{icon}</span>
      <span>{value}</span>
    </div>
  );
}



function Tabs({
  value,
  onChange,
  counts,
}: {
  value: ProjectStatus | "all";
  onChange: (v: ProjectStatus | "all") => void;
  counts: { all: number; upcoming: number; completed: number };
}) {
  const tabs: Array<{ key: ProjectStatus | "all"; label: string; count: number }> =
    [
      { key: "all", label: "All", count: counts.all },
      { key: "upcoming", label: "Upcoming", count: counts.upcoming },
      { key: "completed", label: "Previous", count: counts.completed },
    ];

  return (
    <div className="inline-flex rounded-full border border-[color:var(--wb-ink)]/14 bg-white/65 p-1 backdrop-blur shadow-[0_12px_32px_rgba(12,24,48,0.08)]">
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "relative rounded-full px-4 py-2 text-[12.5px] font-extrabold transition",
              active
                ? "text-white"
                : "text-[color:var(--wb-ink)]/75 hover:text-[color:var(--wb-ink)]"
            )}
          >
            {active && (
              <motion.span
                layoutId="projectsTab"
                className="absolute inset-0 rounded-full bg-[color:var(--wb-ink)] shadow-[0_14px_40px_rgba(12,24,48,0.18)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              {t.label}
              <span
                className={cx(
                  "grid h-5 min-w-[24px] place-items-center rounded-full px-2 text-[11px]",
                  active
                    ? "bg-white/18 text-white"
                    : "bg-[color:var(--wb-accent)]/10 text-[color:var(--wb-accent)]"
                )}
              >
                {t.count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (id: string) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(p.id)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group w-full text-left overflow-hidden rounded-[26px]
        border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur
        shadow-[0_14px_44px_rgba(12,24,48,0.10)]
        hover:shadow-[0_34px_110px_rgba(27,79,214,0.14)]
        transition"
    >
      <div className="relative h-[180px]">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.80)] via-[rgba(8,16,34,0.18)] to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-white backdrop-blur">
          <span className="text-[14px]">
            {p.status === "upcoming" ? <RiTimeLine /> : <RiCheckLine />}
          </span>
          <span className="text-[11px] font-extrabold tracking-[0.18em]">
            {p.status === "upcoming" ? "UPCOMING" : "COMPLETED"}
          </span>
        </div>

        <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-2xl border border-white/18 bg-white/10 text-white backdrop-blur transition group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
          <RiArrowRightUpLine />
        </div>

        <div className="pointer-events-none absolute -left-[35%] top-[-60%] h-[200%] w-[55%] rotate-[18deg] bg-[color:var(--wb-accent)]/10 opacity-0 blur-2xl group-hover:opacity-100 transition duration-500" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15.5px] font-extrabold text-[color:var(--wb-ink)]">
              {p.name}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[12.5px] text-[color:var(--wb-ink)]/72">
              <RiMapPin2Line className="text-[14px] text-[color:var(--wb-accent)]" />
              <span className="truncate">{p.location}</span>
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <PropertyStat icon={<IoBedOutline />} value={`${p.beds}`} />
          <PropertyStat icon={<LuBath />} value={`${p.baths}`} />
          <PropertyStat icon={<IoCarOutline />} value={`${p.garage}`} />
          <PropertyStat icon={<TbRulerMeasure />} value={`${p.sqft} Sq ft`} />
        </div>

        <div className="mt-4 h-[2px] w-10 bg-[color:var(--wb-accent)]/55 group-hover:w-16 transition-all duration-300" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-0 ring-[color:var(--wb-accent)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-accent)]/12 transition" />
    </motion.button>
  );
}

function Modal({
  open,
  onClose,
  p,
}: {
  open: boolean;
  onClose: () => void;
  p: Project | null;
}) {
  return (
    <AnimatePresence>
      {open && p ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) onClose();
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative w-full max-w-[980px] overflow-hidden rounded-[30px]
              border border-white/18 bg-white/92 shadow-[0_40px_180px_rgba(0,0,0,0.35)]"
            role="dialog"
            aria-modal="true"
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative h-[270px] lg:h-full">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.82)] via-[rgba(8,16,34,0.20)] to-transparent" />
                <div className="pointer-events-none absolute -bottom-12 left-8 h-40 w-40 rounded-full bg-[color:var(--wb-accent)]/18 blur-3xl" />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-white backdrop-blur">
                  <span className="text-[15px]">
                    {p.status === "upcoming" ? <RiRoadMapLine /> : <RiCheckLine />}
                  </span>
                  <span className="text-[11px] font-extrabold tracking-[0.16em]">
                    {p.status === "upcoming" ? "UPCOMING" : "COMPLETED"}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <p className="text-[22px] font-extrabold text-[color:var(--wb-ink)]">
                  {p.name}
                </p>

                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2 text-[13px] text-[color:var(--wb-ink)]/74">
                    <RiMapPin2Line className="text-[15px] text-[color:var(--wb-accent)]" />
                    {p.location}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[color:var(--wb-ink)]/74">
                    <RiCalendar2Line className="text-[15px] text-[color:var(--wb-accent)]" />
                    {p.eta}
                  </div>
                </div>

                {/* Property Stats Grid */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl border border-[color:var(--wb-ink)]/12 bg-white/70 p-4 text-center">
                    <IoBedOutline className="mx-auto text-[24px] text-[color:var(--wb-accent)]" />
                    <p className="mt-2 text-[18px] font-extrabold text-[color:var(--wb-ink)]">{p.beds}</p>
                    <p className="text-[11px] text-[color:var(--wb-ink)]/60">Bedrooms</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--wb-ink)]/12 bg-white/70 p-4 text-center">
                    <LuBath className="mx-auto text-[24px] text-[color:var(--wb-accent)]" />
                    <p className="mt-2 text-[18px] font-extrabold text-[color:var(--wb-ink)]">{p.baths}</p>
                    <p className="text-[11px] text-[color:var(--wb-ink)]/60">Bathrooms</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--wb-ink)]/12 bg-white/70 p-4 text-center">
                    <IoCarOutline className="mx-auto text-[24px] text-[color:var(--wb-accent)]" />
                    <p className="mt-2 text-[18px] font-extrabold text-[color:var(--wb-ink)]">{p.garage}</p>
                    <p className="text-[11px] text-[color:var(--wb-ink)]/60">Garage</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--wb-ink)]/12 bg-white/70 p-4 text-center">
                    <TbRulerMeasure className="mx-auto text-[24px] text-[color:var(--wb-accent)]" />
                    <p className="mt-2 text-[18px] font-extrabold text-[color:var(--wb-ink)]">{p.sqft}</p>
                    <p className="text-[11px] text-[color:var(--wb-ink)]/60">Sq ft</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10 px-3 py-1 text-[12px] font-extrabold text-[color:var(--wb-accent)]">
                    <RiSparkling2Line />
                    Built with Webhook standards
                  </span>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-[color:var(--wb-ink)]/14 bg-white/80 px-4 py-2
                      text-[12.5px] font-extrabold text-[color:var(--wb-ink)]/75 hover:bg-white transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function ProjectsPage() {
  const PROJECTS: Project[] = useMemo(
    () => [
      // Upcoming Home
      {
        id: "wb-horizon",
        status: "upcoming",
        name: "Horizon",
        location: "McKinney, TX",
        eta: "Q2 2026",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
        beds: 4,
        baths: 3,
        garage: 2,
        sqft: 2400,
      },
      // Completed Homes
      {
        id: "wb-jacksonbend",
        status: "completed",
        name: "Jacksonbend",
        location: "Dallas, TX",
        eta: "Completed 2024",
        image: "/img/jack.jpg",
        beds: 4,
        baths: 3,
        garage: 2,
        sqft: 3600,
      },
      {
        id: "wb-wind-flower",
        status: "completed",
        name: "Wind Flower",
        location: "Granbury, TX",
        eta: "Completed 2024",
        image: "/img/wind-flower.jpeg",
        beds: 4,
        baths: 3,
        garage: 2,
        sqft: 1927,
      },
      {
        id: "wb-forest-bend",
        status: "completed",
        name: "Forest Bend",
        location: "Weatherford, TX",
        eta: "Completed 2024",
        image: "/img/forest.jpg",
        beds: 3,
        baths: 2,
        garage: 2,
        sqft: 1600,
      },
      {
        id: "wb-wood-view",
        status: "completed",
        name: "Wood View",
        location: "Granbury, TX",
        eta: "Completed 2024",
        image: "/img/wood.jpg",
        beds: 3,
        baths: 2,
        garage: 2,
        sqft: 1500,
      },
      {
        id: "wb-vista",
        status: "completed",
        name: "Vista",
        location: "Fort Worth, TX",
        eta: "Completed 2024",
        image: "/img/vista.jpg",
        beds: 3,
        baths: 2,
        garage: 2,
        sqft: 1600,
      },
      {
        id: "wb-avalon",
        status: "completed",
        name: "Avalon",
        location: "Weatherford, TX",
        eta: "Completed 2024",
        image: "/img/avalon-house-img.jpg",
        beds: 3,
        baths: 2,
        garage: 2,
        sqft: 1840,
      },
      {
        id: "wb-apollo",
        status: "completed",
        name: "Apollo",
        location: "Granbury, TX",
        eta: "Completed 2024",
        image: "/img/apollo-house-img.jpg",
        beds: 3,
        baths: 2,
        garage: 0,
        sqft: 1300,
      },
      {
        id: "wb-aurora",
        status: "completed",
        name: "Aurora",
        location: "Fort Worth, TX",
        eta: "Completed 2024",
        image: "/img/aura.webp",
        beds: 3,
        baths: 2,
        garage: 2,
        sqft: 1800,
      },
    ],
    []
  );

  const counts = useMemo(() => {
    const upcoming = PROJECTS.filter((p) => p.status === "upcoming").length;
    const completed = PROJECTS.filter((p) => p.status === "completed").length;
    return { all: PROJECTS.length, upcoming, completed };
  }, [PROJECTS]);

  const [filter, setFilter] = useState<ProjectStatus | "all">("all");
  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.status === filter);
  }, [PROJECTS, filter]);

  const featured = useMemo(() => {
    return PROJECTS.find((p) => p.status === "upcoming") ?? PROJECTS[0] ?? null;
  }, [PROJECTS]);

  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = useMemo(
    () => PROJECTS.find((p) => p.id === openId) ?? null,
    [PROJECTS, openId]
  );

  return (
    <main className="wb-container py-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[36px] border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur p-8 shadow-[0_18px_60px_rgba(12,24,48,0.10)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-150px] h-[360px] w-[860px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
          <div className="absolute right-[-170px] top-[140px] h-[320px] w-[320px] rounded-full bg-[color:var(--wb-accent)]/14 blur-3xl" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-[12px] font-extrabold tracking-[0.34em] text-[color:var(--wb-ink)]/80"
        >
          PROJECTS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
          className="wb-serif mt-3 text-[38px] leading-[1.05] sm:text-[56px] text-[color:var(--wb-ink)]"
        >
          Proof, not promises.
          <span className="block">
            Upcoming and delivered{" "}
            <span className="relative inline-block">
              <span className="relative z-10">work</span>
              <span className="absolute left-0 bottom-[6px] h-[7px] w-full bg-[color:var(--wb-accent)]/20" />
            </span>
            .
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
          className="mt-4 max-w-[92ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/75"
        >
          A curated view of what’s coming next and what’s already delivered — built
          with disciplined scope, clean sequencing, and ready-to-operate handovers.
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-2">
          <StatPill icon={<RiBuilding2Line />} text={`${counts.all} total`} />
          <StatPill icon={<RiTimeLine />} text={`${counts.upcoming} upcoming`} />
          <StatPill icon={<RiCheckLine />} text={`${counts.completed} delivered`} />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={filter} onChange={setFilter} counts={counts} />
          <p className="text-[12.5px] text-[color:var(--wb-ink)]/62">
            Click any project for highlights and details.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="mt-10">
          <SectionLabel>FEATURED</SectionLabel>

          <motion.button
            type="button"
            onClick={() => setOpenId(featured.id)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="group mt-4 w-full overflow-hidden rounded-[30px] border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur
              shadow-[0_18px_62px_rgba(12,24,48,0.12)]
              hover:shadow-[0_38px_140px_rgba(27,79,214,0.16)]
              transition text-left"
          >
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative h-[260px] lg:h-[360px]">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.80)] via-[rgba(8,16,34,0.14)] to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-white backdrop-blur">
                  <span className="text-[14px]">
                    {featured.status === "upcoming" ? <RiTimeLine /> : <RiCheckLine />}
                  </span>
                  <span className="text-[11px] font-extrabold tracking-[0.18em]">
                    {featured.status === "upcoming" ? "UPCOMING" : "COMPLETED"}
                  </span>
                </div>

                <div className="pointer-events-none absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-[color:var(--wb-accent)]/18 blur-3xl" />
              </div>

              <div className="p-7 sm:p-8">
                <p className="mt-2 text-[26px] font-extrabold text-[color:var(--wb-ink)]">
                  {featured.name}
                </p>

                <div className="mt-4 grid gap-2 text-[13px] text-[color:var(--wb-ink)]/72">
                  <div className="flex items-center gap-2">
                    <RiMapPin2Line className="text-[15px] text-[color:var(--wb-accent)]" />
                    {featured.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <RiCalendar2Line className="text-[15px] text-[color:var(--wb-accent)]" />
                    {featured.eta}
                  </div>
                </div>

                {/* Property Stats */}
                <div className="mt-5 grid grid-cols-4 gap-3">
                  <div className="rounded-xl border border-[color:var(--wb-ink)]/10 bg-white/70 p-3 text-center">
                    <IoBedOutline className="mx-auto text-[20px] text-[color:var(--wb-accent)]" />
                    <p className="mt-1 text-[16px] font-extrabold text-[color:var(--wb-ink)]">{featured.beds}</p>
                    <p className="text-[10px] text-[color:var(--wb-ink)]/60">Beds</p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--wb-ink)]/10 bg-white/70 p-3 text-center">
                    <LuBath className="mx-auto text-[20px] text-[color:var(--wb-accent)]" />
                    <p className="mt-1 text-[16px] font-extrabold text-[color:var(--wb-ink)]">{featured.baths}</p>
                    <p className="text-[10px] text-[color:var(--wb-ink)]/60">Baths</p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--wb-ink)]/10 bg-white/70 p-3 text-center">
                    <IoCarOutline className="mx-auto text-[20px] text-[color:var(--wb-accent)]" />
                    <p className="mt-1 text-[16px] font-extrabold text-[color:var(--wb-ink)]">{featured.garage}</p>
                    <p className="text-[10px] text-[color:var(--wb-ink)]/60">Garage</p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--wb-ink)]/10 bg-white/70 p-3 text-center">
                    <TbRulerMeasure className="mx-auto text-[20px] text-[color:var(--wb-accent)]" />
                    <p className="mt-1 text-[16px] font-extrabold text-[color:var(--wb-ink)]">{featured.sqft}</p>
                    <p className="text-[10px] text-[color:var(--wb-ink)]/60">Sq ft</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10 px-3 py-1 text-[12px] font-extrabold text-[color:var(--wb-accent)]">
                    <RiSparkling2Line />
                    Open details
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10 text-[color:var(--wb-accent)] transition group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                    <RiArrowRightUpLine />
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        </section>
      )}

      {/* GRID */}
      <section className="mt-12">
        <div>
          <SectionLabel>COLLECTION</SectionLabel>
          <p className="mt-2 text-[20px] font-extrabold text-[color:var(--wb-ink)]">
            Upcoming & previous projects
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--wb-ink)]/72 max-w-[78ch]">
            Explore what’s in the pipeline and what we’ve already delivered — with the same discipline
            across scope, sequencing, and handover quality.
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={setOpenId} />
          ))}
        </div>
      </section>

      <Modal open={!!openId} onClose={() => setOpenId(null)} p={openProject} />

      {/* BACK TO TOP */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10
            backdrop-blur px-5 py-3 text-[13px] font-extrabold text-[color:var(--wb-accent)]
            hover:bg-[color:var(--wb-accent)]/14 transition"
        >
          <RiArrowUpSLine />
          Back to top
        </button>
      </div>
    </main>
  );
}
