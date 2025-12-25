// src/pages/Partnerships.tsx
import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiTeamLine,
  RiShieldCheckLine,
  RiEyeLine,
  RiLeafLine,
  RiArrowRightUpLine,
  RiCheckLine,
  RiCalendarScheduleLine,
  RiPhoneLine,
  RiBriefcaseLine,
  RiSparklingLine,
  RiPulseLine,
  RiRoadMapLine,
  RiFileTextLine,
  RiHammerLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiAddLine,
  RiCloseLine,
  RiMapPin2Line,
  RiStackLine,
  RiToolsLine,
  RiDraftLine,
  RiMedalLine,
  RiHomeSmile2Line,
  RiHandHeartLine,
  RiTimeLine,
  RiBarChart2Line,
} from "react-icons/ri";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** ✅ Replace with your real Google appointment schedule URL */
const APPOINTMENT_URL =
  "https://calendar.google.com/calendar/appointments/schedules/ACZssZ0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

type Pill = { label: string; icon: ReactNode };
type Stat = { value: string; label: string; hint: string };
type Faq = { q: string; a: string };

type TrackKey = "land" | "design" | "trade";

type Track = {
  key: TrackKey;
  title: string;
  sub: string;
  icon: ReactNode;
  highlight: string;
  bullets: string[];
  goodFit: string[];
  whatWeBring: string[];
};

type Step = {
  key: string;
  n: number;
  title: string;
  desc: string;
  eta: string;
  outcomes: string[];
  deliverables: string[];
  icon: ReactNode;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/* ─────────────────────────────────────────────────────────────
   Background (no squares)
   ───────────────────────────────────────────────────────────── */
function PageBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22),transparent_62%)] blur-[2px]" />
      <div className="absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.18),transparent_62%)] blur-[2px]" />
      <div className="absolute -bottom-40 left-[20%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_66%)] blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_420px_at_50%_0%,rgba(255,255,255,0.60),transparent_60%)]" />
    </div>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[26px] border border-black/10 bg-white/60 backdrop-blur-xl",
        "shadow-[0_18px_60px_rgba(11,18,32,0.10)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_62%)]" />
        <div className="absolute -right-28 -top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.12),transparent_62%)]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  sub,
  align = "center",
}: {
  kicker?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cx("mb-6", align === "center" ? "text-center" : "text-left")}>
      {kicker && (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.26em] text-black/55">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          {kicker}
        </div>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-black/55">{sub}</p>}
    </div>
  );
}

function MiniPills({ items }: { items: Pill[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((p) => (
        <div
          key={p.label}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-extrabold text-black/65"
        >
          <span className="text-blue-600">{p.icon}</span>
          {p.label}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Tracks
   ───────────────────────────────────────────────────────────── */
function TrackTabs({
  active,
  onChange,
  tracks,
}: {
  active: TrackKey;
  onChange: (k: TrackKey) => void;
  tracks: Track[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tracks.map((t) => {
        const is = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition",
              "border border-black/10",
              is
                ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-[0_14px_30px_rgba(59,130,246,0.20)]"
                : "bg-white/60 text-black/70 hover:bg-white"
            )}
          >
            <span className={cx("text-lg", is ? "text-white" : "text-blue-600")}>{t.icon}</span>
            {t.title}
          </button>
        );
      })}
    </div>
  );
}

/** ✅ Premium Track panel */
function TrackPanel({ track }: { track: Track }) {
  return (
    <GlassCard className="p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white/70 text-blue-600 shadow-[0_12px_24px_rgba(11,18,32,0.08)]">
                {track.icon}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-950 break-words">
                    {track.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.18em] text-black/55">
                    PARTNERSHIP TRACK
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-black/55 break-words">{track.sub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value strip */}
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/60 px-4 py-3">
          <div className="pointer-events-none absolute -left-20 -top-24 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_64%)]" />
          <div className="pointer-events-none absolute -right-24 -bottom-28 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.18),transparent_64%)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
              <RiSparklingLine className="text-blue-600 text-lg" />
              {track.highlight}
            </div>
            <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-extrabold text-black/60">
              Premium + predictable delivery
            </span>
          </div>
        </div>
      </div>

      {/* Content cards */}
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {/* How it works */}
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
              HOW IT WORKS
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[11px] font-extrabold text-black/55">
              <RiRoadMapLine className="text-blue-600" />
              Clear steps
            </span>
          </div>

          <ul className="mt-3 space-y-2">
            {track.bullets.map((x) => (
              <li
                key={x}
                className="flex items-start gap-2 rounded-xl border border-black/10 bg-white/55 px-3 py-2 text-sm text-black/70"
              >
                <span className="mt-0.5 text-blue-600 shrink-0">
                  <RiCheckLine />
                </span>
                <span className="break-words">{x}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What we bring */}
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
              WHAT WESTBROOK BRINGS
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[11px] font-extrabold text-black/55">
              <RiShieldCheckLine className="text-blue-600" />
              Quality control
            </span>
          </div>

          <ul className="mt-3 space-y-2">
            {track.whatWeBring.map((x) => (
              <li
                key={x}
                className="flex items-start gap-2 rounded-xl border border-black/10 bg-white/55 px-3 py-2 text-sm text-black/70"
              >
                <span className="mt-0.5 text-indigo-700 shrink-0">
                  <RiSparklingLine />
                </span>
                <span className="break-words">{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-3 text-sm font-extrabold text-slate-950">
            Premium rule:
            <span className="ml-2 text-black/60 font-semibold">
              scope locked → checkpoints → finish protected.
            </span>
          </div>
        </div>
      </div>

      {/* Good fit footer */}
      <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[12px] font-extrabold tracking-[0.22em] text-black/45">
            <RiMedalLine className="text-blue-600 text-lg" />
            GOOD FIT
          </div>
          <span className="text-xs font-semibold text-black/50">
            If this sounds like you, you’ll do well with us.
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {track.goodFit.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[12px] font-extrabold text-black/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────────────────────
   Roadmap
   ───────────────────────────────────────────────────────────── */
function DetailPanel({ step }: { step: Step }) {
  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-black/55">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            STEP {step.n} • {step.eta}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white/65 text-blue-600 shadow-[0_12px_26px_rgba(11,18,32,0.08)]">
              {step.icon}
            </div>
            <div className="text-xl font-extrabold text-slate-950 truncate">{step.title}</div>
          </div>

          <p className="mt-3 text-sm leading-6 text-black/55">{step.desc}</p>
        </div>

        <div className="hidden md:grid shrink-0 h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/60">
          <RiSparklingLine className="text-blue-600 text-xl" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
          <div className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
            DELIVERABLES
          </div>
          <ul className="mt-3 space-y-2">
            {step.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-black/65">
                <span className="mt-0.5 text-blue-600 shrink-0">
                  <RiCheckLine />
                </span>
                <span className="break-words">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
          <div className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
            OUTCOMES
          </div>
          <ul className="mt-3 space-y-2">
            {step.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-black/65">
                <span className="mt-0.5 text-indigo-700 shrink-0">
                  <RiCheckLine />
                </span>
                <span className="break-words">{o}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/55 p-3 text-sm font-extrabold text-black/65">
            Tip: written approvals prevent scope creep.
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function StepNavigatorCard({
  step,
  idx,
  total,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onDot,
}: {
  step: Step;
  idx: number;
  total: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDot: (index: number) => void;
}) {
  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
            PARTNER ONBOARDING
          </div>
          <div className="mt-1 text-sm font-semibold text-black/60">
            Step {idx + 1} of {total}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-black/70 transition",
              !canPrev ? "opacity-45 cursor-not-allowed" : "hover:bg-white hover:-translate-y-[1px]"
            )}
            aria-label="Previous step"
          >
            <RiArrowLeftSLine className="text-xl" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-black/70 transition",
              !canNext ? "opacity-45 cursor-not-allowed" : "hover:bg-white hover:-translate-y-[1px]"
            )}
            aria-label="Next step"
          >
            <RiArrowRightSLine className="text-xl" />
          </button>
        </div>
      </div>

      <motion.div
        key={step.key}
        className="mt-4 relative overflow-hidden rounded-[24px] border border-black/10 bg-white/65 p-5 shadow-[0_18px_50px_rgba(11,18,32,0.08)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <div className="pointer-events-none absolute -inset-16">
          <div className="absolute left-0 top-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_62%)]" />
        </div>

        <div className="relative flex items-start gap-4">
          <div className="shrink-0">
            <div className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <span className="text-lg font-extrabold">{step.n}</span>
              <div className="absolute -bottom-3 grid h-8 w-8 place-items-center rounded-2xl border border-black/10 bg-white text-blue-600 shadow-[0_10px_24px_rgba(11,18,32,0.10)]">
                {step.icon}
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[16px] font-extrabold text-slate-950 break-words">
                  {step.title}
                </div>
                <div className="mt-1 text-sm leading-6 text-black/55 break-words">
                  {step.desc}
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] font-extrabold text-black/55">
                {step.eta}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {step.outcomes.slice(0, 3).map((o) => (
                <span
                  key={o}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] font-extrabold text-black/60"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onDot(i)}
                className={cx(
                  "h-2.5 w-2.5 rounded-full border border-black/10 transition",
                  active
                    ? "bg-blue-600 shadow-[0_10px_22px_rgba(59,130,246,0.25)]"
                    : "bg-white/60 hover:bg-white"
                )}
                aria-label={`Go to step ${i + 1}`}
              />
            );
          })}
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-extrabold text-black/60">
          <RiSparklingLine className="text-blue-600" />
          Arrows / dots
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-white/55 p-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
          <RiShieldCheckLine className="text-blue-600" />
          Designed for premium delivery
        </div>
        <p className="mt-1 text-sm leading-6 text-black/55">
          Clear scope → clean checkpoints → quality sign-offs → client trust.
        </p>
      </div>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function Partnerships() {
  const heroPills: Pill[] = useMemo(
    () => [
      { label: "Custom homes only", icon: <RiHomeSmile2Line /> },
      { label: "Defined standards", icon: <RiShieldCheckLine /> },
      { label: "Written checkpoints", icon: <RiFileTextLine /> },
      { label: "Calm execution", icon: <RiLeafLine /> },
    ],
    []
  );

  const stats: Stat[] = useMemo(
    () => [
      { value: "3", label: "Partner tracks", hint: "Land • Design • Trade" },
      { value: "20–30m", label: "Intro call", hint: "Fast alignment" },
      { value: "7-step", label: "Onboarding", hint: "Predictable" },
    ],
    []
  );

  const tracks: Track[] = useMemo(
    () => [
      {
        key: "land",
        title: "Landowners / Development",
        sub: "If you have land, we evaluate feasibility and propose the best path—sale, JV, or custom-build strategy.",
        icon: <RiMapPin2Line className="text-lg" />,
        highlight: "Feasibility-first. Clean terms. Clear reporting.",
        bullets: [
          "High-level site review (access, utilities, constraints).",
          "Feasibility + concept direction (what’s realistic).",
          "If JV: decision rights + milestones + distribution clarity.",
          "If sale is smarter: we’ll tell you upfront.",
        ],
        goodFit: ["Clear title", "Good access", "Utilities feasible", "Growth location"],
        whatWeBring: [
          "Project planning + delivery control.",
          "Premium design standards + finish discipline.",
          "Structured updates (budget, timeline, milestones).",
          "One accountable team—less noise.",
        ],
      },
      {
        key: "design",
        title: "Architects / Interior Design",
        sub: "We protect design intent while keeping buildability, budget, and timelines clean—so homes feel premium, not messy.",
        icon: <RiDraftLine className="text-lg" />,
        highlight: "Less rework. Better detailing. Smooth site flow.",
        bullets: [
          "Clear design → build handoff (drawings → BOQ → site).",
          "Detail coordination and material intent alignment.",
          "Milestone approvals to avoid change-order chaos.",
          "A delivery rhythm that respects your design language.",
        ],
        goodFit: ["Detail-led", "Clear documentation", "Premium taste", "Client-first"],
        whatWeBring: [
          "Buildability reviews early (not late).",
          "Scope templates + sign-off checkpoints.",
          "Weekly cadence + coordination discipline.",
          "Finish QA + punch-list control.",
        ],
      },
      {
        key: "trade",
        title: "Contractors / Suppliers",
        sub: "If you deliver quality consistently, we build long-term. We prefer one strong partner over many random vendors.",
        icon: <RiToolsLine className="text-lg" />,
        highlight: "Pre-qual → pilot → scale. Quality stays consistent.",
        bullets: [
          "Quick pre-qualification (capability, capacity, basics).",
          "Pilot project to validate speed + finish + coordination.",
          "Defined QA checkpoints and handoff standards.",
          "If pilot is strong: repeat pipeline and tiered partnership.",
        ],
        goodFit: ["On-time", "Clean workmanship", "Responsive", "Accountable team"],
        whatWeBring: [
          "Premium clients + clear scopes.",
          "Written deliverables (no ambiguity).",
          "Faster decisions, less site friction.",
          "Long-term relationship mindset.",
        ],
      },
    ],
    []
  );

  const steps: Step[] = useMemo(
    () => [
      {
        key: "intro",
        n: 1,
        title: "Intro + fit",
        desc: "Align on your track, service area, and expectations for premium delivery.",
        eta: "1–2 days",
        outcomes: ["Clear fit decision", "Track selected", "Next step locked"],
        deliverables: ["Intro notes", "Track selection", "Next-step checklist"],
        icon: <RiTeamLine className="text-lg" />,
      },
      {
        key: "prequal",
        n: 2,
        title: "Pre-qualification",
        desc: "Capability, capacity, lead times, and basic risk checks—so expectations stay clean.",
        eta: "3–7 days",
        outcomes: ["Capability validated", "Risks mapped", "Standards aligned"],
        deliverables: ["Capability snapshot", "Capacity notes", "Quality baseline"],
        icon: <RiStackLine className="text-lg" />,
      },
      {
        key: "standards",
        n: 3,
        title: "Scope + standards",
        desc: "Define what “done” means: deliverables, materials, finish standards, and approvals.",
        eta: "1 week",
        outcomes: ["No ambiguity", "Less rework", "Faster approvals"],
        deliverables: ["Scope template", "QA checklist", "Approval flow"],
        icon: <RiFileTextLine className="text-lg" />,
      },
      {
        key: "pilot",
        n: 4,
        title: "Pilot engagement",
        desc: "Start controlled. Validate coordination, quality, and speed before scaling.",
        eta: "Project-based",
        outcomes: ["Performance proven", "Cadence set", "Trust built"],
        deliverables: ["Pilot plan", "Milestones", "Update rhythm"],
        icon: <RiPulseLine className="text-lg" />,
      },
      {
        key: "cadence",
        n: 5,
        title: "Execution cadence",
        desc: "Weekly checkpoints + structured reporting so nothing gets missed.",
        eta: "Ongoing",
        outcomes: ["On-time delivery", "Clear accountability", "Smooth site flow"],
        deliverables: ["Weekly updates", "Issue tracker", "Punch-list process"],
        icon: <RiRoadMapLine className="text-lg" />,
      },
      {
        key: "qa",
        n: 6,
        title: "Quality checkpoints",
        desc: "Inspections at key milestones to keep premium finish consistent.",
        eta: "Milestone-based",
        outcomes: ["Premium finish", "Reduced rework", "Clean handover"],
        deliverables: ["Inspection checklist", "Punch-list", "Sign-off notes"],
        icon: <RiShieldCheckLine className="text-lg" />,
      },
      {
        key: "scale",
        n: 7,
        title: "Scale the partnership",
        desc: "When quality + collaboration are proven, we increase volume and standardize workflows.",
        eta: "Next projects",
        outcomes: ["More work", "Smoother delivery", "Long-term collaboration"],
        deliverables: ["Partner tiering", "Volume plan", "Refined standards"],
        icon: <RiHammerLine className="text-lg" />,
      },
    ],
    []
  );

  const tiers = useMemo(
    () => [
      {
        title: "Pilot Partner",
        icon: <RiSparklingLine />,
        desc: "Start here. One controlled engagement to validate quality + coordination.",
        points: ["Single project", "Defined checkpoints", "Clear feedback loop"],
      },
      {
        title: "Preferred Partner",
        icon: <RiMedalLine />,
        desc: "Proven delivery. Priority consideration and repeat pipeline.",
        points: ["Repeat work", "Standardized workflow", "Faster approvals"],
      },
      {
        title: "Core Partner",
        icon: <RiHandHeartLine />,
        desc: "Long-term relationship. You’re embedded in how WestBrook delivers premium homes.",
        points: ["Volume planning", "Early involvement", "Shared standards"],
      },
    ],
    []
  );

  const faqs: Faq[] = useMemo(
    () => [
      {
        q: "What’s the fastest way to become a partner?",
        a: "Take an intro call, share past work (links/photos), and we’ll run a quick pre-qualification. If it fits, we start with a pilot engagement.",
      },
      {
        q: "Do you work only with big companies?",
        a: "No. We care about finish quality, reliability, and communication. Strong specialist teams often become our best long-term partners.",
      },
      {
        q: "How do you prevent site chaos?",
        a: "Written scope, milestone approvals, weekly checkpoints, and QA sign-offs. That’s the backbone of premium delivery.",
      },
      {
        q: "If I’m a landowner—do I have to do a JV?",
        a: "Not at all. If a sale matches your goals better, we’ll say it upfront. We lead with feasibility and clarity.",
      },
    ],
    []
  );

  const [activeTrack, setActiveTrack] = useState<TrackKey>("land");
  const activeTrackObj = tracks.find((t) => t.key === activeTrack) ?? tracks[0];

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeStep = steps[activeIdx] ?? steps[0];

  const canPrev = activeIdx > 0;
  const canNext = activeIdx < steps.length - 1;

  const goPrev = () => setActiveIdx((i) => clamp(i - 1, 0, steps.length - 1));
  const goNext = () => setActiveIdx((i) => clamp(i + 1, 0, steps.length - 1));

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative overflow-x-hidden">
      <PageBg />

      <div className="relative mx-auto max-w-[1120px] px-4 py-10 sm:px-5">
        {/* HERO */}
        <GlassCard className="p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.26em] text-black/55">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <RiTeamLine />
                </span>
                PARTNERSHIPS
              </div>

              <motion.h1
                className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
              >
                Partner with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  WestBrook Homes
                </span>
                <br />
                for premium, custom builds.
              </motion.h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
                We design and build customized homes with a calm, structured process. Landowners, architects,
                interior studios, contractors, and suppliers—if you value quality and clarity, we should talk.
              </p>

              <MiniPills items={heroPills} />

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="#tracks"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "bg-gradient-to-r from-blue-600 to-indigo-700 text-white",
                    "text-sm font-extrabold shadow-[0_14px_30px_rgba(59,130,246,0.20)]",
                    "hover:brightness-110 transition"
                  )}
                >
                  Choose a partnership track <RiArrowRightUpLine />
                </a>
                <a
                  href="#schedule"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "border border-black/10 bg-white/60",
                    "text-sm font-extrabold text-black/70 hover:bg-white transition"
                  )}
                >
                  Schedule a call <RiCalendarScheduleLine />
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: <RiTimeLine />, t: "Fast alignment", d: "20–30 min intro call." },
                  { icon: <RiBarChart2Line />, t: "Clear expectations", d: "Scope + standards written." },
                  { icon: <RiShieldCheckLine />, t: "Quality protected", d: "QA checkpoints built-in." },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                      <span className="text-blue-600 text-lg">{x.icon}</span>
                      {x.t}
                    </div>
                    <div className="mt-1 text-sm text-black/55">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 min-w-0">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-[0_14px_40px_rgba(11,18,32,0.08)]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.22, delay: idx * 0.05 }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-2xl font-extrabold text-slate-950">{s.value}</div>
                    <div className="text-[11px] font-extrabold tracking-[0.26em] text-black/45">
                      {s.hint}
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-black/60">{s.label}</div>
                </motion.div>
              ))}

              <div className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-[0_14px_40px_rgba(11,18,32,0.08)]">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                  <RiCheckLine className="text-blue-600" />
                  What we need to start
                </div>
                <ul className="mt-3 space-y-2">
                  {[
                    "Your track: Land / Design / Trade",
                    "Service area + availability",
                    "Portfolio / past work (links ok)",
                    "Timelines + pricing approach",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-black/60">
                      <span className="mt-0.5 text-blue-600 shrink-0">
                        <RiCheckLine />
                      </span>
                      <span className="break-words">{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white/55 p-3 text-xs font-extrabold text-black/60">
                  We keep it simple: if it’s a fit, we move fast.
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* TRACKS (LEFT SIDE FILLED) */}
        <section className="mt-12" id="tracks">
          <SectionHead
            kicker="PARTNERSHIP TRACKS"
            title="Choose how you want to partner"
            sub="Pick your lane. We’ll tailor the intro call, requirements, and next steps."
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_560px]">
            {/* LEFT: partner-intake */}
            <GlassCard className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
                    STARTING A PARTNERSHIP
                  </div>
                  <div className="mt-1 text-sm font-semibold text-black/60">
                    Simple, premium, structured.
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-extrabold text-black/60">
                  <RiSparklingLine className="text-blue-600" />
                  No chaos delivery
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-4">
                <TrackTabs active={activeTrack} onChange={setActiveTrack} tracks={tracks} />
              </div>

              {/* What we look for */}
              <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[12px] font-extrabold tracking-[0.22em] text-black/45">
                    <RiMedalLine className="text-blue-600 text-lg" />
                    WHAT WE LOOK FOR
                  </div>
                  <span className="text-xs font-semibold text-black/50">Quick fit checklist</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Quality-first mindset",
                    "Clear communication",
                    "Reliable timelines",
                    "Premium finish discipline",
                    "Accountable team",
                    "Documentation / clarity",
                  ].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[12px] font-extrabold text-black/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini timeline */}
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: <RiTimeLine className="text-blue-600 text-lg" />,
                    title: "Intro call",
                    desc: "20–30 mins to align on track and expectations.",
                  },
                  {
                    icon: <RiFileTextLine className="text-blue-600 text-lg" />,
                    title: "Scope + standards",
                    desc: "Written deliverables + checkpoints to protect quality.",
                  },
                  {
                    icon: <RiShieldCheckLine className="text-blue-600 text-lg" />,
                    title: "Pilot / start",
                    desc: "Controlled first engagement, then scale if strong.",
                  },
                ].map((x) => (
                  <div key={x.title} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                      {x.icon} {x.title}
                    </div>
                    <div className="mt-1 text-sm text-black/55">{x.desc}</div>
                  </div>
                ))}
              </div>

              {/* CTA strip */}
              <div className="mt-3 rounded-2xl border border-black/10 bg-white/60 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-slate-950">
                      Ready to partner with WestBrook Homes?
                    </div>
                    <div className="mt-1 text-sm text-black/55">
                      Share your track + portfolio. We’ll guide the rest.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <a
                      href="#schedule"
                      className={cx(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2",
                        "bg-gradient-to-r from-blue-600 to-indigo-700 text-white",
                        "text-sm font-extrabold shadow-[0_14px_30px_rgba(59,130,246,0.20)]",
                        "hover:brightness-110 transition"
                      )}
                    >
                      Schedule a call <RiCalendarScheduleLine />
                    </a>
                    <a
                      href="/contact"
                      className={cx(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2",
                        "border border-black/10 bg-white/70",
                        "text-sm font-extrabold text-black/70 hover:bg-white transition"
                      )}
                    >
                      Contact <RiPhoneLine />
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* RIGHT: detailed track */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrackObj.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <TrackPanel track={activeTrackObj} />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mt-12" id="roadmap">
          <SectionHead
            kicker="THE PROCESS"
            title="A clean partnership process"
            sub="Pre-qualification and checkpoints keep custom-home delivery premium."
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_520px]">
            <StepNavigatorCard
              step={activeStep}
              idx={activeIdx}
              total={steps.length}
              canPrev={canPrev}
              canNext={canNext}
              onPrev={goPrev}
              onNext={goNext}
              onDot={(i) => setActiveIdx(clamp(i, 0, steps.length - 1))}
            />

            <div className="lg:sticky lg:top-24 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <DetailPanel step={activeStep} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* PARTNER TIERS */}
        <section className="mt-12" id="tiers">
          <SectionHead
            kicker="PARTNER TIERS"
            title="Pilot → Preferred → Core"
            sub="We scale only after quality and coordination are proven."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((x, idx) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.22, delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-[26px] border border-black/10 bg-white/60 backdrop-blur-xl p-6 shadow-[0_18px_50px_rgba(11,18,32,0.08)]"
              >
                <div className="pointer-events-none absolute -inset-16">
                  <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_62%)]" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/65 text-blue-600">
                      {x.icon}
                    </span>
                    {x.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-black/55">{x.desc}</p>

                  <ul className="mt-4 space-y-2">
                    {x.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-black/65">
                        <span className="mt-0.5 text-blue-600 shrink-0">
                          <RiCheckLine />
                        </span>
                        <span className="break-words">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12" id="faq">
          <SectionHead kicker="FAQ" title="Quick answers" sub="Straightforward. No fluff." />
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <button
                  key={f.q}
                  type="button"
                  onClick={() => setOpenFaq((p) => (p === i ? null : i))}
                  className={cx(
                    "w-full text-left rounded-[24px] border border-black/10 bg-white/60",
                    "p-5 shadow-[0_14px_40px_rgba(11,18,32,0.07)] hover:bg-white transition"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-[15px] font-extrabold text-slate-950">{f.q}</div>
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white/70 text-black/60">
                      {isOpen ? <RiCloseLine className="text-lg" /> : <RiAddLine className="text-lg" />}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="mt-3 text-sm leading-6 text-black/60"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {f.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </section>

        {/* SCHEDULE */}
        <section className="mt-12" id="schedule">
          <SectionHead
            kicker="LET’S TALK"
            title="Schedule a partnership call"
            sub="20–30 minutes. We’ll pick the right track and define next steps."
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
            <GlassCard>
              <div className="border-b border-black/10 p-5">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                  <RiCalendarScheduleLine className="text-lg text-blue-600" />
                  Appointment Scheduling
                </div>
                <div className="mt-1 text-sm text-black/55">20–30 mins • Track selection • Next steps</div>
              </div>

              <div className="relative h-[640px] sm:h-[720px] w-full bg-white">
                <iframe
                  title="WestBrook Partnerships Scheduling"
                  src={APPOINTMENT_URL}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </GlassCard>

            <GlassCard className="p-5 sm:p-6 lg:sticky lg:top-24 self-start">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                <RiBriefcaseLine className="text-lg text-blue-600" />
                Come prepared with
              </div>

              <div className="mt-4 space-y-3">
                {[
                  "Your track + service area",
                  "Portfolio / past work (links ok)",
                  "Typical lead times + timelines",
                  "How you handle QA / revisions",
                ].map((t) => (
                  <div key={t} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-blue-600 shrink-0">
                        <RiCheckLine />
                      </span>
                      <div className="text-sm font-semibold text-black/70 break-words">{t}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2">
                <a
                  href={APPOINTMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
                    "bg-gradient-to-r from-blue-600 to-indigo-700 text-white",
                    "text-sm font-extrabold shadow-[0_14px_30px_rgba(59,130,246,0.20)]",
                    "hover:brightness-110 transition"
                  )}
                >
                  Open scheduler <RiArrowRightUpLine />
                </a>

                <a
                  href="/contact"
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
                    "border border-black/10 bg-white/60",
                    "text-sm font-extrabold text-black/70 hover:bg-white transition"
                  )}
                >
                  Contact instead <RiPhoneLine />
                </a>
              </div>

              <div className="mt-4 text-xs text-black/45">
                If the embed looks blank, your browser may block third-party embeds. Use “Open scheduler”.
              </div>
            </GlassCard>
          </div>
        </section>

        <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(59,130,246,0.22),transparent)]" />
        <div className="py-8 text-center text-xs text-black/45">
          © {new Date().getFullYear()} WestBrook Homes • Partnerships
        </div>
      </div>
    </main>
  );
}
