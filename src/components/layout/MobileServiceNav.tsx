'use client';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface MobileServiceNavProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export default function MobileServiceNav({ tabs, activeTab, onTabChange }: MobileServiceNavProps) {
    const [isPeek, setIsPeek] = useState(false);
    const { scrollY } = useScroll();
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const velocity = Math.abs(scrollY.getVelocity());

        // If scrolling significantly > 30, always peek (hide menu)
        if (velocity > 30) {
            if (!isPeek) setIsPeek(true);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        } else {
            // STOPPED scrolling logic
            if (isPeek && !scrollTimeout.current) {
                scrollTimeout.current = setTimeout(() => {
                    setIsPeek(false);
                    scrollTimeout.current = null;
                }, 800);
            }
        }
    });

    return (
        <motion.div
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] lg:hidden flex items-center shadow-[0_5px_20px_rgba(0,0,0,0.5)] rounded-l-xl overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: isPeek ? "calc(100% - 1.5rem)" : "0%" }} // Slimmer handle exposure (1.5rem / 24px)
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            onClick={() => setIsPeek(false)}
        >
            {/* 1. SLIM HANDLE (Always Visible in Peek Mode) */}
            <div
                className="h-[auto] min-h-[40vh] max-h-[80dvh] w-6 bg-gradient-to-b from-red-600 to-red-900 border-l border-b border-t border-white/20 flex flex-col items-center justify-center cursor-pointer active:brightness-110"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsPeek(!isPeek);
                }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2 py-4"
                    animate={{ opacity: 1 }}
                >
                    <ChevronLeft size={12} className={`text-white transition-transform duration-500 ${isPeek ? 'rotate-0' : 'rotate-180'}`} />

                    <div
                        className="text-[9px] font-bold tracking-widest text-white whitespace-nowrap opacity-90"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        <AnimatePresence mode="wait">
                            {isPeek ? (
                                <motion.span
                                    key="open"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="animate-pulse"
                                >
                                    CLICK TO OPEN
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="close"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    SCROLL TO CLOSE
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <ChevronLeft size={12} className={`text-white transition-transform duration-500 ${isPeek ? 'rotate-0' : 'rotate-180'}`} />
                </motion.div>
            </div>

            {/* 2. COMPACT ICONS DOCK with GLASSY BACKGROUND */}
            <div className="bg-black/50 backdrop-blur-md border-t border-b border-white/10 p-1.5 py-3 flex flex-col gap-2 items-center max-h-[80dvh] overflow-y-auto no-scrollbar min-w-[3.5rem] rounded-l-xl">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                onTabChange(tab.id);
                                setIsPeek(false);
                            }}
                            className="relative flex flex-col items-center justify-center p-1 rounded-lg w-full group isolate"
                        >
                            {/* The Liquid Active Background - Uses layoutId for smooth flow */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute -inset-1 bg-black rounded-xl z-[-1] border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }} // Liquid snappy feel
                                />
                            )}

                            <div className={`
                                relative z-10 p-1.5 transition-colors duration-200
                                ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/50 group-hover:text-white'}
                            `}>
                                {tab.icon}
                            </div>

                            <span className={`
                                mt-1 text-[8px] font-bold text-center leading-none transition-all duration-300 tracking-wide
                                ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-100' : 'text-white/30 scale-90'}
                            `}>
                                {tab.label.split(' ')[0]}
                            </span>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
