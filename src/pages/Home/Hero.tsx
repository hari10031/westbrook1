import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

type ReelItem = {
  title: string;
  meta: string;
  img: string;
  tag?: string;
};

const REEL_A: ReelItem[] = [
  {
    title: "Signature Modern Residence",
    meta: "Tailored layout • Clean lines • Warm light",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
    tag: "Signature",
  },
  {
    title: "Hillside Glass Villa",
    meta: "Open views • Calm palette • Detail-led",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    tag: "Bespoke",
  },
  {
    title: "Courtyard Estate Home",
    meta: "Private feel • Soft textures • Timeless",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    tag: "Curated",
  },
  {
    title: "Urban Luxe Duplex",
    meta: "Space-first • Strong elevation • Balanced",
    img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80",
    tag: "Refined",
  },
  {
    title: "Coastal Minimal Townhome",
    meta: "Bright corners • Seamless flow • Modern",
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    tag: "Prime",
  },
];

const REEL_B: ReelItem[] = [
  {
    title: "Garden + Pool Residence",
    meta: "Indoor–outdoor living • Easy elegance",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
    tag: "Featured",
  },
  {
    title: "Warm Family Bungalow",
    meta: "Comfort-first • Light-filled • Classic",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    tag: "New",
  },
  {
    title: "Lakefront Villa Build",
    meta: "Views-first • Calm interiors • Clean finish",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
    tag: "Bespoke",
  },
  {
    title: "Designer Loft Home",
    meta: "Compact • Quiet detail • High impact",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    tag: "Curated",
  },
  {
    title: "Plot-to-Home Concept",
    meta: "Plan-ready • Elevation choices • Tailored",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80",
    tag: "Concept",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type MarqueeStyle = CSSProperties & { ["--wb-marquee-duration"]?: string };

/** ✅ premium underline emphasis */
function Em({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 right-0 bottom-[3px] h-[8px] rounded-full bg-[color:var(--wb-accent-2)]/22" />
    </span>
  );
}

/** ✅ Writer effect (kept) */
function CraftWriter() {
  const WORDS = useMemo(
    () => [
      "homes around your life",
      "designs that make sense",
      "spaces built to last",
      "clarity from plan to handover",
      "details that feel intentional",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const HOLD_MS = 1650;
    const FADE_OUT_MS = 240;

    const t1 = window.setTimeout(() => setPhase("out"), HOLD_MS);
    const t2 = window.setTimeout(() => {
      setIndex((i) => (i + 1) % WORDS.length);
      setPhase("in");
    }, HOLD_MS + FADE_OUT_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [index, WORDS.length]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[26px] bg-[color:var(--wb-accent-2)]/12 blur-xl" />

      <div className="relative inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-[color:var(--wb-border)] bg-white/80 px-4 py-3 backdrop-blur shadow-[0_18px_55px_rgba(11,18,32,0.10)]">
        <div className="text-[14.5px] sm:text-[16.5px] font-semibold text-black/65">
          We craft{" "}
          <span
            className={cx(
              "relative inline-flex items-baseline",
              "transition-all duration-300 will-change-transform",
              phase === "in"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[2px]"
            )}
          >
            <span className="font-extrabold text-[color:var(--wb-ink)]">
              <Em>{WORDS[index]}</Em>
            </span>
            <span className="ml-1.5 text-black/55">for you</span>
          </span>
          <span className="ml-2 inline-block h-[16px] w-[2px] translate-y-[2px] bg-[color:var(--wb-accent-2)]/70 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ReelCard({ item }: { item: ReelItem }) {
  return (
    <div
      className={cx(
        "group relative shrink-0 overflow-hidden rounded-[22px]",
        "border border-[color:var(--wb-border)] bg-white/70 backdrop-blur",
        "shadow-[0_18px_44px_rgba(11,18,32,0.10)]",
        "h-[140px] w-[200px] sm:h-[170px] sm:w-[250px] lg:h-[190px] lg:w-[290px]"
      )}
    >
      <div className="absolute inset-0">
        <div
          className="h-full w-full scale-[1.02] transition-transform duration-500 group-hover:scale-[1.08]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(11,18,32,0.10), rgba(11,18,32,0.36)), url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.74),transparent_62%)]" />
      </div>

      {item.tag ? (
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.10em] text-white/90 backdrop-blur">
          {item.tag}
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="min-w-0">
          <div className="wb-serif truncate text-[15px] sm:text-[16px] lg:text-[18px] leading-tight text-white">
            {item.title}
          </div>
          <div className="mt-1 truncate text-[12px] font-semibold text-white/75">
            {item.meta}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReelRow({
  items,
  direction = "left",
  seconds = 28,
}: {
  items: ReelItem[];
  direction?: "left" | "right";
  seconds?: number;
}) {
  const loop = [...items, ...items, ...items];
  const style: MarqueeStyle = { ["--wb-marquee-duration"]: `${seconds}s` };

  return (
    <div
      className="wb-marquee relative overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={cx(
          "wb-marquee-track",
          direction === "left" ? "wb-marquee-left" : "wb-marquee-right"
        )}
        style={style}
      >
        {loop.map((item, i) => (
          <ReelCard key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-[-140px] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(27,79,214,0.26), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-120px] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(11,42,111,0.22), transparent 62%)",
        }}
      />

      <div className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.18),transparent)]" />

      <div className="wb-container">
        <div className="grid items-center gap-7 py-7 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          {/* RIGHT (mobile first) */}
          <div className="relative min-w-0 order-1 lg:order-2">
            <div className="relative rounded-[26px] border border-[color:var(--wb-border)] bg-white/55 p-4 backdrop-blur shadow-[0_26px_70px_rgba(11,18,32,0.12)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-black/45">
                    SIGNATURE BUILDS
                  </div>
                  <div className="wb-serif mt-1 text-[20px] text-[color:var(--wb-ink)] break-words">
                    Crafted by WestBrook
                  </div>
                </div>

                <Link
                  to="/projects"
                  className="inline-flex h-9 shrink-0 items-center rounded-full border border-[color:var(--wb-border)]
                             bg-white/70 px-3 text-[12px] font-extrabold text-[color:var(--wb-accent)]
                             hover:bg-white transition whitespace-nowrap"
                >
                  View →
                </Link>
              </div>

              {/* marquee */}
              <div className="mt-4 space-y-3 sm:space-y-4">
                <ReelRow items={REEL_A} direction="left" seconds={26} />
                <ReelRow items={REEL_B} direction="right" seconds={30} />
              </div>

              <div className="mt-3 text-[12px] font-semibold text-black/50 break-words">
                From first discussion to final handover — we keep it clear,
                structured, and on-track.
              </div>
            </div>
          </div>

          {/* LEFT */}
          <div className="min-w-0 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.20em] text-black/55 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent-2)]/70" />
              WESTBROOK HOMES
            </div>

            <h1 className="wb-serif mt-4 text-[30px] leading-[1.12] tracking-tight text-[color:var(--wb-ink)] sm:text-[44px] lg:text-[54px] max-w-[28ch] break-words">
              Homes that <Em>feel right</Em> the moment you <Em>step in</Em>.
            </h1>

            <p className="mt-3 max-w-[54ch] text-[14px] leading-relaxed text-black/60 sm:text-[16px] break-words">
              We work with you to finalize the design you actually want — then we
              build it with discipline, finish, and a clean handover.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[13px] font-extrabold tracking-[0.02em] text-white
                           bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))]
                           shadow-[0_16px_34px_rgba(27,79,214,0.18)]
                           hover:brightness-110 hover:-translate-y-[1px] transition whitespace-nowrap"
              >
                Start a Conversation
              </Link>

              <Link
                to="/projects"
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[13px] font-extrabold tracking-[0.02em]
                           border border-[color:var(--wb-border)] bg-white/70 text-black/70
                           hover:bg-white hover:text-[color:var(--wb-ink)]
                           hover:-translate-y-[1px] transition whitespace-nowrap"
              >
                View Our Work
              </Link>
            </div>

            {/* HOW WESTBROOK WORKS (icon removed) */}
            <div className="mt-6 max-w-xl rounded-[22px] border border-[color:var(--wb-border)] bg-white/60 p-4 backdrop-blur shadow-[0_18px_50px_rgba(11,18,32,0.10)]">
              <div className="min-w-0">
                <div className="text-[12px] font-extrabold tracking-[0.18em] text-black/45">
                  HOW WESTBROOK WORKS
                </div>

                <div className="wb-serif mt-1 text-[15.5px] sm:text-[16.5px] text-[color:var(--wb-ink)] break-words">
                  We listen first. Then we design. Then we build.
                </div>

                <p className="mt-2 text-[13.5px] leading-relaxed text-black/60 break-words">
                  We start with your requirements, refine layouts and elevations
                  with you, lock budgets + timelines, and execute with clarity
                  until handover.
                </p>
              </div>
            </div>

            {/* WRITER */}
            <div className="mt-4 max-w-xl">
              <CraftWriter />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(to_bottom,transparent,var(--wb-bg))]" />
    </section>
  );
}
