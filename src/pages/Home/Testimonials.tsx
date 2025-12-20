// src/pages/Home/Testimonials.tsx
const testimonials = [
  {
    name: "Client A",
    role: "Home buyer",
    quote: "Smooth experience. Clear options and quick site visits.",
  },
  {
    name: "Client B",
    role: "Investor",
    quote: "Good guidance and straightforward communication throughout.",
  },
  {
    name: "Client C",
    role: "First-time buyer",
    quote: "They helped me shortlist confidently and save a lot of time.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold">What people say</h2>
      <p className="mt-2 max-w-2xl text-sm text-white/70">
        Trusted by buyers for simple and clear guidance.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm leading-relaxed text-white/80">
              “{t.quote}”
            </p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-white/60">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
