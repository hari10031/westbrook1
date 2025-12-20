// src/pages/Home/FinalCTA.tsx
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              Want a shortlist that matches your budget?
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Share your preferred areas — we’ll help you explore the best options.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              to="/explore-homes"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Homes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
