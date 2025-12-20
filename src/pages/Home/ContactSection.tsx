// src/pages/home/ContactSection.tsx
import { Link } from "react-router-dom";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function ContactSection() {
  return (
    <section
      className={cx(
        "rounded-[28px] border border-[color:var(--wb-border)]",
        "bg-[linear-gradient(135deg,rgba(27,79,214,0.12),rgba(11,42,111,0.06))]",
        "p-6 sm:p-8 shadow-[0_22px_70px_rgba(11,18,32,0.10)]"
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
            CONTACT
          </p>
          <h2 className="wb-serif mt-2 text-[28px] sm:text-[32px] text-[color:var(--wb-ink)]">
            Want a shortlist that actually fits?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-black/55 max-w-xl">
            Tell us what you need — we’ll share verified options and set up tours
            without noise.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/contact"
            className={cx(
              "rounded-full px-4 py-2",
              "text-[12px] font-extrabold tracking-[0.02em]",
              "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
              "shadow-[0_12px_24px_rgba(27,79,214,0.18)]",
              "hover:brightness-110 transition-all duration-200",
              "hover:-translate-y-[1px]"
            )}
          >
            Get a callback
          </Link>

          <Link
            to="/services"
            className={cx(
              "rounded-full px-4 py-2",
              "text-[12px] font-extrabold tracking-[0.02em]",
              "border border-[color:var(--wb-border)] bg-white/55 text-black/70",
              "hover:bg-white/80 hover:text-[color:var(--wb-ink)] transition"
            )}
          >
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
