// src/pages/home/PartnersSection.tsx
function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const PARTNERS = [
  "PrimeBuild",
  "NorthStone",
  "UrbanEdge",
  "ClearTitle Co.",
  "MetroFinance",
  "VistaDesign",
];

export default function PartnersSection() {
  return (
    <section>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
          PARTNERS
        </p>
        <h2 className="wb-serif mt-2 text-[30px] sm:text-[34px] text-[color:var(--wb-ink)]">
          Trusted by teams we work with
        </h2>
        <p className="mt-2 text-sm sm:text-base text-black/55">
          Builders, title partners, and finance teams we coordinate with.
        </p>
      </div>

      <div
        className={cx(
          "mt-8 grid gap-4",
          "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        )}
      >
        {PARTNERS.map((p) => (
          <div
            key={p}
            className="rounded-[22px] border border-[color:var(--wb-border)] bg-white/55 backdrop-blur p-4 text-center shadow-[0_12px_30px_rgba(11,18,32,0.06)]"
          >
            <p className="text-[13px] font-extrabold text-black/70">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
