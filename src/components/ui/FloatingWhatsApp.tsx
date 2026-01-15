'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import useCyberneticSound from '@/hooks/useCyberneticSound';

export default function FloatingWhatsApp() {
    const { playHover, playClick } = useCyberneticSound();

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-[90] hidden md:flex items-center gap-4"
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onMouseEnter={playHover}
            onMouseDown={playClick}
        >
            {/* Permanent Label (Speech Bubble) */}
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 flex items-center whitespace-nowrap animate-in fade-in slide-in-from-right-4 duration-700">
                <span className="text-sm text-gray-600 mr-1">Need Help?</span>
                <span className="text-sm font-bold text-gray-900">Chat with us</span>
            </div>

            {/* Button */}
            <a
                href="https://wa.me/971509273927?text=Hello%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] cursor-pointer hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
            >
                <div className="relative w-full h-full">
                    <NextImage
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1280px-WhatsApp.svg.png?20220228223904"
                        alt="WhatsApp"
                        fill
                        className="object-contain drop-shadow-md"
                        priority
                        unoptimized
                    />
                </div>

                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white animate-bounce z-10">
                    1
                </div>
            </a>
        </motion.div>
    );
}
