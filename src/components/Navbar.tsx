// src/components/Navbar.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

type NavItem = { label: string; to: string; isSection?: boolean };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/#commercial", isSection: true },
  { label: "Our Process", to: "/#process", isSection: true },
  { label: "Explore Homes", to: "/explore-homes" },
  { label: "About", to: "/about" },
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

<<<<<<< HEAD
function useHeroVisible() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  useEffect(() => {
    const checkHeroVisibility = () => {
      // Hero section is approximately viewport height, make navbar solid after scrolling 100px
      // This ensures navbar becomes solid quickly after user starts scrolling
      const heroThreshold = window.innerHeight - 100;
      setIsHeroVisible(window.scrollY < heroThreshold);
    };
    checkHeroVisibility();
    window.addEventListener("scroll", checkHeroVisibility, { passive: true });
    return () => window.removeEventListener("scroll", checkHeroVisibility);
  }, []);
  return isHeroVisible;
=======
/**
 * Transparent only while Hero is meaningfully visible (HOME route only)
 * ESLint safe
 */
function useHeroInView() {
  const location = useLocation();
  const [onHero, setOnHero] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let obs: IntersectionObserver | null = null;

    const update = (value: boolean) => {
      if (cancelled) return;
      setOnHero(value);
    };

    const setup = () => {
      const isHome = location.pathname === "/";
      if (!isHome) {
        queueMicrotask(() => update(false));
        return;
      }

      const hero = document.getElementById("hero");
      if (!hero) {
        queueMicrotask(() => update(false));
        return;
      }

      obs = new IntersectionObserver(([entry]) => update(!!entry?.isIntersecting), {
        threshold: 0.12,
        rootMargin: "0px 0px -55% 0px",
      });

      obs.observe(hero);
    };

    const t = window.setTimeout(setup, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      if (obs) obs.disconnect();
    };
  }, [location.pathname]);

  return onHero;
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
}

export default function Navbar() {
  const scrolled = useScrolled(10);
<<<<<<< HEAD
  const isHeroVisible = useHeroVisible();
=======
  const onHero = useHeroInView();

>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = useMemo(() => NAV, []);

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToHomeAndScroll = useCallback(
    (sectionId: string) => {
      if (location.pathname === "/") {
        scrollToSection(sectionId);
        return;
      }
      navigate("/");
      window.setTimeout(() => scrollToSection(sectionId), 120);
    },
    [location.pathname, navigate, scrollToSection]
  );

  const handleNavClick = useCallback(
    (item: NavItem, e: React.MouseEvent) => {
      if (item.isSection) {
        e.preventDefault();
        const sectionId = item.to.replace("/#", "");
        setActiveSection(item.to);
        goToHomeAndScroll(sectionId);
        setOpen(false);
        return;
      }
      setActiveSection(null);
      setOpen(false);
    },
    [goToHomeAndScroll]
  );

  const moveIndicator = useCallback(
    (target?: HTMLElement | null) => {
      const root = navRef.current;
      const pill = pillRef.current;
      if (!root || !pill) return;

      let element: HTMLElement | null = target ?? null;

      if (!element && activeSection) {
        element = root.querySelector<HTMLAnchorElement>(`a[data-nav-to="${activeSection}"]`);
      }
      if (!element) element = root.querySelector<HTMLAnchorElement>('a[aria-current="page"]');

      if (!element) {
        pill.style.opacity = "0";
        return;
      }

      const r = root.getBoundingClientRect();
      const a = element.getBoundingClientRect();
      const left = a.left - r.left - 4;
      const width = a.width;

      pill.style.opacity = "1";
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${width}px`;
    },
    [activeSection]
  );

  // close drawer + clear activeSection on route change (async)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setOpen(false);
      if (location.pathname !== "/") setActiveSection(null);
    });
    return () => cancelAnimationFrame(raf);
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

  // move active pill on route change + resize + section change
  useEffect(() => {
    moveIndicator();
    const onResize = () => moveIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [location.pathname, activeSection, moveIndicator]);

<<<<<<< HEAD
  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && isHeroVisible;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div className={cx(
        "h-px w-full transition-opacity duration-300",
        isTransparent ? "opacity-0" : "bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.22),transparent)]"
      )} />

      <div
        className={cx(
          "transition-all duration-300",
          isTransparent
            ? "bg-transparent border-b border-transparent shadow-none"
            : scrolled
              ? "bg-white/70 backdrop-blur-xl border-b border-[color:var(--wb-border)] shadow-[0_14px_38px_rgba(11,18,32,0.10)]"
              : "bg-white/35 backdrop-blur-xl border-b border-transparent shadow-[0_10px_28px_rgba(11,18,32,0.06)]"
=======
  /**
   * Hero mode: transparent only on Home while hero is visible and not scrolled much
   */
  const heroMode = location.pathname === "/" && onHero && !scrolled;

  return (
    <header className="sticky top-0 z-40">
      {/* ✅ Slim premium height */}
      <style>{`
        :root { --wb-nav-h: 58px; }
        @media (min-width: 640px) { :root { --wb-nav-h: 62px; } }
        @media (min-width: 1024px) { :root { --wb-nav-h: 64px; } }

        /* optional: if you use this class, lock scroll for mobile menu */
        .wb-lock { overflow: hidden; }
      `}</style>

      <div
        className={cx(
          "relative transition-all duration-300",
          "supports-[backdrop-filter]:backdrop-blur-xl"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
        )}
        style={{ height: "var(--wb-nav-h)" }}
      >
        {/* Background layer */}
        <div
          className={cx(
            "absolute inset-0 transition-all duration-300",
            heroMode ? "bg-transparent" : scrolled ? "bg-white/72" : "bg-white/42"
          )}
        />

        {/* Subtle top shine + border (not on hero) */}
        <div
          className={cx(
            "pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300",
            heroMode
              ? "opacity-0"
              : "opacity-100 bg-[linear-gradient(to_right,transparent,rgba(17,24,39,0.10),transparent)]"
          )}
        />
        <div
          className={cx(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
            heroMode
              ? "opacity-0"
              : "opacity-100 bg-[linear-gradient(to_right,transparent,rgba(27,79,214,0.18),transparent)]"
          )}
        />

        {/* Soft shadow only when NOT hero */}
        <div
          className={cx(
            "pointer-events-none absolute inset-0 transition-opacity duration-300",
            heroMode ? "opacity-0" : scrolled ? "opacity-100" : "opacity-60"
          )}
          style={{
            boxShadow: heroMode
              ? "none"
              : scrolled
              ? "0 14px 36px rgba(11,18,32,0.10)"
              : "0 10px 24px rgba(11,18,32,0.07)",
          }}
        />

        {/* Content */}
        <div className="relative wb-container h-full">
          <div className="flex h-full items-center justify-between gap-3">
            {/* Brand (slim) */}
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span
                className={cx(
<<<<<<< HEAD
                  "grid h-10 w-10 place-items-center rounded-2xl border overflow-hidden",
                  "transition-all duration-300 group-hover:scale-[1.02]",
                  isTransparent
                    ? "border-white/20 bg-transparent shadow-none"
                    : "border-[color:var(--wb-border)] bg-white/70 backdrop-blur shadow-[0_14px_30px_rgba(11,18,32,0.08)]"
=======
                  "grid place-items-center overflow-hidden border",
                  "h-9 w-9 rounded-xl",
                  heroMode
                    ? "border-white/18 bg-white/8 backdrop-blur shadow-[0_18px_44px_rgba(0,0,0,0.26)]"
                    : "border-[color:var(--wb-border)] bg-white/70 backdrop-blur shadow-[0_12px_24px_rgba(11,18,32,0.10)]",
                  "transition-transform duration-300 group-hover:scale-[1.02]"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                )}
              >
                <img src="/img/logo.jfif" alt="WestBrook Logo" className="h-full w-full object-cover" />
              </span>

              <span className="leading-tight">
<<<<<<< HEAD
                <span className={cx(
                  "wb-serif block text-[19px] tracking-tight transition-colors duration-300",
                  isTransparent ? "text-white" : "text-[color:var(--wb-ink)]"
                )}>
                  WestBrook
                </span>
                <span className={cx(
                  "block text-[11px] font-extrabold tracking-[0.26em] transition-colors duration-300",
                  isTransparent ? "text-white/70" : "text-black/45"
                )}>
=======
                <span
                  className={cx(
                    "wb-serif block text-[18px] tracking-tight",
                    heroMode
                      ? "text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.22)]"
                      : "text-[color:var(--wb-ink)]"
                  )}
                >
                  WestBrook
                </span>
                <span
                  className={cx(
                    "block text-[10px] font-extrabold tracking-[0.30em]",
                    heroMode ? "text-white/70" : "text-black/45"
                  )}
                >
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                  HOMES
                </span>
              </span>
            </Link>

            {/* Desktop Center Nav */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div
                ref={navRef}
                className={cx(
<<<<<<< HEAD
                  "relative flex items-center gap-1",
                  "rounded-full border transition-all duration-300",
                  "px-1 py-1",
                  isTransparent
                    ? "border-transparent bg-transparent shadow-none"
                    : "border-[color:var(--wb-border)] bg-white/55 backdrop-blur-xl shadow-[0_14px_32px_rgba(11,18,32,0.08)]"
=======
                  "relative flex items-center gap-1 rounded-full border px-1 py-[3px]",
                  heroMode
                    ? "border-white/16 bg-white/10 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.26)]"
                    : "border-[color:var(--wb-border)] bg-white/60 backdrop-blur-xl shadow-[0_14px_32px_rgba(11,18,32,0.10)]"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                )}
              >
                {/* moving indicator */}
                <span
                  ref={pillRef}
                  aria-hidden="true"
                  className={cx(
<<<<<<< HEAD
                    "absolute top-1 bottom-1 left-1 rounded-full",
                    "transition-all duration-300 ease-[cubic-bezier(.25,.8,.25,1)]",
                    isTransparent
                      ? "bg-white/20 border border-white/30 shadow-none"
                      : "bg-[color:var(--wb-accent)]/12 border border-[color:var(--wb-accent)]/25 shadow-[0_4px_12px_rgba(27,79,214,0.15)]"
=======
                    "absolute top-[3px] bottom-[3px] left-1 rounded-full",
                    heroMode
                      ? "bg-white/14 border border-white/18 shadow-[0_10px_22px_rgba(0,0,0,0.20)]"
                      : "bg-[color:var(--wb-accent)]/12 border border-[color:var(--wb-accent)]/25 shadow-[0_6px_14px_rgba(27,79,214,0.14)]",
                    "transition-all duration-300 ease-[cubic-bezier(.25,.8,.25,1)]"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                  )}
                  style={{ width: 0, opacity: 0 }}
                />

                {navItems.map((item) => {
                  const isSectionActive = item.isSection && activeSection === item.to;
                  const isHomeActive =
                    item.to === "/" &&
                    !item.isSection &&
                    location.pathname === "/" &&
                    !activeSection;
                  const isPageActive = !item.isSection && item.to !== "/" && location.pathname === item.to;
                  const isCurrentlyActive = isSectionActive || isHomeActive || isPageActive;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.isSection ? "/" : item.to}
                      data-nav-to={item.to}
                      onClick={(e) => handleNavClick(item, e)}
                      onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                      onMouseLeave={() => moveIndicator()}
                      className={() =>
                        cx(
                          "relative z-10 rounded-full px-3 py-[7px]",
                          "text-[13px] font-extrabold tracking-[0.02em]",
<<<<<<< HEAD
                          "transition-all duration-200",
                          isTransparent
                            ? isCurrentlyActive
                              ? "text-white"
                              : "text-white/70 hover:text-white"
                            : isCurrentlyActive
                              ? "text-[color:var(--wb-ink)]"
                              : "text-black/60 hover:text-[color:var(--wb-ink)]",
                          "hover:-translate-y-[1px]"
=======
                          "transition-all duration-200 hover:-translate-y-[1px]",
                          heroMode
                            ? isCurrentlyActive
                              ? "text-white"
                              : "text-white/78 hover:text-white"
                            : isCurrentlyActive
                            ? "text-[color:var(--wb-ink)]"
                            : "text-black/60 hover:text-[color:var(--wb-ink)]"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                        )
                      }
                      aria-current={isCurrentlyActive ? "page" : undefined}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/explore-homes"
                className={cx(
<<<<<<< HEAD
                  "rounded-full px-3 py-1.5",
                  "text-[12px] font-extrabold tracking-[0.02em]",
                  "border transition-all duration-300",
                  isTransparent
                    ? "border-transparent bg-transparent text-white/80 hover:text-white"
                    : "border-[color:var(--wb-border)] bg-white/45 backdrop-blur text-black/60 hover:text-[color:var(--wb-ink)] hover:bg-white/70",
                  "hover:-translate-y-[1px]"
=======
                  "rounded-full px-3 py-[7px] text-[12px] font-extrabold tracking-[0.02em] border backdrop-blur transition-all duration-200 hover:-translate-y-[1px]",
                  heroMode
                    ? "border-white/16 bg-white/10 text-white/80 hover:text-white hover:bg-white/14"
                    : "border-[color:var(--wb-border)] bg-white/55 text-black/60 hover:text-[color:var(--wb-ink)] hover:bg-white/75"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                )}
              >
                Explore
              </Link>

              <button
                type="button"
                onClick={() => goToHomeAndScroll("contact")}
                className={cx(
                  "rounded-full px-4 py-[7px] text-[12px] font-extrabold tracking-[0.02em] transition-all duration-200 hover:-translate-y-[1px]",
                  heroMode
                    ? "border border-white/16 bg-white/12 text-white hover:bg-white/16 shadow-[0_16px_38px_rgba(0,0,0,0.24)]"
                    : "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white shadow-[0_12px_22px_rgba(27,79,214,0.18)] hover:brightness-110"
                )}
              >
                Get a Callback
              </button>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToHomeAndScroll("contact")}
                className={cx(
                  "rounded-full px-3 py-[7px] text-[11px] font-extrabold tracking-[0.02em] transition-all duration-200",
                  heroMode
                    ? "border border-white/16 bg-white/12 text-white shadow-[0_14px_34px_rgba(0,0,0,0.24)] hover:bg-white/16"
                    : "bg-[linear-gradient(135deg,var(--wb-accent),var(--wb-accent-2))] text-white shadow-[0_10px_18px_rgba(27,79,214,0.18)] hover:brightness-110"
                )}
              >
                Contact
              </button>

              <button
                type="button"
                className={cx(
<<<<<<< HEAD
                  "inline-flex h-10 w-10 items-center justify-center rounded-full",
                  "transition-all duration-300",
                  isTransparent
                    ? "border border-transparent bg-transparent"
                    : "border border-[color:var(--wb-border)] bg-white/55 backdrop-blur hover:bg-white/70"
=======
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition",
                  heroMode ? "border-white/16 bg-white/10 hover:bg-white/14" : "border-[color:var(--wb-border)] bg-white/60 hover:bg-white/75"
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                )}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-4 w-5">
<<<<<<< HEAD
                  <span className={cx(
                    "absolute left-0 top-0 h-0.5 w-full rounded transition-colors duration-300",
                    isTransparent ? "bg-white" : "bg-[color:var(--wb-ink)]/70"
                  )} />
                  <span className={cx(
                    "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded transition-colors duration-300",
                    isTransparent ? "bg-white/80" : "bg-[color:var(--wb-ink)]/45"
                  )} />
                  <span className={cx(
                    "absolute left-0 bottom-0 h-0.5 w-full rounded transition-colors duration-300",
                    isTransparent ? "bg-white" : "bg-[color:var(--wb-ink)]/70"
                  )} />
=======
                  <span className={cx("absolute left-0 top-0 h-0.5 w-full rounded", heroMode ? "bg-white/90" : "bg-[color:var(--wb-ink)]/70")} />
                  <span className={cx("absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded", heroMode ? "bg-white/60" : "bg-[color:var(--wb-ink)]/45")} />
                  <span className={cx("absolute left-0 bottom-0 h-0.5 w-full rounded", heroMode ? "bg-white/90" : "bg-[color:var(--wb-ink)]/70")} />
>>>>>>> 004a4e0deeeb5e3e79322b17380a576fc22296fc
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cx(
          "fixed inset-0 z-[999] lg:hidden transition-[opacity] duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cx(
            "absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300",
            heroMode ? "bg-black/35" : "bg-black/20",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={cx(
            "absolute right-0 top-0 h-full w-[86%] max-w-sm",
            "bg-white/88 backdrop-blur-xl",
            "border-l border-[color:var(--wb-border)]",
            "shadow-[0_30px_90px_rgba(11,18,32,0.18)]",
            "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
          aria-label="Mobile navigation drawer"
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <Link to="/" className="inline-flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-[color:var(--wb-border)] bg-white shadow-[0_12px_22px_rgba(11,18,32,0.08)]">
                <span className="wb-serif text-[18px] leading-none text-[color:var(--wb-accent)]">W</span>
              </span>
              <div className="leading-tight">
                <div className="wb-serif text-[18px] text-[color:var(--wb-ink)]">WestBrook</div>
                <div className="text-[10px] font-extrabold tracking-[0.26em] text-black/45">HOMES</div>
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
            <div className="rounded-[22px] border border-[color:var(--wb-border)] bg-[linear-gradient(135deg,rgba(27,79,214,0.10),rgba(11,42,111,0.05))] p-4 shadow-[0_16px_34px_rgba(11,18,32,0.08)]">
              <p className="wb-serif text-[20px] text-[color:var(--wb-ink)]">Build with clarity</p>
              <p className="mt-1 text-sm text-black/55">Bespoke design • Transparent cost • Calm execution</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link to="/explore-homes" onClick={() => setOpen(false)} className="wb-btn-ghost w-full">
                  Explore
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    goToHomeAndScroll("contact");
                  }}
                  className="wb-btn-primary w-full"
                >
                  Get Callback
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {navItems.map((item, idx) => {
                const isSectionActive = item.isSection && activeSection === item.to;
                const isHomeActive =
                  item.to === "/" && !item.isSection && location.pathname === "/" && !activeSection;
                const isPageActive =
                  !item.isSection && item.to !== "/" && location.pathname === item.to;
                const isCurrentlyActive = isSectionActive || isHomeActive || isPageActive;

                return (
                  <NavLink
                    key={item.to}
                    to={item.isSection ? "/" : item.to}
                    onClick={(e) => handleNavClick(item, e)}
                    className={() =>
                      cx(
                        "group flex items-center justify-between rounded-2xl px-4 py-3",
                        "border border-transparent transition-all duration-200",
                        isCurrentlyActive
                          ? "bg-white/85 border-[color:var(--wb-border)] shadow-[0_12px_28px_rgba(11,18,32,0.08)]"
                          : "hover:bg-white/75 hover:border-[color:var(--wb-border)]"
                      )
                    }
                    style={{
                      transitionDelay: open ? `${idx * 35}ms` : "0ms",
                      transform: open ? "translateY(0px)" : "translateY(6px)",
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <span
                      className={cx(
                        "text-[15px] font-extrabold tracking-[0.01em]",
                        isCurrentlyActive ? "text-[color:var(--wb-ink)]" : "text-black/70 group-hover:text-black"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className={cx("text-sm", isCurrentlyActive ? "text-[color:var(--wb-accent)]" : "text-black/30 group-hover:text-black/45")}>
                      →
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
