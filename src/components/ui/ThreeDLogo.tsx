'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ThreeDLogoProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ThreeDLogo({ src, alt, className }: ThreeDLogoProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse Position State
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth movement
    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Transform map: range of motion based on percentage from center
    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
    const brightness = useTransform(ySpring, [-0.5, 0.5], [1.1, 0.9]); // Top brighter, bottom darker

    // Shine effect follows mouse
    // We map -0.5..0.5 to 0..100%
    const shineX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

    // Dynamic styles
    const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}) rotateY(${rotateY})`;

    // Periodic "Flash" Animation (Auto-Shine)
    // We'll use a CSS animation for the auto-shine to keep it independent of interaction

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative w-full h-full cursor-pointer group"
        >
            {/* 1. The Logo Image - Popped out slightly */}
            <motion.div
                style={{
                    transform: "translateZ(20px)",
                    filter: useMotionTemplate`brightness(${brightness}) drop-shadow(0 10px 20px rgba(0,0,0,0.5))`
                }}
                className="relative w-full h-full z-10"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={`object-contain ${className}`}
                    priority
                />
            </motion.div>

            {/* 2. Interactive Shine/Glare Layer */}
            <motion.div
                style={{
                    transform: "translateZ(30px)",
                    background: useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    opacity: xSpring.get() === 0 ? 0 : 1 // Hide when idle (or use hover state)
                }}
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* 3. Auto "Flash" Sweep (Idle Animation) */}
            <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-xl">
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine-sweep" />
            </div>

            {/* 4. Emissive Bottom Glow (Reflection) */}
            <motion.div
                style={{
                    transform: "translateZ(-10px) translateY(20px) scale(0.9)",
                    opacity: 0.4
                }}
                className="absolute inset-0 bg-safemax-orange/20 blur-xl rounded-full z-0"
            />

        </motion.div>
    );
}

// Add this to your global globals.css or tailwind config:
// @keyframes shine-sweep {
//   0% { left: -100%; }
//   20% { left: 200%; }
//   100% { left: 200%; }
// }
// .animate-shine-sweep {
//   animation: shine-sweep 4s infinite ease-in-out;
// }
