'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    fullDetails?: string; // Optional longer description for the modal
}

interface PortfolioGridProps {
    projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section className="py-8">
            {/* MASONRY GRID wrapper - Cinematic Style */}
            <motion.div
                className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { type: "spring", stiffness: 40, damping: 15 }
                            }
                        }}
                        layoutId={`card-container-${project.id}`}
                        onClick={() => setSelectedId(project.id)}
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm bg-black shine-border-container"
                    >
                        {/* Image Container */}
                        <motion.div
                            layoutId={`card-image-container-${project.id}`}
                            className="relative w-full aspect-[4/5] overflow-hidden"
                        >
                            <Image
                                src={project.imageUrl || "/assets/images/project-placeholder.png"}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000 filter grayscale group-hover:grayscale-0"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                            {/* Category Chip (Top Right) */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full z-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">{project.category}</span>
                            </div>

                            {/* View Button (Center - Hover Only) */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                <div className="w-16 h-16 rounded-full bg-safemax-orange/90 backdrop-blur-sm flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                                    <ExternalLink className="text-white w-6 h-6" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card Content */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                            layoutId={`card-content-${project.id}`}
                        >
                            <div className="w-12 h-1 bg-safemax-orange mb-6 w-0 group-hover:w-12 transition-all duration-500" />

                            <motion.span
                                className="inline-block mb-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors"
                            >
                                {project.category}
                            </motion.span>
                            <motion.h3
                                layoutId={`card-title-${project.id}`}
                                className="text-3xl font-black mb-2 leading-none uppercase tracking-tight"
                            >
                                {project.title}
                            </motion.h3>
                            <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* EXPANDED MODAL */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto cursor-pointer"
                        />

                        {/* Helper: Find active project */}
                        {projects.filter(p => p.id === selectedId).map(project => (
                            <motion.div
                                key={project.id}
                                layoutId={`card-container-${project.id}`}
                                className="relative w-full max-w-4xl max-h-[90vh] bg-[#111] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row border border-white/10"
                            >
                                {/* Modal Image (Left/Top) */}
                                <motion.div
                                    layoutId={`card-image-container-${project.id}`}
                                    className="relative w-full md:w-1/2 h-64 md:h-auto aspect-video md:aspect-auto"
                                >
                                    <Image
                                        src={project.imageUrl || "/assets/images/project-placeholder.png"}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r" />
                                </motion.div>

                                {/* Modal Content (Right/Bottom) */}
                                <div className="flex-1 p-8 md:p-12 flex flex-col items-start justify-center relative bg-[#111]">
                                    {/* Close Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    >
                                        <X size={24} />
                                    </button>

                                    <motion.div layoutId={`card-content-${project.id}`} className="w-full">
                                        <motion.span className="text-safemax-orange font-bold tracking-widest uppercase text-sm mb-2 block">
                                            {project.category}
                                        </motion.span>
                                        <motion.h3
                                            layoutId={`card-title-${project.id}`}
                                            className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
                                        >
                                            {project.title}
                                        </motion.h3>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-6"
                                    >
                                        <p className="text-gray-400 text-lg leading-relaxed">
                                            {project.fullDetails || project.description}
                                        </p>
                                        <p className="text-gray-500">
                                            Our engineering team delivered a comprehensive fire safety solution tailored to the unique architectural constraints of this landmark, ensuring 100% compliance with Dubai Civil Defense regulations.
                                        </p>

                                        <div className="pt-4 flex flex-wrap gap-4">
                                            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-sm hover:bg-gray-200 transition-colors">
                                                <span>View Case Study</span>
                                                <ArrowRight size={18} />
                                            </button>
                                            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors">
                                                <span>Project Specs</span>
                                                <ExternalLink size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
