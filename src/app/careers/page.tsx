'use client';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInUp from '@/components/animations/FadeInUp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CareerForm from '@/components/careers/CareerForm';

export default function Careers() {
    return (
        <div className="bg-white min-h-screen pb-16">
            {/* 1. HERO SECTION */}
            <PageHero
                title="Careers"
                breadcrumbs={[
                    { label: 'Careers', href: '/careers' }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                description="Join the team protecting the nation's infrastructure."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 2. CULTURE GALLERY (Masonry Layout) */}
                <div className="mb-32 mt-20">
                    <FadeInUp>
                        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-safemax-dark">
                            Why Engineering Professionals<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-safemax-orange to-red-600">Choose SafeMax</span>
                        </h2>
                    </FadeInUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
                        {/* CARD 1: TRAINING - Tall Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative overflow-hidden rounded-3xl md:row-span-2 shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1581093588402-fdd11a02777e?q=80&w=2069&auto=format&fit=crop"
                                alt="Engineering Training"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform">Continuous Training</h3>
                                <div className="h-1 w-12 bg-safemax-orange mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <p className="text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    Full sponsorship for DCD, SIRA, and NFPA certifications. We invest in your mastery to keep you at the cutting edge of safety.
                                </p>
                            </div>
                        </motion.div>

                        {/* CARD 2: GROWTH - Top Right Wide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative overflow-hidden rounded-3xl md:col-span-2 shadow-2xl min-h-[300px]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1507208773393-40d9fc9f97d8?q=80&w=2094&auto=format&fit=crop"
                                alt="Career Growth"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-center items-start">
                                <h3 className="text-3xl font-bold text-white mb-2 translate-x-4 group-hover:translate-x-0 transition-transform">Career Velocity</h3>
                                <p className="text-lg text-gray-200 max-w-md transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    Clear, documented pathways from Junior Technician to Senior Project Engineer. Your ambition sets the pace.
                                </p>
                            </div>
                        </motion.div>

                        {/* CARD 3: LEGACY - Bottom Center */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative overflow-hidden rounded-3xl shadow-2xl min-h-[250px]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                                alt="Stability and Legacy"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors p-8 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-1">Stability & Legacy</h3>
                                <p className="text-sm text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity">
                                    Serving UAE since 2007. Trusted by government & private sectors.
                                </p>
                            </div>
                        </motion.div>

                        {/* CARD 4: INNOVATION - Bottom Right */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative overflow-hidden rounded-3xl shadow-2xl min-h-[250px]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop"
                                alt="Innovation"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-safemax-orange/80 group-hover:bg-safemax-orange/90 transition-colors p-8 flex flex-col justify-center items-center text-center">
                                <h3 className="text-2xl font-black text-white mb-2">Innovation Hub</h3>
                                <p className="text-white/90 text-sm">
                                    Work with latest AI-driven Fire & Security technologies.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 3. OPEN POSITIONS */}
                <div className="mb-24">
                    <FadeInUp>
                        <SectionHeader title="Open Positions" subtitle="Join our elite task force." />
                    </FadeInUp>

                    <div className="grid grid-cols-1 gap-6 mt-12">
                        {[
                            {
                                title: "Sales Engineer",
                                type: "Sales Department",
                                reqs: [
                                    "Diploma / Bachelor’s degree",
                                    "2+ years work experience in Sales/Business Development",
                                    "Demonstrated results in meeting sales quotas",
                                    "Coordinate sales process: enquiry/RFQ to closing"
                                ],
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                            },
                            {
                                title: "Sr. Fire Pump Service Engineer",
                                type: "Engineering",
                                reqs: [
                                    "Ability to maintain and rectify U/L fire pumps",
                                    "Troubleshoot and maintain pump controllers",
                                    "Knowledge of Testing and commissioning",
                                    "Extensive knowledge of regional fire pumps"
                                ],
                                image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
                            },
                            {
                                title: "Sr. Fire Alarm Technician",
                                type: "Technical",
                                reqs: [
                                    "Education: ITI / DIPLOMA / ENGINEERING",
                                    "Troubleshoot and maintain fire alarm systems",
                                    "Commissioning knowledge: Cooper/Shield/Gent/EST/Simplex"
                                ],
                                image: "https://images.unsplash.com/photo-1555963966-b7ae5404f6bf?q=80&w=2070&auto=format&fit=crop"
                            },
                            {
                                title: "Sr. Fire Fighting Technician",
                                type: "Technical",
                                reqs: [
                                    "Education: ITI / DIPLOMA / ENGINEERING",
                                    "Maintain and repair any fire fighting system",
                                    "Handle replacements of valves (Fire Fighting/Pump System)",
                                    "Knowledge: FM200/Pre Action/Deluge/Foam Systems"
                                ],
                                image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop"
                            },
                            {
                                title: "Central Battery System Service Engineer",
                                type: "Engineering",
                                reqs: [
                                    "Education: ITI / DIPLOMA / ENGINEERING",
                                    "Troubleshoot Central Battery Systems (Tecnoware/CEAG/Inotec/JSB)",
                                    "Commissioning level knowledge preferred"
                                ],
                                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
                            }
                        ].map((job, i) => (
                            <FadeInUp key={i} delay={i * 0.1}>
                                <div className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-safemax-orange/10 transition-all duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-8 -mt-8 z-0 group-hover:bg-safemax-orange/10 transition-colors"></div>

                                    <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                                        {/* Avatar / Role Image */}
                                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                                            <Image
                                                src={job.image}
                                                alt={job.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 group-hover:bg-safemax-orange group-hover:text-white transition-colors">
                                                {job.type}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-safemax-dark mb-4 group-hover:text-safemax-orange transition-colors">{job.title}</h3>

                                            <div className="flex flex-col gap-2">
                                                {job.reqs.map((req, j) => (
                                                    <div key={j} className="flex items-start gap-2 text-left justify-center md:justify-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                                        <span className="text-sm md:text-base font-medium text-gray-600">{req}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="flex-shrink-0 mt-6 md:mt-0 flex flex-col items-center gap-3">
                                            <motion.a
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                href={`mailto:career@safemax.org?subject=${encodeURIComponent(job.title)}`}
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-safemax-orange transition-colors shadow-lg shadow-gray-900/20"
                                            >
                                                <span>Apply via Email</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>

                    {/* 4. APPLICATION FORM */}
                    <FadeInUp delay={0.6}>
                        <div className="mt-16">
                            <CareerForm />
                        </div>
                    </FadeInUp>
                </div>

            </div>
        </div>
    );
}
