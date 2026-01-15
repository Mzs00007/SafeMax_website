'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ExperienceSectionProps {
    maintenanceClients: string[];
    turnkeyClients: string[];
}

// Helper to assign deterministic images based on keywords
const getClientImage = (name: string, index: number) => {
    const n = name.toLowerCase();

    // SPECIFIC ENTITIES or CATEGORIES
    if (n.includes('burj')) return 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80'; // Burj-like
    if (n.includes('emaar')) return 'https://images.unsplash.com/photo-1512453979798-5ea904a848bd?w=800&q=80'; // Emaar highrises
    if (n.includes('dubai mall') || n.includes('mall of emirates')) return 'https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?w=800&q=80'; // Mall interior
    if (n.includes('airport')) return 'https://images.unsplash.com/photo-1436491865332-7a61a109a33e?w=800&q=80';
    if (n.includes('police') || n.includes('consulate')) return 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80';
    if (n.includes('hotel') || n.includes('resort')) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'; // Luxury Hotel
    if (n.includes('tram') || n.includes('metro') || n.includes('rta')) return 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?w=800&q=80'; // Transport
    if (n.includes('factory') || n.includes('industrial') || n.includes('nestle')) return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'; // Industrial

    // ABSTRACT FALLBACKS (High Quality)
    const abstracts = [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // Glass
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', // Architecture
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80', // Interior
        'https://images.unsplash.com/photo-1555899434-94d1368d7fe6?w=800&q=80', // Tech
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'  // Office
    ];
    return abstracts[index % abstracts.length];
};

export default function ExperienceSection({ maintenanceClients, turnkeyClients }: ExperienceSectionProps) {

    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background Ambient Light */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-900 via-black to-black z-0" />

            <div className="container mx-auto px-4 relative z-10">

                {/* HEADLINE */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                    >
                        The Trust Archive
                    </motion.h2>
                </div>

                {/* 1. MAINTENANCE GROUP - "THE STREAM" (Horizontal Infinite Marquee) */}
                <div className="mb-32 relative">
                    <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                        <div>
                            <span className="block text-safemax-orange font-bold tracking-[0.2em] uppercase text-xs mb-2">Ongoing Contracts</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Maintenance Operations</h3>
                        </div>
                        <div className="hidden md:block text-gray-500 text-sm">
                            <span className="animate-pulse">●</span> Live Stream
                        </div>
                    </div>

                    {/* Marquee Container */}
                    <div className="w-full overflow-hidden mask-gradient">
                        <motion.div
                            className="flex gap-6 w-max hover:pause animate-marquee"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            {[...maintenanceClients, ...maintenanceClients].map((client, i) => (
                                <div
                                    key={`m-${i}`}
                                    className="shrink-0 w-[300px] md:w-[400px] aspect-video relative group overflow-hidden rounded-sm bg-gray-900 border border-white/10"
                                >
                                    <Image
                                        src={getClientImage(client, i % maintenanceClients.length)}
                                        alt={client}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
                                        <h4 className="text-lg font-bold text-white leading-tight group-hover:text-safemax-orange transition-colors">
                                            {client}
                                        </h4>
                                        <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                            Annual Contract
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* 2. TURNKEY GROUP - "THE GALLERY" (Vertical Grid) */}
                <div>
                    <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                        <div className="text-right w-full">
                            <span className="block text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">Completed Masterpieces</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Turnkey Projects</h3>
                        </div>
                    </div>

                    {/* Vertical Masonry/Grid */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.05 } }
                        }}
                    >
                        {turnkeyClients.map((client, i) => (
                            <motion.div
                                key={`t-${i}`}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8, y: 30 }, // Scale up from bottom
                                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
                                }}
                                className="aspect-[3/4] relative group overflow-hidden rounded-sm bg-gray-900 border border-white/5 hover:border-white/20 transition-all shadow-lg hover:shadow-2xl"
                            >
                                <Image
                                    src={getClientImage(client, i + 50)}
                                    alt={client}
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 p-5 flex flex-col justify-end">
                                    <div className="w-8 h-1 bg-blue-500 mb-4 w-0 group-hover:w-8 transition-all duration-500" />
                                    <h4 className="text-sm md:text-base font-bold text-white leading-tight">
                                        {client}
                                    </h4>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                                        Full Installation
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
