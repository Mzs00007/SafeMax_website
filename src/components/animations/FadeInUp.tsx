'use client';
import { motion } from 'framer-motion';

interface FadeInUpProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function FadeInUp({ children, delay = 0, className = "" }: FadeInUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} // Start: invisible & 30px down
            whileInView={{ opacity: 1, y: 0 }} // End: visible & original position
            viewport={{ once: true, margin: "-50px" }} // Trigger slightly before element is fully in view
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.22, 1, 0.36, 1] // "Engineering" Cubic Bezier
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
