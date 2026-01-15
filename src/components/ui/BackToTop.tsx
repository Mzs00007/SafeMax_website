'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import useCyberneticSound from '@/hooks/useCyberneticSound';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrollingTop, setIsScrollingTop] = useState(false);
    const { playHover, playClick } = useCyberneticSound();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        playClick();
        setIsScrollingTop(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setTimeout(() => setIsScrollingTop(false), 1000);
    };

    return (
        <>
            {/* BIG SCROLL ANIMATION OVERLAY (Desktop Version) */}
            <AnimatePresence>
                {isScrollingTop && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none hidden md:flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ y: 200, scale: 0.8, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: -window.innerHeight, scale: 1.5, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        >
                            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                                <path
                                    d="M12 2L2 12H6V22H18V12H22L12 2Z"
                                    fill="black"
                                    stroke="#DC2626"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 2L2 12H6V22H18V12H22L12 2Z"
                                    stroke="white"
                                    strokeWidth="0.5"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                            </svg>
                            {/* Logo inside Arrow */}
                            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12">
                                <img
                                    src="/assets/images/logo-white.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain opacity-90"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        onMouseEnter={playHover}
                        // Expanded button with text
                        className="hidden md:flex fixed bottom-8 left-8 z-40 items-center justify-center px-5 py-3 w-auto gap-3 bg-black text-white border border-[#DC2626] rounded animate-pulse-slow shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:bg-[#111] hover:scale-105 transition-all duration-300 group"
                    >
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-200 group-hover:text-white transition-colors">
                            Back To Top
                        </span>
                        <ArrowUp size={18} className="text-[#DC2626] group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
