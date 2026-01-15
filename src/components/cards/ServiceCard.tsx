'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    desc: string;
    icon?: React.ReactNode;
    href?: string;
    delay?: number;
}

export default function ServiceCard({ title, desc, icon, href = "/services/fire", delay = 0 }: ServiceCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative bg-white p-8 rounded-2xl border-[0.5px] border-gray-200 hover:border-safemax-orange/30 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
            {/* Engineering Border Animation - Clockwise */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-safemax-orange/10 transition-colors" />

            {/* Icon Pop */}
            <motion.div
                className="w-16 h-16 bg-safemax-orange/10 rounded-xl flex items-center justify-center mb-6 text-safemax-orange group-hover:bg-safemax-orange group-hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                <div className="w-8 h-8">
                    {icon || (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )}
                </div>
            </motion.div>

            <h3 className="text-xl font-bold mb-3 text-safemax-dark group-hover:text-safemax-orange transition-colors duration-300">
                {title}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
                {desc}
            </p>

            <Link href={href} className="inline-flex items-center text-sm font-bold text-safemax-dark group-hover:text-safemax-orange transition-colors">
                TECHNICAL SPECS <span className="ml-2 group-hover:translate-x-1.5 transition-transform">→</span>
            </Link>
        </motion.div>
    );
}
