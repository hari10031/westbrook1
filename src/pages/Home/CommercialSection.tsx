// src/pages/home/CommercialSection.tsx
import { Link } from "react-router-dom";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const CARDS = [
  {
    title: "Office Spaces",
    desc: "Professional spaces with flexible terms.",
    bullets: ["Location clarity", "Lease guidance", "Quick walkthroughs"],
    to: "/services",
  },
  {
    title: "Retail & Showrooms",
    desc: "Footfall-focused options and visibility checks.",
    bullets: ["Frontage review", "Signage context", "Lease negotiation"],
    to: "/services",
  },
  {
    title: "Warehousing",
    desc: "Access, utilities, and operational suitability.",
    bullets: ["Loading access", "Power availability", "Compliance checks"],
    to: "/services",
  },
];

export default function CommercialSection() {
  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
            COMMERCIAL
          </p>
          <h2 className="wb-serif mt-2 text-[30px] sm:text-[34px] text-[color:var(--wb-ink)]">
            Spaces that work for business
          </h2>
          <p className="mt-2 text-sm sm:text-base text-black/55 max-w-xl">
            Clear site notes, lease support, and fast coordination — so decisions
            move forward without chaos.
          </p>
        </div>

        <Link
          to="/services"
          className={cx(
            "inline-flex items-center justify-center rounded-full px-4 py-2",
            "text-[12px] font-extrabold tracking-[0.02em]",
            "border border-[color:var(--wb-border)] bg-white/55 text-black/70",
            "hover:bg-white/80 hover:text-[color:var(--wb-ink)] transition"
          )}
        >
          View services →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.title}
            className="rounded-[26px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl p-6 shadow-[0_18px_48px_rgba(11,18,32,0.08)]"
          >
            <p className="wb-serif text-[22px] text-[color:var(--wb-ink)]">
              {c.title}
            </p>
            <p className="mt-1 text-sm text-black/55">{c.desc}</p>

            <ul className="mt-5 space-y-2">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-black/60">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--wb-accent)]/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to={c.to}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-extrabold tracking-[0.02em]
              border border-[color:var(--wb-border)] bg-white/55 text-black/70 hover:bg-white/80 hover:text-[color:var(--wb-ink)] transition"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
