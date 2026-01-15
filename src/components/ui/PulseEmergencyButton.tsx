'use client';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

export default function PulseEmergencyButton() {
    return (
        <div className="relative w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center">
            {/* 
                We use a fixed size wrapper to occupy space in the Navbar layout 
                so nothing shifts when the button expands.
            */}

            <motion.a
                href="tel:+971509273927"
                className="relative block pointer-events-auto"
                initial="idle"
                whileHover="hover"
            >
                {/* 
                    DESKTOP: VERTICAL DROPDOWN INTERACTION
                    - Fixed heights for variants ensure super-smooth Framer Motion interpolation.
                    - 'data-nav-obstacle' is HERE so lines track the actual expanding shape.
                */}
                <motion.div
                    layout
                    data-nav-obstacle
                    className="hidden md:flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#DC2626] to-[#991b1b] text-white border border-white/20 cursor-pointer shadow-[0_10px_30px_rgba(220,38,38,0.4)] z-50 backdrop-blur-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    variants={{
                        idle: {
                            width: "72px",
                            height: "72px",
                            borderRadius: "36px",
                            paddingTop: "12px",
                        },
                        hover: {
                            width: "72px",
                            height: "220px", // Fixed height for smooth animation
                            borderRadius: "36px",
                            paddingTop: "12px",
                            y: 74 // Shift down so the top stays pinned while expanding downwards
                        }
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 25,
                        mass: 0.8
                    }}
                >
                    {/* 1. Icon (Always at Top) */}
                    <div className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-inner bg-black/20 z-10 flex items-center justify-center">
                        <NextImage
                            src="https://media.istockphoto.com/id/971654072/vector/red-call-icon.jpg?s=612x612&w=0&k=20&c=bwlNm0pnNs98evZv4x8N3Cq3XQAWIKLEzJPmQpbMgWY="
                            alt="Hotline"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* 2. Vertical Text Container */}
                    <motion.div
                        className="flex flex-col items-center justify-center pt-4 gap-1 w-full"
                        variants={{
                            idle: { opacity: 0, scale: 0.8 },
                            hover: { opacity: 1, scale: 1 }
                        }}
                    >
                        {/* Decorative line connecting icon to text */}
                        <div className="w-[1px] h-4 bg-white/40 mb-1"></div>

                        <span className="writing-vertical-rl text-[11px] font-bold tracking-[0.2em] text-red-100">
                            24/7
                        </span>

                        <span className="writing-vertical-rl text-xs font-black tracking-[0.15em] uppercase text-white mt-1">
                            HOTLINE
                        </span>
                    </motion.div>
                </motion.div>

                {/* Mobile Fallback (Hidden on Desktop) */}
                <div className="md:hidden flex items-center justify-center w-14 h-14 bg-gradient-to-b from-[#DC2626] to-[#991b1b] text-white rounded-full shadow-lg border border-white/20 overflow-hidden relative z-50">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/30 shadow-inner bg-black/20">
                        <NextImage
                            src="https://media.istockphoto.com/id/971654072/vector/red-call-icon.jpg?s=612x612&w=0&k=20&c=bwlNm0pnNs98evZv4x8N3Cq3XQAWIKLEzJPmQpbMgWY="
                            alt="Hotline"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.a>
        </div>
    );
}
