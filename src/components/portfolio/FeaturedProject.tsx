'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function FeaturedProject() {
    return (
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden mb-24">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=2000&auto=format&fit=crop"
                    alt="Burj Khalifa"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 lg:mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-safemax-orange/10 border border-safemax-orange/20 rounded-full backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-safemax-orange animate-pulse" />
                        <span className="text-safemax-orange text-xs font-bold tracking-widest uppercase">Featured Masterpiece</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        BURJ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">KHALIFA</span>
                    </h1>

                    <p className="text-gray-300 text-lg max-w-xl leading-relaxed border-l-2 border-safemax-orange pl-6">
                        Integrating state-of-the-art fire suppression logic into the world's tallest structure. A testament to engineering precision at 828 meters.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-sm hover:bg-gray-200 transition-all">
                            <span>View Case Study</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Right Side Stats / Visuals */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="hidden lg:grid grid-cols-2 gap-4"
                >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-sm">
                        <h4 className="text-4xl font-bold text-white mb-1">100%</h4>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Compliance Rate</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-sm">
                        <h4 className="text-4xl font-bold text-white mb-1">24/7</h4>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">System Monitoring</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-sm col-span-2">
                        <h4 className="text-xl font-bold text-white mb-2">Systems Integrated</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Fire Alarm', 'Voice Evac', 'BMS Integration'].map(tag => (
                                <span key={tag} className="text-xs text-gray-300 bg-black/50 px-2 py-1 rounded-sm border border-white/10">{tag}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-safemax-orange to-transparent opacity-50" />
            </motion.div>
        </section>
    );
}
