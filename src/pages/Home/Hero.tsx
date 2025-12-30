import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const HERO_STATS = [
  { value: "150+", label: "Homes Built" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=90",
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
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentImage + 1) % HERO_IMAGES.length;
      setNextImage(next);
      setIsTransitioning(true);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 transition-transform duration-[1200ms] ease-out will-change-transform"
          style={{
            backgroundImage: `url(${HERO_IMAGES[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: isTransitioning ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-800 ease-in-out will-change-opacity"
          style={{
            backgroundImage: `url(${HERO_IMAGES[nextImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isTransitioning ? 1 : 0,
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative wb-container flex flex-col justify-center min-h-[100svh] px-4 sm:px-6 lg:px-8 py-24 sm:py-20 lg:py-0">
        <div className="max-w-3xl w-full">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                       px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-[10px] sm:text-[12px] font-semibold tracking-wide text-white/90 uppercase">
              Now Accepting New Projects
            </span>
          </div>

          {/* Headline */}
          <h1
            className="wb-serif text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 
                       leading-[1.1] tracking-tight text-white mb-4 sm:mb-6
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Build Your
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-white">
              Dream Home
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-white/80 
                       max-w-[90%] sm:max-w-xl mb-6 sm:mb-8
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Premium home construction with transparent pricing, expert
            craftsmanship, and a commitment to bringing your vision to life —
            on time and on budget.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-3 mb-8 sm:mb-10
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/contact"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full 
                         px-5 bg-white text-[13px] font-semibold text-gray-900
                         hover:bg-white/90 active:scale-[0.98]
                         transition-all duration-200"
            >
              Get Free Consultation
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
              className="inline-flex h-11 items-center justify-center rounded-full 
                         px-5 bg-white/10 backdrop-blur-sm border border-white/25 
                         text-[13px] font-semibold text-white
                         hover:bg-white/15 hover:border-white/40
                         transition-all duration-200"
            >
              View Our Projects
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8 lg:gap-12
                       animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            {HERO_STATS.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="wb-serif text-[22px] sm:text-[32px] lg:text-[36px] font-bold text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[13px] lg:text-[14px] font-medium text-white/60 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
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

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
