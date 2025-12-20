import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   Icons
   ───────────────────────────────────────────────────────────── */
function IconArrowRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconInnovation() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function IconQuality() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

function IconVision() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function IconImpact() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg className="h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated Background Particles
   ───────────────────────────────────────────────────────────── */
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--wb-accent-2)]/10"
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
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
   Value Card Component
   ───────────────────────────────────────────────────────────── */
type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

function ValueCard({ icon, title, description, delay }: ValueCardProps) {
  return (
    <div
      className="animate-on-scroll group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white/40 p-5 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_25px_60px_rgba(27,79,214,0.15)]"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(30px)",
      }}
    >
      {/* Decorative glow */}
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
   Main About Page Component
   ───────────────────────────────────────────────────────────── */
export default function About() {
  const containerRef = useIntersectionObserver();

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[var(--wb-bg)]">
      {/* Global Styles */}
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
        
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(27, 79, 214, 0.3); }
          50% { box-shadow: 0 0 80px rgba(27, 79, 214, 0.5); }
        }
        
        .animate-on-scroll {
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--wb-accent) 0%, var(--wb-accent-2) 50%, var(--wb-accent) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        
        .text-reveal {
          animation: text-reveal 1s ease-out forwards;
        }
        
        .fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            transition: none !important;
          }
          .text-reveal, .fade-in-up, .scale-in {
            animation: none !important;
          }
        }
      `}</style>

      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[70vh] sm:min-h-[80vh] items-center justify-center px-4 py-16 sm:py-24">
        {/* Hero background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] md:h-[700px] md:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--wb-accent-2)]/15 via-[var(--wb-accent)]/10 to-transparent blur-3xl" />
          <div className="absolute right-0 top-0 h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] rounded-full bg-[var(--wb-accent-2)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[180px] w-[180px] sm:h-[300px] sm:w-[300px] rounded-full bg-[var(--wb-accent)]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div
            className="animate-on-scroll mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--wb-accent-2)]/20 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-md"
            style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}
          >
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wb-accent-2)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[var(--wb-accent-2)]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[var(--wb-accent)]">Who We Are</span>
          </div>

          {/* Main heading */}
          <h1
            className="animate-on-scroll wb-serif mb-6 sm:mb-8 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "200ms", transitionDuration: "800ms" }}
          >
            About <span className="gradient-text">Webhook</span>
          </h1>

          {/* Main description */}
          <p
            className="animate-on-scroll mx-auto mb-8 sm:mb-12 max-w-3xl text-base leading-relaxed text-[var(--wb-muted)] sm:text-lg md:text-xl px-2"
            style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "400ms", transitionDuration: "800ms" }}
          >
            We are driven by a belief in innovation and a commitment to pushing the boundaries of what is possible. Every decision and action we take is guided by a focus on quality, reliability, consistency, and a grand vision.
          </p>

          {/* Extended description in glassmorphism card */}
          <div
            className="animate-on-scroll mx-auto max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/50 p-6 sm:p-8 md:p-10 backdrop-blur-xl"
            style={{ opacity: 0, transform: "translateY(30px) scale(0.95)", transitionDelay: "600ms", transitionDuration: "800ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[var(--wb-accent-2)]/5 rounded-2xl sm:rounded-3xl" />
            <p className="relative z-10 text-base sm:text-lg md:text-xl leading-relaxed text-[var(--wb-ink)]">
              We have been fortunate to have access to great opportunities, talented people, and powerful tools, and it is our responsibility to use these resources to make a <span className="font-semibold text-[var(--wb-accent)]">positive impact</span> on the world.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VALUES SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--wb-accent)]/3 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-10 sm:mb-16 text-center">
            <span
              className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}
            >
              Our Values
            </span>
            <h2
              className="animate-on-scroll wb-serif text-3xl font-bold text-[var(--wb-ink)] sm:text-4xl md:text-5xl"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}
            >
              What Drives <span className="gradient-text">Us</span>
            </h2>
          </div>

          {/* Values cards */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={<IconInnovation />}
              title="Innovation"
              description="Pushing the boundaries of what's possible in real estate and development."
              delay={100}
            />
            <ValueCard
              icon={<IconQuality />}
              title="Quality"
              description="Every project meets our rigorous standards for excellence."
              delay={200}
            />
            <ValueCard
              icon={<IconVision />}
              title="Vision"
              description="A grand vision that guides every decision we make."
              delay={300}
            />
            <ValueCard
              icon={<IconImpact />}
              title="Impact"
              description="Using our resources to create positive change in communities."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DREAM HOME CTA SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24 md:py-32">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--wb-accent)]/10 via-[var(--wb-accent-2)]/15 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Main CTA Card */}
          <div
            className="animate-on-scroll overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/30 bg-white/60 p-8 sm:p-12 md:p-16 backdrop-blur-xl text-center"
            style={{ opacity: 0, transform: "translateY(40px) scale(0.95)", transitionDelay: "100ms", transitionDuration: "800ms" }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-white/50 via-transparent to-[var(--wb-accent-2)]/10" />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="animate-on-scroll mx-auto mb-6 sm:mb-8 inline-flex items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] p-4 sm:p-6 text-white shadow-xl shadow-[var(--wb-accent-2)]/30"
                style={{ opacity: 0, transform: "scale(0.5)", transitionDelay: "300ms", transitionDuration: "600ms" }}
              >
                <IconHome />
              </div>

              {/* Heading */}
              <h2
                className="animate-on-scroll wb-serif mb-4 sm:mb-6 text-2xl font-bold text-[var(--wb-ink)] sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "400ms", transitionDuration: "600ms" }}
              >
                NEED HELP FINDING YOUR{" "}<br className="hidden sm:block" />
                <span className="gradient-text">DREAM HOME?</span>
              </h2>

              {/* Subtext */}
              <p
                className="animate-on-scroll mx-auto mb-8 sm:mb-10 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--wb-muted)]"
                style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "500ms", transitionDuration: "600ms" }}
              >
                Let us guide you through our curated collection of premium properties and find the perfect place to call home.
              </p>

              {/* CTA Button */}
              <div
                className="animate-on-scroll"
                style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "600ms", transitionDuration: "600ms" }}
              >
                <Link
                  to="/explore"
                  className="group relative inline-flex items-center gap-2 sm:gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--wb-accent)] to-[var(--wb-accent-2)] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white shadow-[0_20px_50px_rgba(27,79,214,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(27,79,214,0.45)]"
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
              <div
                className="animate-on-scroll mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[var(--wb-muted)]"
                style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "700ms", transitionDuration: "600ms" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--wb-accent-2)]" />
                  <span>Premium Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--wb-accent-2)]" />
                  <span>Expert Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--wb-accent-2)]" />
                  <span>Personalized Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
