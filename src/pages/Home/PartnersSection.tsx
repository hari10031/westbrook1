import React, { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────────
   Icons (no libs)
   ───────────────────────────────────────────────────────────── */
function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h12" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l1.7 6.2L20 10l-6.3 1.8L12 18l-1.7-6.2L4 10l6.3-1.8L12 2z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-5" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12l5-5 4 4" />
      <path d="M22 12l-5-5-4 4" />
      <path d="M8 12l2 2a2 2 0 0 0 3 0l1-1" />
      <path d="M12 9l1-1a2 2 0 0 1 3 0l2 2" />
      <path d="M7 17l1 1a2 2 0 0 0 3 0l.5-.5" />
      <path d="M14.5 16.5l.5.5a2 2 0 0 0 3 0l1-1" />
    </svg>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE, delay },
  },
});

type Pill = { icon: React.ReactNode; label: string };
type Feature = { icon: React.ReactNode; title: string; desc: string };

function OrbitPill({ icon, label }: Pill) {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-2",
        "rounded-full border border-[color:var(--wb-ink)]/14",
        "bg-white/80 backdrop-blur",
        "px-4 py-2",
        "text-[12.5px] font-semibold",
        "text-[color:var(--wb-ink)]",
        "shadow-[0_14px_40px_rgba(12,24,48,0.10)]",
        "whitespace-nowrap", // ✅ prevents wrap
        "min-w-[170px] justify-center" // ✅ keeps stable width (fixes your bug)
      )}
    >
      <span className="shrink-0 text-[color:var(--wb-ink)]">{icon}</span>
      <span className="leading-none">{label}</span>
    </div>
  );
}

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });
  const reduce = useReducedMotion();

  const pills: Pill[] = useMemo(
    () => [
      { icon: <IconHandshake />, label: "Builders" },
      { icon: <IconSpark />, label: "Design Studios" },
      { icon: <IconShield />, label: "Title & Compliance" },
      { icon: <IconBolt />, label: "Vendors & Trades" },
      { icon: <IconSpark />, label: "Architects" },
      { icon: <IconBolt />, label: "Specialists" },
    ],
    []
  );

  const features: Feature[] = useMemo(
    () => [
      {
        icon: <IconShield />,
        title: "Clean handoffs, documented flow",
        desc: "Scopes, approvals, and milestones stay clear — no chaos, no guesswork.",
      },
      {
        icon: <IconBolt />,
        title: "Fast decisions, premium expectations",
        desc: "Sharp communication and realistic timelines so teams execute smoothly.",
      },
      {
        icon: <IconSpark />,
        title: "Curated network (not a directory)",
        desc: "We feature partners after active collaboration — quality over quantity.",
      },
    ],
    []
  );

  const marquee = useMemo(
    () => [
      "Builders",
      "Architects",
      "Design studios",
      "Structural consultants",
      "MEP teams",
      "Title & compliance",
      "Specialist trades",
      "Vendors & suppliers",
      "Project consultants",
      "Quality-first teams",
    ],
    []
  );

  return (
    <section ref={ref} className="relative">
      {/* Natural glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[420px] w-[980px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/6 blur-3xl" />
        <div className="absolute left-[-180px] top-[45%] h-[320px] w-[320px] rounded-full bg-[color:var(--wb-ink)]/5 blur-3xl" />
        <div className="absolute right-[-220px] top-[12%] h-[360px] w-[360px] rounded-full bg-[color:var(--wb-ink)]/5 blur-3xl" />
      </div>

      {/* Local CSS for orbit + marquee */}
      <style>{`
        @keyframes wbOrbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes wbMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .wb-orbit-spin { animation: none !important; }
          .wb-marquee { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          {/* LEFT */}
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp(0)}>
            <p className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/80">
              PARTNERSHIPS
            </p>

            <h2 className="wb-serif mt-3 text-[36px] leading-[1.06] text-[color:var(--wb-ink)] sm:text-[52px]">
              A curated circle of teams we trust.
            </h2>

            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/75">
              We’re building an ecosystem for customized, user-specific homes — where
              timelines are respected, details are protected, and the client experience feels premium.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/partnerships"
                className={cx(
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-full px-5 py-2.5 text-[14px] font-semibold",
                  "bg-[color:var(--wb-ink)] text-white",
                  "shadow-[0_16px_40px_rgba(12,24,48,0.18)]",
                  "transition hover:translate-y-[-1px] hover:shadow-[0_20px_48px_rgba(12,24,48,0.22)]"
                )}
              >
                Partner with us
                <span className="transition group-hover:translate-x-[2px]">
                  <IconArrowRight />
                </span>
              </Link>

              <div className="rounded-full border border-[color:var(--wb-ink)]/16 bg-white/55 px-4 py-2 text-[12.5px] text-[color:var(--wb-ink)]/70 backdrop-blur">
                Detailed page at <span className="font-semibold text-[color:var(--wb-ink)]">/partnerships</span>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.08 }}
                  className={cx(
                    "rounded-[22px] border border-[color:var(--wb-ink)]/12",
                    "bg-white/55 backdrop-blur",
                    "shadow-[0_16px_44px_rgba(12,24,48,0.08)]"
                  )}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--wb-ink)]/14 bg-white/70 text-[color:var(--wb-ink)]">
                        {f.icon}
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-[color:var(--wb-ink)]">
                          {f.title}
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-[color:var(--wb-ink)]/70">
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp(0.12)} className="relative">
            <div
              className={cx(
                "relative overflow-hidden rounded-[30px]",
                "border border-[color:var(--wb-ink)]/14",
                "bg-white/55 backdrop-blur",
                "shadow-[0_20px_70px_rgba(12,24,48,0.12)]"
              )}
            >
              {/* inner glows */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[-120px] h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/6 blur-3xl" />
                <div className="absolute right-[-90px] bottom-[-110px] h-[240px] w-[240px] rounded-full bg-[color:var(--wb-ink)]/6 blur-3xl" />
              </div>

              <div className="relative p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[12px] font-extrabold tracking-[0.28em] text-[color:var(--wb-ink)]/70">
                    PARTNER LANES
                  </div>
                  <div className="rounded-full border border-[color:var(--wb-ink)]/14 bg-white/60 px-3 py-1 text-[12px] text-[color:var(--wb-ink)]/70">
                    Quality-first
                  </div>
                </div>

                {/* MOBILE: grid chips (clean) */}
                <div className="mt-5 sm:hidden">
                  <div className="grid grid-cols-2 gap-2">
                    {pills.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-[18px] border border-[color:var(--wb-ink)]/12 bg-white/70 px-3 py-3 text-[12.5px] text-[color:var(--wb-ink)] shadow-[0_14px_40px_rgba(12,24,48,0.08)]"
                      >
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="shrink-0 text-[color:var(--wb-ink)]">{p.icon}</span>
                          <span className="font-semibold">{p.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 text-center text-[12.5px] text-[color:var(--wb-ink)]/70">
                    We don’t showcase logos yet — we showcase{" "}
                    <span className="font-semibold text-[color:var(--wb-ink)]">standards</span>.
                  </div>
                </div>

                {/* TABLET+ : Orbit (fixed) */}
                <div className="mt-6 hidden sm:grid place-items-center">
                  <div
                    className="relative"
                    style={{
                      // ✅ responsive sizing + radius
                      width: "clamp(280px, 34vw, 340px)",
                      height: "clamp(280px, 34vw, 340px)",
                      // @ts-ignore
                      ["--r" as any]: "clamp(112px, 12.5vw, 140px)",
                    }}
                  >
                    {/* rings */}
                    <div className="absolute inset-0 rounded-full border border-[color:var(--wb-ink)]/12" />
                    <div className="absolute inset-[18px] rounded-full border border-[color:var(--wb-ink)]/10" />
                    <div className="absolute inset-[44px] rounded-full border border-[color:var(--wb-ink)]/10" />

                    {/* core */}
                    <div className="absolute left-1/2 top-1/2 grid h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--wb-ink)]/14 bg-white/80 shadow-[0_18px_50px_rgba(12,24,48,0.10)]">
                      <div className="text-center">
                        <div className="wb-serif text-[22px] leading-none text-[color:var(--wb-ink)]">
                          WestBrook
                        </div>
                        <div className="mt-1 text-[12px] font-semibold tracking-wide text-[color:var(--wb-ink)]/70">
                          Partnerships
                        </div>
                      </div>
                    </div>

                    {/* orbit wrapper spins */}
                    <div
                      className={cx("absolute inset-0", !reduce && "wb-orbit-spin")}
                      style={reduce ? undefined : { animation: "wbOrbitSpin 18s linear infinite" }}
                    >
                      {pills.map((p, i) => {
                        const angle = (360 / pills.length) * i; // degrees
                        return (
                          <div
                            key={p.label}
                            className="absolute left-1/2 top-1/2"
                            style={{
                              transform: `rotate(${angle}deg) translateY(calc(var(--r) * -1)) rotate(${-angle}deg) translate(-50%, -50%)`,
                              transformOrigin: "center",
                            }}
                          >
                            <OrbitPill icon={p.icon} label={p.label} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 text-center text-[13px] text-[color:var(--wb-ink)]/70">
                    We don’t showcase logos yet — we showcase{" "}
                    <span className="font-semibold text-[color:var(--wb-ink)]">standards</span>.
                  </div>
                </div>
              </div>

              {/* ✅ FIXED marquee (no overlap, smooth) */}
              <div className="relative border-t border-[color:var(--wb-ink)]/10 bg-white/40">
                <div className="overflow-hidden py-3">
                  <div
                    className={cx(
                      "wb-marquee flex w-[200%] items-center gap-3 whitespace-nowrap px-6",
                      "text-[12.5px] font-semibold tracking-wide text-[color:var(--wb-ink)]/65"
                    )}
                    style={reduce ? undefined : { animation: "wbMarquee 18s linear infinite" }}
                  >
                    {[...marquee, ...marquee].map((t, idx) => (
                      <span key={idx} className="opacity-80">
                        {t} <span className="mx-2 opacity-60">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* bottom CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-[color:var(--wb-ink)]/12 bg-white/55 px-6 py-5 backdrop-blur shadow-[0_16px_44px_rgba(12,24,48,0.08)]"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-[color:var(--wb-ink)]">
                  Want to collaborate?
                </div>
                <div className="mt-1 text-[13.5px] text-[color:var(--wb-ink)]/70">
                  Intro call → fit check → pilot → long-term lane.
                </div>
              </div>

              <Link
                to="/partnerships"
                className={cx(
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-full px-5 py-2.5 text-[14px] font-semibold",
                  "border border-[color:var(--wb-ink)]/18 bg-white/70 text-[color:var(--wb-ink)]",
                  "transition hover:bg-white/90 hover:translate-y-[-1px]"
                )}
              >
                Explore partnerships
                <span className="transition group-hover:translate-x-[2px]">
                  <IconArrowRight />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
