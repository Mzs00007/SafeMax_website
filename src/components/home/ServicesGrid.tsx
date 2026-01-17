'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Settings, Shield, Wrench, HardHat, Package, FileText } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInUp from '@/components/animations/FadeInUp';

// --- Services Data ---
const SERVICES = [
    {
        id: 'amc',
        title: 'AMC',
        desc: 'Annual Maintenance Contracts',
        icon: <FileText className="w-8 h-8" />,
        link: '/services/fire?tab=amc',
        color: 'bg-blue-600',
        colSpan: 'md:col-span-2',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/074/236/908/small_2x/skilled-technician-in-safety-gear-performs-maintenance-on-industrial-plumbing-system-with-wrench-photo.jpg' // Industrial Maintenance
    },
    {
        id: 'rect',
        title: 'AMC Rectification Works',
        desc: 'Corrective Maintenance & Repairs',
        icon: <Wrench className="w-8 h-8" />,
        link: '/services/fire?tab=rectification',
        color: 'bg-safemax-orange',
        colSpan: 'md:col-span-1',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/055/122/851/small_2x/industrial-control-room-with-piping-and-equipment-for-managing-fluid-systems-in-a-commercial-facility-photo.jpg' // Technician Repairing
    },
    {
        id: 'fitout',
        title: 'Fitout',
        desc: 'Interior Fire Safety Integration',
        icon: <HardHat className="w-8 h-8" />,
        link: '/services/fire?tab=fitout',
        color: 'bg-emerald-600',
        colSpan: 'md:col-span-1',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/011/808/128/small_2x/fire-extinguisher-system-on-the-wall-with-fire-exit-door-sign-for-emergency-stairwell-fire-for-escape-in-building-or-apartment-photo.jpg' // Construction/Interior
    },
    {
        id: 'projects',
        title: 'Projects',
        desc: 'Turnkey Fire Engineering',
        icon: <Settings className="w-8 h-8" />,
        link: '/projects',
        color: 'bg-safemax-dark',
        colSpan: 'md:col-span-2',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/074/047/118/small_2x/a-woman-in-an-orange-vest-and-safety-vest-is-standing-in-front-of-pipes-photo.jpg' // Construction Site
    },
    {
        id: 'trading',
        title: 'Trading',
        desc: 'Equipment Supply & Logistics',
        icon: <Package className="w-8 h-8" />,
        link: '/services/trading',
        color: 'bg-amber-600',
        colSpan: 'md:col-span-1',
        image: 'https://www.variex.in/fire-fighting-equipment-banner-2/' // Warehouse
    },
    {
        id: 'security',
        title: 'Security Systems',
        desc: 'CCTV, Access Control & ELV',
        icon: <Shield className="w-8 h-8" />,
        link: '/services/security',
        color: 'bg-indigo-600',
        colSpan: 'md:col-span-2',
        image: 'https://pbs.twimg.com/media/Ed7UeT8XkAUYg3C.jpg:large' // CCTV
    }
];

export default function ServicesGrid() {
    return (
        <section className="py-24 relative z-10 bg-white/5 backdrop-blur-sm"> {/* Reduced bg opacity */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeInUp>
                    <SectionHeader
                        title="Our Core Competencies"
                        subtitle="Comprehensive life safety solutions across six critical verticals."
                        light={true}
                    />
                </FadeInUp>

                {/* Bento Grid Layout */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative group overflow-hidden rounded-3xl shadow-2xl border border-white/20 ${service.colSpan} bg-gray-900`}
        >
            <Link href={service.link} className="block h-full w-full p-8 flex flex-col justify-between relative z-20">

                {/* Header */}
                <div className="flex justify-between items-start">
                    {/* Icon with Glass Backdrop */}
                    <div className={`p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg group-hover:bg-safemax-orange/80 group-hover:border-safemax-orange transition-all duration-300`}>
                        {service.icon}
                    </div>

                    <motion.div
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover:bg-white group-hover:text-safemax-orange transition-colors"
                        whileHover={{ scale: 1.1, rotate: -45 }}
                    >
                        <ArrowRight size={20} />
                    </motion.div>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                        {service.title}
                    </h3>
                    <p className="text-gray-200 font-medium text-sm drop-shadow-sm">{service.desc}</p>
                </div>
            </Link>

            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 z-0">
                {/* Image - Using standard img to avoid domain config issues for demo */}
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay for Text Readability - Darker at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 group-hover:via-black/50 transition-colors duration-500"></div>

                {/* Color Tint on Hover */}
                <div className={`absolute inset-0 ${service.color} opacity-0 group-hover:opacity-40 mix-blend-overlay transition-opacity duration-500`}></div>
            </div>
        </motion.div>
    );
}
