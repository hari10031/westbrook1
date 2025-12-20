// src/pages/Services.tsx
// ✅ FINAL premium Services page (updated copy)
// ✅ Removes "WHAT WE OFFER" section entirely (as requested)
// ✅ Replaces "Less guessing. More momentum." with a more captivating caption
// ✅ Keeps BLUE accents + marquee + compact cards + modal details
// ✅ Eslint clean

import type React from "react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiGasStationLine,
  RiRestaurantLine,
  RiHospitalLine,
  RiFirstAidKitLine,
  RiBuilding2Line,
  RiToolsLine,
  RiShieldCheckLine,
  RiArrowUpLine,
  RiCheckLine,
  RiArrowRightUpLine,
  RiSearchEyeLine,
  RiClipboardLine,
  RiGitMergeLine,
  RiSparkling2Line,
} from "react-icons/ri";
import { MdLocalCarWash } from "react-icons/md";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  image: string;
  tags: string[];
  bullets: string[];
};

function StatPill({
  icon,
  text,
  tone = "ink",
}: {
  icon: React.ReactNode;
  text: string;
  tone?: "ink" | "blue";
}) {
  const isBlue = tone === "blue";
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-extrabold",
        "backdrop-blur transition",
        isBlue
          ? "border-[color:var(--wb-accent)]/22 bg-[color:var(--wb-accent)]/10 text-[color:var(--wb-accent)] shadow-[0_10px_34px_rgba(27,79,214,0.14)]"
          : "border-[color:var(--wb-ink)]/14 bg-white/65 text-[color:var(--wb-ink)]/72",
      ].join(" ")}
    >
      <span className="text-[15px]">{icon}</span>
      {text}
    </span>
  );
}

function MarqueeBar({ items }: { items: string[] }) {
  const row = useMemo(() => items.filter(Boolean), [items]);
  const duplicated = useMemo(() => [...row, ...row], [row]);

  return (
    <div
      className="mt-6 overflow-hidden rounded-[999px] border border-[color:var(--wb-accent)]/18 bg-white/55 backdrop-blur
      shadow-[0_12px_32px_rgba(27,79,214,0.10)]"
      aria-label="Services marquee"
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/90 to-transparent" />

        <motion.div
          className="flex w-max items-center gap-2 py-2.5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {duplicated.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-accent)]/18
                bg-[color:var(--wb-accent)]/10 px-3 py-1.5 text-[12px] font-extrabold text-[color:var(--wb-accent)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]/80" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CompactCard({
  s,
  onOpen,
  index,
}: {
  s: ServiceItem;
  onOpen: (id: string) => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(s.id)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.03 + index * 0.03 }}
      className="group w-full text-left overflow-hidden rounded-[22px]
        border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur
        shadow-[0_12px_38px_rgba(12,24,48,0.10)]
        hover:shadow-[0_30px_95px_rgba(27,79,214,0.16)]
        transition"
    >
      <div className="relative h-[132px]">
        <img
          src={s.image}
          alt={s.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.74)] via-[rgba(8,16,34,0.18)] to-transparent" />

        <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-white backdrop-blur">
          <span className="text-[16px]">{s.icon}</span>
          <span className="text-[11px] font-extrabold tracking-[0.16em]">
            SERVICES
          </span>
        </div>

        <div
          className="pointer-events-none absolute -left-[35%] top-[-60%] h-[200%] w-[55%]
          rotate-[18deg] bg-[color:var(--wb-accent)]/10 opacity-0 blur-2xl
          group-hover:opacity-100 transition duration-500"
        />
      </div>

      <div className="p-4 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[14.5px] font-extrabold text-[color:var(--wb-ink)]">
              {s.title}
            </p>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-[color:var(--wb-ink)]/72">
              {s.subtitle}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10
                    px-2.5 py-1 text-[11px] font-extrabold text-[color:var(--wb-accent)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl
              border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10 text-[color:var(--wb-accent)]
              group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition"
            aria-hidden="true"
          >
            <RiArrowRightUpLine />
          </span>
        </div>

        <div className="mt-3 h-[2px] w-10 bg-[color:var(--wb-accent)]/55 group-hover:w-16 transition-all duration-300" />

        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-0 ring-[color:var(--wb-accent)]/0 group-hover:ring-2 group-hover:ring-[color:var(--wb-accent)]/12 transition" />
      </div>
    </motion.button>
  );
}

function Modal({
  open,
  onClose,
  s,
}: {
  open: boolean;
  onClose: () => void;
  s: ServiceItem | null;
}) {
  return (
    <AnimatePresence>
      {open && s ? (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center p-4"
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
            className="relative w-full max-w-[920px] overflow-hidden rounded-[28px]
              border border-white/18 bg-white/92 shadow-[0_40px_180px_rgba(0,0,0,0.35)]"
            role="dialog"
            aria-modal="true"
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative h-[240px] lg:h-full">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,34,0.80)] via-[rgba(8,16,34,0.22)] to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-white backdrop-blur">
                  <span className="text-[18px]">{s.icon}</span>
                  <span className="text-[12px] font-extrabold tracking-[0.14em]">
                    DETAILS
                  </span>
                </div>
                <div className="pointer-events-none absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-[color:var(--wb-accent)]/18 blur-3xl" />
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-[20px] font-extrabold text-[color:var(--wb-ink)]">
                  {s.title}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[color:var(--wb-ink)]/75">
                  {s.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10
                        px-3 py-1 text-[11.5px] font-extrabold text-[color:var(--wb-accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  {s.bullets.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.05 + i * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-[2px] text-[color:var(--wb-accent)]">
                        <RiCheckLine />
                      </span>
                      <p className="text-[14.5px] leading-snug text-[color:var(--wb-ink)]/76">
                        {b}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10 px-3 py-1 text-[12px] font-extrabold text-[color:var(--wb-accent)]">
                    <RiSparkling2Line />
                    Clear plan. Clean close-out.
                  </span>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-[color:var(--wb-ink)]/14 bg-white/70 px-4 py-2
                      text-[12.5px] font-extrabold text-[color:var(--wb-ink)]/75 hover:bg-white/90 transition"
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

export default function Services() {
  const SERVICES: ServiceItem[] = useMemo(
    () => [
      {
        id: "finding-new-homes",
        title: "Finding Your Next Home",
        subtitle:
          "A shortlist that feels obvious — because it’s built on your real constraints, not random listings.",
        icon: <RiSearchEyeLine />,
        image:
          "https://images.unsplash.com/photo-1560185127-6a8c0b86d5b6?auto=format&fit=crop&w=1600&q=80",
        tags: ["Shortlists", "Tradeoffs", "Closing"],
        bullets: [
          "We cut the noise and keep only what truly fits your budget + location + timeline.",
          "You get clear tradeoffs (good / bad / risks) so you decide confidently.",
          "Offer strategy that’s strong without overpaying.",
          "A calm path from tours → inspection → closing — with clean paperwork.",
        ],
      },
      {
        id: "ground-up-development",
        title: "Ground-Up Development",
        subtitle: "From site to doors-open — delivered with milestones you can track.",
        icon: <RiBuilding2Line />,
        image:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
        tags: ["Scheduling", "Permits", "Delivery"],
        bullets: [
          "Clear milestones and owners — no ambiguity on who’s doing what.",
          "Permits + inspections planned early to protect the schedule.",
          "Sequenced trades so work doesn’t stack and stall.",
          "Close-out package built for handover, not confusion.",
        ],
      },
      {
        id: "remodels",
        title: "Remodels",
        subtitle: "Operational upgrades without chaos — scope tight, sequencing clean.",
        icon: <RiToolsLine />,
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
        tags: ["Phasing", "Scope", "Close-out"],
        bullets: [
          "Scope locked early — changes are documented, priced, and approved.",
          "Phasing that respects operations (when needed).",
          "Inspection readiness embedded into the plan.",
          "Punch list closed fast — no dragged-out finishing.",
        ],
      },
      {
        id: "gas-stations",
        title: "Gas Stations",
        subtitle: "Forecourts, canopies, flow — built around compliance and uptime.",
        icon: <RiGasStationLine />,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=80",
        tags: ["Forecourt", "Flow", "Compliance"],
        bullets: [
          "Site flow planned for real traffic, not paper diagrams.",
          "Permits + inspections aligned early to avoid redo work.",
          "Vendor sequencing so critical path stays protected.",
          "Opening-ready close-out: clean, complete, documented.",
        ],
      },
      {
        id: "car-wash",
        title: "Car Wash",
        subtitle: "Built for throughput — utilities, drainage, and workflow done right.",
        icon: <MdLocalCarWash />,
        image:
          "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
        tags: ["Utilities", "Drainage", "Throughput"],
        bullets: [
          "Utilities planning: water, power, and drainage from day one.",
          "Layout designed for throughput and safe movement.",
          "Sequenced execution to prevent downtime surprises.",
          "Inspection-ready delivery and clean documentation.",
        ],
      },
      {
        id: "restaurants",
        title: "Restaurants",
        subtitle: "Tenant improvements to ground-up — built around real operations.",
        icon: <RiRestaurantLine />,
        image:
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
        tags: ["TI", "Remodel", "Open-ready"],
        bullets: [
          "Back-of-house + service flow designed for speed.",
          "Early alignment on inspections and critical requirements.",
          "Trades coordinated so opening day isn’t a scramble.",
          "Punch list closed clean — no last-minute chaos.",
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals",
        subtitle: "Healthcare projects delivered with safety, access, and compliance focus.",
        icon: <RiHospitalLine />,
        image:
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80",
        tags: ["Healthcare", "Safety", "Compliance"],
        bullets: [
          "Compliance-first planning for critical areas.",
          "Coordination around access and operational constraints.",
          "Documentation kept clean for approvals and audits.",
          "Close-out built for handover and readiness.",
        ],
      },
      {
        id: "emergency-room",
        title: "Emergency Room (ER)",
        subtitle: "Emergency-grade readiness — designed and executed with discipline.",
        icon: <RiFirstAidKitLine />,
        image:
          "https://images.unsplash.com/photo-1584467735871-bb94f0b8525a?auto=format&fit=crop&w=1600&q=80",
        tags: ["Readiness", "Life-safety", "Execution"],
        bullets: [
          "Life-safety prioritized in design and execution decisions.",
          "Readiness checks baked into the project plan.",
          "Equipment + room coordination supported cleanly.",
          "Inspection alignment without last-minute panic.",
        ],
      },
      {
        id: "urgent-cares",
        title: "Urgent Cares",
        subtitle: "Fast-turn clinics — speed without cutting corners.",
        icon: <RiFirstAidKitLine />,
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
        tags: ["Fast-turn", "Flow", "Close-out"],
        bullets: [
          "Timeline clarity with visible milestones.",
          "Patient flow considered from layout to finishing.",
          "Readiness planning for rooms and equipment.",
          "Clean close-out so opening isn’t delayed.",
        ],
      },
    ],
    []
  );

  const [openId, setOpenId] = useState<string | null>(null);
  const openService = useMemo(
    () => SERVICES.find((s) => s.id === openId) ?? null,
    [SERVICES, openId]
  );
  const marqueeItems = useMemo(() => SERVICES.map((s) => s.title), [SERVICES]);

  return (
    <main className="wb-container py-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[34px] border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur p-8 shadow-[0_18px_55px_rgba(12,24,48,0.10)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-140px] h-[340px] w-[820px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
          <div className="absolute right-[-160px] top-[120px] h-[300px] w-[300px] rounded-full bg-[color:var(--wb-accent)]/14 blur-3xl" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[12px] font-extrabold tracking-[0.34em] text-[color:var(--wb-ink)]/80"
        >
          WESTBROOK SERVICES
        </motion.p>

        {/* ✅ More captivating caption */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
          className="wb-serif mt-3 text-[38px] leading-[1.05] sm:text-[54px] text-[color:var(--wb-ink)]"
        >
          Built to remove
          <span className="block">
            the “what ifs”
            <span className="mx-2">—</span>
            <span className="relative inline-block">
              <span className="relative z-10">fast</span>
              <span className="absolute left-0 bottom-[6px] h-[7px] w-full bg-[color:var(--wb-accent)]/20" />
            </span>
            .
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
          className="mt-4 max-w-[92ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/75"
        >
          Clear scope. Clean sequencing. Ready-to-open handovers.
          Whether it’s a home shortlist or a commercial build — we keep decisions simple and progress predictable.
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-2">
          <StatPill tone="blue" icon={<RiSparkling2Line />} text="Blue-chip process" />
          <StatPill icon={<RiClipboardLine />} text="Scope + milestones" />
          <StatPill icon={<RiGitMergeLine />} text="Coordination that holds" />
          <StatPill tone="blue" icon={<RiShieldCheckLine />} text="Fewer surprises" />
        </div>

        <MarqueeBar items={marqueeItems} />
      </section>

      {/* GRID */}
      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <CompactCard key={s.id} s={s} index={i} onOpen={setOpenId} />
          ))}
        </div>
      </section>

      <Modal open={!!openId} onClose={() => setOpenId(null)} s={openService} />

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-accent)]/18 bg-[color:var(--wb-accent)]/10
            backdrop-blur px-5 py-3 text-[13px] font-extrabold text-[color:var(--wb-accent)]
            hover:bg-[color:var(--wb-accent)]/14 transition"
        >
          <RiArrowUpLine />
          Back to top
        </button>
      </div>
    </main>
  );
}
