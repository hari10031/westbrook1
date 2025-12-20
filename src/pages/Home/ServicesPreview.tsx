// src/pages/Home/ServicesPreview.tsx
import { Link } from "react-router-dom";

const services = [
  {
    title: "Home Buying Assistance",
    desc: "Shortlisting, visits, and guidance based on your needs and budget.",
    tag: "Residential",
  },
  {
    title: "Land Consultation",
    desc: "Verified plots, location checks, and documentation support.",
    tag: "Land",
  },
  {
    title: "Documentation Support",
    desc: "Help with basic checks and smooth coordination for next steps.",
    tag: "Guidance",
  },
];

export default function ServicesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">What we do</h2>
        <p className="max-w-2xl text-sm text-white/70">
          Simple process, clear communication, and reliable support.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="text-lg font-semibold">{s.title}</div>
            <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
              {s.tag}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/services"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          See all services
        </Link>
      </div>
    </section>
  );
}
