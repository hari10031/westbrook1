import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSectionClick = useCallback((to: string, e: React.MouseEvent) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const sectionId = to.replace("/#", "");

      if (location.pathname === "/") {
        scrollToSection(sectionId);
      } else {
        navigate("/");
        setTimeout(() => scrollToSection(sectionId), 100);
      }
    }
  }, [location.pathname, navigate, scrollToSection]);

  return (
    <footer
      className={cx(
        "relative mt-24",
        "border-t border-[color:var(--wb-border)]",
        "bg-white/40 backdrop-blur-xl"
      )}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-[320px] max-w-4xl rounded-full blur-3xl opacity-40
        bg-[radial-gradient(circle_at_50%_50%,rgba(27,79,214,0.18),transparent_65%)]"
      />

      <div className="wb-container relative">
        {/* ================= TOP GRID ================= */}
        <div className="grid gap-14 py-16 lg:grid-cols-[1.3fr_2fr]">
          {/* BRAND / MANIFESTO */}
          <div>
            <div className="flex items-center gap-3">
              <div
                className={cx(
                  "grid h-12 w-12 place-items-center rounded-2xl",
                  "border border-[color:var(--wb-border)]",
                  "bg-white/70",
                  "shadow-[0_16px_36px_rgba(11,18,32,0.12)]"
                )}
              >
                <span className="wb-serif text-[20px] text-[color:var(--wb-accent)]">
                  W
                </span>
              </div>

              <div className="leading-tight">
                <p className="wb-serif text-[21px] text-[color:var(--wb-ink)]">
                  WestBrook
                </p>
                <p className="text-[11px] font-extrabold tracking-[0.32em] text-black/45">
                  ESTATES
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/60">
              WestBrook is a real estate advisory focused on clarity.
              We help clients navigate homes, commercial spaces, and land
              with a document-first approach and calm decision-making.
            </p>

            <p className="mt-5 text-[13px] text-black/45">
              Residential • Commercial • Land Advisory
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FooterColumn
              title="Explore"
              links={[
                { label: "Explore Homes", to: "/explore-homes" },
                { label: "Portfolio", to: "/#commercial", isSection: true },
                { label: "Our Process", to: "/#process", isSection: true },
              ]}
              onSectionClick={handleSectionClick}
            />

            <FooterColumn
              title="WestBrook"
              links={[
                { label: "About", to: "/about" },
                { label: "Partnerships", to: "/partnerships" },
                { label: "Why WestBrook", to: "/#why-us", isSection: true },
                { label: "Testimonials", to: "/#testimonials", isSection: true },
              ]}
              onSectionClick={handleSectionClick}
            />

            <FooterColumn
              title="Contact"
              links={[
                { label: "Get in touch", to: "/#contact", isSection: true },
                { label: "Request a callback", to: "/#contact", isSection: true },
              ]}
              onSectionClick={handleSectionClick}
            />
          </div>
        </div>

        {/* ================= EDITORIAL CTA ================= */}
        <div
          className={cx(
            "rounded-[30px] border border-[color:var(--wb-border)]",
            "bg-white/55 backdrop-blur-xl",
            "px-8 py-10",
            "shadow-[0_30px_90px_rgba(11,18,32,0.14)]"
          )}
        >
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-[12px] font-extrabold tracking-[0.30em] text-black/45">
                START WITH CLARITY
              </p>
              <h3 className="wb-serif mt-3 text-[26px] text-[color:var(--wb-ink)]">
                Looking for the right property — without the noise?
              </h3>
              <p className="mt-2 max-w-xl text-[15px] text-black/55">
                Tell us what you’re evaluating. We’ll share verified options,
                realistic context, and the next steps that matter.
              </p>
            </div>

            <Link
              to="/#contact"
              className={cx(
                "inline-flex items-center justify-center",
                "rounded-full px-6 py-3",
                "text-[13px] font-extrabold tracking-[0.03em]",
                "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))]",
                "text-white",
                "shadow-[0_14px_32px_rgba(27,79,214,0.25)]",
                "hover:brightness-110 transition-all duration-200",
                "hover:-translate-y-[1px]"
              )}
            >
              Request a callback →
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-14 border-t border-[color:var(--wb-border)] py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-black/45">
              © {new Date().getFullYear()} WestBrook Estates. All rights reserved.
            </p>

            <div className="flex gap-6 text-[12px] text-black/45">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Fair Housing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= SUB COMPONENT ================= */

type FooterLink = { label: string; to: string; isSection?: boolean };

function FooterColumn({
  title,
  links,
  onSectionClick,
}: {
  title: string;
  links: FooterLink[];
  onSectionClick: (to: string, e: React.MouseEvent) => void;
}) {
  return (
    <div>
      <p className="text-[12px] font-extrabold tracking-[0.26em] text-black/45">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.isSection ? "/" : l.to}
              onClick={(e) => l.isSection && onSectionClick(l.to, e)}
              className="text-[14px] text-black/60 hover:text-(--wb-ink) transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
