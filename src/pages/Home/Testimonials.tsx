// src/pages/home/Testimonials.tsx
import { useEffect, useMemo, useState } from "react";

type Review = {
  name: string;
  role: string;
  location: string;
  when: string;
  rating: 4 | 5;
  text: React.ReactNode; // lets us bold key terms cleanly
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "W") + (p[1]?.[0] ?? "")).toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cx(
            "text-[13px] leading-none",
            i < rating ? "text-[color:var(--wb-accent)]" : "text-black/25"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function clamp(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

export default function Testimonials() {
  // ✅ 9 reviews (mixed 4⭐/5⭐ feels real)
  const REVIEWS: Review[] = useMemo(
    () => [
      {
        name: "Jordan M.",
        role: "Buyer",
        location: "Plano, TX",
        when: "Closed Nov 2025",
        rating: 5,
        text: (
          <>
            The biggest help was the <b>shortlisting</b>. We didn’t spend weekends
            touring random places. The options matched our <b>budget</b> and{" "}
            <b>commute</b>.
          </>
        ),
      },
      {
        name: "Sophia R.",
        role: "Investor",
        location: "Tampa, FL",
        when: "Closed Oct 2025",
        rating: 4,
        text: (
          <>
            What I appreciated was the focus on <b>numbers</b> — <b>rent comps</b>,{" "}
            <b>taxes</b>, and realistic <b>expenses</b> before offering.
          </>
        ),
      },
      {
        name: "Marcus L.",
        role: "Business Owner",
        location: "Phoenix, AZ",
        when: "Leased Sep 2025",
        rating: 5,
        text: (
          <>
            I’m not familiar with leases, so having the <b>key clauses</b> explained
            clearly helped a lot. Negotiation felt fair and not rushed.
          </>
        ),
      },
      {
        name: "Emily K.",
        role: "Buyer",
        location: "Austin, TX",
        when: "Closed Aug 2025",
        rating: 4,
        text: (
          <>
            The <b>inspection phase</b> was stressful, but they helped us understand
            what mattered and handled <b>repair requests</b> smoothly.
          </>
        ),
      },
      {
        name: "Kevin T.",
        role: "Investor",
        location: "Atlanta, GA",
        when: "Closed May 2025",
        rating: 5,
        text: (
          <>
            I liked the discussion around <b>resale</b> and <b>downside risk</b>, not
            just upside. The advice felt practical, not sales-driven.
          </>
        ),
      },
      {
        name: "Hannah W.",
        role: "Business Owner",
        location: "Seattle, WA",
        when: "Leased Apr 2025",
        rating: 4,
        text: (
          <>
            Walkthroughs, <b>vendor access</b>, and paperwork were coordinated well.
            Timelines stayed clear from start to finish.
          </>
        ),
      },
      {
        name: "Daniel S.",
        role: "Tenant",
        location: "Charlotte, NC",
        when: "Moved-in Jul 2025",
        rating: 4,
        text: (
          <>
            The <b>move-in process</b> was simple. Deposits, dates, and expectations
            were explained upfront — no confusion later.
          </>
        ),
      },
      {
        name: "Priya N.",
        role: "Buyer",
        location: "San Diego, CA",
        when: "Closed Jun 2025",
        rating: 5,
        text: (
          <>
            They helped us write a strong <b>offer</b> without overpaying. The{" "}
            <b>counter-offer</b> discussion stayed calm and data-based.
          </>
        ),
      },
      {
        name: "Noah B.",
        role: "Buyer",
        location: "Raleigh, NC",
        when: "Closed Mar 2025",
        rating: 4,
        text: (
          <>
            Communication was solid — quick updates, clear next steps, and zero drama
            around <b>documents</b> and <b>closing</b>.
          </>
        ),
      },
    ],
    []
  );

  const perDesktopPage = 3;
  const totalDesktopPages = Math.ceil(REVIEWS.length / perDesktopPage);

  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);

  // ✅ Auto-scroll BOTH mobile + desktop
  // Pause when user hovers (desktop) or taps dots/arrows (still works)
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setMobileIndex((i) => clamp(i + 1, REVIEWS.length));
      setDesktopPage((p) => clamp(p + 1, totalDesktopPages));
    }, 2800); // 2.8s (you can change to 2500 / 3000)

    return () => window.clearInterval(id);
  }, [paused, REVIEWS.length, totalDesktopPages]);

  const desktopSlice = REVIEWS.slice(
    desktopPage * perDesktopPage,
    desktopPage * perDesktopPage + perDesktopPage
  );

  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
          CLIENT FEEDBACK
        </p>
        <h2 className="wb-serif mt-2 text-[32px] text-[color:var(--wb-ink)]">
          What people usually mention
        </h2>
        <p className="mt-2 text-sm text-black/55">
          Based on conversations after tours, inspections, leases, and closings.
        </p>
      </div>

      {/* ===== MOBILE: ONE CARD + DOTS (auto-scroll) ===== */}
      <div className="mt-10 lg:hidden">
        <TestimonialCard t={REVIEWS[mobileIndex]} />
        <Dots
          count={REVIEWS.length}
          index={mobileIndex}
          onClick={(i) => {
            setPaused(true);
            setMobileIndex(i);
            // resume after a short delay so it doesn't feel "stuck"
            window.setTimeout(() => setPaused(false), 1800);
          }}
        />
      </div>

      {/* ===== DESKTOP: MULTIPLE CARDS + DOTS (auto-scroll pages) ===== */}
      <div className="hidden lg:block mt-10">
        <div className="grid grid-cols-3 gap-6">
          {desktopSlice.map((t) => (
            <TestimonialCard key={t.name + t.when} t={t} />
          ))}
        </div>

        <Dots
          count={totalDesktopPages}
          index={desktopPage}
          onClick={(i) => {
            setPaused(true);
            setDesktopPage(i);
            window.setTimeout(() => setPaused(false), 1800);
          }}
        />
      </div>
    </section>
  );
}

function Dots({
  count,
  index,
  onClick,
}: {
  count: number;
  index: number;
  onClick: (i: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center gap-2" aria-label="Testimonial pagination">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onClick(i)}
          className={cx(
            "h-2.5 w-2.5 rounded-full transition",
            i === index
              ? "bg-[color:var(--wb-accent)] shadow-[0_0_0_3px_rgba(27,79,214,0.14)]"
              : "bg-black/25 hover:bg-black/35"
          )}
          aria-label={`Go to ${i + 1}`}
          aria-current={i === index ? "true" : "false"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Review }) {
  return (
    <div
      className={cx(
        "h-full rounded-[26px] border border-[color:var(--wb-border)]",
        "bg-white/65 backdrop-blur p-6",
        "shadow-[0_22px_60px_rgba(11,18,32,0.10)]",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_78px_rgba(11,18,32,0.12)]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl grid place-items-center border border-[color:var(--wb-border)] bg-white/75">
            <span className="font-extrabold tracking-[0.06em] text-[color:var(--wb-ink)]/85">
              {initials(t.name)}
            </span>
          </div>

          <div className="leading-tight">
            <p className="text-[14px] font-extrabold text-[color:var(--wb-ink)]">
              {t.name}
            </p>
            <p className="text-[12px] text-black/50">
              {t.role} • {t.location}
            </p>
          </div>
        </div>

        <div className="text-right">
          <Stars rating={t.rating} />
          <p className="mt-1 text-[11px] text-black/40">{t.when}</p>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-black/65">{t.text}</p>

      <div className="mt-6 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.22),transparent)]" />
    </div>
  );
}
