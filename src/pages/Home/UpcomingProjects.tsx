// src/pages/home/UpcomingProjects.tsx
import { Link } from "react-router-dom";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const PROJECTS = [
  {
    title: "WestBrook Residences",
    meta: "Coming soon • Early 2026",
    desc: "Modern community planning with quiet streets and practical layouts.",
    to: "/projects",
  },
  {
    title: "WestBrook Commerce Park",
    meta: "Upcoming • Mid 2026",
    desc: "Business-first spaces designed for access and day-to-day operations.",
    to: "/projects",
  },
  {
    title: "WestBrook Land Series",
    meta: "Pipeline • 2026",
    desc: "Document-first land opportunities with clear access notes.",
    to: "/land",
  },
];

export default function UpcomingProjects() {
  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
            UPCOMING
          </p>
          <h2 className="wb-serif mt-2 text-[30px] sm:text-[34px] text-[color:var(--wb-ink)]">
            Projects worth watching
          </h2>
          <p className="mt-2 text-sm sm:text-base text-black/55 max-w-xl">
            Early visibility, clear timelines, and updates you can trust.
          </p>
        </div>

        <Link
          to="/projects"
          className={cx(
            "inline-flex items-center justify-center rounded-full px-4 py-2",
            "text-[12px] font-extrabold tracking-[0.02em]",
            "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
            "shadow-[0_12px_24px_rgba(27,79,214,0.18)]",
            "hover:brightness-110 transition-all duration-200",
            "hover:-translate-y-[1px]"
          )}
        >
          View all →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="rounded-[26px] border border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl p-6 shadow-[0_18px_48px_rgba(11,18,32,0.08)]"
          >
            <p className="text-[12px] font-extrabold tracking-[0.22em] text-black/45">
              {p.meta}
            </p>
            <p className="mt-2 wb-serif text-[22px] text-[color:var(--wb-ink)]">
              {p.title}
            </p>
            <p className="mt-2 text-sm text-black/55">{p.desc}</p>

            <Link
              to={p.to}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-extrabold tracking-[0.02em]
              border border-[color:var(--wb-border)] bg-white/55 text-black/70 hover:bg-white/80 hover:text-[color:var(--wb-ink)] transition"
            >
              See details →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
