'use client';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

export default function PulseEmergencyButton() {
    return (
        <motion.a
            href="tel:+971509273927"
            className="relative group flex items-center justify-center pointer-events-auto"
            whileHover="hover"
            initial="idle"
            whileTap={{ scale: 0.95 }}
        >
            {/* Desktop: Expanding 3D Pill - Thicker & Chunkier - SMOOTH ANIMATION FIXED */}
            <motion.div
                className="hidden md:flex items-center gap-3 overflow-hidden bg-red-600 text-white rounded-full border-[3px] border-black/20 h-14 cursor-pointer"
                variants={{
                    idle: {
                        width: "56px",
                        paddingLeft: "4px", // Reduced padding to fit image
                        paddingRight: "4px",
                        y: 0,
                        boxShadow: "0px 6px 0px #991b1b, 0px 10px 20px rgba(220,38,38,0.5)"
                    },
                    hover: {
                        width: "190px",
                        paddingLeft: "6px",
                        paddingRight: "20px",
                        y: 4, // Moves down (pressed effect)
                        boxShadow: "0px 2px 0px #991b1b, 0px 5px 10px rgba(220,38,38,0.3)"
                    }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* 1. Icon (Always Visible) - REPLACED WITH IMAGE */}
                <div className="relative z-10 shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                    <NextImage
                        src="https://i.pinimg.com/736x/39/fe/ef/39feefdce5c11eae5f022066426d384b.jpg"
                        alt="Hotline"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* 2. Text (Reveals on Hover) */}
                <motion.span
                    className="whitespace-nowrap font-bold text-base tracking-wide"
                    variants={{
                        idle: { opacity: 0, x: 20 },
                        hover: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    24/7 HOTLINE
                </motion.span>
            </motion.div>

            {/* Mobile: Simple 3D Icon Button - REPLACED WITH IMAGE */}
            <div className="md:hidden flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow-[0_4px_0_#991b1b] border-2 border-black/20 active:shadow-none active:translate-y-[4px] overflow-hidden">
                <div className="relative w-full h-full">
                    <NextImage
                        src="https://i.pinimg.com/736x/39/fe/ef/39feefdce5c11eae5f022066426d384b.jpg"
                        alt="Hotline"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </motion.a>
    );
}
