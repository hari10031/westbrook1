// src/pages/Home/Testimonials.tsx
import type React from "react";
import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

type Review = {
  name: string;
  role: string;
  location: string;
  when: string;
  rating: 4 | 5;
  text: React.ReactNode;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

// Avatar generator
function avatarUrl(name: string) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundType=gradientLinear&radius=16`;
}

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "W") + (p[1]?.[0] ?? "")).toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
          aria-hidden="true"
          className={cx(
            "text-[11px] sm:text-[12px] leading-none",
            i < rating ? "text-amber-400" : "text-black/15"
          )}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const REVIEWS: Review[] = useMemo(
    () => [
      {
        name: "Jordan M.",
        role: "Buyer",
        location: "Plano, TX",
        when: "Nov 2025",
        rating: 5,
        text: (
          <>
            The biggest help was the <b>shortlisting</b>. We didn't spend weekends
            touring random places. Options matched our <b>budget</b> and <b>commute</b>.
          </>
        ),
      },
      {
        name: "Sophia R.",
        role: "Investor",
        location: "Tampa, FL",
        when: "Oct 2025",
        rating: 4,
        text: (
          <>
            What I appreciated was the focus on <b>numbers</b> — <b>rent comps</b>,
            <b> taxes</b>, and realistic <b>expenses</b> before offering.
          </>
        ),
      },
      {
        name: "Marcus L.",
        role: "Business Owner",
        location: "Phoenix, AZ",
        when: "Sep 2025",
        rating: 5,
        text: (
          <>
            I'm not familiar with leases, so having the <b>key clauses</b> explained
            clearly helped a lot. Negotiation felt fair and not rushed.
          </>
        ),
      },
      {
        name: "Emily K.",
        role: "Buyer",
        location: "Austin, TX",
        when: "Aug 2025",
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
        when: "May 2025",
        rating: 5,
        text: (
          <>
            I liked the discussion around <b>resale</b> and <b>downside risk</b>,
            not just upside. The advice felt practical, not sales-driven.
          </>
        ),
      },
      {
        name: "Priya N.",
        role: "Buyer",
        location: "San Diego, CA",
        when: "Jun 2025",
        rating: 5,
        text: (
          <>
            They helped us write a strong <b>offer</b> without overpaying. The
            <b> counter-offer</b> discussion stayed calm and data-based.
          </>
        ),
      },
    ],
    []
  );

  // Split reviews into two rows for marquee
  const row1 = REVIEWS.slice(0, 3);
  const row2 = REVIEWS.slice(3);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-0 h-[250px] sm:h-[300px] w-[400px] sm:w-[600px] -translate-x-1/2 rounded-full bg-[color:var(--wb-accent)]/6 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute right-0 bottom-0 h-[200px] w-[300px] rounded-full bg-[color:var(--wb-accent-2)]/5 blur-3xl"
        />
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.26em] text-black/45 uppercase"
        >
          Client Feedback
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="wb-serif mt-2 text-[24px] sm:text-[30px] lg:text-[36px] text-[color:var(--wb-ink)]"
        >
          What people usually mention
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-[12px] sm:text-[13px] text-black/55 max-w-md mx-auto"
        >
          Based on conversations after tours, inspections, leases, and closings.
        </motion.p>
      </div>

      {/* Marquee Row 1 - Moving Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MarqueeRow reviews={row1} direction="left" speed={35} />
      </motion.div>

      {/* Marquee Row 2 - Moving Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-3 sm:mt-4"
      >
        <MarqueeRow reviews={row2} direction="right" speed={40} />
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center mt-8 sm:mt-10"
      >
        <p className="text-[11px] sm:text-[12px] text-black/40">
          Join <span className="font-bold text-[color:var(--wb-accent)]">200+</span> satisfied clients
        </p>
      </motion.div>
    </section>
  );
}

function MarqueeRow({
  reviews,
  direction,
  speed = 35,
}: {
  reviews: Review[];
  direction: "left" | "right";
  speed?: number;
}) {
  // Triple the items for seamless loop
  const items = [...reviews, ...reviews, ...reviews];

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
      }}
    >
      <div
        className={cx(
          "flex gap-3 sm:gap-4 w-max",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: Review }) {
  return (
    <div
      className={cx(
        "group flex-shrink-0",
        "w-[240px] sm:w-[280px] lg:w-[320px]",
        "rounded-xl sm:rounded-2xl",
        "border border-[color:var(--wb-border)]",
        "bg-white/80 backdrop-blur-sm",
        "p-3 sm:p-4",
        "shadow-[0_8px_24px_rgba(11,18,32,0.04)]",
        "hover:shadow-[0_12px_32px_rgba(11,18,32,0.08)]",
        "hover:-translate-y-1 hover:border-[color:var(--wb-accent)]/20",
        "transition-all duration-300 ease-out"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2.5 sm:gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-[color:var(--wb-border)] bg-gradient-to-br from-[color:var(--wb-accent)]/5 to-[color:var(--wb-accent-2)]/5">
            <img
              src={avatarUrl(t.name)}
              alt={t.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="h-full w-full grid place-items-center font-bold text-[11px] text-[color:var(--wb-accent)]">${initials(t.name)}</span>`;
                }
              }}
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] sm:text-[12px] font-bold text-[color:var(--wb-ink)] truncate">
              {t.name}
            </p>
            <Stars rating={t.rating} />
          </div>
          <p className="text-[9px] sm:text-[10px] text-black/45 truncate">
            {t.role} • {t.location}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-2.5 sm:mt-3 relative">
        {/* Quote mark */}
        <span className="absolute -top-1 -left-0.5 text-[color:var(--wb-accent)]/10 text-2xl sm:text-3xl font-serif leading-none">
          "
        </span>
        <p className="text-[11px] sm:text-[12px] leading-relaxed text-black/60 line-clamp-3 pl-3">
          {t.text}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[color:var(--wb-border)]/50 flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] text-black/35 font-medium">
          {t.when}
        </span>
        <div className="flex items-center gap-1 text-[color:var(--wb-accent)]/60 group-hover:text-[color:var(--wb-accent)] transition-colors">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="text-[9px] sm:text-[10px] font-medium">Verified</span>
        </div>
      </div>
    </div>
  );
}
