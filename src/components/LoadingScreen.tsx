// src/components/LoadingScreen.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// SVG path for "Westbrook" in a handwriting style
// This is a simplified cursive-style path that simulates handwriting
const WESTBROOK_PATH = `
M 0 40 
Q 5 20, 15 40 
L 15 20 
L 25 40 
L 25 20

M 35 25 
Q 35 20, 45 20 
Q 55 20, 50 30 
Q 45 40, 55 40 
Q 65 40, 60 30

M 75 40 
Q 65 30, 75 20 
Q 85 20, 85 25 
M 75 30 
L 85 30

M 95 20 
L 95 40 
M 90 20 
L 100 20

M 110 40 
Q 100 30, 110 20 
Q 120 20, 120 25 
M 110 30 
L 120 30

M 130 20 
Q 125 20, 125 30 
Q 125 40, 135 40 
Q 145 40, 145 30 
Q 145 20, 135 20

M 155 20 
L 155 40 
Q 155 35, 165 30 
Q 175 25, 175 35 
L 175 40

M 185 20 
Q 180 20, 180 30 
Q 180 40, 190 40 
Q 200 40, 200 30 
Q 200 20, 190 20

M 210 20 
Q 205 20, 205 30 
Q 205 40, 215 40 
Q 225 40, 225 30 
Q 225 20, 215 20

M 235 20 
L 235 40 
M 235 20 
Q 245 20, 250 30 
L 250 40
`;

// Text letters for "Westbrook"
const LETTERS = [
    { char: "W", x: 0 },
    { char: "e", x: 32 },
    { char: "s", x: 58 },
    { char: "t", x: 82 },
    { char: "b", x: 102 },
    { char: "r", x: 130 },
    { char: "o", x: 158 },
    { char: "o", x: 188 },
    { char: "k", x: 218 },
];

export default function LoadingScreen({
    onComplete,
}: {
    onComplete: () => void;
}) {
    const [phase, setPhase] = useState<"logo" | "writing" | "exit">("logo");
    const [visibleLetters, setVisibleLetters] = useState(0);

    // Phase 1: Show logo centered for 800ms, then move left
    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase("writing");
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Phase 2: Handwriting animation - reveal letters one by one
    useEffect(() => {
        if (phase !== "writing") return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < LETTERS.length) {
                index++;
                setVisibleLetters(index);
            } else {
                clearInterval(interval);
                // Wait a bit then exit
                setTimeout(() => setPhase("exit"), 500);
            }
        }, 120);

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
                        className="flex items-center gap-5"
                        initial={{ x: 0 }}
                        animate={{
                            x: phase === "writing" ? 0 : 0,
                        }}
                    >
                        {/* Logo */}
                        <motion.div
                            className="relative"
                            initial={{ x: 0, scale: 1 }}
                            animate={{
                                x: phase === "writing" ? -10 : 0,
                                scale: phase === "writing" ? 1 : 1.1,
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

                        {/* Handwriting text */}
                        <AnimatePresence>
                            {phase === "writing" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                    className="relative flex items-center"
                                >
                                    {/* Letters with staggered reveal */}
                                    <div className="flex items-baseline">
                                        {LETTERS.map((letter, i) => (
                                            <motion.span
                                                key={i}
                                                className="wb-serif text-[36px] tracking-tight text-[color:var(--wb-ink)]"
                                                initial={{
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                animate={{
                                                    opacity: i < visibleLetters ? 1 : 0,
                                                    y: i < visibleLetters ? 0 : 10,
                                                }}
                                                transition={{
                                                    duration: 0.25,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                            >
                                                {letter.char}
                                            </motion.span>
                                        ))}

                                        {/* Blinking cursor */}
                                        <motion.span
                                            className="inline-block h-8 w-[3px] ml-1 bg-[color:var(--wb-accent)]"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </div>

                                    {/* Underline stroke animation */}
                                    <motion.div
                                        className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-[var(--wb-accent)] to-[var(--wb-accent-2)]"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{
                                            width: visibleLetters === LETTERS.length ? "100%" : `${(visibleLetters / LETTERS.length) * 100}%`,
                                            opacity: visibleLetters > 0 ? 0.6 : 0,
                                        }}
                                        transition={{ duration: 0.3, ease: EASE }}
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
                            animate={{ width: phase === "writing" ? "100%" : "30%" }}
                            transition={{
                                duration: phase === "writing" ? 1.4 : 0.8,
                                ease: EASE,
                            }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
