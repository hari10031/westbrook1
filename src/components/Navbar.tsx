// src/components/Navbar.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

type NavItem = { label: string; to: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Explore Homes", to: "/explorehomes" },
  { label: "Land", to: "/land" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export default function Navbar() {
  const scrolled = useScrolled(10);
  const location = useLocation();
  const navItems = useMemo(() => NAV, []);
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);

  const moveIndicator = () => {
    const root = navRef.current;
    const pill = pillRef.current;
    if (!root || !pill) return;

    const active = root.querySelector<HTMLAnchorElement>(
      'a[aria-current="page"]'
    );

    if (!active) {
      pill.style.opacity = "0";
      return;
    }

    const r = root.getBoundingClientRect();
    const a = active.getBoundingClientRect();
    const left = a.left - r.left;
    const width = a.width;

    pill.style.opacity = "1";
    pill.style.transform = `translateX(${left}px)`;
    pill.style.width = `${width}px`;
  };

  // Close drawer on route change (simple + reliable)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ESC closes drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll on open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("wb-lock");
    else root.classList.remove("wb-lock");
    return () => root.classList.remove("wb-lock");
  }, [open]);

  // move active pill on route change + resize + first paint
  useEffect(() => {
    moveIndicator();
    const onResize = () => moveIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40">
      {/* subtle top hairline */}
      <div className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.22),transparent)]" />

      {/* Glass shell */}
      <div
        className={cx(
          "transition-all duration-300",
          "supports-[backdrop-filter]:backdrop-blur-xl",
          scrolled
            ? [
                "bg-white/70",
                "border-b border-[color:var(--wb-border)]",
                "shadow-[0_14px_38px_rgba(11,18,32,0.10)]",
              ].join(" ")
            : [
                "bg-white/35",
                "border-b border-transparent",
                "shadow-[0_10px_28px_rgba(11,18,32,0.06)]",
              ].join(" ")
        )}
      >
        <div className="wb-container">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Brand */}
            <Link to="/" className="group inline-flex items-center gap-3">
              <span
                className={cx(
                  "grid h-10 w-10 place-items-center rounded-2xl border",
                  "border-[color:var(--wb-border)] bg-white/70 backdrop-blur",
                  "shadow-[0_14px_30px_rgba(11,18,32,0.08)]",
                  "transition-transform duration-300 group-hover:scale-[1.02]"
                )}
              >
                <span className="wb-serif text-[18px] leading-none text-[color:var(--wb-accent)]">
                  W
                </span>
              </span>

              <span className="leading-tight">
                <span className="wb-serif block text-[19px] tracking-tight text-[color:var(--wb-ink)]">
                  WestBrook
                </span>
                <span className="block text-[11px] font-extrabold tracking-[0.26em] text-black/45">
                  ESTATES
                </span>
              </span>
            </Link>

            {/* Center NAV (Desktop) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div
                ref={navRef}
                className={cx(
                  "relative flex items-center gap-1",
                  "rounded-full border border-[color:var(--wb-border)]",
                  "bg-white/55 backdrop-blur-xl",
                  "px-1 py-1",
                  "shadow-[0_14px_32px_rgba(11,18,32,0.08)]"
                )}
              >
                {/* Active pill */}
                <span
                  ref={pillRef}
                  aria-hidden="true"
                  className={cx(
                    "absolute top-1 bottom-1 left-1 rounded-full",
                    "bg-[linear-gradient(135deg,rgba(27,79,214,0.14),rgba(11,42,111,0.08))]",
                    "border border-[rgba(27,79,214,0.18)]",
                    "shadow-[0_16px_34px_rgba(27,79,214,0.16)]",
                    "transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
                  )}
                  style={{ width: 0, opacity: 0 }}
                />

                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onMouseEnter={moveIndicator}
                    className={({ isActive }) =>
                      cx(
                        "relative z-10 rounded-full px-4 py-2",
                        "text-[13px] font-extrabold tracking-[0.02em]",
                        "transition-all duration-200",
                        isActive
                          ? "text-[color:var(--wb-ink)]"
                          : "text-black/60 hover:text-[color:var(--wb-ink)]",
                        "hover:-translate-y-[1px]"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/explorehomes"
                className={cx(
                  "rounded-full px-3 py-1.5",
                  "text-[12px] font-extrabold tracking-[0.02em]",
                  "border border-[color:var(--wb-border)]",
                  "bg-white/45 backdrop-blur",
                  "text-black/60 hover:text-[color:var(--wb-ink)]",
                  "hover:bg-white/70 transition-all duration-200",
                  "hover:-translate-y-[1px]"
                )}
              >
                Explore
              </Link>

              <Link
                to="/contact"
                className={cx(
                  "rounded-full px-3 py-1.5",
                  "text-[12px] font-extrabold tracking-[0.02em]",
                  "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white",
                  "shadow-[0_12px_24px_rgba(27,79,214,0.18)]",
                  "hover:brightness-110 transition-all duration-200",
                  "hover:-translate-y-[1px]"
                )}
              >
                Get a Callback
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={cx(
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full",
                "border border-[color:var(--wb-border)] bg-white/55 backdrop-blur hover:bg-white/70",
                "transition"
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5">
                <span className="absolute left-0 top-0 h-0.5 w-full rounded bg-[color:var(--wb-ink)]/70" />
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-[color:var(--wb-ink)]/45" />
                <span className="absolute left-0 bottom-0 h-0.5 w-full rounded bg-[color:var(--wb-ink)]/70" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Drawer (ALWAYS ABOVE header) */}
      <div
        className={cx(
          "fixed inset-0 z-[999] lg:hidden",
          "transition-[opacity] duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cx(
            "absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={cx(
            "absolute right-0 top-0 h-full w-[86%] max-w-sm",
            "bg-white/85 backdrop-blur-xl",
            "border-l border-[color:var(--wb-border)]",
            "shadow-[0_30px_90px_rgba(11,18,32,0.18)]",
            "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
          aria-label="Mobile navigation drawer"
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[color:var(--wb-border)] bg-white shadow-[0_12px_24px_rgba(11,18,32,0.08)]">
                <span className="wb-serif text-[18px] leading-none text-[color:var(--wb-accent)]">
                  W
                </span>
              </span>
              <div className="leading-tight">
                <div className="wb-serif text-[18px] text-[color:var(--wb-ink)]">
                  WestBrook
                </div>
                <div className="text-[11px] font-extrabold tracking-[0.26em] text-black/45">
                  ESTATES
                </div>
              </div>
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--wb-border)] bg-white/70 hover:bg-white transition"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-[color:var(--wb-ink)]/70" />
                <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-[color:var(--wb-ink)]/70" />
              </span>
            </button>
          </div>

          <div className="px-5 pb-6 pt-5">
            <div className="rounded-[20px] border border-[color:var(--wb-border)] bg-[linear-gradient(135deg,rgba(27,79,214,0.10),rgba(11,42,111,0.05))] p-4 shadow-[0_16px_34px_rgba(11,18,32,0.08)]">
              <p className="wb-serif text-[20px] text-[color:var(--wb-ink)]">
                Let’s find the right place
              </p>
              <p className="mt-1 text-sm text-black/55">
                Verified listings • Calm guidance • Clear next steps
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  to="/explorehomes"
                  onClick={() => setOpen(false)}
                  className="wb-btn-ghost w-full"
                >
                  Explore
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="wb-btn-primary w-full"
                >
                  Get Callback
                </Link>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {navItems.map((item, idx) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cx(
                      "group flex items-center justify-between rounded-2xl px-4 py-3",
                      "border border-transparent transition-all duration-200",
                      isActive
                        ? "bg-white/80 border-[color:var(--wb-border)] shadow-[0_12px_28px_rgba(11,18,32,0.08)]"
                        : "hover:bg-white/70 hover:border-[color:var(--wb-border)]"
                    )
                  }
                  style={{
                    transitionDelay: open ? `${idx * 35}ms` : "0ms",
                    transform: open ? "translateY(0px)" : "translateY(6px)",
                    opacity: open ? 1 : 0,
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cx(
                          "text-[15px] font-extrabold tracking-[0.01em]",
                          isActive
                            ? "text-[color:var(--wb-ink)]"
                            : "text-black/70 group-hover:text-black"
                        )}
                      >
                        {item.label}
                      </span>
                      <span
                        className={cx(
                          "text-sm",
                          isActive
                            ? "text-[color:var(--wb-accent)]"
                            : "text-black/30 group-hover:text-black/45"
                        )}
                      >
                        →
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
