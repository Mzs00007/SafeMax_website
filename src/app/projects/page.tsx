'use client';
import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/cards/ProjectCard';
import FadeInUp from '@/components/animations/FadeInUp';

// Mock Data for Visual Cards (The "Highlights")
const projects = [
    { id: 1, title: 'Burj Khalifa', category: 'Landmarks', description: 'Fire System Maintenance & Integration for the world\'s tallest tower.' },
    { id: 2, title: 'Dubai Tram Depots', category: 'Government', description: 'Integrated Fire Alarm & Voice Evacuation for RTA infrastructure.' },
    { id: 3, title: 'Emaar High-Rises', category: 'Real Estate', description: 'Addressable Fire Systems across Downtown Dubai.' },
    { id: 4, title: 'Dubai Police HQ', category: 'Government', description: 'Advanced Access Control & CCTV Surveillance Architecture.' },
    { id: 5, title: 'Expo 2020 Pavilions', category: 'Landmarks', description: 'Sustainability Pavilion Life Safety Systems.' },
    { id: 6, title: 'Nestle Waters Factory', category: 'Corporate', description: 'Industrial Fire Protection & Suppression Logic.' },
    { id: 7, title: 'Canadian Consulate', category: 'Government', description: 'High-Security Access Systems & Biometrics.' },
    { id: 8, title: 'Amwaj Rotana Hotel', category: 'Hospitality', description: 'Guest Safety & Evacuation Logic.' },
];

const categories = ['All', 'Government', 'Retail', 'Real Estate', 'Hospitality', 'Corporate', 'Landmarks'];

// FULL CLIENT DATA
const MAINTENANCE_CLIENTS = [
    "EMAAR PROPERTIES PJSC", "ROADS AND TRANSPORT AUTHORITY (RTA) – DUBAI TRAM, BUS DEPOT", "IMDAAD LLC", "AL GHURAIR PROPERTIES", "ENOVA FACILITY MANAGEMENT",
    "TRANSGUARD GROUP", "INFINITY COMMUNITY MANAGEMENT", "CONCORDIA", "360 COMMUNITY MANAGEMENT", "STRATUM OWNERS ASSOCIATION",
    "SIBCA", "KHANSAHEB INVESTMENT LLC", "NAKHEEL INVESTMENT", "FITNESS FIRST", "FULL CIRCLE FACILITY MANAGEMENT",
    "MACE MACRO FACILITY MANAGEMENT", "FAKHRUDDIN PROPERTIES", "GAC LOGISTICS, JEBEL ALI FREE ZONE (JAFZA)", "RSA LOGISTICS, DUBAI WORLD CENTRAL (DWC)", "DEYAAR FACILITY MANAGEMENT",
    "CITY TOWER REAL ESTATE", "NESTLE WATERS", "CITADEL PROPERTIES", "DUBAI POLO CLUB", "VOLVO GROUP",
    "SNS PROPERTY MANAGEMENT", "UPS SUPPLY CHAIN SOLUTIONS", "ASTECO PROPERTY MANAGEMENT", "VAKSON FREEHOLD", "AL SAYEGH GROUP",
    "ROTANA GROUP", "STRATA GLOBAL GROUP", "DUBAI SPORTS CITY FACILITY MANAGEMENT", "ETISALAT FACILITY MANAGEMENT", "GULF ENERGY MARITIME (GEM)",
    "FARNEK SERVICES LLC", "PALMA COMMUNITY MANAGEMENT", "MARINA FACILITY MANAGEMENT", "BLOOM FACILITY MANAGEMENT", "AMBIANCE ELECTRCO MECHANICAL"
];

const TURNKEY_CLIENTS = [
    "APPLE STORE (Mall of Emirates/Dubai Mall)", "SAMSUNG HQ, DUBAI MEDIA CITY (DMC)", "LEVEL KIDS (City Walk)", "SHARJAH AIRPORT DUTY FREE",
    "EXPO 2020 Pavilions", "DUBAI MALL (Various Shops)", "CHRISTIAN DIOR", "DOLCE & GABBANA", "MICHAEL KORS",
    "ROBINSON – DUBAI INTERNATIONAL FINANCIAL CENTRE (DIFC)", "LUTETIA CLINIC, DUBAI INTERNATIONAL FINANCIAL CENTRE (DIFC)", "ASTER HEAD QUARTERS", "EMIRATES NBD", "DUBAI PARK & RESORT",
    "LG ELECTRONICS", "DUBIZZLE HQ", "RICHEMONT OFFICE", "CANADIAN CONSULATE", "DUBAI CIVIL ENGINEERING",
    "BOOZ & CO", "DISCOVERY GARDEN BLDGS", "INTERNATIONAL CITY BLDGS", "SWISS TOWER OFFICES", "MULTICHOICE AFRICA",
    "NOOR BANK", "ALPHA TOURS", "ALLEN & OVERY", "JASHANMAL SHOP", "FLIGHT CENTRE", "JUMEIRAH GOLF ESTATES",
    "DUBAI BOWLING CENTER", "AL HAWAI TOWER", "ROAD AND TRANSPORT AUTHORITY (RTA) BUILDINGS", "RED DIAMOND BUILDING", "ANKER MANAGEMENT"
];

export default function Projects() {
    // ... (keep state)
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="bg-white min-h-screen pb-16">
            <PageHero
                title="Engineering Portfolio"
                breadcrumbs={[
                    { label: 'Projects', href: '/projects' }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                description="Showcasing our iconic installations across the UAE."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                {/* Filter */}
                <FadeInUp delay={0.2}>
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                    ? 'bg-safemax-orange text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </FadeInUp>

                {/* Featured Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {filteredProjects.map((project, index) => (
                        <FadeInUp key={project.id} delay={index * 0.1}>
                            <ProjectCard
                                title={project.title}
                                category={project.category}
                                description={project.description}
                                imageUrl="/assets/images/project-placeholder.png"
                            />
                        </FadeInUp>
                    ))}
                </div>

                {/* FULL CLIENT ROSTER SECTION */}
                <section className="border-t border-gray-100 pt-20">
                    <FadeInUp>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-safemax-dark uppercase tracking-wide mb-4">Experience Record</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                We are proud to serve the region's most prestigious organizations, delivering excellence in both Annual Maintenance Contracts and Turnkey Projects.
                            </p>
                        </div>
                    </FadeInUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Maintenance Clients */}
                        <div>
                            <FadeInUp delay={0.2}>
                                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 h-full">
                                    <div className="flex items-center mb-8">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Maintenance Clients</h3>
                                    </div>
                                    <div className="columns-1 sm:columns-2 gap-4 space-y-3 text-sm text-gray-600 font-medium">
                                        {MAINTENANCE_CLIENTS.map((client, i) => (
                                            <div key={i} className="break-inside-avoid hover:text-safemax-orange transition-colors cursor-default mb-2">
                                                • {client}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>

                        {/* Turnkey Clients */}
                        <div>
                            <FadeInUp delay={0.4}>
                                <div className="bg-gray-900 text-gray-300 rounded-3xl p-8 border border-gray-800 h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-safemax-orange/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
                                    <div className="flex items-center mb-8 relative z-10">
                                        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-safemax-orange mr-4">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Turnkey Projects</h3>
                                    </div>
                                    <div className="columns-1 sm:columns-2 gap-4 space-y-3 text-sm font-medium relative z-10">
                                        {TURNKEY_CLIENTS.map((client, i) => (
                                            <div key={i} className="break-inside-avoid hover:text-white transition-colors cursor-default mb-2">
                                                • {client}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
