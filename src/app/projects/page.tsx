'use client';
import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/cards/ProjectCard';
import FadeInUp from '@/components/animations/FadeInUp';
import FeaturedProject from '@/components/portfolio/FeaturedProject';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import ExperienceSection from '@/components/portfolio/ExperienceSection';

// Mock Data for Visual Cards (The "Highlights") with Real Unsplash Images
const projects = [
    {
        id: 1,
        title: 'Burj Khalifa',
        category: 'Landmarks',
        description: 'Fire System Maintenance & Integration for the world\'s tallest tower.',
        imageUrl: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80'
    },
    {
        id: 2,
        title: 'Dubai Tram Depots',
        category: 'Government',
        description: 'Integrated Fire Alarm & Voice Evacuation for RTA infrastructure.',
        imageUrl: 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?w=800&q=80'
    },
    {
        id: 3,
        title: 'Emaar High-Rises',
        category: 'Real Estate',
        description: 'Addressable Fire Systems across Downtown Dubai.',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea904a848bd?w=800&q=80'
    },
    {
        id: 4,
        title: 'Dubai Police HQ',
        category: 'Government',
        description: 'Advanced Access Control & CCTV Surveillance Architecture.',
        imageUrl: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80'
    },
    {
        id: 5,
        title: 'Expo 2020 Pavilions',
        category: 'Landmarks',
        description: 'Sustainability Pavilion Life Safety Systems.',
        imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80'
    },
    {
        id: 6,
        title: 'Nestle Waters Factory',
        category: 'Corporate',
        description: 'Industrial Fire Protection & Suppression Logic.',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    },
    {
        id: 7,
        title: 'Canadian Consulate',
        category: 'Government',
        description: 'High-Security Access Systems & Biometrics.',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    },
    {
        id: 8,
        title: 'Amwaj Rotana Hotel',
        category: 'Hospitality',
        description: 'Guest Safety & Evacuation Logic.',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
    },
    {
        id: 9,
        title: 'Dubai Mall Fashion Ave',
        category: 'Retail',
        description: 'Luxury retail fire suppression systems.',
        imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?w=800&q=80'
    },
    {
        id: 10,
        title: 'City Walk Level Kids',
        category: 'Retail',
        description: 'Smoke management and evacuation planning.',
        imageUrl: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=800&q=80'
    },
    {
        id: 11,
        title: 'Jebel Ali Free Zone',
        category: 'Corporate',
        description: 'Warehouse sprinkler networks and foam systems.',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
    },
    {
        id: 12,
        title: 'Palm Jumeirah Resort',
        category: 'Hospitality',
        description: 'Integrated resort-wide safety command center.',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
    },
    {
        id: 13,
        title: 'Sharjah Airport Duty Free',
        category: 'Government',
        description: 'High-traffic area fire detection upgrades.',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109a33e?w=800&q=80'
    },
    {
        id: 14,
        title: 'Emirates NBD HQ',
        category: 'Corporate',
        description: 'Data center gas suppression systems.',
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80'
    },
    {
        id: 15,
        title: 'Samsung Media City',
        category: 'Corporate',
        description: 'Office complex access control integration.',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
    }
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
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    // Enriched Data for Modal (Mock)
    const projectsWithImages = filteredProjects.map(p => ({
        ...p,
        // Using explicit imageUrl from the array above
        fullDetails: `Comprehensive fire safety and security integration for ${p.title}, ensuring seamless operation and compliance with international safety standards.` // Mock details
    }));

    return (
        <div className="bg-[#050505] min-h-screen pb-0">
            <PageHero
                title="Engineering Portfolio"
                breadcrumbs={[
                    { label: 'Projects', href: '/projects' }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                description="Showcasing our iconic installations across the UAE."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">

                {/* Featured Project Spotlight */}
                <FeaturedProject />

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-all border ${filter === cat
                                ? 'bg-safemax-orange border-safemax-orange text-white shadow-[0_0_20px_rgba(255,87,34,0.4)] transform -translate-y-1'
                                : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* New Masonry Grid */}
                <PortfolioGrid projects={projectsWithImages} />
            </div>

            {/* New Experience Section (Full Width Backgrounds handled inside component) */}
            <div className="bg-gray-50 border-t border-gray-200">
                <ExperienceSection
                    maintenanceClients={MAINTENANCE_CLIENTS}
                    turnkeyClients={TURNKEY_CLIENTS}
                />
            </div>
        </div>
    );
}
