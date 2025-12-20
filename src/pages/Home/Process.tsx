// src/pages/Home/Process.tsx
const steps = [
  { title: "Understand", desc: "We collect your budget, location, and preferences." },
  { title: "Shortlist", desc: "We shortlist options that actually match your needs." },
  { title: "Visit", desc: "We schedule and coordinate site visits efficiently." },
  { title: "Close", desc: "We support the process for smooth next steps." },
];

export default function Process() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold">How we work</h2>
      <p className="mt-2 max-w-2xl text-sm text-white/70">
        A simple process that saves you time.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((st, idx) => (
          <div
            key={st.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="inline-flex rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
              Step {idx + 1}
            </div>
            <div className="mt-3 text-base font-semibold">{st.title}</div>
            <p className="mt-2 text-sm text-white/70">{st.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
