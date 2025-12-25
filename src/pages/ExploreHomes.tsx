// src/pages/ExploreHomes.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

type HomeProject = {
    id: string;
    title: string;
    image: string;
};

const PROJECTS: HomeProject[] = [
    {
        id: "jack",
        title: "Jack Residence",
        image: "/img/jack.jpg",
    },
    {
        id: "apollo-house",
        title: "Apollo House",
        image: "/img/apollo-house-img.jpg",
    },
    {
        id: "living-room",
        title: "Modern Living",
        image: "/img/living-room.jpg",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE },
    },
};

export default function ExploreHomes() {
    const [selectedImage, setSelectedImage] = useState<HomeProject | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (project: HomeProject, index: number) => {
        setSelectedImage(project);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? PROJECTS.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(PROJECTS[newIndex]);
    };

    const goToNext = () => {
        const newIndex = currentIndex === PROJECTS.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(PROJECTS[newIndex]);
    };

    return (
        <main className="min-h-screen bg-(--wb-bg)">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background glows */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-1/2 -top-40 h-95 w-190 -translate-x-1/2 rounded-full bg-(--wb-ink)/10 blur-3xl" />
                    <div className="absolute -right-35 top-20 h-80 w-80 rounded-full bg-(--wb-accent-2)/10 blur-3xl" />
                </div>

                <div className="wb-container py-16 sm:py-24">
                    {/* Header */}
                    <div className="mx-auto max-w-[78ch] text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="inline-flex items-center gap-2 rounded-full border border-(--wb-border) bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.20em] text-black/55 backdrop-blur"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-(--wb-accent-2)/70" />
                            EXPLORE HOMES
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                            className="wb-serif mt-6 text-[36px] leading-[1.1] sm:text-[52px] lg:text-[64px] text-(--wb-ink)"
                        >
                            Our Featured Homes
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
                            className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-(--wb-ink)/70 max-w-[60ch] mx-auto"
                        >
                            Discover our collection of beautifully crafted homes, each designed
                            with attention to detail and built to the highest standards.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="wb-container pb-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            onClick={() => openLightbox(project, index)}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl
                shadow-[0_18px_55px_rgba(12,24,48,0.12)]
                hover:shadow-[0_38px_120px_rgba(12,24,48,0.22)]
                transition-shadow duration-500"
                        >
                            {/* Image container */}
                            <div className="relative aspect-video overflow-hidden">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    loading="lazy"
                                    initial={{ scale: 1.1 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: EASE }}
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Title overlay on hover */}
                                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="wb-serif text-[20px] sm:text-[24px] text-white">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Premium edge vignette */}
                                <div className="pointer-events-none absolute inset-0 opacity-50 [box-shadow:inset_0_-60px_100px_rgba(0,0,0,0.15)]" />
                            </div>

                            {/* Hover ring */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-0 ring-(--wb-ink)/0 group-hover:ring-2 group-hover:ring-(--wb-ink)/10 transition-all duration-300" />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <RiCloseLine className="text-2xl" />
                        </button>

                        {/* Previous button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <RiArrowLeftSLine className="text-3xl" />
                        </button>

                        {/* Next button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <RiArrowRightSLine className="text-3xl" />
                        </button>

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-[90vw] max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                            />

                            {/* Title below image */}
                            <div className="absolute -bottom-12 left-0 right-0 text-center">
                                <h3 className="wb-serif text-[24px] sm:text-[28px] text-white">
                                    {selectedImage.title}
                                </h3>
                                <p className="mt-1 text-white/60 text-sm">
                                    {currentIndex + 1} / {PROJECTS.length}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
