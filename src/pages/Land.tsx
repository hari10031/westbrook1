import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Icons
   ───────────────────────────────────────────────────────────── */
function IconClock() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function IconClockSmall() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    </svg>
  );
}

function IconLandPlot() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}

function IconZoning() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function IconStatus() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function IconCurrency() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-2.927 0" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg className="h-5 w-5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function IconLandSize() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

function IconNotes() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated Background Particles
   ───────────────────────────────────────────────────────────── */
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--wb-accent-2)]/10"
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${Math.random() * 10 + 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Intersection Observer Hook for Animations
   ───────────────────────────────────────────────────────────── */
function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = ref.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   Why Sell Card Component
   ───────────────────────────────────────────────────────────── */
type WhyCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

function WhyCard({ icon, title, description, delay }: WhyCardProps) {
  return (
    <div
      className="animate-on-scroll group relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[var(--wb-accent-2)]/30 hover:bg-white/60 hover:shadow-[0_25px_60px_rgba(27,79,214,0.15)]"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(30px)",
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--wb-accent-2)]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Animated border glow */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[var(--wb-accent-2)]/20 via-[var(--wb-accent)]/10 to-[var(--wb-accent-2)]/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] p-4 text-white shadow-lg shadow-[var(--wb-accent-2)]/25 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-[var(--wb-ink)]">{title}</h3>
        <p className="leading-relaxed text-[var(--wb-muted)]">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Looking For Card Component
   ───────────────────────────────────────────────────────────── */
type LookingCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

function LookingCard({ icon, title, description, delay }: LookingCardProps) {
  return (
    <div
      className="animate-on-scroll group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/30 bg-white/50 p-4 sm:p-6 backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_20px_50px_rgba(27,79,214,0.12)]"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
      }}
    >
      {/* Decorative corner accent */}
      <div className="absolute -right-4 -top-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-[var(--wb-accent-2)]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-3 sm:mb-4 text-[var(--wb-accent-2)] transition-transform duration-300 group-hover:scale-110 [&>svg]:h-8 [&>svg]:w-8 sm:[&>svg]:h-10 sm:[&>svg]:w-10">
          {icon}
        </div>
        <h4 className="mb-1 sm:mb-2 text-base sm:text-lg font-bold text-[var(--wb-ink)]">{title}</h4>
        <p className="text-xs sm:text-sm leading-relaxed text-[var(--wb-muted)]">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Process Step Component
   ───────────────────────────────────────────────────────────── */
type ProcessStepProps = {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
  delay: number;
  isLast?: boolean;
};

function ProcessStep({ icon, step, title, description, delay, isLast = false }: ProcessStepProps) {
  const isEven = step % 2 === 0;

  return (
    <div className="relative flex items-start md:items-center">
      {/* Desktop: Alternating layout */}
      <div className={`hidden w-full md:flex ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Content side */}
        <div className={`w-5/12 ${isEven ? 'text-left pl-8' : 'text-right pr-8'}`}>
          <div
            className="animate-on-scroll"
            style={{
              transitionDelay: `${delay}ms`,
              opacity: 0,
              transform: isEven ? "translateX(30px)" : "translateX(-30px)",
            }}
          >
            <div className={`inline-block rounded-full bg-[var(--wb-accent-2)]/10 px-3 py-1 text-xs font-bold text-[var(--wb-accent-2)] mb-3`}>
              Step {step}
            </div>
            <h3 className="mb-2 text-xl font-bold text-[var(--wb-ink)]">{title}</h3>
            <p className="text-sm leading-relaxed text-[var(--wb-muted)]">{description}</p>
          </div>
        </div>

        {/* Center timeline */}
        <div className="relative flex w-2/12 justify-center">
          {/* Vertical line */}
          {!isLast && (
            <div className="timeline-line absolute top-16 h-full w-0.5 bg-gradient-to-b from-[var(--wb-accent-2)]/40 to-[var(--wb-accent-2)]/10" />
          )}

          {/* Icon node */}
          <div
            className="animate-on-scroll relative z-10"
            style={{
              transitionDelay: `${delay + 100}ms`,
              opacity: 0,
              transform: "scale(0.5)",
            }}
          >
            <div className="group relative">
              {/* Pulse ring */}
              <div className="absolute inset-0 animate-ping rounded-2xl bg-[var(--wb-accent-2)]/20" style={{ animationDuration: '2s', animationIterationCount: '3' }} />

              {/* Icon container */}
              <div className="relative rounded-2xl border border-white/40 bg-white/80 p-4 shadow-[0_10px_40px_rgba(27,79,214,0.2)] backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:shadow-[0_20px_50px_rgba(27,79,214,0.3)]">
                <div className="text-[var(--wb-accent-2)]">
                  {icon}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty side for balance */}
        <div className="w-5/12" />
      </div>

      {/* Mobile: Vertical layout */}
      <div className="flex w-full md:hidden">
        {/* Timeline line */}
        <div className="relative mr-4 flex flex-col items-center">
          {/* Icon node */}
          <div
            className="animate-on-scroll relative z-10"
            style={{
              transitionDelay: `${delay}ms`,
              opacity: 0,
              transform: "scale(0.5)",
            }}
          >
            <div className="rounded-xl border border-white/40 bg-white/80 p-3 shadow-[0_10px_30px_rgba(27,79,214,0.15)] backdrop-blur-xl">
              <div className="text-[var(--wb-accent-2)]">
                {icon}
              </div>
            </div>
          </div>

          {/* Vertical line for mobile */}
          {!isLast && (
            <div className="timeline-line mt-2 h-full w-0.5 bg-gradient-to-b from-[var(--wb-accent-2)]/40 to-[var(--wb-accent-2)]/10" />
          )}
        </div>

        {/* Content */}
        <div
          className="animate-on-scroll flex-1 pb-8"
          style={{
            transitionDelay: `${delay + 50}ms`,
            opacity: 0,
            transform: "translateX(20px)",
          }}
        >
          <div className="inline-block rounded-full bg-[var(--wb-accent-2)]/10 px-3 py-1 text-xs font-bold text-[var(--wb-accent-2)] mb-2">
            Step {step}
          </div>
          <h3 className="mb-1 text-lg font-bold text-[var(--wb-ink)]">{title}</h3>
          <p className="text-sm leading-relaxed text-[var(--wb-muted)]">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Trust Card Component
   ───────────────────────────────────────────────────────────── */
type TrustCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

function TrustCard({ icon, title, description, delay }: TrustCardProps) {
  return (
    <div
      className="animate-on-scroll group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white/40 p-5 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_25px_60px_rgba(27,79,214,0.15)]"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(30px)",
      }}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-[var(--wb-accent-2)]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10">
        <div className="mb-4 sm:mb-6 inline-flex rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] p-3 sm:p-4 text-white shadow-lg shadow-[var(--wb-accent-2)]/25 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-[var(--wb-ink)]">{title}</h3>
        <p className="text-sm sm:text-base leading-relaxed text-[var(--wb-muted)]">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Success Story Data & Component
   ───────────────────────────────────────────────────────────── */
type SuccessStory = {
  name: string;
  location: string;
  acres: string;
  testimonial: string;
  avatar: string;
  closedIn: string;
};

const SUCCESS_STORIES_ROW1: SuccessStory[] = [
  {
    name: "Robert & Mary Johnson",
    location: "Collin County, TX",
    acres: "15.2 acres",
    testimonial: "Webhook made the entire process seamless. We had inherited land that we didn't know what to do with, and they gave us a fair offer within 48 hours.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    closedIn: "21 days"
  },
  {
    name: "Sarah Mitchell",
    location: "Denton County, TX",
    acres: "8.5 acres",
    testimonial: "After dealing with realtors for months with no luck, Webhook came in and closed in just 3 weeks. Their team was professional and transparent throughout.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    closedIn: "18 days"
  },
  {
    name: "James & Linda Davis",
    location: "Tarrant County, TX",
    acres: "22 acres",
    testimonial: "We had a complicated title situation and thought no one would want our property. Webhook worked through every challenge and still closed on time.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    closedIn: "30 days"
  },
  {
    name: "Michael Thompson",
    location: "Ellis County, TX",
    acres: "12 acres",
    testimonial: "Best decision I made was selling to Webhook. No games, no lowball offers — just honest people who kept their word from start to finish.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    closedIn: "14 days"
  },
  {
    name: "Patricia Rodriguez",
    location: "Kaufman County, TX",
    acres: "6.8 acres",
    testimonial: "They evaluated our land fairly and explained everything in detail. The joint venture option they offered was exactly what our family needed.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    closedIn: "25 days"
  },
];

const SUCCESS_STORIES_ROW2: SuccessStory[] = [
  {
    name: "William & Barbara Anderson",
    location: "Rockwall County, TX",
    acres: "18 acres",
    testimonial: "Our family had held onto this land for generations. Webhook understood the emotional aspect and treated us with respect while offering a great price.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    closedIn: "28 days"
  },
  {
    name: "Jennifer Chen",
    location: "Dallas County, TX",
    acres: "4.2 acres",
    testimonial: "I was skeptical at first, but Webhook exceeded all expectations. They even helped coordinate with my attorney to ensure everything was proper.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    closedIn: "16 days"
  },
  {
    name: "David & Susan Williams",
    location: "Johnson County, TX",
    acres: "25 acres",
    testimonial: "The cash offer allowed us to close quickly and move forward with our retirement plans. Couldn't have asked for a better experience.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    closedIn: "22 days"
  },
  {
    name: "Angela Martinez",
    location: "Hunt County, TX",
    acres: "10 acres",
    testimonial: "From the first phone call to closing day, Webhook was responsive and professional. They made selling our inherited land stress-free.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    closedIn: "19 days"
  },
  {
    name: "Richard Brown",
    location: "Parker County, TX",
    acres: "32 acres",
    testimonial: "I had zoning issues that scared off other buyers. Webhook saw the potential and made a fair offer despite the challenges. True professionals.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    closedIn: "35 days"
  },
];

function SuccessStoryCard({ story }: { story: SuccessStory }) {
  return (
    <div className="group mx-2 w-[320px] sm:w-[360px] flex-shrink-0 rounded-2xl border border-white/30 bg-white/50 p-4 sm:p-6 backdrop-blur-lg transition-all duration-300 hover:bg-white/70 hover:shadow-[0_20px_50px_rgba(27,79,214,0.12)]">
      <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
        <img
          src={story.avatar}
          alt={story.name}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover ring-2 ring-white/50"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-[var(--wb-ink)] truncate">{story.name}</h4>
          <p className="text-sm text-[var(--wb-muted)] truncate">{story.location}</p>
        </div>
      </div>

      <div className="mb-3 sm:mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <IconStar key={i} />
        ))}
      </div>

      <p className="mb-3 sm:mb-4 text-sm leading-relaxed text-[var(--wb-muted)] line-clamp-3">"{story.testimonial}"</p>

      <div className="flex items-center justify-between border-t border-[var(--wb-border)] pt-3 sm:pt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-[var(--wb-accent)]">{story.acres}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 sm:px-3 py-1 text-xs font-semibold text-green-700">
          <IconClockSmall />
          <span className="hidden xs:inline">Closed in </span><span>{story.closedIn}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Calendar Component
   ───────────────────────────────────────────────────────────── */
function CalendarPicker({ selectedDate, onSelectDate }: { selectedDate: Date | null; onSelectDate: (date: Date) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isPast = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    const isToday = date.toDateString() === today.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => !isPast && !isWeekend && onSelectDate(date)}
        disabled={isPast || isWeekend}
        className={`h-10 w-10 rounded-full text-sm font-medium transition-all duration-200 ${isSelected
          ? "bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] text-white shadow-lg"
          : isPast || isWeekend
            ? "cursor-not-allowed text-[var(--wb-muted)]/40"
            : isToday
              ? "border-2 border-[var(--wb-accent-2)] text-[var(--wb-accent)]"
              : "text-[var(--wb-ink)] hover:bg-[var(--wb-accent-2)]/10"
          }`}
      >
        {day}
      </button>
    );
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="rounded-2xl border border-white/30 bg-white/60 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="rounded-full p-2 text-[var(--wb-muted)] transition-colors hover:bg-[var(--wb-accent-2)]/10 hover:text-[var(--wb-accent)]"
        >
          <IconChevronLeft />
        </button>
        <h3 className="text-lg font-bold text-[var(--wb-ink)]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="rounded-full p-2 text-[var(--wb-muted)] transition-colors hover:bg-[var(--wb-accent-2)]/10 hover:text-[var(--wb-accent)]"
        >
          <IconChevronRight />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[var(--wb-muted)]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="h-8 leading-8">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Time Slot Picker Component
   ───────────────────────────────────────────────────────────── */
function TimeSlotPicker({ selectedTime, onSelectTime }: { selectedTime: string | null; onSelectTime: (time: string) => void }) {
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  return (
    <div className="rounded-2xl border border-white/30 bg-white/60 p-6 backdrop-blur-xl">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--wb-ink)]">
        <IconClockSmall />
        Select Time
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${selectedTime === time
              ? "bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] text-white shadow-lg"
              : "border border-[var(--wb-border)] bg-white/50 text-[var(--wb-ink)] hover:border-[var(--wb-accent-2)]/30 hover:bg-[var(--wb-accent-2)]/10"
              }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Land Page Component
   ───────────────────────────────────────────────────────────── */
export default function Land() {
  const sectionRef = useIntersectionObserver();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Global CSS for animations */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 30px) scale(1.05); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(27, 79, 214, 0.3); }
          50% { box-shadow: 0 0 80px rgba(27, 79, 214, 0.5); }
        }
        
        @keyframes timeline-grow {
          0% { height: 0; opacity: 0; }
          100% { height: 100%; opacity: 1; }
        }
        
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        
        .marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
        
        .animate-on-scroll {
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        .timeline-line {
          animation: timeline-grow 1s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--wb-accent) 0%, var(--wb-accent-2) 50%, var(--wb-accent) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-left, .marquee-right, .timeline-line {
            animation: none !important;
          }
          .animate-on-scroll {
            transition: none !important;
          }
        }
      `}</style>

      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[80vh] sm:min-h-[85vh] items-center justify-center px-4 py-16 sm:py-24">
        {/* Hero background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--wb-accent-2)]/20 via-[var(--wb-accent)]/10 to-transparent blur-3xl" />
          <div className="absolute right-0 top-0 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] rounded-full bg-[var(--wb-accent-2)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-[var(--wb-accent)]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="animate-on-scroll mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--wb-accent-2)]/20 bg-white/60 px-5 py-2.5 backdrop-blur-md" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wb-accent-2)] opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--wb-accent-2)]"></span>
            </span>
            <span className="text-sm font-semibold text-[var(--wb-accent)]">Now Actively Purchasing</span>
          </div>

          {/* Main heading */}
          <h1 className="animate-on-scroll wb-serif mb-6 sm:mb-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "200ms", transitionDuration: "800ms" }}>
            We're Actively Buying{" "}<br className="hidden sm:block" />
            <span className="gradient-text">Land in Texas</span>
          </h1>

          {/* Description */}
          <p className="animate-on-scroll mx-auto mb-8 sm:mb-10 max-w-2xl text-base leading-relaxed text-[var(--wb-muted)] sm:text-lg md:text-xl px-2" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "400ms", transitionDuration: "800ms" }}>
            Sell your land quickly, fairly, and without the hassle. We specialize in
            residential and mixed-use developments, and we're ready to make an offer today.
          </p>

          {/* CTA Button */}
          <div className="animate-on-scroll flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "600ms", transitionDuration: "800ms" }}>
            <Link
              to="/explore"
              className="group relative inline-flex items-center gap-2 sm:gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--wb-accent)] to-[var(--wb-accent-2)] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_20px_50px_rgba(27,79,214,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(27,79,214,0.45)]"
            >
              <span className="relative z-10">Explore All</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                <IconArrowRight />
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="animate-on-scroll mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[var(--wb-muted)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "800ms", transitionDuration: "600ms" }}>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-[var(--wb-accent-2)]" />
              <span>DFW Area</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-[var(--wb-accent-2)]" />
              <span>All Texas Regions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-[var(--wb-accent-2)]" />
              <span>Quick Closings</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY SELL TO WEBHOOK SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        {/* Section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--wb-accent)]/3 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}>
              Our Advantages
            </span>
            <h2 className="animate-on-scroll wb-serif text-4xl font-bold text-[var(--wb-ink)] sm:text-5xl" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}>
              Why Sell to <span className="gradient-text">Webhook</span>
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <WhyCard
              icon={<IconClock />}
              title="Quick Closings"
              description="We understand time is money. Our streamlined process lets us move from contract to close quickly."

              delay={100}
            />
            <WhyCard
              icon={<IconShield />}
              title="Fair & Transparent Offers"
              description="No hidden fees. We base our offers on real market analysis and development potential."
              delay={200}
            />
            <WhyCard
              icon={<IconHandshake />}
              title="Flexible Deal Structures"
              description="Cash purchase, assumption of existing loans, or joint venture tailored to your needs."
              delay={300}
            />
            <WhyCard
              icon={<IconMap />}
              title="Local Expertise"
              description="With years of experience in DFW & surrounding regions, we know land values and zoning inside out."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHAT WE'RE LOOKING FOR SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-y-1/2 rounded-full bg-[var(--wb-accent-2)]/5 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[var(--wb-accent)]/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Glassmorphism container */}
          <div className="animate-on-scroll overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/30 bg-white/40 p-5 sm:p-8 backdrop-blur-xl md:p-12 lg:p-16" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "100ms", transitionDuration: "800ms" }}>
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-white/50 via-transparent to-[var(--wb-accent-2)]/5" />

            <div className="relative z-10">
              {/* Section header */}
              <div className="mb-8 sm:mb-12 text-center">
                <h2 className="wb-serif mb-4 sm:mb-6 text-3xl font-bold text-[var(--wb-ink)] sm:text-4xl md:text-5xl">
                  What We're <span className="gradient-text">Looking For</span>
                </h2>
                <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--wb-muted)]">
                  Zoning or frontage challenges don't scare us — we evaluate all land and find creative solutions.
                </p>
              </div>

              {/* Cards grid */}
              <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
                <LookingCard
                  icon={<IconLandPlot />}
                  title="Land Size"
                  description="Vacant land with development potential"
                  delay={200}
                />
                <LookingCard
                  icon={<IconZoning />}
                  title="Zoning"
                  description="Single-family home building lots"
                  delay={300}
                />
                <LookingCard
                  icon={<IconLocation />}
                  title="Location"
                  description="Multi-acre properties for development"
                  delay={400}
                />
                <LookingCard
                  icon={<IconStatus />}
                  title="Status"
                  description="Properties passed down through generations"
                  delay={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR SIMPLE PROCESS SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--wb-accent)]/3 to-transparent" />

        {/* Decorative background elements */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--wb-accent-2)]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}>
              How It Works
            </span>
            <h2 className="animate-on-scroll wb-serif text-4xl font-bold text-[var(--wb-ink)] sm:text-5xl" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}>
              Our Simple <span className="gradient-text">Process</span>
            </h2>
            <p className="animate-on-scroll mx-auto mt-4 max-w-xl text-[var(--wb-muted)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "300ms", transitionDuration: "600ms" }}>
              From initial contact to closing, we make selling your land simple and stress-free.
            </p>
          </div>

          {/* Vertical Timeline Process Steps */}
          <div className="relative space-y-8 md:space-y-0">
            <ProcessStep
              icon={<IconDocument />}
              step={1}
              title="Submit Your Land"
              description="Send us details using our quick form. Include property info, acreage, and any relevant details."
              delay={200}
            />
            <ProcessStep
              icon={<IconSearch />}
              step={2}
              title="Fast Review"
              description="We evaluate zoning, market demand, and development feasibility within 24-48 hours."
              delay={400}
            />
            <ProcessStep
              icon={<IconCurrency />}
              step={3}
              title="Offer Made"
              description="We provide you with a no-obligation cash or structured offer tailored to your needs."
              delay={600}
            />
            <ProcessStep
              icon={<IconCheckCircle />}
              step={4}
              title="Close Quickly"
              description="Upon acceptance, we close through a trusted title company — often in as little as 2 weeks."
              delay={800}
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY LANDOWNERS TRUST US SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] rounded-full bg-[var(--wb-accent-2)]/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] rounded-full bg-[var(--wb-accent)]/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}>
              Why Choose Us
            </span>
            <h2 className="animate-on-scroll wb-serif text-4xl font-bold text-[var(--wb-ink)] sm:text-5xl" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}>
              Why Landowners <span className="gradient-text">Trust Us</span>
            </h2>
          </div>

          {/* Trust cards */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <TrustCard
              icon={<IconTrophy />}
              title="Proven Track Record"
              description="Successfully acquired and developed millions in land and housing projects across DFW."
              delay={100}
            />
            <TrustCard
              icon={<IconHeart />}
              title="Family-Owned Company"
              description="We care about relationships, not just transactions."
              delay={200}
            />
            <TrustCard
              icon={<IconBuilding />}
              title="Community Builders"
              description="We don't just buy land — we create thriving neighborhoods."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SUCCESS STORIES SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--wb-accent)]/3 via-transparent to-[var(--wb-accent)]/3" />

        <div className="relative z-10">
          {/* Section header */}
          <div className="mb-10 sm:mb-16 px-4 text-center">
            <span className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}>
              Testimonials
            </span>
            <h2 className="animate-on-scroll wb-serif text-3xl font-bold text-[var(--wb-ink)] sm:text-4xl md:text-5xl" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}>
              Success <span className="gradient-text">Stories</span>
            </h2>
          </div>

          {/* Marquee Row 1 - Left to Right */}
          <div className="marquee-container mb-6 overflow-hidden">
            <div className="marquee-left flex w-max">
              {[...SUCCESS_STORIES_ROW1, ...SUCCESS_STORIES_ROW1].map((story, i) => (
                <SuccessStoryCard key={`row1-${i}`} story={story} />
              ))}
            </div>
          </div>

          {/* Marquee Row 2 - Right to Left */}
          <div className="marquee-container overflow-hidden">
            <div className="marquee-right flex w-max">
              {[...SUCCESS_STORIES_ROW2, ...SUCCESS_STORIES_ROW2].map((story, i) => (
                <SuccessStoryCard key={`row2-${i}`} story={story} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LET'S TALK - CONSULTATION BOOKING SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] sm:h-[800px] sm:w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--wb-accent-2)]/10 via-[var(--wb-accent)]/5 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-8 sm:mb-12 text-center">
            <span className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}>
              Joint Venture Opportunities
            </span>
            <h2 className="animate-on-scroll wb-serif text-3xl sm:text-4xl font-bold text-[var(--wb-ink)] md:text-5xl" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}>
              LET'S <span className="gradient-text">TALK</span>
            </h2>
            <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--wb-muted)] px-4" style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "300ms", transitionDuration: "600ms" }}>
              If you own land and want to explore a Joint Venture, we'd love to hear from you.
            </p>
          </div>

          {/* Booking container */}
          <div className="animate-on-scroll overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/30 bg-white/40 p-4 sm:p-8 backdrop-blur-xl md:p-12" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "400ms", transitionDuration: "800ms" }}>
            <div className="mb-6 sm:mb-8 text-center">
              <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-[var(--wb-accent-2)]/10 px-3 sm:px-4 py-2">
                <IconCalendar />
                <span className="font-semibold text-[var(--wb-accent)] text-sm sm:text-base">Schedule 15-Minute Consultation</span>
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {/* Calendar */}
              <CalendarPicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />

              {/* Time slots */}
              <TimeSlotPicker selectedTime={selectedTime} onSelectTime={setSelectedTime} />
            </div>

            {/* Selected info & confirm button */}
            {selectedDate && selectedTime && (
              <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4 rounded-xl sm:rounded-2xl border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 p-4 sm:p-6 text-center">
                <p className="text-sm sm:text-base text-[var(--wb-ink)]">
                  <span className="font-semibold">Your selected time:</span>{" "}
                  <span className="block sm:inline mt-1 sm:mt-0">{selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at {selectedTime}</span>
                </p>
                <button className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-[var(--wb-accent)] to-[var(--wb-accent-2)] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_20px_50px_rgba(27,79,214,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(27,79,214,0.45)]">
                  <span>Confirm Consultation</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrowRight />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM CTA WITH FORM SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px] rounded-full bg-[var(--wb-accent-2)]/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] rounded-full bg-[var(--wb-accent)]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Left side - CTA */}
            <div className="animate-on-scroll flex flex-col justify-center" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "100ms", transitionDuration: "800ms" }}>
              <span className="mb-4 inline-block w-fit rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]">
                Get Started Today
              </span>
              <h2 className="wb-serif mb-4 sm:mb-6 text-3xl font-bold text-[var(--wb-ink)] sm:text-4xl md:text-5xl">
                Ready to Sell<br />Your <span className="gradient-text">Land?</span>
              </h2>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-[var(--wb-muted)]">
                Submit your land details today and get a no-obligation offer. Our team will review your property and respond within 24-48 hours.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--wb-accent-2)]/10">
                    <IconCheckCircle />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-[var(--wb-ink)]">No Obligation</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--wb-accent-2)]/10">
                    <IconClockSmall />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-[var(--wb-ink)]">Quick Response</span>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="animate-on-scroll overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/50 p-5 sm:p-6 md:p-8 backdrop-blur-xl" style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "200ms", transitionDuration: "800ms" }}>
              <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-[var(--wb-ink)]">Submit Your Land Details</h3>

              <form className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                    <IconUser />
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                    <IconMail />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                  />
                </div>

                {/* Phone & Acreage */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                      <IconPhone />
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                      <IconLandSize />
                      Acreage
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5.2 acres"
                      className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                    />
                  </div>
                </div>

                {/* Property Address */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                    <IconMapPin />
                    Property Address / County / Parcel ID
                  </label>
                  <input
                    type="text"
                    placeholder="123 Country Rd, City, State or Parcel #12345"
                    className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                    <IconNotes />
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about zoning, access, utilities, or any other relevant details..."
                    className="w-full resize-none rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-[var(--wb-accent)] to-[var(--wb-accent-2)] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_20px_50px_rgba(27,79,214,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(27,79,214,0.45)]"
                >
                  <span>Get My Offer</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrowRight />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
