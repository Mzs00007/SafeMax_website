'use client';

import { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function SecurityHero() {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse Position State
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for mouse movement
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    // Parallax Transforms
    const bgX = useTransform(mouseX, [-0.5, 0.5], ["2%", "-2%"]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], ["2%", "-2%"]);

    // Text Depth Effect
    const textX = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
    const textY = useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"]);

    // Background Shadow Text
    const textBackX = useTransform(mouseX, [-0.5, 0.5], ["-40px", "40px"]);
    const textBackY = useTransform(mouseY, [-0.5, 0.5], ["-40px", "40px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const xPct = (e.clientX - rect.left) / width - 0.5;
        const yPct = (e.clientY - rect.top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="w-full h-[500px] md:h-[650px] relative bg-slate-950 overflow-hidden flex items-center justify-center perspective-1000 group cursor-default"
        >
            {/* 0. Breadcrumbs (Absolute Top Left) */}
            <div className="absolute top-28 left-6 md:left-12 z-30">
                <Breadcrumbs items={[
                    { label: 'Services' },
                    { label: 'Security Systems', href: '/services/security' }
                ]} />
            </div>

            {/* 1. Background Image with Parallax (Blue/Cyan Tint) */}
            <motion.div
                style={{ x: bgX, y: bgY, scale: 1.1 }}
                className="absolute inset-0 z-0 filter saturate-[0.8]"
            >
                {/* Security/CCTV Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-900/10 to-slate-950" />
            </motion.div>

            {/* 2. Hero Content */}
            <div className="relative z-10 text-center select-none">
                {/* Layer 1: Back Text (Shadow/Depth) */}
                <motion.h1
                    style={{ x: textBackX, y: textBackY }}
                    className="text-8xl md:text-[10rem] font-black text-blue-500/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none blur-sm"
                >
                    SECURE & CONTROL
                </motion.h1>

                {/* Layer 2: Main Text */}
                <motion.div style={{ x: textX, y: textY }} className="relative">
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2 drop-shadow-2xl">
                        INTELLIGENT
                    </h1>
                    <h2 className="text-3xl md:text-6xl font-bold text-cyan-400 tracking-[0.2em] opacity-90 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        SECURITY
                    </h2>
                </motion.div>
            </div>

            {/* 3. Vignette / Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] z-20 pointer-events-none" />

            {/* 4. Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-white flex flex-col items-center gap-2 opacity-60 pointer-events-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-200">Scroll</span>
            </motion.div>
        </div>
    );
}
