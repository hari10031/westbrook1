// src/pages/About.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  RiArrowRightUpLine,
  RiShieldCheckLine,
  RiSparklingLine,
  RiHomeSmile2Line,
  RiDraftLine,
  RiMedalLine,
  RiCheckLine,
  RiTeamLine,
  RiRuler2Line,
  RiTimeLine,
  RiStarSmileLine,
  RiFocus3Line,
  RiLeafLine,
  RiChatSmile2Line,
  RiLayoutMasonryLine,
  RiVerifiedBadgeLine,
  RiFileTextLine,
  RiPulseLine,
} from "react-icons/ri";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

/**
 * ✅ FINAL PREMIUM ABOUT PAGE (responsive + no text cut/crop)
 * - NO images
 * - NO extra bright blues (only your WB variables + soft rgba glows)
 * - Cards never have fixed heights
 * - No truncate / line-clamp
 * - Every flex text area uses min-w-0 + break-words so nothing gets clipped
 */

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = React.useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

function SoftBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-36 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,79,214,0.12),transparent_68%)]" />
      <div className="absolute -top-40 -right-40 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(11,42,111,0.10),transparent_70%)]" />
      <div className="absolute -bottom-60 left-[8%] h-[820px] w-[820px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,79,214,0.08),transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_50%_0%,rgba(255,255,255,0.75),transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(0,0,0,0.6)_1px,transparent_1px)] [background-size:18px_18px]" />
    </div>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-[30px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl",
        "shadow-[0_18px_70px_rgba(11,18,32,0.10)]",
        className
      )}
    >
      {/* keep glows INSIDE without cropping text: background layers are absolute */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
        <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(27,79,214,0.10),transparent_70%)]" />
        <div className="absolute -right-36 -top-28 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(11,42,111,0.08),transparent_72%)]" />
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
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.28em] text-black/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
          <span className="whitespace-normal break-words">{kicker}</span>
        </div>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-3xl [text-wrap:balance]">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-black/55 whitespace-normal break-words">
          {sub}
        </p>
      )}
    </div>
  );
}

function Tag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1.5 text-xs font-extrabold text-black/65">
      <span className="shrink-0 text-[color:var(--wb-accent)]">{icon}</span>
      <span className="whitespace-normal break-words">{label}</span>
    </div>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--wb-border)] bg-white/60 p-4 shadow-[0_14px_44px_rgba(11,18,32,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xl font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
            {value}
          </div>
          <div className="mt-1 text-sm font-semibold text-black/60 whitespace-normal break-words">
            {label}
          </div>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function SignatureStrip({
  items,
}: {
  items: Array<{ title: string; sub: string; icon: React.ReactNode }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, idx) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.22, ease: EASE, delay: idx * 0.03 }}
          className={cx(
            "relative rounded-[24px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl",
            "p-4 shadow-[0_14px_40px_rgba(11,18,32,0.07)]"
          )}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px] opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(27,79,214,0.10),transparent_70%)]" />
          </div>

          <div className="relative flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
              {it.icon}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
                {it.title}
              </div>
              <div className="mt-1 text-xs font-semibold text-black/55 whitespace-normal break-words">
                {it.sub}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PrincipleCard({
  icon,
  title,
  desc,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  points: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.22, ease: EASE }}
      className={cx(
        "relative rounded-[28px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl",
        "p-6 shadow-[0_18px_52px_rgba(11,18,32,0.08)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(27,79,214,0.10),transparent_70%)]" />
      </div>

      <div className="relative">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)] shadow-[0_10px_22px_rgba(11,18,32,0.08)]">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="text-[16px] font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
              {title}
            </div>
            <div className="mt-1 text-sm leading-6 text-black/55 whitespace-normal break-words">
              {desc}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          {points.map((p) => (
            <div key={p} className="flex items-start gap-2 text-sm text-black/65">
              <span className="mt-0.5 shrink-0 text-[color:var(--wb-accent)]">
                <RiCheckLine />
              </span>
              <span className="whitespace-normal break-words">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function WorkStep({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative rounded-[24px] border border-[color:var(--wb-border)] bg-white/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[12px] font-extrabold tracking-[0.28em] text-black/45 whitespace-normal break-words">
          {n}
        </div>
        <div className="h-8 w-8 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] opacity-15" />
      </div>
      <div className="mt-3 text-[15px] font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
        {title}
      </div>
      <div className="mt-1 text-sm leading-6 text-black/55 whitespace-normal break-words">
        {desc}
      </div>
    </div>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.28, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const scrolled = useScrolled(12);

  const tags = useMemo(
    () => [
      { label: "Custom builds", icon: <RiHomeSmile2Line /> },
      { label: "Design-led", icon: <RiDraftLine /> },
      { label: "Finish discipline", icon: <RiMedalLine /> },
      { label: "Clear updates", icon: <RiShieldCheckLine /> },
    ],
    []
  );

  const heroStats = useMemo(
    () => [
      { value: "Personal", label: "Built around your life", icon: <RiChatSmile2Line className="text-xl" /> },
      { value: "Structured", label: "Milestones that track", icon: <RiTimeLine className="text-xl" /> },
      { value: "Premium", label: "Detail discipline", icon: <RiRuler2Line className="text-xl" /> },
    ],
    []
  );

  const signatures = useMemo(
    () => [
      { title: "Scope clarity", sub: "Defined early", icon: <RiFocus3Line className="text-xl" /> },
      { title: "Finish-first", sub: "Details stay sharp", icon: <RiMedalLine className="text-xl" /> },
      { title: "Clean comms", sub: "One accountable team", icon: <RiTeamLine className="text-xl" /> },
      { title: "Built to last", sub: "Long-term livability", icon: <RiLeafLine className="text-xl" /> },
    ],
    []
  );

  const principles = useMemo(
    () => [
      {
        icon: <RiVerifiedBadgeLine className="text-xl" />,
        title: "Trust is designed",
        desc: "We document decisions and keep the path visible.",
        points: ["Milestone updates", "Approval checkpoints", "Budget + timeline visibility"],
      },
      {
        icon: <RiLayoutMasonryLine className="text-xl" />,
        title: "Custom means personal",
        desc: "Plans are shaped by routine—not trends.",
        points: ["Lifestyle-first layouts", "Light + flow", "Practical luxury"],
      },
      {
        icon: <RiRuler2Line className="text-xl" />,
        title: "Details are the product",
        desc: "Edges, joins, lighting—done with discipline.",
        points: ["Material intent protected", "Finish consistency", "Clean handover"],
      },
      {
        icon: <RiShieldCheckLine className="text-xl" />,
        title: "Quality has checkpoints",
        desc: "Premium is controlled, not hoped for.",
        points: ["Stage inspections", "Snag lists", "Vendor accountability"],
      },
    ],
    []
  );

  const workSteps = useMemo(
    () => [
      { n: "01", title: "Listen", desc: "Goals, site, priorities—quick clarity." },
      { n: "02", title: "Design", desc: "Layout + look, refined with intent." },
      { n: "03", title: "Plan", desc: "Scope + schedule, kept simple." },
      { n: "04", title: "Build", desc: "Disciplined execution with updates." },
    ],
    []
  );

  const fit = useMemo(
    () => [
      "You want a true custom home.",
      "You care about finishes.",
      "You want clarity, not chaos.",
      "You want one accountable team.",
    ],
    []
  );

  return (
    <main className="relative overflow-x-hidden">
      <SoftBg />

      <div className="relative mx-auto max-w-[1120px] px-4 py-10 sm:px-5">
        {/* HERO */}
        <GlassCard className="p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
            <div className="min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.28em] text-black/55">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white">
                  <RiSparklingLine />
                </span>
                <span className="whitespace-normal break-words">ABOUT WESTBROOK HOMES</span>
              </div>

              <motion.h1
                className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-5xl [text-wrap:balance]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                Custom homes,
                <br />
                delivered{" "}
                <span className="bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] bg-clip-text text-transparent">
                  with calm precision.
                </span>
              </motion.h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60 whitespace-normal break-words">
                Design intent, finish discipline, and clean delivery. Premium should feel smooth—not stressful.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Tag key={t.label} icon={t.icon} label={t.label} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  to="/#contact"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                    "text-sm font-extrabold shadow-[0_14px_30px_rgba(27,79,214,0.18)]",
                    "hover:brightness-110 transition"
                  )}
                >
                  Start a conversation <RiArrowRightUpLine />
                </Link>

                <Link
                  to="/projects"
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "border border-[color:var(--wb-border)] bg-white/60",
                    "text-sm font-extrabold text-black/70 hover:bg-white transition"
                  )}
                >
                  View builds <RiArrowRightUpLine />
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {heroStats.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} icon={s.icon} />
                ))}
              </div>
            </div>

            {/* RIGHT: TRUST PANEL */}
            <div className="min-w-0 rounded-[30px] border border-[color:var(--wb-border)] bg-white/60 p-6 shadow-[0_18px_70px_rgba(11,18,32,0.10)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
                    What you’ll feel
                  </div>
                  <div className="mt-1 text-sm leading-6 text-black/55 whitespace-normal break-words">
                    Clear. Controlled. Premium.
                  </div>
                </div>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
                  <RiStarSmileLine className="text-xl" />
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  { t: "Clear scope", d: "Defined early." },
                  { t: "Clean checkpoints", d: "No guessing." },
                  { t: "Finish discipline", d: "Details stay sharp." },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-[color:var(--wb-border)] bg-white/65 p-4"
                  >
                    <div className="text-sm font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
                      {x.t}
                    </div>
                    <div className="mt-1 text-sm text-black/55 whitespace-normal break-words">
                      {x.d}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,rgba(27,79,214,0.10),rgba(11,42,111,0.06))] p-4">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[color:var(--wb-ink)]">
                  <RiShieldCheckLine className="shrink-0 text-[color:var(--wb-accent)]" />
                  <span className="whitespace-normal break-words">Our standard</span>
                </div>
                <div className="mt-1 text-sm text-black/55 whitespace-normal break-words">
                  Premium, but predictable.
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[12px] font-extrabold tracking-[0.24em] text-black/45">
                  GOOD FIT
                </div>
                <div className="mt-3 grid gap-2">
                  {fit.map((x) => (
                    <div key={x} className="flex items-start gap-2 text-sm text-black/65">
                      <span className="mt-0.5 shrink-0 text-[color:var(--wb-accent)]">
                        <RiCheckLine />
                      </span>
                      <span className="whitespace-normal break-words">{x}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* SIGNATURE STRIP */}
        <section className="mt-10">
          <Reveal>
            <SignatureStrip items={signatures} />
          </Reveal>
        </section>

        {/* PRINCIPLES */}
        <section className="mt-12">
          <SectionHead
            kicker="OUR PRINCIPLES"
            title="What makes WestBrook different"
            sub="Small rules. Strong outcomes."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((p) => (
              <PrincipleCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                desc={p.desc}
                points={p.points}
              />
            ))}
          </div>
        </section>

        {/* HOW WE WORK (premium, compact) */}
        <section className="mt-12">
          <GlassCard className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <div className="min-w-0">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.28em] text-black/55">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--wb-accent)]" />
                  <span className="whitespace-normal break-words">HOW WE WORK</span>
                </div>

                <div className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--wb-ink)] [text-wrap:balance]">
                  Simple flow. Clean delivery.
                </div>

                <p className="mt-2 text-sm leading-6 text-black/55 whitespace-normal break-words">
                  Enough structure to stay predictable—without feeling corporate.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {workSteps.map((s) => (
                    <WorkStep key={s.n} n={s.n} title={s.title} desc={s.desc} />
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[color:var(--wb-border)] bg-white/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
                      <RiPulseLine className="text-xl" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
                        Update rhythm
                      </div>
                      <div className="mt-1 text-sm text-black/55 whitespace-normal break-words">
                        Short, structured updates—so you always know what’s done and what’s next.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ASK PANEL */}
              <div className="min-w-0 rounded-[26px] border border-[color:var(--wb-border)] bg-white/60 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-[color:var(--wb-ink)] whitespace-normal break-words">
                      What we’ll ask
                    </div>
                    <div className="mt-1 text-sm leading-6 text-black/55 whitespace-normal break-words">
                      Just the essentials.
                    </div>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
                    <RiFileTextLine className="text-xl" />
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {[
                    "Location + plot size",
                    "Timeline + constraints",
                    "Style direction (2–3 references)",
                    "Finish level expectations",
                  ].map((x) => (
                    <div
                      key={x}
                      className="flex items-start gap-2 rounded-2xl border border-[color:var(--wb-border)] bg-white/65 p-4"
                    >
                      <span className="mt-0.5 shrink-0 text-[color:var(--wb-accent)]">
                        <RiCheckLine />
                      </span>
                      <div className="min-w-0 text-sm font-semibold text-black/70 whitespace-normal break-words">
                        {x}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-2">
                  <Link
                    to="/#contact"
                    className={cx(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
                      "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                      "text-sm font-extrabold shadow-[0_14px_30px_rgba(27,79,214,0.18)]",
                      "hover:brightness-110 transition"
                    )}
                  >
                    Start a conversation <RiArrowRightUpLine />
                  </Link>
                  <Link
                    to="/partnerships"
                    className={cx(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
                      "border border-[color:var(--wb-border)] bg-white/60",
                      "text-sm font-extrabold text-black/70 hover:bg-white transition"
                    )}
                  >
                    Land / partnerships <RiArrowRightUpLine />
                  </Link>
                </div>

                <div className="mt-4 text-xs text-black/45 whitespace-normal break-words">
                  Premium rule: clear scope + clear checkpoints = clean delivery.
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.18),transparent)]" />
        <div className="py-8 text-center text-xs text-black/45 whitespace-normal break-words">
          © {new Date().getFullYear()} WestBrook Homes • About
        </div>
      </div>

      {/* sticky micro header */}
      <div
        className={cx(
          "pointer-events-none fixed left-0 right-0 top-0 z-30 transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <div className="mx-auto max-w-[1120px] px-4 sm:px-5">
          <div className="mt-3 rounded-full border border-[color:var(--wb-border)] bg-white/65 backdrop-blur-xl px-4 py-2 shadow-[0_18px_50px_rgba(11,18,32,0.08)]">
            <div className="flex items-center justify-between gap-3 text-xs font-extrabold text-black/60">
              <span className="inline-flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--wb-accent)]" />
                <span className="min-w-0 whitespace-normal break-words">WestBrook Homes</span>
              </span>
              <span className="inline-flex min-w-0 items-center gap-2">
                <RiShieldCheckLine className="shrink-0 text-[color:var(--wb-accent)]" />
                <span className="min-w-0 whitespace-normal break-words">Premium. Predictable.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
