'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HexagonItem {
    image: string;
    title: string;
    description?: string;
    subtitle?: string; // Keep for compatibility
}

interface HexagonHiveProps {
    items: HexagonItem[];
}

export default function HexagonHive({ items }: HexagonHiveProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-20 relative min-h-[600px] flex items-center justify-center">

            {/* Grid Container */}
            <div className="flex flex-wrap justify-center gap-10 items-center relative z-10 w-full perspective-1000">
                {items.map((item, index) => (
                    <div key={index} className="relative w-72 h-80">
                        <motion.div
                            layoutId={`card-${index}`} // SHARED ID
                            onClick={() => setActiveIndex(index)}
                            className="w-full h-full cursor-pointer relative z-10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            {/* Hexagon Shape Wrapper (Double Hex for Border) */}
                            {/* Removed rectangular shadow-xl to fix "transparent corners" issue */}
                            <div className="w-full h-full relative group drop-shadow-2xl">

                                {/* 1. Outer Shell (The Border) - Red */}
                                <div className="absolute inset-0 bg-red-600 clip-path-hexagon transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.8)]" />

                                {/* 2. Inner Content (Inset) - Black Background */}
                                <div className="absolute inset-[2px] bg-black clip-path-hexagon overflow-hidden">

                                    {/* Background Image (Full Cover) - No Opacity Reduction */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-100"
                                        />
                                    </div>

                                    {/* Removed Dim Gradient Overlay to fix "dim grey effect" */}
                                    {/* <div className="absolute inset-0 bg-gradient-to-t ..." /> */}

                                    {/* Content Overlay (Centered) - Added text shadow for legibility without gradient */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10 bg-black/10 group-hover:bg-black/0 transition-colors">
                                        <h3 className="font-bold text-lg sm:text-xl text-white uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-b-2 border-red-600 pb-1">
                                            {item.title}
                                        </h3>

                                        {/* Tap Hint - MOVED TO BOTTOM & STYLED GREEN */}
                                        <div className="absolute bottom-8 text-xs text-green-500 font-extrabold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 drop-shadow-md [-webkit-text-stroke:0.5px_white]">
                                            Tap to Expand
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* MODAL OVERLAY */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <>
                        {/* Backdrop - High Blur & Untouchable */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveIndex(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] cursor-pointer"
                        />

                        {/* Active Card - Centered Modal */}
                        <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none p-4">
                            <motion.div
                                layoutId={`card-${activeIndex}`} // SHARED ID MATCHING ORIGIN
                                className="w-full max-w-[500px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative pointer-events-auto border border-red-600/30 flex flex-col max-h-[90vh]"
                                transition={{ type: "spring", stiffness: 120, damping: 20 }} // Slower, smooth spring
                            >
                                {/* Expanded Content */}
                                <div className="p-8 flex flex-col items-center text-center relative flex-grow overflow-y-auto custom-scrollbar">
                                    {/* Close Button Hint */}
                                    <button
                                        onClick={() => setActiveIndex(null)}
                                        className="absolute top-0 right-0 m-4 text-gray-500 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-sm transition-colors z-20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>

                                    {/* Large Image */}
                                    <motion.div
                                        className="w-full h-56 shrink-0 mb-6 relative bg-black/20 rounded-2xl p-6 flex items-center justify-center border border-white/5"
                                    >
                                        <img
                                            src={items[activeIndex].image}
                                            alt={items[activeIndex].title}
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h3
                                        className="text-3xl font-bold text-white mb-4 tracking-tight"
                                    >
                                        {items[activeIndex].title}
                                    </motion.h3>

                                    {/* Full Description */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }} // Delayed text for polish
                                        className="text-gray-300 leading-relaxed text-sm md:text-base"
                                    >
                                        {items[activeIndex].description || items[activeIndex].subtitle || "System module details unavailable."}
                                    </motion.p>

                                    <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 shrink-0" />
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
