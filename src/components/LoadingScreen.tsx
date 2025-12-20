// src/components/LoadingScreen.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LoadingScreen({
    onComplete,
}: {
    onComplete: () => void;
}) {
    const [phase, setPhase] = useState<"logo" | "typing" | "exit">("logo");
    const [typedText, setTypedText] = useState("");
    const fullText = "Westbrook";

    // Phase 1: Show logo centered for 800ms, then move left
    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase("typing");
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Phase 2: Typing animation
    useEffect(() => {
        if (phase !== "typing") return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setTypedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                // Wait a bit then exit
                setTimeout(() => setPhase("exit"), 400);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [phase]);

    // Phase 3: Exit and notify parent
    useEffect(() => {
        if (phase === "exit") {
            const timer = setTimeout(() => {
                onComplete();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    return (
        <AnimatePresence>
            {phase !== "exit" ? (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--wb-bg)]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                >
                    {/* Subtle background gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_400px_at_50%_40%,rgba(27,79,214,0.08),transparent)]" />

                    {/* Content container */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ x: 0 }}
                        animate={{
                            x: phase === "typing" ? 0 : 0,
                        }}
                    >
                        {/* Logo */}
                        <motion.div
                            className="relative"
                            initial={{ x: 0, scale: 1 }}
                            animate={{
                                x: phase === "typing" ? -20 : 0,
                                scale: phase === "typing" ? 1 : 1.1,
                            }}
                            transition={{ duration: 0.6, ease: EASE }}
                        >
                            <motion.div
                                className="h-16 w-16 overflow-hidden rounded-2xl border border-[color:var(--wb-border)] bg-white/80 shadow-[0_20px_50px_rgba(11,18,32,0.15)]"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: EASE }}
                            >
                                <img
                                    src="/img/logo.jfif"
                                    alt="Westbrook Logo"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Typing text */}
                        <AnimatePresence>
                            {phase === "typing" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                    className="flex items-baseline gap-1"
                                >
                                    <span className="wb-serif text-[32px] tracking-tight text-[color:var(--wb-ink)]">
                                        {typedText}
                                    </span>
                                    <motion.span
                                        className="inline-block h-8 w-[3px] bg-[color:var(--wb-accent)]"
                                        animate={{ opacity: [1, 0] }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Bottom loading bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[color:var(--wb-border)]">
                        <motion.div
                            className="h-full bg-[color:var(--wb-accent)]"
                            initial={{ width: "0%" }}
                            animate={{ width: phase === "typing" ? "100%" : "30%" }}
                            transition={{
                                duration: phase === "typing" ? 1.2 : 0.8,
                                ease: EASE,
                            }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
