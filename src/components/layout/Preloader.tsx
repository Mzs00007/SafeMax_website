'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    // Simulate System Boot Sequence
    useEffect(() => {
        // 1. Force Scroll to Top on Load
        window.scrollTo(0, 0);

        // 2. Disable scroll during boot
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setLoading(false);
            // Re-enable scroll after exit animation (approx 2.5s total)
            setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 1000);
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 1. TOP SHUTTER */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-black z-40 border-b border-white/10"
                        initial={{ y: 0 }}
                        exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    />

                    {/* 2. BOTTOM SHUTTER */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-40 border-t border-white/10"
                        initial={{ y: 0 }}
                        exit={{ y: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    />

                    {/* 3. CONTENT */}
                    <div className="relative z-50 flex flex-col items-center justify-center">

                        {/* Logo Mark */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <h1 className="text-5xl font-bold tracking-tighter text-white">
                                SAFE<span className="text-[#DC2626]">MAX</span>
                            </h1>
                        </motion.div>

                        {/* Progress Bar Container */}
                        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4 relative">
                            <motion.div
                                className="h-full bg-[#DC2626]"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </div>

                        {/* User-Friendly Status Text */}
                        <div className="h-6 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key="msg1"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white text-sm font-medium tracking-wide uppercase"
                                >
                                    <TypewriterSequence />
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Simple internal component to cycle text for simplicity in one file
function TypewriterSequence() {
    const [text, setText] = useState("Loading Experience...");

    useEffect(() => {
        const t1 = setTimeout(() => setText("Verifying Security..."), 800);
        const t2 = setTimeout(() => setText("Welcome to SafeMax"), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return <motion.span key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{text}</motion.span>;
}
