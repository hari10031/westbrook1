// src/pages/Land.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   Utils
   ───────────────────────────────────────────────────────────── */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   Icons (minimal set)
   ───────────────────────────────────────────────────────────── */
function IconArrowRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l1.3 5.2L18 9l-4.7 1.8L12 16l-1.3-5.2L6 9l4.7-1.8L12 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M19 13l.7 2.7L22 16l-2.3.3L19 19l-.7-2.7L16 16l2.3-.3L19 13Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
function IconShield() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5c2.7 2.6 5.1 3.6 8 3.7v6.2c0 4.9-3.4 8.9-8 10.1C7.4 22.3 4 18.3 4 13.4V7.2c2.9-.1 5.3-1.1 8-3.7Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.2 12.4l2 2L15.6 10" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 12.5l2 2a2.2 2.2 0 003.1 0l3.7-3.7a2.2 2.2 0 013.1 0M8.5 12.5l-2-2a2.2 2.2 0 00-3.1 0M8.5 12.5l2.2-2.2a2.2 2.2 0 013.1 0l.7.7"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.4 10.5l2.2 2.2M16.4 10.5l2.2 2.2" />
    </svg>
  );
}
function IconMapPin() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.2 7-10a7 7 0 1 0-14 0c0 5.8 7 10 7 10Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v2M17 3v2M4 8h16M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Components (LIGHT THEME)
   ───────────────────────────────────────────────────────────── */
function GlowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 backdrop-blur">
      {children}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur shadow-sm">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}

type DealType = "cash" | "structured" | "jv";

function DealCard({
  active,
  title,
  subtitle,
  badge,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group w-full text-left rounded-3xl border p-6 transition-all duration-300",
        "bg-white/80 backdrop-blur hover:bg-white shadow-sm",
        active
          ? "border-[color:var(--wb-accent-2,#1b4fd6)]/35 shadow-[0_18px_60px_rgba(27,79,214,0.18)]"
          : "border-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
            {badge}
          </div>
          <div className="mt-3 text-xl font-bold text-slate-900">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-600">{subtitle}</div>
        </div>

        <div
          className={cx(
            "shrink-0 rounded-2xl border p-3 transition-all duration-300",
            active
              ? "border-[color:var(--wb-accent-2,#1b4fd6)]/25 bg-[color:var(--wb-accent-2,#1b4fd6)]/10 text-[color:var(--wb-accent-2,#1b4fd6)]"
              : "border-slate-200 bg-slate-50 text-slate-700 group-hover:bg-slate-100"
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
        <span className={cx("h-2 w-2 rounded-full", active ? "bg-emerald-500" : "bg-slate-300")} />
        <span className={cx(active ? "text-slate-800" : "text-slate-600")}>
          {active ? "Selected" : "Select this option"}
        </span>
      </div>
    </button>
  );
}

function Stepper({
  steps,
  active,
  setActive,
}: {
  steps: Array<{ title: string; desc: string }>;
  active: number;
  setActive: (n: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 backdrop-blur shadow-sm">
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            className={cx(
              "rounded-full px-4 py-2 text-xs font-bold transition-all",
              i === active
                ? "bg-[color:var(--wb-accent-2,#1b4fd6)] text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
            )}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-lg font-bold text-slate-900">{steps[active].title}</div>
        <div className="mt-2 text-sm leading-relaxed text-slate-600">{steps[active].desc}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Calendar (LIGHT THEME)
   ───────────────────────────────────────────────────────────── */
function CalendarPicker({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = useMemo(
    () => ["January","February","March","April","May","June","July","August","September","October","November","December"],
    []
  );

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(<div key={`e-${i}`} className="h-9 w-9" />);

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const isPast = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

    cells.push(
      <button
        key={d}
        type="button"
        disabled={isPast || isWeekend}
        onClick={() => !(isPast || isWeekend) && onSelectDate(date)}
        className={cx(
          "h-9 w-9 rounded-full text-xs font-bold transition-all",
          isSelected
            ? "bg-[color:var(--wb-accent-2,#1b4fd6)] text-white shadow"
            : isPast || isWeekend
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-700 hover:bg-[color:var(--wb-accent-2,#1b4fd6)]/10"
        )}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 backdrop-blur shadow-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
        >
          ◀
        </button>

        <div className="text-sm font-bold text-slate-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>

        <button
          type="button"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
        >
          ▶
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-500">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="h-7 leading-7">{d}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">{cells}</div>

      <div className="mt-4 text-[11px] text-slate-500">
        Weekends are disabled (Sat/Sun).
      </div>
    </div>
  );
}

function TimeSlotPicker({
  selectedTime,
  onSelectTime,
}: {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}) {
  const slots = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 backdrop-blur shadow-sm">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <IconCalendar /> Select a time
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {slots.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelectTime(s)}
            className={cx(
              "rounded-2xl border px-4 py-3 text-xs font-bold transition-all",
              selectedTime === s
                ? "border-[color:var(--wb-accent-2,#1b4fd6)]/30 bg-[color:var(--wb-accent-2,#1b4fd6)] text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Page (LIGHT THEME)
   ───────────────────────────────────────────────────────────── */
export default function Land() {
  const pageRef = useIntersectionObserver();

  // Deal selection
  const [deal, setDeal] = useState<DealType>("cash");

  // Estimator inputs (UI only)
  const [acres, setAcres] = useState<string>("5");
  const [county, setCounty] = useState<string>("Denton");
  const [roadAccess, setRoadAccess] = useState<"yes" | "no">("yes");
  const [utilities, setUtilities] = useState<"nearby" | "unknown" | "none">("unknown");

  // Stepper
  const process = useMemo(
    () => [
      { title: "Share the basics", desc: "Tell us county, acreage, access, and any constraints. 2 minutes." },
      { title: "Rapid underwriting", desc: "We assess comps, zoning, topography, access, and development fit." },
      { title: "Choose your deal", desc: "Cash, structured, or JV — we align with your goal." },
      { title: "Close clean", desc: "Title company closing with clear paperwork and predictable timelines." },
    ],
    []
  );
  const [activeStep, setActiveStep] = useState(0);

  // Booking
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // “Offer confidence” mock score (UI only)
  const confidence = useMemo(() => {
    const a = Math.max(1, Math.min(500, Number(acres) || 1));
    let score = 62;

    if (a >= 5) score += 10;
    if (a >= 20) score += 6;
    if (roadAccess === "yes") score += 10;
    if (utilities === "nearby") score += 8;
    if (utilities === "none") score -= 6;
    if (county.trim().length >= 4) score += 4;

    if (deal === "jv") score += 4;
    if (deal === "structured") score += 2;

    return Math.max(40, Math.min(92, score));
  }, [acres, county, roadAccess, utilities, deal]);

  const accent = "var(--wb-accent-2,#1b4fd6)";
  const ink = "var(--wb-ink,#0f172a)";
  const muted = "var(--wb-muted,#475569)";

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f6f9ff]" style={{ color: ink }}>
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 900ms ease, transform 900ms ease;
        }
        [data-reveal].in { opacity: 1; transform: translateY(0); }

        .heroGlow {
          background:
            radial-gradient(900px 520px at 15% -10%, rgba(27,79,214,0.18), transparent 60%),
            radial-gradient(720px 420px at 90% 0%, rgba(27,79,214,0.10), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35));
        }
        .softGrid {
          background-image:
            linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(ellipse at top, rgba(0,0,0,1), rgba(0,0,0,0));
          opacity: 0.35;
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 heroGlow" />
        <div className="absolute inset-0 softGrid pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div data-reveal className="inline-flex flex-wrap gap-2">
                <GlowPill>
                  <span style={{ color: accent }}>
                    <IconSpark />
                  </span>
                  WestBrook Land Desk
                </GlowPill>
                <GlowPill>
                  <span style={{ color: accent }}>
                    <IconMapPin />
                  </span>
                  Texas • DFW + statewide
                </GlowPill>
                <GlowPill>
                  <span style={{ color: accent }}>
                    <IconBolt />
                  </span>
                  24–48h review
                </GlowPill>
              </div>

              <h1 data-reveal className="mt-6 text-4xl font-black leading-[1.05] sm:text-6xl" style={{ color: ink }}>
                Sell Your Land With a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${accent}, #0f172a, ${accent})`,
                  }}
                >
                  Premium Experience
                </span>
              </h1>

              <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: muted }}>
                A clean acquisition flow: fast underwriting, clear terms, and deal structures that match what you want.
                No pushy buyer vibe.
              </p>

              <div data-reveal className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_50px_rgba(27,79,214,0.22)] hover:opacity-95"
                  style={{ background: accent }}
                >
                  Explore Opportunities <IconArrowRight />
                </Link>

                <a
                  href="#estimate"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 hover:bg-slate-50"
                >
                  Quick Estimate
                </a>
              </div>

              <div data-reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric label="Typical Close" value="14–30 days" />
                <Metric label="Deal Options" value="Cash / JV" />
                <Metric label="Fees" value="No hidden fees" />
                <Metric label="Coverage" value="All Texas" />
              </div>
            </div>

            {/* Right "Mini Dashboard" */}
            <div data-reveal className="rounded-[28px] border border-slate-200 bg-white/80 p-5 backdrop-blur shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-900">Offer Readiness</div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                  Live (UI)
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">Confidence Score</div>
                <div className="mt-2 flex items-end justify-between">
                  <div className="text-3xl font-black text-slate-900">{confidence}%</div>
                  <div className="text-xs font-bold text-slate-500">
                    {confidence >= 80 ? "High-fit" : confidence >= 65 ? "Good-fit" : "Needs review"}
                  </div>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${confidence}%`,
                      background: `linear-gradient(90deg, ${accent}, rgba(27,79,214,0.35))`,
                    }}
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-bold text-slate-700">Deal</div>
                    <div className="mt-1 capitalize">{deal}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-bold text-slate-700">County</div>
                    <div className="mt-1">{county || "—"}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-bold text-slate-700">Acreage</div>
                    <div className="mt-1">{acres || "—"} acres</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-bold text-slate-700">Access</div>
                    <div className="mt-1">{roadAccess === "yes" ? "Road access" : "No access"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs leading-relaxed text-slate-500">
                This is a visual estimator only. Real offers depend on parcel, topography, zoning, and title review.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEAL TYPES */}
      <section className="relative mx-auto max-w-6xl px-4 py-14">
        <div data-reveal className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold tracking-wider text-slate-500">DEAL STRUCTURES</div>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl text-slate-900">
              Pick the deal that matches your goal
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              No “one-size-fits-all”. Some sellers want speed, some want upside. Choose a direction and we tailor terms.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <DealCard
            active={deal === "cash"}
            title="Cash Purchase"
            subtitle="Clean, direct buy. Fast close through a title company."
            badge="Fastest"
            icon={<IconBolt />}
            onClick={() => setDeal("cash")}
          />
          <DealCard
            active={deal === "structured"}
            title="Structured Close"
            subtitle="Flexible timeline, staged payments, or creative terms when needed."
            badge="Flexible"
            icon={<IconShield />}
            onClick={() => setDeal("structured")}
          />
          <DealCard
            active={deal === "jv"}
            title="Joint Venture"
            subtitle="For sellers who want upside: partner in development value."
            badge="Upside"
            icon={<IconHandshake />}
            onClick={() => setDeal("jv")}
          />
        </div>
      </section>

      {/* ESTIMATOR + REGION PANEL */}
      <section id="estimate" className="relative mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Estimator */}
          <div data-reveal className="rounded-[28px] border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold tracking-wider text-slate-500">QUICK ESTIMATE</div>
                <div className="mt-2 text-xl font-black text-slate-900">Property Snapshot</div>
                <div className="mt-1 text-sm text-slate-600">Fill these to generate a confidence score.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3" style={{ color: accent }}>
                <IconSpark />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600">County</label>
                <input
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  placeholder="e.g. Denton"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Acreage</label>
                <input
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                  placeholder="e.g. 5"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-600">Road Access</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRoadAccess("yes")}
                      className={cx(
                        "rounded-2xl border px-4 py-3 text-xs font-extrabold transition-all",
                        roadAccess === "yes"
                          ? "border-[color:var(--wb-accent-2,#1b4fd6)]/30 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      )}
                      style={roadAccess === "yes" ? { background: accent } : undefined}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoadAccess("no")}
                      className={cx(
                        "rounded-2xl border px-4 py-3 text-xs font-extrabold transition-all",
                        roadAccess === "no"
                          ? "border-[color:var(--wb-accent-2,#1b4fd6)]/30 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      )}
                      style={roadAccess === "no" ? { background: accent } : undefined}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">Utilities</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(["nearby", "unknown", "none"] as const).map((u) => {
                      const active = utilities === u;
                      return (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUtilities(u)}
                          className={cx(
                            "rounded-2xl border px-3 py-3 text-[11px] font-extrabold capitalize transition-all",
                            active
                              ? "border-[color:var(--wb-accent-2,#1b4fd6)]/30 text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          )}
                          style={active ? { background: accent } : undefined}
                        >
                          {u}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-600">Confidence</div>
                  <div className="text-xs font-extrabold text-slate-900">{confidence}%</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${confidence}%`,
                      background: `linear-gradient(90deg, ${accent}, rgba(27,79,214,0.35))`,
                    }}
                  />
                </div>
                <div className="mt-3 text-xs text-slate-600">
                  Next: we validate parcel + comps + zoning before finalizing an offer.
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-extrabold text-white shadow-[0_16px_45px_rgba(27,79,214,0.18)] hover:opacity-95"
                  style={{ background: accent }}
                >
                  Book 15-min call <IconArrowRight />
                </a>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-50"
                >
                  View Listings
                </Link>
              </div>
            </div>
          </div>

          {/* Region Panel */}
          <div data-reveal className="rounded-[28px] border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold tracking-wider text-slate-500">MARKET VIEW</div>
                <div className="mt-2 text-xl font-black text-slate-900">Texas Acquisition Zones</div>
                <div className="mt-1 text-sm text-slate-600">
                  Conceptual region panel (placeholder). Replace later with real map / imagery.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3" style={{ color: accent }}>
                <IconMapPin />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { t: "DFW Core", d: "High-demand infill + build-ready parcels", tag: "Top priority" },
                { t: "North Growth", d: "Expanding corridors, future value plays", tag: "Growth" },
                { t: "Central Texas", d: "Mixed-use pockets, strong migration", tag: "Selective" },
                { t: "Statewide", d: "We review all Texas land deals", tag: "Open" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold text-slate-900">{c.t}</div>
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-600">
                      {c.tag}
                    </div>
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600">{c.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-extrabold text-slate-900">What we love</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Road frontage", "Buildable lots", "Clear access", "Good comps", "Flexible zoning", "Legacy land"].map(
                  (x) => (
                    <span
                      key={x}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-slate-600"
                    >
                      {x}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <div data-reveal className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold tracking-wider text-slate-500">PROCESS</div>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl text-slate-900">A clean path to closing</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Stepper interaction (no fragile connecting lines).
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div data-reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Stepper steps={process} active={activeStep} setActive={setActiveStep} />

            <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 backdrop-blur shadow-sm">
              <div className="text-xs font-extrabold tracking-wider text-slate-500">WHY TRUST THIS</div>

              <div className="mt-3 space-y-3">
                {[
                  { icon: <IconShield />, t: "Transparent terms", d: "No weird clauses. No surprises." },
                  { icon: <IconBolt />, t: "Fast underwriting", d: "We move quickly and communicate clearly." },
                  { icon: <IconHandshake />, t: "Flexible options", d: "Cash, structured, or JV." },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-xl border border-slate-200 bg-slate-50 p-2"
                        style={{ color: accent }}
                      >
                        {x.icon}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-900">{x.t}</div>
                        <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                Tip: Replace these with real metrics later (avg close time, counties served, deal types).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <div data-reveal className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold tracking-wider text-slate-500">PROOF</div>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl text-slate-900">Seller stories that feel real</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Premium review wall layout (no scrolling row).
            </p>
          </div>
        </div>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {[
            { n: "Robert J.", c: "Collin County", t: "Fair offer fast. No drama. Closed smoothly." },
            { n: "Sarah M.", c: "Denton County", t: "Professional + transparent. Best experience selling land." },
            { n: "Linda D.", c: "Tarrant County", t: "Title situation was messy, they handled it." },
            { n: "Michael T.", c: "Ellis County", t: "They kept every promise. Clean deal." },
            { n: "Jennifer C.", c: "Dallas County", t: "Coordinated with attorney, perfect paperwork." },
            { n: "Angela M.", c: "Hunt County", t: "Inherited land sale felt stress-free." },
          ].map((s, idx) => (
            <div
              key={idx}
              data-reveal
              className="mb-4 break-inside-avoid rounded-3xl border border-slate-200 bg-white/80 p-5 backdrop-blur shadow-sm"
            >
              <div className="text-sm font-extrabold text-slate-900">{s.n}</div>
              <div className="mt-1 text-xs font-bold text-slate-500">{s.c}</div>
              <div className="mt-3 text-sm leading-relaxed text-slate-600">“{s.t}”</div>
              <div className="mt-4 flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="relative mx-auto max-w-6xl px-4 pb-20">
        <div data-reveal className="rounded-[32px] border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-extrabold tracking-wider text-slate-500">BOOKING</div>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl text-slate-900">15-minute call, zero pressure</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Pick a weekday slot. We’ll review your land and discuss the best deal type.
              </p>
            </div>

            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold text-slate-600">
              Weekdays only
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
            <CalendarPicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <TimeSlotPicker selectedTime={selectedTime} onSelectTime={setSelectedTime} />

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-slate-900">Your Summary</div>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Deal</span>
                  <span className="font-bold capitalize text-slate-900">{deal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">County</span>
                  <span className="font-bold text-slate-900">{county || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Acreage</span>
                  <span className="font-bold text-slate-900">{acres || "—"} acres</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Confidence</span>
                  <span className="font-bold text-slate-900">{confidence}%</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                {selectedDate && selectedTime ? (
                  <>
                    <div className="font-extrabold text-slate-900">Selected slot</div>
                    <div className="mt-1">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {selectedTime}
                    </div>
                  </>
                ) : (
                  <div>Select a weekday + time to enable confirmation.</div>
                )}
              </div>

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                className={cx(
                  "mt-5 w-full rounded-2xl px-5 py-4 text-sm font-extrabold transition-all",
                  selectedDate && selectedTime
                    ? "text-white shadow-[0_14px_40px_rgba(27,79,214,0.18)] hover:opacity-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
                style={selectedDate && selectedTime ? { background: accent } : undefined}
              >
                Confirm Consultation
              </button>

              <div className="mt-3 text-center text-[11px] text-slate-500">
                No spam. Just one clean call.
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div data-reveal className="rounded-[28px] border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm sm:p-8">
            <div className="text-xs font-extrabold tracking-wider text-slate-500">SUBMIT DETAILS</div>
            <div className="mt-2 text-2xl font-black text-slate-900">Want an offer without a call?</div>
            <div className="mt-2 text-sm leading-relaxed text-slate-600">
              Send your info — we’ll respond within 24–48 hours with next steps.
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Name"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
              />
              <input
                placeholder="Email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
              />
              <input
                placeholder="Phone"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
              />
              <input
                placeholder="Parcel / Address / County"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
              />
              <textarea
                rows={3}
                placeholder="Notes (optional)"
                className="sm:col-span-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--wb-accent-2,#1b4fd6)]/40 focus:ring-2 focus:ring-[color:var(--wb-accent-2,#1b4fd6)]/15"
              />
            </div>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold text-white shadow-[0_16px_45px_rgba(27,79,214,0.18)] hover:opacity-95"
              style={{ background: accent }}
            >
              Get My Offer <IconArrowRight />
            </button>

            <div className="mt-3 text-center text-[11px] text-slate-500">
              You’re in control. No hidden fees. No pressure.
            </div>
          </div>

          <div data-reveal className="rounded-[28px] border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm sm:p-8">
            <div className="text-xs font-extrabold tracking-wider text-slate-500">WHY THIS FEELS WESTBROOK</div>
            <div className="mt-2 text-2xl font-black text-slate-900">Clean • Premium • Simple</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Light, airy, and confident. Same “deal selection + estimator + booking” concept, but aligned to your
              white/blue/ink palette.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { t: "Premium light glass", d: "Matches modern real-estate sites (not dark SaaS)." },
                { t: "No timeline bugs", d: "Stepper interaction instead of fragile connecting lines." },
                { t: "Estimator UI", d: "Users engage immediately, reduces bounce." },
                { t: "Booking summary", d: "Clear confirmation reduces drop-off." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-extrabold text-slate-900">{x.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-50"
              >
                Explore More
              </Link>
              <a
                href="#estimate"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold text-white shadow-[0_14px_40px_rgba(27,79,214,0.18)] hover:opacity-95"
                style={{ background: accent }}
              >
                Try Estimator <IconArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SPACE */}
      <div className="pb-10" />
    </div>
  );
}
