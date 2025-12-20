import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

type ReelItem = {
  title: string;
  meta: string;
  price: string;
  img: string;
  tag?: string;
};

const REEL_A: ReelItem[] = [
  {
    title: "Skyline Penthouse",
    meta: "SoHo, NYC • 2,980 sqft",
    price: "$4.85M",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
    tag: "Featured",
  },
  {
    title: "Modern Villa",
    meta: "Beverly Hills • 3,420 sqft",
    price: "$6.40M",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    tag: "Verified",
  },
  {
    title: "Luxury Apartment",
    meta: "Downtown Austin • 1,860 sqft",
    price: "$1.25M",
    img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80",
    tag: "Hot",
  },
  {
    title: "Calm Estate Home",
    meta: "Scottsdale • 4,900 sqft",
    price: "$3.10M",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    tag: "New",
  },
  {
    title: "Minimal Townhome",
    meta: "Santa Monica • 2,220 sqft",
    price: "$2.05M",
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    tag: "Prime",
  },
];

const REEL_B: ReelItem[] = [
  {
    title: "Lakeview Duplex",
    meta: "Lake Union, Seattle • 2,450 sqft",
    price: "$2.35M",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
    tag: "Tour",
  },
  {
    title: "Elegant Bungalow",
    meta: "Palo Alto • 3,120 sqft",
    price: "$5.90M",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    tag: "Verified",
  },
  {
    title: "Studio Loft",
    meta: "Brooklyn • 940 sqft",
    price: "$899K",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    tag: "Deal",
  },
  {
    title: "Garden Home",
    meta: "Naples, FL • 2,780 sqft",
    price: "$1.95M",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
    tag: "New",
  },
  {
    title: "Premium Land",
    meta: "Bozeman, MT • 2.1 acres",
    price: "$720K",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80",
    tag: "Land",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type MarqueeStyle = CSSProperties & { ["--wb-marquee-duration"]?: string };

function IconDot() {
  return (
    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--wb-accent-2)]/70 shadow-[0_10px_22px_rgba(27,79,214,0.22)]" />
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/70 px-3 py-1 text-[12px] font-extrabold text-black/60 whitespace-nowrap">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent-2)]/70" />
      {children}
    </span>
  );
}

function ReelCard({ item }: { item: ReelItem }) {
  return (
    <div
      className={cx(
        "group relative shrink-0 overflow-hidden rounded-[22px]",
        "border border-[color:var(--wb-border)] bg-white/70 backdrop-blur",
        "shadow-[0_18px_44px_rgba(11,18,32,0.10)]",
        "h-[148px] w-[210px] sm:h-[175px] sm:w-[250px] lg:h-[190px] lg:w-[290px]"
      )}
    >
      <div className="absolute inset-0">
        <div
          className="h-full w-full scale-[1.02] transition-transform duration-500 group-hover:scale-[1.08]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(11,18,32,0.10), rgba(11,18,32,0.34)), url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.62),transparent_62%)]" />
      </div>

      {item.tag ? (
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.08em] text-white/90 backdrop-blur">
          {item.tag}
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="wb-serif truncate text-[15px] sm:text-[16px] lg:text-[18px] leading-tight text-white">
              {item.title}
            </div>
            <div className="mt-1 truncate text-[12px] font-semibold text-white/75">
              {item.meta}
            </div>
          </div>
          <div className="shrink-0 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-[12px] font-extrabold text-white backdrop-blur whitespace-nowrap">
            {item.price}
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

      {/* ✅ IMPORTANT: remove extra padding duplication */}
      <div className="wb-container">
        <div className="grid items-center gap-8 py-8 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          {/* LEFT */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wb-border)] bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.20em] text-black/55 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent-2)]/70" />
              WESTBROOK ESTATES
            </div>

            {/* ✅ No clipping: safe wrapping + max width for nice breaks */}
            <h1 className="wb-serif mt-4 text-[30px] leading-[1.14] tracking-tight text-[color:var(--wb-ink)] sm:text-[44px] lg:text-[54px] max-w-[26ch] sm:max-w-none break-words">
              Find a home you’ll love coming back to.
            </h1>

            <p className="mt-3 max-w-[56ch] text-[14px] leading-relaxed text-black/60 sm:text-[16px] break-words">
              Handpicked homes, private access, and guidance you can trust.
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link
                to="/explorehomes"
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[13px] font-extrabold tracking-[0.02em] text-white
                           bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))]
                           shadow-[0_16px_34px_rgba(27,79,214,0.18)]
                           hover:brightness-110 hover:-translate-y-[1px] transition whitespace-nowrap"
              >
                Explore Listings
              </Link>

              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[13px] font-extrabold tracking-[0.02em]
                           border border-[color:var(--wb-border)] bg-white/70 text-black/70
                           hover:bg-white hover:text-[color:var(--wb-ink)]
                           hover:-translate-y-[1px] transition whitespace-nowrap"
              >
                Get a Callback
              </Link>
            </div>

            {/* Status strip */}
            <div className="mt-4 rounded-2xl border border-[color:var(--wb-border)] bg-white/55 px-3 py-2 shadow-[0_12px_28px_rgba(11,18,32,0.06)] backdrop-blur">
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-black/55">
                <Pill>Private access</Pill>
                <Pill>No-pressure guidance</Pill>
                <Pill>Clear pricing</Pill>
              </div>
            </div>

            {/* Premium panel */}
            <div className="mt-6 max-w-xl overflow-hidden rounded-[26px] border border-[color:var(--wb-border)] bg-white/55 backdrop-blur shadow-[0_20px_60px_rgba(11,18,32,0.12)]">
              <div className="relative px-4 py-4 sm:px-5 sm:py-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(27,79,214,0.14), rgba(11,42,111,0.06))",
                  }}
                />
                <div className="relative">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-black/45">
                    CONCIERGE ADVANTAGE
                  </div>
                  <div className="wb-serif mt-1 text-[16px] leading-snug text-[color:var(--wb-ink)] sm:text-[18px] break-words">
                    Calm, clear guidance — from browse to keys.
                  </div>
                  <p className="mt-2 text-[12.5px] font-semibold leading-relaxed text-black/55 sm:text-[13px] break-words">
                    Early access, smart showings, clean pricing, and steady support
                    through closing.
                  </p>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-5">
                <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                  {[
                    {
                      t: "Early access",
                      d: "See standout homes before they get crowded.",
                    },
                    {
                      t: "Private showings",
                      d: "Viewings arranged around your schedule.",
                    },
                    {
                      t: "Pricing clarity",
                      d: "Comps and value explained plainly.",
                    },
                    {
                      t: "Closing support",
                      d: "Offers, paperwork, timelines handled cleanly.",
                    },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl bg-white/70 p-3 shadow-[0_10px_24px_rgba(11,18,32,0.06)]"
                    >
                      <div className="flex items-start gap-3">
                        <IconDot />
                        <div className="min-w-0">
                          <div className="text-[13px] font-extrabold text-[color:var(--wb-ink)] break-words">
                            {x.t}
                          </div>
                          <div className="mt-0.5 text-[12px] font-semibold leading-relaxed text-black/55 break-words">
                            {x.d}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>Verified listings</Pill>
                  <Pill>Clear timelines</Pill>
                  <Pill>No surprises</Pill>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative min-w-0">
            <div className="relative rounded-[28px] border border-[color:var(--wb-border)] bg-white/55 p-4 backdrop-blur shadow-[0_26px_70px_rgba(11,18,32,0.12)]">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[12px] font-extrabold tracking-[0.18em] text-black/45">
                    IN DEMAND
                  </div>
                  <div className="wb-serif mt-1 text-[20px] text-[color:var(--wb-ink)] break-words">
                    Trending homes
                  </div>
                </div>

                <Link
                  to="/explorehomes"
                  className="inline-flex h-9 shrink-0 items-center rounded-full border border-[color:var(--wb-border)]
                             bg-white/70 px-3 text-[12px] font-extrabold text-[color:var(--wb-accent)]
                             hover:bg-white transition whitespace-nowrap"
                >
                  View all →
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                <ReelRow items={REEL_A} direction="left" seconds={26} />
                <ReelRow items={REEL_B} direction="right" seconds={30} />
              </div>

              <div className="mt-4 text-[12px] font-semibold text-black/50">
                Updated regularly.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(to_bottom,transparent,var(--wb-bg))]" />
    </section>
  );
}
