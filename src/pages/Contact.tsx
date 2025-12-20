import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Icons
   ───────────────────────────────────────────────────────────── */
function IconSend() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
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

function IconMessage() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function IconMailLarge() {
  return (
    <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function IconPhoneLarge() {
  return (
    <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated Background Particles
   ───────────────────────────────────────────────────────────── */
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
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
   Contact Info Card Component
   ───────────────────────────────────────────────────────────── */
type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  detail: string;
  subDetail?: string;
  delay: number;
};

function ContactInfoCard({ icon, title, detail, subDetail, delay }: ContactInfoProps) {
  return (
    <div
      className="animate-on-scroll group flex items-start gap-4 rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:bg-white/60 hover:shadow-lg"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateX(-30px)",
      }}
    >
      <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] p-3 text-white shadow-lg shadow-[var(--wb-accent-2)]/25 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-[var(--wb-ink)] text-sm sm:text-base">{title}</h4>
        <p className="text-[var(--wb-muted)] text-sm sm:text-base">{detail}</p>
        {subDetail && <p className="text-[var(--wb-muted)] text-xs sm:text-sm mt-1">{subDetail}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Contact Page Component
   ───────────────────────────────────────────────────────────── */
export default function Contact() {
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
        
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            transition: none !important;
          }
        }
      `}</style>

      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-20 md:py-24">
        {/* Hero background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--wb-accent-2)]/15 via-[var(--wb-accent)]/10 to-transparent blur-3xl" />
          <div className="absolute right-0 top-0 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full bg-[var(--wb-accent-2)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] rounded-full bg-[var(--wb-accent)]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            {/* Badge */}
            <div
              className="animate-on-scroll mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--wb-accent-2)]/20 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-md"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wb-accent-2)] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[var(--wb-accent-2)]"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--wb-accent)]">Get In Touch</span>
            </div>

            {/* Main heading */}
            <h1
              className="animate-on-scroll wb-serif mb-4 sm:mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "200ms", transitionDuration: "800ms" }}
            >
              Contact <span className="gradient-text">Us</span>
            </h1>

            {/* Subheading */}
            <p
              className="animate-on-scroll mx-auto max-w-2xl text-base leading-relaxed text-[var(--wb-muted)] sm:text-lg md:text-xl px-2"
              style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "400ms", transitionDuration: "800ms" }}
            >
              Have questions or ready to start your journey? We'd love to hear from you. Reach out and let's build something great together.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Left side - Contact Info */}
            <div className="space-y-6">
              {/* Contact Info Cards */}
              <ContactInfoCard
                icon={<IconLocation />}
                title="Visit Us"
                detail="123 Main Street, Suite 100"
                subDetail="Dallas, TX 75001"
                delay={100}
              />
              <ContactInfoCard
                icon={<IconPhoneLarge />}
                title="Call Us"
                detail="(555) 123-4567"
                subDetail="Mon-Fri 9AM - 6PM CST"
                delay={200}
              />
              <ContactInfoCard
                icon={<IconMailLarge />}
                title="Email Us"
                detail="info@webhook.com"
                subDetail="We respond within 24 hours"
                delay={300}
              />
              <ContactInfoCard
                icon={<IconClock />}
                title="Business Hours"
                detail="Monday - Friday: 9AM - 6PM"
                subDetail="Saturday: 10AM - 4PM | Sunday: Closed"
                delay={400}
              />
            </div>

            {/* Right side - Contact Form */}
            <div
              className="animate-on-scroll overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/50 p-6 sm:p-8 md:p-10 backdrop-blur-xl"
              style={{ opacity: 0, transform: "translateY(40px) scale(0.98)", transitionDelay: "200ms", transitionDuration: "800ms" }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-[var(--wb-accent-2)]/5" />

              <div className="relative z-10">
                <h3 className="mb-2 text-xl sm:text-2xl font-bold text-[var(--wb-ink)]">Send us a Message</h3>
                <p className="mb-6 sm:mb-8 text-sm sm:text-base text-[var(--wb-muted)]">Fill out the form below and we'll get back to you as soon as possible.</p>

                <form className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                      <IconUser />
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                    />
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                        <IconMail />
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                        <IconPhone />
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                      <IconMessage />
                      Subject
                    </label>
                    <select
                      className="w-full rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                    >
                      <option value="">Select a subject</option>
                      <option value="buying">Buying a Home</option>
                      <option value="selling">Selling Property</option>
                      <option value="land">Land Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--wb-ink)]">
                      <IconMessage />
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      className="w-full resize-none rounded-lg sm:rounded-xl border border-[var(--wb-border)] bg-white/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--wb-ink)] placeholder:text-[var(--wb-muted)]/50 transition-all duration-200 focus:border-[var(--wb-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--wb-accent-2)]/20"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[var(--wb-accent)] to-[var(--wb-accent-2)] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_20px_50px_rgba(27,79,214,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(27,79,214,0.45)]"
                  >
                    <span>Send Message</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <IconSend />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MAP / ADDITIONAL INFO SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--wb-accent)]/3 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12 text-center">
            <span
              className="animate-on-scroll mb-4 inline-block rounded-full border border-[var(--wb-accent-2)]/20 bg-[var(--wb-accent-2)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--wb-accent-2)]"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "100ms", transitionDuration: "600ms" }}
            >
              Find Us
            </span>
            <h2
              className="animate-on-scroll wb-serif text-2xl font-bold text-[var(--wb-ink)] sm:text-3xl md:text-4xl"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDelay: "200ms", transitionDuration: "600ms" }}
            >
              Our <span className="gradient-text">Location</span>
            </h2>
          </div>

          {/* Map Placeholder */}
          <div
            className="animate-on-scroll overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/40 backdrop-blur-xl"
            style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "300ms", transitionDuration: "800ms" }}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[450px] w-full bg-gradient-to-br from-[var(--wb-accent)]/5 to-[var(--wb-accent-2)]/10 flex items-center justify-center">
              {/* Decorative map illustration */}
              <div className="text-center p-6">
                <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--wb-accent)] to-[var(--wb-accent-2)] p-4 sm:p-5 text-white shadow-xl">
                  <IconLocation />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--wb-ink)] mb-2">Visit Our Office</h3>
                <p className="text-[var(--wb-muted)] text-sm sm:text-base">123 Main Street, Suite 100</p>
                <p className="text-[var(--wb-muted)] text-sm sm:text-base">Dallas, TX 75001</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[var(--wb-accent)] font-semibold hover:text-[var(--wb-accent-2)] transition-colors text-sm sm:text-base"
                >
                  Get Directions
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[var(--wb-accent-2)]/30 animate-pulse" />
              <div className="absolute top-1/4 right-1/4 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[var(--wb-accent)]/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/3 left-1/3 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 rounded-full bg-[var(--wb-accent-2)]/20 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[var(--wb-accent)]/25 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div
            className="animate-on-scroll mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3"
            style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "400ms", transitionDuration: "600ms" }}
          >
            <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">24h</div>
              <p className="text-sm sm:text-base text-[var(--wb-muted)]">Response Time</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">100+</div>
              <p className="text-sm sm:text-base text-[var(--wb-muted)]">Happy Clients</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">5★</div>
              <p className="text-sm sm:text-base text-[var(--wb-muted)]">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
