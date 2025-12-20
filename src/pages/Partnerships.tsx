// src/pages/Partnerships.tsx
import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiTeamLine,
  RiLineChartLine,
  RiShieldCheckLine,
  RiEyeLine,
  RiLeafLine,
  RiArrowRightUpLine,
  RiMapPin2Line,
  RiCheckLine,
  RiCalendarScheduleLine,
  RiPhoneLine,
  RiBriefcaseLine,
  RiSparklingLine,
  RiPulseLine,
  RiRoadMapLine,
  RiBuilding4Line,
  RiFileTextLine,
  RiGovernmentLine,
  RiHammerLine,
  RiMoneyDollarCircleLine,
  RiAddLine,
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** ✅ Replace with your real Google appointment schedule URL */
const APPOINTMENT_URL =
  "https://calendar.google.com/calendar/appointments/schedules/ACZssZ0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

type Pill = { label: string; icon: ReactNode };
type Benefit = { icon: ReactNode; title: string; desc: string; tags: string[] };

type Step = {
  key: string;
  n: number;
  title: string;
  desc: string;
  eta: string;
  outcomes: string[];
  deliverables: string[];
  icon: ReactNode;
  accent: "a" | "b";
};

type Faq = { q: string; a: string };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function SoftBg() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_340px_at_16%_0%,rgba(27,79,214,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(820px_320px_at_86%_10%,rgba(11,42,111,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_360px_at_50%_120%,rgba(27,79,214,0.10),transparent_60%)]" />
    </>
  );
}

function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[26px] border border-[color:var(--wb-border)] bg-white/65 backdrop-blur",
        "shadow-[0_18px_44px_rgba(11,18,32,0.10)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_220px_at_12%_0%,rgba(27,79,214,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(460px_240px_at_95%_20%,rgba(11,42,111,0.10),transparent_55%)]" />
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
    <div className={cx("mb-7", align === "center" ? "text-center" : "text-left")}>
      {kicker && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.26em] text-black/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
          {kicker}
        </div>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-3xl">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-black/55">
          {sub}
        </p>
      )}
    </div>
  );
}

function MiniPills({ items }: { items: Pill[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((p) => (
        <div
          key={p.label}
          className={cx(
            "inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)]",
            "bg-white/70 px-3 py-1.5 text-xs font-extrabold text-black/65"
          )}
        >
          <span className="text-[color:var(--wb-accent)]">{p.icon}</span>
          {p.label}
        </div>
      ))}
    </div>
  );
}

function BenefitCard({ b }: { b: Benefit }) {
  return (
    <motion.div
      className={cx(
        "group relative overflow-hidden rounded-[22px] border border-[color:var(--wb-border)] bg-white/70 backdrop-blur",
        "p-5 shadow-[0_14px_30px_rgba(11,18,32,0.08)]"
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.22 }}
      whileHover={{ y: -3 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(520px_220px_at_30%_0%,rgba(27,79,214,0.16),transparent_60%)]" />
      <div className="relative flex items-start gap-4">
        <div
          className={cx(
            "grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--wb-border)]",
            "bg-white shadow-[0_12px_24px_rgba(11,18,32,0.08)]"
          )}
        >
          <div className="text-[color:var(--wb-accent)]">{b.icon}</div>
        </div>

        <div className="min-w-0">
          <div className="text-[15px] font-extrabold tracking-[0.01em] text-[color:var(--wb-ink)]">
            {b.title}
          </div>
          <div className="mt-1 text-sm leading-6 text-black/55">{b.desc}</div>

          <div className="mt-3 flex flex-wrap gap-2">
            {b.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-[rgba(27,79,214,0.16)] bg-[linear-gradient(135deg,rgba(27,79,214,0.08),rgba(11,42,111,0.04))] px-2.5 py-1 text-[11px] font-extrabold text-black/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailPanel({ step }: { step: Step }) {
  return (
    <GlowCard className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-black/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
            STEP {step.n} • {step.eta}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)] shadow-[0_12px_24px_rgba(11,18,32,0.08)]">
              {step.icon}
            </div>
            <div className="text-xl font-extrabold text-[color:var(--wb-ink)]">
              {step.title}
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-black/55">{step.desc}</p>
        </div>

        <div
          className={cx(
            "hidden md:flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl",
            "bg-[linear-gradient(135deg,rgba(27,79,214,0.12),rgba(11,42,111,0.06))]",
            "border border-[rgba(27,79,214,0.16)]"
          )}
        >
          <RiSparklingLine className="text-[color:var(--wb-accent)] text-xl" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--wb-border)] bg-white/70 p-4">
          <div className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
            DELIVERABLES
          </div>
          <ul className="mt-3 space-y-2">
            {step.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-black/65">
                <span className="mt-0.5 text-[color:var(--wb-accent)]">
                  <RiCheckLine />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[color:var(--wb-border)] bg-white/70 p-4">
          <div className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
            OUTCOMES
          </div>
          <ul className="mt-3 space-y-2">
            {step.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-black/65">
                <span className="mt-0.5 text-[color:var(--wb-accent)]">
                  <RiCheckLine />
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-2xl bg-[linear-gradient(135deg,rgba(27,79,214,0.10),rgba(11,42,111,0.05))] p-3 text-sm font-extrabold text-black/65">
            Tip: We keep updates structured—so you always know what’s done and what’s next.
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

/** ✅ NEW: single “step navigator” card (no list / no dropdown vibe) */
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
    <GlowCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
            ROADMAP NAVIGATOR
          </div>
          <div className="mt-1 text-sm font-semibold text-black/60">
            Step {idx + 1} of {total}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-full border border-[color:var(--wb-border)]",
              "bg-white/70 text-black/70 transition",
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
              "grid h-10 w-10 place-items-center rounded-full border border-[color:var(--wb-border)]",
              "bg-white/70 text-black/70 transition",
              !canNext ? "opacity-45 cursor-not-allowed" : "hover:bg-white hover:-translate-y-[1px]"
            )}
            aria-label="Next step"
          >
            <RiArrowRightSLine className="text-xl" />
          </button>
        </div>
      </div>

      {/* Main Step Card */}
      <motion.div
        key={step.key}
        className={cx(
          "mt-4 relative overflow-hidden rounded-[22px] border border-[color:var(--wb-border)] bg-white/75",
          "p-5 shadow-[0_18px_44px_rgba(11,18,32,0.08)]"
        )}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_240px_at_20%_0%,rgba(27,79,214,0.14),transparent_60%)]" />

        <div className="relative flex items-start gap-4">
          <div className="shrink-0">
            <div
              className={cx(
                "relative grid h-12 w-12 place-items-center rounded-full text-white",
                step.accent === "a"
                  ? "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))]"
                  : "bg-[linear-gradient(135deg,var(--wb-accent-2),var(--wb-accent))]"
              )}
            >
              <span className="text-lg font-extrabold">{step.n}</span>
              <div className="absolute -bottom-3 grid h-8 w-8 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white text-[color:var(--wb-accent)] shadow-[0_10px_20px_rgba(11,18,32,0.10)]">
                {step.icon}
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[16px] font-extrabold text-[color:var(--wb-ink)]">
                  {step.title}
                </div>
                <div className="mt-1 text-sm leading-6 text-black/55">{step.desc}</div>
              </div>
              <span className="shrink-0 inline-flex items-center rounded-full border border-[color:var(--wb-border)] bg-white/75 px-2.5 py-1 text-[11px] font-extrabold text-black/55">
                {step.eta}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {step.outcomes.slice(0, 3).map((o) => (
                <span
                  key={o}
                  className="inline-flex items-center rounded-full border border-[rgba(27,79,214,0.16)] bg-[linear-gradient(135deg,rgba(27,79,214,0.08),rgba(11,42,111,0.04))] px-2.5 py-1 text-[11px] font-extrabold text-black/60"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dots */}
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
                  "h-2.5 w-2.5 rounded-full border transition",
                  active
                    ? "bg-[color:var(--wb-accent)] border-[rgba(27,79,214,0.35)] shadow-[0_10px_20px_rgba(27,79,214,0.25)]"
                    : "bg-white/70 border-[color:var(--wb-border)] hover:bg-white"
                )}
                aria-label={`Go to step ${i + 1}`}
              />
            );
          })}
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-xs font-extrabold text-black/60">
          <RiSparklingLine className="text-[color:var(--wb-accent)]" />
          Use arrows / dots
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,rgba(27,79,214,0.10),rgba(11,42,111,0.05))] p-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[color:var(--wb-ink)]">
          <RiShieldCheckLine className="text-[color:var(--wb-accent)]" />
          Built for clarity & control
        </div>
        <p className="mt-1 text-sm leading-6 text-black/55">
          Feasibility first → clean terms → execution checkpoints → transparent distribution.
        </p>
      </div>
    </GlowCard>
  );
}

export default function Partnerships() {
  const stats = useMemo(
    () => [
      { value: "JV", label: "Partnership model", hint: "Aligned incentives" },
      { value: "20–30m", label: "Discovery call", hint: "Fast clarity" },
      { value: "7-step", label: "Roadmap", hint: "Predictable delivery" },
    ],
    []
  );

  const heroPills: Pill[] = useMemo(
    () => [
      { label: "Feasibility-first", icon: <RiPulseLine /> },
      { label: "Transparent terms", icon: <RiEyeLine /> },
      { label: "Risk controls", icon: <RiShieldCheckLine /> },
      { label: "Quality-focused", icon: <RiLeafLine /> },
    ],
    []
  );

  const benefits: Benefit[] = useMemo(
    () => [
      {
        icon: <RiLineChartLine className="text-xl" />,
        title: "Maximize your land’s value",
        desc: "A partnership can unlock higher upside than a traditional sale by participating in development value.",
        tags: ["Upside participation", "Market-driven plan", "Clear projections"],
      },
      {
        icon: <RiBriefcaseLine className="text-xl" />,
        title: "WestBrook executes end-to-end",
        desc: "You bring the land. We bring planning, approvals guidance, project control, and delivery.",
        tags: ["One accountable team", "Milestone updates", "Quality standards"],
      },
      {
        icon: <RiShieldCheckLine className="text-xl" />,
        title: "Risk checked early",
        desc: "We validate zoning, constraints, costs, and demand before spending big time or money.",
        tags: ["Due diligence", "Budget discipline", "No surprises"],
      },
      {
        icon: <RiEyeLine className="text-xl" />,
        title: "Transparent & collaborative",
        desc: "You stay informed with clear checkpoints—design, budgets, approvals, and timeline visibility.",
        tags: ["Clear terms", "Simple reporting", "Aligned decisions"],
      },
      {
        icon: <RiTeamLine className="text-xl" />,
        title: "Clean communication",
        desc: "A calm process with fewer hand-offs and faster decisions—so things move without chaos.",
        tags: ["Single point updates", "Structured approvals", "Faster cycles"],
      },
      {
        icon: <RiLeafLine className="text-xl" />,
        title: "Community-first outcomes",
        desc: "Thoughtful development that protects long-term value with quality, usability, and fit.",
        tags: ["Long-term value", "Better product", "Responsible growth"],
      },
    ],
    []
  );

  const steps: Step[] = useMemo(
    () => [
      {
        key: "consult",
        n: 1,
        title: "Initial consultation",
        desc: "We understand your goals, review the site basics, and quickly confirm fit.",
        eta: "1–3 days",
        outcomes: ["Clear next steps", "Site context captured", "Decision to proceed"],
        deliverables: ["Discovery call notes", "Basic site checklist", "Next-step plan"],
        icon: <RiTeamLine className="text-lg" />,
        accent: "a",
      },
      {
        key: "feasibility",
        n: 2,
        title: "Feasibility analysis",
        desc: "Due diligence: zoning, constraints, access, utilities, and market signal.",
        eta: "1–3 weeks",
        outcomes: ["Feasible path identified", "Risk/constraints mapped", "Go/No-go clarity"],
        deliverables: ["Feasibility memo (high-level)", "Constraint summary", "Concept direction"],
        icon: <RiRoadMapLine className="text-lg" />,
        accent: "b",
      },
      {
        key: "terms",
        n: 3,
        title: "Proposal & terms",
        desc: "We propose responsibilities, ownership split, and expected outcomes—kept simple and clear.",
        eta: "1–2 weeks",
        outcomes: ["Aligned structure", "Transparent split", "Milestones defined"],
        deliverables: ["Term summary", "Roles/responsibility grid", "Projected timeline"],
        icon: <RiFileTextLine className="text-lg" />,
        accent: "a",
      },
      {
        key: "legal",
        n: 4,
        title: "Legal agreement",
        desc: "A JV agreement that protects both sides and sets decision checkpoints.",
        eta: "2–6 weeks",
        outcomes: ["Rights clarified", "Reporting cadence", "Decision gates set"],
        deliverables: ["JV agreement", "Governance model", "Reporting plan"],
        icon: <RiGovernmentLine className="text-lg" />,
        accent: "b",
      },
      {
        key: "planning",
        n: 5,
        title: "Project planning",
        desc: "Architecture, engineering, permits, and a realistic delivery schedule.",
        eta: "4–12 weeks",
        outcomes: ["Build plan ready", "Permits moving", "Budget baseline set"],
        deliverables: ["Concept plans", "Permit strategy", "Budget baseline"],
        icon: <RiBuilding4Line className="text-lg" />,
        accent: "a",
      },
      {
        key: "build",
        n: 6,
        title: "Development & construction",
        desc: "We manage execution—quality, schedule, and budget control.",
        eta: "Varies",
        outcomes: ["On-track delivery", "Quality checks", "Vendor accountability"],
        deliverables: ["Construction plan", "Progress reports", "Quality checklist"],
        icon: <RiHammerLine className="text-lg" />,
        accent: "b",
      },
      {
        key: "exit",
        n: 7,
        title: "Sale / lease-up & distribution",
        desc: "We sell or lease the project, then distribute proceeds based on the agreement.",
        eta: "Market dependent",
        outcomes: ["Exit executed", "Proceeds distributed", "Final reporting"],
        deliverables: ["Closing/lease summary", "Distribution statement", "Final report"],
        icon: <RiMoneyDollarCircleLine className="text-lg" />,
        accent: "a",
      },
    ],
    []
  );

  const whoWeWorkWith = useMemo(
    () => [
      "Private landowners",
      "Family trusts",
      "Property investors",
      "Owners with raw / underutilized parcels",
      "Owners with entitled / near-entitled sites",
      "Brokers bringing strong opportunities",
    ],
    []
  );

  const faqs: Faq[] = useMemo(
    () => [
      {
        q: "What kind of land is ideal for a partnership?",
        a: "Sites with access, growth potential, and a feasible zoning/entitlement path. Raw land can work if utilities and approvals are realistic.",
      },
      {
        q: "Do I lose control if I partner?",
        a: "No. The agreement defines decision rights, approval checkpoints, and reporting cadence. You stay involved throughout.",
      },
      {
        q: "How fast can we move?",
        a: "It depends on zoning, utilities, and approvals. Feasibility gives a realistic schedule early so you know what to expect.",
      },
      {
        q: "Can we do a normal sale instead of JV?",
        a: "Yes. If a sale matches your goals better, we’ll tell you. JV is best when you want upside from development.",
      },
    ],
    []
  );

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeStep = steps[activeIdx] ?? steps[0];
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < steps.length - 1;

  const goPrev = () => setActiveIdx((i) => clamp(i - 1, 0, steps.length - 1));
  const goNext = () => setActiveIdx((i) => clamp(i + 1, 0, steps.length - 1));

  return (
    <main className="wb-container py-10">
      {/* HERO */}
      <GlowCard className="p-6 sm:p-10">
        <div className="relative">
          <SoftBg />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.26em] text-black/55">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white">
                  <RiTeamLine />
                </span>
                PARTNERSHIPS
              </div>

              <motion.h1
                className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
              >
                Partner with{" "}
                <span className="bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] bg-clip-text text-transparent">
                  WestBrook
                </span>
                <br />
                and unlock your land’s best future.
              </motion.h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
                Modern, transparent JV process: feasibility-first, clean terms, structured execution,
                and clear distribution—without chaos.
              </p>

              <MiniPills items={heroPills} />

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="#roadmap"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                    "text-sm font-extrabold shadow-[0_14px_30px_rgba(27,79,214,0.20)]",
                    "hover:brightness-110 transition"
                  )}
                >
                  Explore the roadmap <RiArrowRightUpLine />
                </a>
                <a
                  href="#schedule"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "border border-[color:var(--wb-border)] bg-white/70",
                    "text-sm font-extrabold text-black/70 hover:bg-white transition"
                  )}
                >
                  Schedule a call <RiCalendarScheduleLine />
                </a>
              </div>
            </div>

            {/* STATS */}
            <div className="grid gap-3">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl border border-[color:var(--wb-border)] bg-white/75 p-4 shadow-[0_14px_30px_rgba(11,18,32,0.08)]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.22, delay: idx * 0.05 }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-2xl font-extrabold text-[color:var(--wb-ink)]">
                      {s.value}
                    </div>
                    <div className="text-[11px] font-extrabold tracking-[0.26em] text-black/45">
                      {s.hint}
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-black/60">{s.label}</div>
                </motion.div>
              ))}

              <div className="rounded-2xl border border-[color:var(--wb-border)] bg-white/75 p-4 shadow-[0_14px_30px_rgba(11,18,32,0.08)]">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[color:var(--wb-ink)]">
                  <RiMapPin2Line className="text-[color:var(--wb-accent)]" />
                  What to share on the first call
                </div>
                <ul className="mt-3 space-y-2">
                  {[
                    "Location + approximate acreage",
                    "Current zoning (if known)",
                    "Road access + utilities status",
                    "Your goal: sale vs JV",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-black/60">
                      <span className="mt-0.5 text-[color:var(--wb-accent)]">
                        <RiCheckLine />
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* WHY */}
      <section className="mt-12" id="why">
        <SectionHead
          kicker="WHY PARTNER"
          title="Why partner with WestBrook?"
          sub="Less noise. More clarity. A modern partnership flow with strong controls and real execution."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((b) => (
            <BenefitCard key={b.title} b={b} />
          ))}
        </div>
      </section>

      {/* ROADMAP (NO LIST NOW) */}
      <section className="mt-12" id="roadmap">
        <SectionHead
          kicker="THE ROADMAP"
          title="Navigate steps with arrows"
          sub="No dropdown / no long list. Just Prev/Next (and dots). Right panel updates for the selected step."
        />

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
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
      </section>

      {/* WHO */}
      <section className="mt-12" id="fit">
        <SectionHead
          kicker="WHO WE WORK WITH"
          title="If you have land, we can evaluate it"
          sub="Raw, underutilized, or near-entitled—if there’s potential, we’ll help you understand the best move."
        />

        <GlowCard className="p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {whoWeWorkWith.map((x) => (
              <div
                key={x}
                className="rounded-2xl border border-[color:var(--wb-border)] bg-white/70 p-4 shadow-[0_12px_24px_rgba(11,18,32,0.06)]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white">
                    <RiCheckLine />
                  </span>
                  <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">
                    {x}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </section>

      {/* FAQ */}
      <section className="mt-12" id="faq">
        <SectionHead kicker="FAQ" title="Common questions" sub="Simple answers. No fluff." />

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <button
                key={f.q}
                type="button"
                onClick={() => setOpenFaq((p) => (p === i ? null : i))}
                className={cx(
                  "w-full text-left rounded-[22px] border border-[color:var(--wb-border)] bg-white/70",
                  "p-5 shadow-[0_14px_30px_rgba(11,18,32,0.07)] hover:bg-white/85 transition"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[15px] font-extrabold text-[color:var(--wb-ink)]">
                    {f.q}
                  </div>
                  <div
                    className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--wb-border)] bg-white text-black/60"
                    aria-hidden="true"
                  >
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
          title="Schedule an appointment"
          sub="Book a quick discovery call. If the embed doesn’t load, use “Open scheduler”."
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <GlowCard>
            <div className="border-b border-[color:var(--wb-border)] p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[color:var(--wb-ink)]">
                <RiCalendarScheduleLine className="text-lg text-[color:var(--wb-accent)]" />
                Appointment Scheduling
              </div>
              <div className="mt-1 text-sm text-black/55">
                20–30 mins • Discovery call • Next steps
              </div>
            </div>

            <div className="relative h-[720px] w-full bg-white">
              <iframe
                title="WestBrook Appointment Scheduling"
                src={APPOINTMENT_URL}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[color:var(--wb-ink)]">
              <RiBriefcaseLine className="text-lg text-[color:var(--wb-accent)]" />
              Before you book
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Location + approximate acreage",
                "Your goal: sale vs JV",
                "Zoning status if known",
                "Any timelines or constraints",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-[color:var(--wb-border)] bg-white/75 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[color:var(--wb-accent)]">
                      <RiCheckLine />
                    </span>
                    <div className="text-sm font-semibold text-black/65">{t}</div>
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
                  "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                  "text-sm font-extrabold shadow-[0_14px_30px_rgba(27,79,214,0.20)]",
                  "hover:brightness-110 transition"
                )}
              >
                Open scheduler <RiArrowRightUpLine />
              </a>

              <a
                href="/contact"
                className={cx(
                  "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
                  "border border-[color:var(--wb-border)] bg-white/70",
                  "text-sm font-extrabold text-black/70 hover:bg-white transition"
                )}
              >
                Contact instead <RiPhoneLine />
              </a>
            </div>

            <div className="mt-4 text-xs text-black/45">
              If the scheduler looks blank, some browsers block third-party embeds.
              Use “Open scheduler”.
            </div>
          </GlowCard>
        </div>
      </section>

      <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.22),transparent)]" />
      <div className="py-8 text-center text-xs text-black/45">
        © {new Date().getFullYear()} WestBrook Estates • Partnerships
      </div>
    </main>
  );
}
