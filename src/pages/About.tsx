// src/pages/About.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiArrowRightUpLine,
  RiShieldCheckLine,
  RiDraftLine,
  RiRuler2Line,
  RiTeamLine,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiChatSmile2Line,
  RiFocus3Line,
  RiVerifiedBadgeLine,
} from "react-icons/ri";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

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
      <div className="absolute -top-28 -left-36 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,79,214,0.10),transparent_70%)]" />
      <div className="absolute -top-36 -right-40 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(11,42,111,0.08),transparent_72%)]" />
      <div className="absolute -bottom-56 left-[10%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,79,214,0.07),transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_50%_0%,rgba(255,255,255,0.72),transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(0,0,0,0.6)_1px,transparent_1px)] [background-size:18px_18px]" />
    </div>
  );
}

function Glass({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-[28px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl",
        "shadow-[0_18px_70px_rgba(11,18,32,0.10)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.28em] text-black/55">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
      {children}
    </div>
  );
}

function Stat({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="rounded-[22px] border border-[color:var(--wb-border)] bg-white/60 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">{title}</div>
          <div className="mt-1 text-sm leading-6 text-black/55">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-[color:var(--wb-border)] bg-white/60 p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-extrabold text-[color:var(--wb-ink)]">{title}</div>
          <div className="mt-1 text-sm leading-6 text-black/55">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function BulletRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-[18px] border border-[color:var(--wb-border)] bg-white/60 px-4 py-3 text-sm text-black/65">
      <RiCheckboxCircleLine className="mt-0.5 shrink-0 text-[color:var(--wb-accent)]" />
      <span className="min-w-0 break-words">{text}</span>
    </div>
  );
}

function FAQItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[22px] border border-[color:var(--wb-border)] bg-white/60">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">{q}</div>
        </div>
        <div
          className={cx(
            "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-black/60 transition",
            open ? "rotate-45" : "rotate-0"
          )}
          aria-hidden="true"
        >
          +
        </div>
      </button>

      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-4 text-sm leading-6 text-black/55">{a}</div>
      </motion.div>

      <div className="h-px w-full bg-[color:var(--wb-border)]/80" />
    </div>
  );
}

export default function About() {
  const scrolled = useScrolled(12);

  const stats = useMemo(
    () => [
      { icon: <RiDraftLine className="text-xl" />, title: "Design-led", sub: "We refine the plan until it feels right." },
      { icon: <RiTimeLine className="text-xl" />, title: "Structured", sub: "Clear decisions, clean updates." },
      { icon: <RiRuler2Line className="text-xl" />, title: "Detail discipline", sub: "Finishes stay sharp, end to end." },
    ],
    []
  );

  const beliefs = useMemo(
    () => [
      {
        icon: <RiFocus3Line className="text-xl" />,
        title: "Clarity wins",
        desc: "We keep scope, choices, and next steps easy to follow.",
      },
      {
        icon: <RiTeamLine className="text-xl" />,
        title: "One accountable team",
        desc: "One team, one standard, one outcome.",
      },
      {
        icon: <RiVerifiedBadgeLine className="text-xl" />,
        title: "Quality is controlled",
        desc: "Premium comes from discipline and checks.",
      },
    ],
    []
  );

  const deliver = useMemo(
    () => [
      "Design that fits your lifestyle — not a template.",
      "A clean estimate and honest trade-offs before work starts.",
      "Simple updates, so you always know what’s next.",
      "A final handover that feels finished — not rushed.",
    ],
    []
  );

  // ✅ more general FAQs + detailed answers (only section with more text)
  const faqs = useMemo(
    () => [
      {
        q: "What exactly do you do — design, build, or both?",
        a:
          "We handle the full journey end-to-end: understanding your requirements, developing the design, planning the execution, and building with consistent quality checks. " +
          "You don’t have to coordinate multiple vendors or chase updates — one accountable team owns the outcome.",
      },
      {
        q: "How is a custom home different from a “ready plan” home?",
        a:
          "A custom home is designed around you and your plot. That means the layout, light, privacy, storage, and movement are planned for your daily life — not forced into a pre-set template. " +
          "It also means decisions are made intentionally (not last minute), which helps the build feel cleaner and more predictable.",
      },
      {
        q: "How do you keep the project on track?",
        a:
          "We keep it simple: clear scope, clear milestones, and checkpoints during execution. " +
          "Before work moves, key choices are confirmed so the site doesn’t keep changing direction. " +
          "During the build, updates are short and structured — what’s done, what’s next, and what needs your input.",
      },
      {
        q: "Can I control the budget without compromising the outcome?",
        a:
          "Yes. We keep pricing transparent and show trade-offs clearly. If you want to save cost, we guide you toward changes that reduce budget without hurting the feel of the home (like smarter planning, simplified forms, or material swaps that still look premium). " +
          "You’ll always know what changes cost before work starts — no surprise jumps later.",
      },
      {
        q: "How do you manage quality on site?",
        a:
          "Quality is controlled through checks and finish discipline. We set standards for details that matter — edges, alignments, lighting points, surface finish, and joinery cleanliness. " +
          "Then we verify those standards at key stages so the final result looks intentional, not patched together.",
      },
      {
        q: "What do you need from me to get started?",
        a:
          "Just the essentials: your plot/location details, your timeline, your budget comfort range, and a simple style direction (even 2–3 reference images helps). " +
          "From there, we guide the rest — layouts, priorities, and finish level choices — without overwhelming you.",
      },
      {
        q: "Do you take up projects on any plot or constraints?",
        a:
          "We work with real constraints: setbacks, access, orientation, slope, and utilities. The plan is shaped around the site so it works naturally and avoids rework. " +
          "If a constraint forces a compromise, we call it early and propose clean options — not late-stage fixes.",
      },
      {
        q: "How involved do I have to be during the build?",
        a:
          "As involved as you want — but not forced. We keep approvals to key decisions, and we keep communication clean. " +
          "You’ll get regular updates and check-in moments for important choices, without being pulled into daily site management.",
      },
    ],
    []
  );

  return (
    <main className="relative overflow-x-hidden">
      <SoftBg />

      <div className="relative mx-auto max-w-[1120px] px-4 py-10 sm:px-5">
        {/* HERO */}
        <Glass className="p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
            {/* LEFT */}
            <div className="min-w-0">
              <Kicker>ABOUT WESTBROOK</Kicker>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-5xl [text-wrap:balance]"
              >
                Custom homes,
                <br />
                built with{" "}
                <span className="bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] bg-clip-text text-transparent">
                  calm precision
                </span>
                .
              </motion.h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
                End-to-end builds — planning first, pricing clearly, and executing with discipline.
                Premium should feel smooth.
              </p>

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
                {stats.map((s) => (
                  <Stat key={s.title} icon={s.icon} title={s.title} sub={s.sub} />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="min-w-0">
              <div className="rounded-[28px] border border-[color:var(--wb-border)] bg-white/60 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">What you can expect</div>
                    <div className="mt-1 text-sm leading-6 text-black/55">
                      Clear decisions. Clean execution. A finished handover.
                    </div>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
                    <RiShieldCheckLine className="text-xl" />
                  </div>
                </div>

                {/* OUR RULE (highlight) */}
                <div className="mt-5 rounded-[22px] border border-[color:var(--wb-border)] bg-white/70 p-4">
                  <div className="text-[11px] font-extrabold tracking-[0.24em] text-black/45">OUR RULE</div>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    If scope, cost, or timeline isn’t clear — we pause and resolve it before moving.
                  </p>
                </div>

                <div className="mt-5 grid gap-2">
                  {["One accountable team", "Simple update rhythm", "Quality checkpoints"].map((x) => (
                    <div
                      key={x}
                      className="rounded-[18px] border border-[color:var(--wb-border)] bg-white/65 px-4 py-3 text-sm font-semibold text-black/65"
                    >
                      {x}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[22px] border border-[color:var(--wb-border)] bg-white/65 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white/70 text-[color:var(--wb-accent)]">
                      <RiChatSmile2Line className="text-xl" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">Good fit if</div>
                      <div className="mt-1 text-sm leading-6 text-black/55">
                        You want a truly custom home, clean finishes, and clarity — not chaos.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Glass>

        {/* WHAT WE BELIEVE */}
        <section className="mt-12">
          <div className="mx-auto max-w-[72ch] text-center">
            <Kicker>WHAT WE BELIEVE</Kicker>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-3xl">
              Simple principles. Strong outcomes.
            </h2>
            <p className="mt-2 text-sm leading-6 text-black/55">
              Clean work feels premium when the basics are consistent.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.25, ease: EASE, delay: i * 0.05 }}
              >
                <MiniCard icon={b.icon} title={b.title} desc={b.desc} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHAT WE DELIVER */}
        <section className="mt-12">
          <Glass className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <div className="min-w-0">
                <Kicker>WHAT WE DELIVER</Kicker>
                <h3 className="mt-3 text-xl font-semibold text-[color:var(--wb-ink)] sm:text-2xl">
                  A build that stays composed.
                </h3>
                <p className="mt-2 text-sm leading-6 text-black/55">
                  Less noise. More control. The experience matters too.
                </p>

                <div className="mt-5 grid gap-2">
                  {deliver.map((x) => (
                    <BulletRow key={x} text={x} />
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <div className="rounded-[26px] border border-[color:var(--wb-border)] bg-white/60 p-6">
                  <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">Quick facts</div>
                  <div className="mt-3 grid gap-2">
                    {[
                      { t: "Custom first", d: "Designed around your life and your plot." },
                      { t: "Clear cost", d: "Trade-offs are transparent before work starts." },
                      { t: "Finish discipline", d: "Details stay consistent, not improvised." },
                    ].map((x) => (
                      <div
                        key={x.t}
                        className="rounded-[18px] border border-[color:var(--wb-border)] bg-white/65 p-4"
                      >
                        <div className="text-sm font-extrabold text-[color:var(--wb-ink)]">{x.t}</div>
                        <div className="mt-1 text-sm text-black/55">{x.d}</div>
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
                      Talk to us <RiArrowRightUpLine />
                    </Link>
                    <Link
                      to="/projects"
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
                        "border border-[color:var(--wb-border)] bg-white/60",
                        "text-sm font-extrabold text-black/70 hover:bg-white transition"
                      )}
                    >
                      See builds <RiArrowRightUpLine />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Glass>
        </section>

        {/* FAQ (only place with more text) */}
        <section className="mt-12">
          <div className="mx-auto max-w-[72ch] text-center">
            <Kicker>FAQ</Kicker>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--wb-ink)] sm:text-3xl">
              Quick answers.
            </h2>
            <p className="mt-2 text-sm leading-6 text-black/55">
              The common questions people ask before starting.
            </p>
          </div>

          <div className="mt-6 mx-auto max-w-3xl grid gap-3">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.18),transparent)]" />
        <div className="py-8 text-center text-xs text-black/45">
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
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]" />
                WestBrook Homes
              </span>
              <span className="inline-flex items-center gap-2">
                <RiShieldCheckLine className="text-[color:var(--wb-accent)]" />
                Premium. Predictable.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
