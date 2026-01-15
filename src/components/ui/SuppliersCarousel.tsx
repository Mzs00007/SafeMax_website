'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SUPPLIERS = [
    { name: 'Dahua', logo: '/images/partners/dahua.png' },
    { name: 'Pelco', logo: '/images/partners/pelco.png' },
    { name: 'Samsung', logo: '/images/partners/samsung.png' },
    { name: 'Bosch', logo: '/images/partners/bosch.png' },
    { name: 'Wisenet', logo: '/images/partners/wisenet.png' },
    { name: 'Comelit', logo: '/images/partners/comelit.png' },
    { name: 'Hikvision', logo: '/images/partners/hikvision.png' },
    { name: 'Honeywell', logo: '/images/partners/honeywell.png' },
];

export default function SuppliersCarousel() {
    const [isPaused, setIsPaused] = useState(false);

    // Infinite Marquee Logic
    // We duplicate the array to create a seamless loop
    const MARQUEE_ITEMS = [...SUPPLIERS, ...SUPPLIERS, ...SUPPLIERS];

    return (
        <div
            className="w-full relative py-16 overflow-hidden bg-gray-900/50 rounded-3xl my-16 border border-white/5 backdrop-blur-sm group"
        >
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center z-20">
                <h3 className="text-white text-xs uppercase tracking-[0.4em] opacity-40">Trusted Partners</h3>
            </div>

            {/* Gradient Masks for Smooth Fade */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>

            {/* Scrolling Track */}
            <div className="flex items-center overflow-hidden">
                <motion.div
                    className="flex gap-8 items-center pl-8"
                    animate={{
                        x: ["0%", "-33.33%"]
                    }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    // Hover Pause
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{
                        width: "fit-content",
                        animationPlayState: isPaused ? "paused" : "running"
                    }}
                >
                    {MARQUEE_ITEMS.map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className="relative flex-shrink-0 w-[240px] h-[140px] bg-white rounded-xl shadow-lg flex items-center justify-center p-2 border border-white/10 group/card hover:scale-105 transition-transform duration-300"
                        >
                            {/* Logo Container */}
                            <div className="relative w-full h-full max-w-[220px] max-h-[120px]">
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    fill
                                    className="object-contain" // Full color (Removed grayscale)
                                    sizes="240px"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
