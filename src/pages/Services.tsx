export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-semibold">Services</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          "Home Buying Assistance",
          "Property Selling",
          "Land Consultation",
          "Site Visits",
          "Documentation Support",
        ].map((s) => (
          <div
            key={s}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="font-semibold">{s}</div>
            <p className="mt-2 text-sm text-white/70">
              Professional guidance tailored to your needs.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
