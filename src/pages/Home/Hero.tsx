import { useEffect, useState } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          style={{
            backgroundImage: `url(${HERO_IMAGES[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative wb-container flex flex-col justify-center min-h-[90vh] lg:min-h-screen py-20 lg:py-0">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-[12px] font-semibold tracking-wide text-white/90 uppercase">
              Now Accepting New Projects
            </span>
          </div>

          {/* Headline */}
          <h1 className="wb-serif text-[36px] sm:text-[52px] lg:text-[68px] leading-[1.08] tracking-tight text-white mb-6">
            Build Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-white">
              Dream Home
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80 max-w-xl mb-8">
            Premium home construction with transparent pricing, expert
            craftsmanship, and a commitment to bringing your vision to life —
            on time and on budget.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/contact"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 
                         bg-white text-[15px] font-bold text-gray-900
                         shadow-[0_20px_50px_rgba(255,255,255,0.15)]
                         hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200"
            >
              Get Free Consultation
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 
                         bg-white/10 backdrop-blur-md border border-white/30 
                         text-[15px] font-bold text-white
                         hover:bg-white/20 hover:border-white/50
                         transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View Our Projects
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {HERO_STATS.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="wb-serif text-[28px] sm:text-[36px] font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[13px] sm:text-[14px] font-medium text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentImage === index
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest rotate-90 origin-center translate-x-6">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--wb-bg)] to-transparent pointer-events-none" />
    </section>
  );
}
