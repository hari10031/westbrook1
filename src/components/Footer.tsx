// src/components/Footer.tsx
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Explore Homes", to: "/explore-homes" },
  { label: "Land", to: "/land" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "Property Buying Assistance",
  "Property Selling",
  "Land Consultation",
  "Site Visits & Shortlisting",
  "Documentation Support",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white font-bold text-zinc-900">
                W
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold">WestBrook</div>
                <div className="text-[11px] text-white/60">Realty</div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Helping you find the right home and land with clarity, trust, and
              smooth end-to-end support.
            </p>

            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Residential • Land • Consultation
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-sm font-semibold">Quick links</div>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <div className="text-sm font-semibold">Services</div>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s} className="text-sm text-white/70">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Need help choosing?</div>
              <p className="mt-1 text-sm text-white/70">
                Share budget & location — we’ll shortlist options.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:opacity-90"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/55">
            © {year} WestBrook. All rights reserved.
          </div>
          <div className="text-xs text-white/55">Built with React + Tailwind</div>
        </div>
      </div>
    </footer>
  );
}
