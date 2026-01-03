import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const HERO_STATS = [
  { value: "150+", label: "Homes Delivered" },
  { value: "12+", label: "Years of Craft" },
  { value: "98%", label: "Client Delight" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2400&q=90",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentImage) return;
      setNextImage(index);
      setIsTransitioning(true);
    },
    [isTransitioning, currentImage]
  );

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setCurrentImage(nextImage);
        setIsTransitioning(false);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentImage + 1) % HERO_IMAGES.length;
      setNextImage(next);
      setIsTransitioning(true);
    }, 6500);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden -mt-[var(--wb-nav-h)] pt-[var(--wb-nav-h)]"
      data-hero="true"
    >
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {/* current */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${HERO_IMAGES[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: isTransitioning ? "scale(1.06)" : "scale(1)",
            transition: "transform 1200ms ease-out",
          }}
        />

        {/* next */}
        <div
          className="absolute inset-0 will-change-opacity"
          style={{
            backgroundImage: `url(${HERO_IMAGES[nextImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isTransitioning ? 1 : 0,
            transition: "opacity 850ms ease-in-out",
          }}
        />

        {/* Premium overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_70%_25%,rgba(255,255,255,0.09),transparent_55%)]" />

        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none hero-grain" />
      </div>

      {/* Content */}
      <div className="relative wb-container flex flex-col justify-center min-h-[100svh] px-4 sm:px-6 lg:px-8 py-28 sm:py-24 lg:py-0">
        <div className="max-w-3xl w-full">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20
                       px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-7
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
            <span className="text-[10px] sm:text-[12px] font-semibold tracking-wide text-white/90 uppercase">
              Bespoke Homes • Crafted for Your Life
            </span>
          </div>

          {/* Headline */}
          <h1
            className="wb-serif text-[34px] sm:text-[52px] md:text-[60px] lg:text-[68px] xl:text-[74px]
                       leading-[1.05] tracking-tight text-white mb-5 sm:mb-7
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Design. Build.
            <span className="block mt-1.5 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
              Live Exceptionally.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] leading-relaxed text-white/80
                       max-w-[40ch] sm:max-w-[52ch] mb-7 sm:mb-9
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            WestBrook builds bespoke homes with calm execution, premium finishes,
            and true cost clarity — from first sketch to handover.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-3 sm:gap-4 mb-9 sm:mb-11
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/contact"
              className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full
                         px-5 sm:px-6 bg-white text-[13px] sm:text-[14px] font-semibold text-gray-900
                         hover:bg-white/90 active:scale-[0.98]
                         transition-all duration-200"
            >
              Book a Design Consultation
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              to="/projects"
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full
                         px-5 sm:px-6 bg-white/10 backdrop-blur-sm border border-white/25
                         text-[13px] sm:text-[14px] font-semibold text-white
                         hover:bg-white/15 hover:border-white/40
                         transition-all duration-200"
            >
              Explore Our Work
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-10 lg:gap-14
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            {/* {HERO_STATS.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="wb-serif text-[22px] sm:text-[32px] lg:text-[36px] font-bold text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[13px] lg:text-[14px] font-medium text-white/60 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))} */}
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ease-out ${currentImage === index
                ? "w-8 sm:w-10 bg-white"
                : "w-1 sm:w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-widest [writing-mode:vertical-rl]">
            Scroll
          </span>
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[var(--wb-bg)] to-transparent pointer-events-none" />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-grain {
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
      `}</style>
    </section>
  );
}
