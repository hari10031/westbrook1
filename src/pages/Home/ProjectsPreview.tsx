// src/pages/Home/ProjectsPreview.tsx
import { Link } from "react-router-dom";

const featured = [
  {
    name: "Premium Apartments",
    desc: "Curated apartments with good connectivity and amenities.",
    meta: "2BHK • 3BHK",
  },
  {
    name: "Independent Houses",
    desc: "Homes for families with space, privacy, and calm neighborhoods.",
    meta: "Gated • Standalone",
  },
  {
    name: "Open Plots",
    desc: "Land opportunities with long-term value and verified options.",
    meta: "Plots • Ventures",
  },
];

export default function ProjectsPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold">Featured categories</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            A preview of what you can explore with us.
          </p>
        </div>

        <Link
          to="/projects"
          className="hidden rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <div
            key={p.name}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
          >
            <div className="text-lg font-semibold">{p.name}</div>
            <p className="mt-2 text-sm text-white/70">{p.desc}</p>
            <div className="mt-4 text-xs text-white/60">{p.meta}</div>

            <div className="mt-6">
              <Link
                to="/explore-homes"
                className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:opacity-90"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:hidden">
        <Link
          to="/projects"
          className="inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          View all
        </Link>
      </div>
    </section>
  );
}
