// src/pages/Home/ProcessRoadmap.tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
    {
        number: 1,
        title: "Consultation",
        description:
            "We begin by understanding your vision, lifestyle, and requirements for your dream home.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8" />
                <path d="M8 13h6" />
            </svg>
        ),
    },
    {
        number: 2,
        title: "Design",
        description:
            "Our team creates detailed plans and 3D renderings to bring your vision to life.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
            >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
    {
        number: 3,
        title: "Construction",
        description:
            "Expert craftsmen build your home with precision and attention to every detail.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
            >
                <path d="M2 20h20" />
                <path d="M5 20V8.5L12 4l7 4.5V20" />
                <path d="M9 20v-6h6v6" />
                <path d="M9 12h6" />
                <path d="M12 8v4" />
            </svg>
        ),
    },
    {
        number: 4,
        title: "Move In",
        description:
            "We complete final inspections and hand you the keys to your beautiful new home.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
            >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
        ),
    },
];

export default function ProcessRoadmap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });

    return (
        <section ref={containerRef} className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.2 }}
                    className="absolute left-1/4 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[color:var(--wb-accent)]/5 blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute right-1/4 top-1/3 h-[280px] w-[280px] rounded-full bg-[color:var(--wb-accent-2)]/5 blur-3xl"
                />
            </div>

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.26em] text-black/45 uppercase"
                >
                    Our Process
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="wb-serif mt-2 text-[24px] sm:text-[30px] lg:text-[36px] text-[color:var(--wb-ink)]"
                >
                    Building your dream home
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-2 text-[12px] sm:text-[13px] text-black/55 max-w-md mx-auto"
                >
                    A seamless journey from initial concept to handing over the keys.
                </motion.p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Vertical line - center */}
                    <div className="absolute left-1/2 -translate-x-[1px] top-0 bottom-0 w-[2px]">
                        {/* Background line */}
                        <div className="absolute inset-0 bg-[color:var(--wb-border)]" />
                        {/* Animated progress line */}
                        <motion.div
                            className="absolute inset-x-0 top-0 bg-gradient-to-b from-[color:var(--wb-accent)] to-[color:var(--wb-accent-2)]"
                            initial={{ height: "0%" }}
                            animate={{ height: isInView ? "100%" : "0%" }}
                            transition={{ duration: 2.5, delay: 0.4, ease: "easeOut" }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="relative space-y-8 sm:space-y-12">
                        {STEPS.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={step.number}
                                    className={`relative flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}
                                >
                                    {/* Content card */}
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x: isEven ? -50 : 50,
                                            scale: 0.9
                                        }}
                                        animate={isInView ? {
                                            opacity: 1,
                                            x: 0,
                                            scale: 1
                                        } : {}}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3 + index * 0.2,
                                            ease: "easeOut"
                                        }}
                                        className={`w-[calc(50%-24px)] sm:w-[calc(50%-32px)] ${isEven ? "pr-2 sm:pr-4 text-right" : "pl-2 sm:pl-4 text-left"}`}
                                    >
                                        <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-[color:var(--wb-border)] shadow-[0_8px_30px_rgba(11,18,32,0.05)] hover:shadow-[0_12px_40px_rgba(11,18,32,0.08)] transition-all duration-300 hover:-translate-y-0.5">
                                            <div className={`flex items-center gap-2 sm:gap-3 mb-2 ${isEven ? "justify-end flex-row-reverse" : "justify-start"}`}>
                                                {/* Icon */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                        delay: 0.5 + index * 0.2
                                                    }}
                                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[color:var(--wb-accent)]/8 flex items-center justify-center text-[color:var(--wb-accent)] flex-shrink-0"
                                                >
                                                    {step.icon}
                                                </motion.div>
                                                <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-[color:var(--wb-ink)]">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-[11px] sm:text-[12px] leading-relaxed text-black/55">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Center circle with number */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 15,
                                            delay: 0.4 + index * 0.2,
                                        }}
                                        className="absolute left-1/2 -translate-x-1/2 z-10"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[color:var(--wb-accent)] to-[color:var(--wb-accent-2)] flex items-center justify-center shadow-lg shadow-[color:var(--wb-accent)]/20">
                                            <span className="text-white font-bold text-sm sm:text-base">
                                                {step.number}
                                            </span>
                                        </div>
                                        {/* Pulse ring animation */}
                                        <motion.div
                                            initial={{ scale: 1, opacity: 0.6 }}
                                            animate={isInView ? { scale: 2, opacity: 0 } : {}}
                                            transition={{
                                                duration: 1.5,
                                                delay: 0.6 + index * 0.2,
                                                ease: "easeOut",
                                            }}
                                            className="absolute inset-0 rounded-full bg-[color:var(--wb-accent)]/30"
                                        />
                                    </motion.div>

                                    {/* Empty space for the other side */}
                                    <div className="w-[calc(50%-24px)] sm:w-[calc(50%-32px)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
