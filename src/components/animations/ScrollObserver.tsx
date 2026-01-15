'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollObserverProps {
    children: ReactNode;
    className?: string;
    threshold?: number; // 0 to 1, how much of item must be visible
    delay?: number;
}

export default function ScrollObserver({
    children,
    className = "",
    threshold = 0.2,
    delay = 0
}: ScrollObserverProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: threshold }}
            transition={{
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom "Out" Easing for premium feel
                delay: delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
