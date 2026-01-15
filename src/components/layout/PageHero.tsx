'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
    label: string;
    href: string;
}

interface PageHeroProps {
    title: string;
    breadcrumbs: Breadcrumb[];
    backgroundImage?: string;
    description?: string;
}

export default function PageHero({ title, breadcrumbs, backgroundImage, description }: PageHeroProps) {
    return (
        <section className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                {backgroundImage ? (
                    <div
                        className="w-full h-full bg-cover bg-center opacity-40 scale-105"
                        style={{ backgroundImage: `url('${backgroundImage}')` }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-900/40 via-black to-black opacity-80" />
                )}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">

                {/* 1. Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl"
                >
                    {title}
                </motion.h1>

                {/* Optional Description */}
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed hidden md:block"
                    >
                        {description}
                    </motion.p>
                )}

                {/* 2. Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-2 mt-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        <Home size={14} className="mb-0.5" />
                        <span className="hidden xs:inline">HOME</span>
                    </Link>

                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center gap-2">
                            <ChevronRight size={12} className="text-gray-600" />
                            <Link
                                href={crumb.href}
                                className={`text-xs md:text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${index === breadcrumbs.length - 1
                                    ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] pointer-events-none'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {crumb.label}
                            </Link>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
