'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInUp from '@/components/animations/FadeInUp';
import HexagonHive from '@/components/ui/HexagonHive';
import ProductShowcase from '@/components/ui/ProductShowcase';
import MobileServiceNav from '@/components/layout/MobileServiceNav';
import PageHero from '@/components/layout/PageHero';
import FireHero3D from '@/components/ui/ThreeHero/FireHero3D';
import FAQSection from '@/components/ui/FAQSection';
import ServiceSidebarForm from '@/components/services/ServiceSidebarForm';
import { FileText, Wrench, HardHat, Settings, Shield, CheckCircle } from 'lucide-react';

// --- HIVE DATA FOR FIRE ENGINEERING ---
const AMC_HIVE = [
    {
        image: 'https://www.mepmiddleeast.com/cloud/2023/04/19/1636140150072.jpg',
        title: 'Fire Pumps',
        subtitle: 'Weekly Testing',
        description: 'Comprehensive testing of centrifugal and vertical turbine fire pumps to ensure hydraulic performance meets NFPA 25 standards.'
    },
    {
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQiws_iKzE-POW5UY2atnifcHd-3WVAz5WdGw5E4rB4rQNpwqXwWguXMdplZzzabwThluhciz5GgVHQPgnyBR5NkOJtf6RhvxBerKvKaSheVaYs9MvPyUSXE0o5U-SZ0SdU673CGlSM&usqp=CAc',
        title: 'Control Panels',
        subtitle: 'Loop Verification',
        description: 'Diagnostic checks of Fire Alarm Control Panels (FACP) to verify loop integrity, battery health, and signal transmission reliability.'
    },
    {
        image: 'https://oustfire.com/wp-content/uploads/2025/10/sprinkler.png',
        title: 'Sprinklers',
        subtitle: 'Pressure Checks',
        description: 'Inspection of wet and dry pipe sprinkler systems, including zone control valve cycling and flow switch activation tests.'
    },
    {
        image: 'https://www.detnov.com/wp-content/uploads/2019/10/DOA-K-WP.jpg',
        title: 'Emergency Lights',
        subtitle: 'Battery Load Test',
        description: 'Duration testing of emergency and exit lighting systems to guarantee 180-minute illumination during power outages.'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iuAyKpZnlzKfy6e_ZSDDW2ZW-wnYH6qc0g&s',
        title: '24/7 Response',
        subtitle: '4-Hour SLA',
        description: 'Rapid deployment of technical teams for critical system failures, ensuring minimum downtime and continuous site safety.'
    },
];

const RECTIFICATION_HIVE = [
    {
        image: 'https://shutgun.ca/wp-content/uploads/2023/09/Technician-repairing-a-fire-sprinkler-system.jpg',
        title: 'Pipe Replacement',
        subtitle: 'Corrosion Repair',
        description: 'Replacement of corroded or leaking firefighting pipes with ASTM-grade schedule 40 mild steel or galvanized piping.'
    },
    {
        image: 'https://foxvalleyfire.com/wp-content/uploads/2022/03/Fire-Alarm-System-Update-OLD-NEW-862x694.jpg',
        title: 'Panel Upgrades',
        subtitle: 'DCD Compliance',
        description: 'Retrofitting legacy fire panels with modern addressable systems to meet latest Dubai Civil Defence (DCD) 24/7 monitoring regulations.'
    },
    {
        image: 'https://media.licdn.com/dms/image/v2/C5612AQGhYAZ-nt2Pdw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520132155601?e=2147483647&v=beta&t=BQL3dFI5vsivVQnXPYDOuf37t1v6hztQFlv2MkQPCq8',
        title: 'Hydraulic Fixes',
        subtitle: 'Valve Replacement',
        description: 'Repair and replacement of defective OS&Y valves, butterfly valves, and check valves to restore full system hydraulic integrity.'
    },
    {
        image: 'https://structuralpanels.ca/wp-content/uploads/2025/07/Industrial-building-with-red-pipe-fire-sprinkler-system.jpg',
        title: 'System Expansion',
        subtitle: 'Loop Extension',
        description: 'Extending existing fire alarm loops and sprinkler lines to cover new facility wings or building extensions.'
    },
];

const FITOUT_HIVE = [
    {
        image: 'https://2020fireprotection.com.au/wp-content/uploads/2025/05/service-art-10.jpg',
        title: 'Office Fitouts',
        subtitle: 'Sprinkler Relocation',
        description: 'Modification of sprinkler grids and smoke detector layouts to align with new partition walls and ceiling designs.'
    },
    {
        image: 'https://www.zaricode.com/wp-content/uploads/2024/11/shopping-mall-fire-protection-plan-1024x512.jpg',
        title: 'Retail Spaces',
        subtitle: 'Aesthetic Integration',
        description: 'Installation of concealed sprinkler heads and color-matched detectors to maintain high aesthetic standards in luxury retail units.'
    },
    {
        image: 'https://humanfocus.co.uk/wp-content/uploads/How-To-Enhance-Fire-Safety-1200x675.jpg',
        title: 'Warehouse',
        subtitle: 'High-Bay Protection',
        description: 'Installation of Early Suppression Fast Response (ESFR) sprinklers and beam detectors for high-ceiling storage facilities.'
    },
    {
        image: 'https://honeywell.scene7.com/is/image/Honeywell65/hbt-Fire-P1907213-primaryimage',
        title: 'Core Drilling',
        subtitle: 'Detector Addition',
        description: 'Precision core drilling for new cable routes and device installation in existing concrete structures.'
    },
];

const PROJECTS_HIVE = [
    {
        image: 'https://fire-techinfo.com/wp-content/uploads/2023/06/Synchron-S_FireProtection_HighRiseBuildings-en12.png',
        title: 'High-Rise',
        subtitle: 'Tower Protection',
        description: 'Complete life safety system design and installation for mixed-use skyscrapers, including zone pressurization and voice evacuation.'
    },
    {
        image: 'https://1973249.fs1.hubspotusercontent-na1.net/hubfs/1973249/Fire_Protection_Code%20_Requriments.jpg',
        title: 'Commercial',
        subtitle: 'Mall & Retail',
        description: 'Scalable fire alarm and firefighting solutions for large-scale shopping malls, ensuring full coverage of common areas and tenant units.'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHY_9ZieqvhQ93dos93ZDydqJQhd_2EY98FQ&s',
        title: 'Industrial',
        subtitle: 'Factory Safety',
        description: 'Heavy-duty fire protection systems for manufacturing plants, including deluge systems and foam suppression for hazardous areas.'
    },
    {
        image: 'https://cdn.emrbz.com/d/7f0a78203117cb3e1849b212c91de13584155a3b/70/1360x906%5E/image',
        title: 'Residential',
        subtitle: 'Villa Compounds',
        description: 'Community-wide fire alarm networks linking individual villas to a central security gatehouse for rapid incident response.'
    },
    {
        image: 'https://bohlarintegrated.com/wp-content/uploads/2016/03/fire-systems.jpg',
        title: 'Infrastructure',
        subtitle: 'Public Sector',
        description: 'Fire safety engineering for public infrastructure projects, including metro stations, airports, and government facilities.'
    },
];


function FireEngineeringContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
            const element = document.getElementById('fire-content-area');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [tabParam]);

    const handleTabChange = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById('fire-content-area');
        if (element) {
            // Only scroll if we are on mobile (check window width or just always scroll for better focus)
            const yOffset = -100; // Offset for sticky header
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const TABS = [
        { id: 'overview', label: 'Overview', icon: <Shield size={20} /> },
        { id: 'amc', label: 'AMC Maint.', icon: <FileText size={20} /> },
        { id: 'rectification', label: 'Rectification', icon: <Wrench size={20} /> },
        { id: 'fitout', label: 'Fitout', icon: <HardHat size={20} /> },
        { id: 'projects', label: 'Projects', icon: <Settings size={20} /> },
    ];

    const getTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <FadeInUp key="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-safemax-dark">Total Fire Protection Lifecycle</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    SafeMax Fire & Safety provides end-to-end fire engineering solutions, from initial design and installation to annual maintenance and regulatory compliance. We are certified by Dubai Civil Defence (DCD) and ISO 9001:2015 accredited.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Class A+ DCD Certified Contractor",
                                        "24/7 Emergency Response Team",
                                        "SIRA & Dubai Police Approved",
                                        "End-to-End Compliance Management"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <CheckCircle size={14} />
                                            </div>
                                            <span className="font-medium text-gray-800">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-100 rounded-3xl h-80 relative overflow-hidden flex items-center justify-center text-gray-300 text-6xl font-black">
                                <div className="absolute inset-0 bg-[url('/assets/images/service-bg-1.jpg')] bg-cover bg-center opacity-30 blur-[2px]"></div>
                                <span className="relative z-10">SafeMax</span>
                            </div>
                        </div>
                    </FadeInUp>
                );
            case 'amc':
                return (
                    <FadeInUp key="amc">
                        <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                            <h3 className="text-3xl font-bold mb-6 text-blue-900">Annual Maintenance Contracts (AMC)</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                Our AMC services ensure your fire safety systems remain operational and compliant 24/7. We follow a rigorous preventive maintenance schedule in line with UAE Fire & Life Safety Code of Practice.
                            </p>
                            <HexagonHive items={AMC_HIVE} />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Preventive Maintenance</h4>
                                    <p className="text-sm text-gray-500">Scheduled quarterly visits to test all sensors, pumps, and control panels.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Corrective Maintenance</h4>
                                    <p className="text-sm text-gray-500">Immediate repair of faults detected during routine checks or reported by the client.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Emergency Support</h4>
                                    <p className="text-sm text-gray-500">24/7 rapid response team for critical system failures and alarms.</p>
                                </div>
                            </div>
                        </div>
                    </FadeInUp>
                );
            case 'rectification':
                return (
                    <FadeInUp key="rectification">
                        <div className="bg-orange-50/50 rounded-3xl p-8 border border-orange-100">
                            <h3 className="text-3xl font-bold mb-6 text-orange-900">Rectification Works</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                We specialize in bringing aging or non-compliant systems back to DCD standards. Whether it's replacing faulty wiring, upgrading control panels, or fixing hydraulic issues in sprinkler networks.
                            </p>
                            <HexagonHive items={RECTIFICATION_HIVE} />
                        </div>
                    </FadeInUp>
                );
            case 'fitout':
                return (
                    <FadeInUp key="fitout">
                        <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
                            <h3 className="text-3xl font-bold mb-6 text-emerald-900">Fitout & Interior Works</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                For new office fitouts, retail spaces, and warehouse modifications, we modify existing fire systems to match the new layout while ensuring full DCD compliance and approval.
                            </p>
                            <HexagonHive items={FITOUT_HIVE} />
                        </div>
                    </FadeInUp>
                );
            case 'projects':
                return (
                    <FadeInUp key="projects">
                        <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
                            <h3 className="text-3xl font-bold mb-6 text-gray-900">Turnkey Projects</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                Complete design, supply, installation, testing, and commissioning of Fire Alarm and Fire Fighting systems for residential, commercial, and industrial buildings.
                            </p>
                            <HexagonHive items={PROJECTS_HIVE} />
                        </div>
                    </FadeInUp>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white min-h-screen pb-16">
            {/* === HERO SECTION WITH 3D TEXT === */}
            <div className="relative">
                <FireHero3D />

                {/* Optional: Overlay Text if 3D text is not enough?? 
                    User asked for 3D Text "Fire & Safety Systems" which is in the component.
                    We might want to keep breadcrumbs? 
                    Let's just use the 3D Hero as requested. 
                */}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

                {/* Main Content Grid */}
                <div className="mt-6 lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 items-start">

                    {/* LEFT SIDEBAR (Desktop Only) */}
                    <div className="hidden lg:block sticky top-32">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 space-y-1">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-left ${activeTab === tab.id
                                        ? 'bg-safemax-orange text-white shadow-md'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Help Box */}
                        <ServiceSidebarForm type="fire" />
                    </div>

                    {/* CONTENT AREA */}
                    <div id="fire-content-area" className="min-h-[600px] mb-20 lg:mb-0">
                        {getTabContent()}
                    </div>

                </div>

                {/* PRODUCT SHOWCASE */}
                <div className="mt-20">
                    <ProductShowcase />
                </div>

                {/* FAQ SECTION */}
                <div className="mt-20">
                    <FAQSection
                        title="Fire Safety FAQ"
                        description="Common questions about Dubai Civil Defence (DCD) regulations, AMCs, and compliance."
                        items={[
                            {
                                question: "Is an Annual Maintenance Contract (AMC) mandatory in Dubai?",
                                answer: "Yes, as per UAE Fire & Life Safety Code of Practice, every building owner must have a valid Annual Maintenance Contract (AMC) with a DCD-approved fire fighting company. This contract ensures your systems are inspected quarterly and remains a requirement for trade license renewal and insurance validity."
                            },
                            {
                                question: "How do I get DCD approval for my new office fit-out?",
                                answer: "The process involves submitting detailed engineering drawings (fire alarm, firefighting, emergency lights) to Dubai Civil Defence for review. Once designs are approved, installation must be carried out by a certified contractor like SafeMax. Final approval is granted after a successful site inspection by DCD engineers."
                            },
                            {
                                question: "My building is old. Do I need to upgrade my fire alarm system?",
                                answer: "DCD regulations evolve to ensure maximum safety. If your current system is obsolete or does not support 24x7 Direct Alarm System (DAS) connectivity—which connects your building directly to the Civil Defence command room—you are legally required to upgrade. We specialize in retrofitting older buildings with minimal disruption."
                            },
                            {
                                question: "What is the 24x7 Direct Alarm System (DAS)?",
                                answer: "It is a mandatory smart monitoring system that instantly transmits fire alarms and system faults from your building's panel to the Dubai Civil Defence command and control center. This ensures immediate emergency response even if the building is unoccupied. SafeMax assists with the install and registration of this intelligent communicator."
                            },
                            {
                                question: "How often should fire extinguishers be serviced?",
                                answer: "Fire extinguishers must be visually inspected monthly and undergo professional maintenance annually. Hydrostatic testing is required every 5 years. SafeMax technicians provide on-site tagging and maintenance to verify readiness and compliance."
                            }
                        ]}
                    />
                </div>
            </div>

            {/* MOBILE BOTTOM NAVIGATION */}
            <MobileServiceNav
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {/* Safe Area Spacer for Mobile Nav */}
            <div className="h-24 lg:hidden"></div>
        </div>

    );
}

export default function FireEngineering() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <FireEngineeringContent />
        </Suspense>
    );
}
