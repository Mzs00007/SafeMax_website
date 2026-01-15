'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Home, LifeBuoy, ArrowUp } from 'lucide-react';
import useCyberneticSound from '@/hooks/useCyberneticSound';

interface MobileBottomNavProps {
    onMenuClick: () => void;
    isMenuOpen: boolean;
    onLogoClick: () => void;
}

export default function MobileBottomNav({ onMenuClick, isMenuOpen, onLogoClick }: MobileBottomNavProps) {
    const { playHover, playClick } = useCyberneticSound();

    // Custom SVG Path for the "Curved" Cutout look
    // This path draws a rectangle with a cubic bezier dip in the top center
    // We'll use a distinct width for the curve logic, calculating percentages might be tricky for exact pixels.
    // Simpler approach: Fixed height SVG that stretches width, with a centered curve.

    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isScrollingTop, setIsScrollingTop] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }

            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 50;
            if (scrollPosition >= threshold) {
                setIsAtBottom(true);
            } else {
                setIsAtBottom(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mutual Exclusion: Close Contact Menu if Main Menu opens
    useEffect(() => {
        if (isMenuOpen) {
            setIsContactOpen(false);
        }
    }, [isMenuOpen]);

    const scrollToTop = () => {
        setIsScrollingTop(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsScrollingTop(false), 1000); // Animation duration
    };

    return (
        <>
            {/* BIG SCROLL ANIMATION OVERLAY */}
            <AnimatePresence>
                {isScrollingTop && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ y: 100, scale: 0.8, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: -window.innerHeight, scale: 1.5, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom ease for "shoot up" feel
                            className="flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        >
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                                {/* Base Arrow: Black Body, Red Outline */}
                                <path
                                    d="M12 2L2 12H6V22H18V12H22L12 2Z"
                                    fill="black"
                                    stroke="#DC2626"
                                    strokeWidth="3"
                                    strokeLinejoin="round"
                                />
                                {/* Inline: White Thin Line */}
                                <path
                                    d="M12 2L2 12H6V22H18V12H22L12 2Z"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEW CONTACT MODAL OVERLAY */}
            <AnimatePresence>
                {isContactOpen && (
                    <>
                        {/* Backdrop - Click to Close */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] md:hidden"
                            onClick={() => setIsContactOpen(false)}
                        />

                        {/* Centered Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed inset-0 z-[201] flex flex-col items-center justify-center gap-6 pointer-events-none md:hidden"
                        >
                            <div className="flex flex-col gap-4 pointer-events-auto">
                                {/* WhatsApp */}
                                <motion.a
                                    href="https://wa.me/971509273927?text=Hello%20I%20have%20a%20question"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={playClick}
                                    className="flex items-center gap-4 bg-[#25D366] pl-3 pr-8 py-3 rounded-sm shadow-[0_10px_20px_rgba(37,211,102,0.3)] border-b-4 border-[#128C7E] active:border-b-0 active:translate-y-[4px] transition-all w-[240px]"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="bg-white p-2 rounded-sm flex items-center justify-center w-10 h-10 shadow-sm">
                                        <svg viewBox="0 0 24 24" fill="#25D366" className="w-full h-full">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118 1.428-.214 1.763-1.082 1.957-1.895.099-.413.099-1.652.099-1.652.298-.149.447-.298s-.103-.497-.301-.645zM12 20.916c-1.928 0-3.83-.5-5.59-1.545l-4.17 1.024 1.112-4.062a9.155 9.155 0 01-1.458-5.32c0-5.013 4.07-9.082 9.106-9.082 2.43 0 4.71 1.053 6.305 2.753a8.913 8.913 0 012.632 6.305c0 5.034-3.957 9.082-9.037 9.082V20.916z" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-lg font-black tracking-widest uppercase">WhatsApp</span>
                                </motion.a>

                                {/* Call */}
                                <motion.a
                                    href="tel:+971509273927"
                                    onClick={playClick}
                                    className="flex items-center gap-4 bg-[#DC2626] pl-3 pr-8 py-3 rounded-sm shadow-[0_10px_20px_rgba(220,38,38,0.3)] border-b-4 border-[#991b1b] active:border-b-0 active:translate-y-[4px] transition-all w-[240px]"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="relative w-10 h-10 rounded-sm overflow-hidden border-2 border-white/20 shadow-sm">
                                        <Image
                                            src="https://i.pinimg.com/736x/39/fe/ef/39feefdce5c11eae5f022066426d384b.jpg"
                                            alt="Call"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-white text-lg font-black tracking-widest uppercase">Call Now</span>
                                </motion.a>
                            </div>

                            {/* Close Text Hint */}
                            <span className="text-white/50 text-xs font-medium uppercase tracking-[0.2em] mt-8 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                Tap anywhere to close
                            </span>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className={`fixed bottom-0 left-0 right-0 md:hidden ${isMenuOpen ? 'z-[50] pointer-events-none' : 'z-[100]'}`}>

                {/* 1. ANIMATING NAVBAR (Slides Down) */}
                <motion.div
                    className="relative w-full h-[90px] filter drop-shadow-[0_-5px_10px_rgba(0,0,0,0.3)]"
                    animate={{ y: isMenuOpen ? "105%" : (isAtBottom ? "60%" : "0%") }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    {/* SVG Background Shape */}
                    <div className="absolute inset-0 w-full h-full text-black pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 375 90" preserveAspectRatio="none">
                            <path
                                d="M0,0 L130,0 C150,0 150,45 187.5,45 C225,45 225,0 245,0 L375,0 L375,90 L0,90 Z"
                                fill="#111" // Dark background
                            />
                        </svg>
                        {/* Border Line */}
                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 375 90" preserveAspectRatio="none">
                            <path
                                d="M0,1 L130,1 C150,1 150,46 187.5,46 C225,46 225,1 245,1 L375,1"
                                fill="none"
                                stroke="#DC2626" // Red Border Top
                                strokeWidth="2"
                                strokeOpacity="0.5"
                            />
                        </svg>
                    </div>

                    {/* Content Container */}
                    <div className="relative w-full h-full flex items-start justify-between px-8 pt-4">

                        {/* LEFT: CONTACT MENU (Pop-up) */}
                        <div className="relative flex flex-col items-start justify-end mb-1">

                            {/* Main CONTACT Trigger Button */}
                            <motion.button
                                className="flex flex-col justify-center items-center gap-1 relative z-20"
                                onClick={() => {
                                    playClick();
                                    if (!isContactOpen && isMenuOpen) onMenuClick(); // Close Main Menu if opening Contact
                                    setIsContactOpen(!isContactOpen);
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.9, y: 0 }}
                                initial="idle"
                            >
                                <div className={`w-14 h-14 bg-white rounded-sm flex flex-col items-center justify-center gap-[3px] border border-[#DC2626] border-b-4 border-b-red-700 shadow-[0_4px_10px_rgba(220,38,38,0.2)] relative transition-all duration-100 ${isContactOpen ? 'bg-red-50 border-red-500 border-b-0 translate-y-[4px] shadow-none' : ''}`}>
                                    {isContactOpen ? (
                                        <X size={28} className="text-[#DC2626]" />
                                    ) : (
                                        <>
                                            <motion.span className="block w-7 h-1 bg-[#111] rounded-sm" />
                                            <motion.span className="h-3.5 bg-white rounded-sm flex items-center justify-center overflow-hidden border border-gray-300 w-[40px]">
                                                <span className="text-[6px] font-black text-black tracking-widest pt-[1px] px-1 uppercase">Chat</span>
                                            </motion.span>
                                            <motion.span className="block w-7 h-1 bg-[#DC2626] rounded-sm" />
                                        </>
                                    )}
                                </div>
                                <span className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${isContactOpen ? 'text-red-500' : 'text-gray-400'}`}>
                                    {isContactOpen ? "Close" : "Contact"}
                                </span>
                            </motion.button>
                        </div>

                        {/* CENTER STACK: Logo & Back to Top */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full flex flex-col items-center justify-end pb-2 pointer-events-none">
                            {/* Logo (Floating Higher) */}
                            <motion.div
                                className="absolute -top-[35px] pointer-events-auto"
                                animate={{
                                    y: isAtBottom ? 100 : 0,
                                    opacity: isAtBottom ? 0 : 1,
                                    pointerEvents: isAtBottom ? 'none' : 'auto'
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <Link
                                    href="/"
                                    onClick={() => {
                                        playClick();
                                        onLogoClick();
                                    }}
                                >
                                    <motion.div
                                        className="w-20 h-20 bg-[#DC2626] rounded-full flex items-center justify-center border-4 border-[#111] shadow-[0_6px_0_#991b1b] relative z-20 overflow-hidden active:shadow-none active:translate-y-[6px] transition-all"
                                        whileTap={{ scale: 0.95 }}
                                        animate={{
                                            boxShadow: ["0 6px 0 #991b1b", "0 6px 0 #991b1b", "0 6px 0 #991b1b"] // Stabilize shadow, remove pulse for solid feel
                                        }}
                                    >
                                        <div className="relative w-14 h-14">
                                            <Image
                                                src="/assets/images/logo-white.png"
                                                alt="Home"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </div>

                        {/* RIGHT BUTTON: Custom 3-Color Hamburger */}
                        <motion.button
                            className="flex flex-col justify-center items-center gap-1 mb-1"
                            onClick={() => {
                                playClick();
                                onMenuClick();
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.9, y: 0 }}
                            initial="idle"
                        >
                            {isMenuOpen ? (
                                <div className="w-14 h-14 bg-white rounded-sm flex items-center justify-center text-black border border-[#DC2626] shadow-none translate-y-[4px] transition-transform">
                                    <X size={28} />
                                </div>
                            ) : (
                                // 3-Color Hamburger State (Now in Sharp Square)
                                <div className="w-14 h-14 bg-white rounded-sm flex flex-col items-center justify-center gap-[3px] border border-[#DC2626] border-b-4 border-b-red-700 shadow-[0_4px_10px_rgba(220,38,38,0.2)] relative z-10 transition-all duration-100 active:shadow-none active:border-b-0 active:translate-y-[4px]">
                                    {/* Line 1: Black - Slides Left */}
                                    <motion.span
                                        className="block w-7 h-1 bg-[#111] rounded-sm"
                                        variants={{
                                            idle: { x: 0 },
                                            hover: { x: -2 },
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />

                                    {/* Line 2: White Pill with MENU text */}
                                    <motion.span
                                        className="h-3.5 bg-white rounded-sm flex items-center justify-center overflow-hidden border border-gray-300"
                                        variants={{
                                            idle: { width: 34 },
                                            hover: { width: 40 },
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <span className="text-[7px] font-black text-black tracking-widest pt-[1px] px-1 uppercase">Menu</span>
                                    </motion.span>

                                    {/* Line 3: Red - Slides Right */}
                                    <motion.span
                                        className="block w-7 h-1 bg-[#DC2626] rounded-sm"
                                        variants={{
                                            idle: { x: 0 },
                                            hover: { x: 2 },
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                </div>
                            )}
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{isMenuOpen ? "Close" : "Navigation"}</span>
                        </motion.button>

                    </div>
                </motion.div >

                {/* 2. INDEPENDENT BACK TO TOP BUTTON (Stays Visible) */}
                <AnimatePresence>
                    {
                        showBackToTop && (
                            <motion.button
                                initial={{ opacity: 0, y: 5, scale: 1 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: isAtBottom ? 1.2 : 1,
                                    borderColor: isAtBottom ? ["#DC2626", "#EF4444", "#DC2626"] : "#DC2626"
                                }}
                                transition={{
                                    scale: { duration: 0.3 },
                                    borderColor: { duration: 2, repeat: Infinity }
                                }}
                                exit={{ opacity: 0, y: 5, scale: 1 }}
                                onClick={scrollToTop}
                                className="absolute bottom-[4px] left-1/2 -translate-x-1/2 pointer-events-auto bg-black border border-[#DC2626] text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm hover:bg-[#111] active:scale-95 z-[150] whitespace-nowrap flex items-center gap-1 overflow-hidden"
                            >
                                <span>Back to Top</span>
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowUp size={10} />
                                </motion.div>
                            </motion.button>
                        )
                    }
                </AnimatePresence >

            </div >
        </>
    );
}
