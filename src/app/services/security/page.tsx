'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInUp from '@/components/animations/FadeInUp';
import HexagonHive from '@/components/ui/HexagonHive';
import SuppliersCarousel from '@/components/ui/SuppliersCarousel';
import MobileServiceNav from '@/components/layout/MobileServiceNav';
import PageHero from '@/components/layout/PageHero';
import FAQSection from '@/components/ui/FAQSection';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle, Server, CreditCard, Package } from 'lucide-react';

// --- HIVE DATA FOR SECURITY ---
const CCTV_HIVE = [
    {
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9',
        title: 'CCTV Surveillance',
        subtitle: 'Video Systems',
        description: 'Closed-circuit television is a closed system that allows to use video cameras to transmit a signal to a specific place, on a limited set of monitors or display devices.'
    },
    {
        image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b',
        title: 'Thermal Screening',
        subtitle: 'Fever Detection',
        description: 'Thermal Screening Cameras generally detect a high body temperature and fever when used appropriately. There is no contact, and data can be viewed at a distance.' // COVID 19
    },
    {
        image: 'https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44',
        title: 'Control Room',
        subtitle: 'Video Wall',
        description: 'Centralized monitoring hub for real-time surveillance and incident response.'
    },
    {
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
        title: 'ANPR',
        subtitle: 'License Plate Rec.',
        description: 'Automatic Number Plate Recognition system for tracking vehicle entry and exit.'
    },
];

const ACCESS_HIVE = [
    {
        image: 'https://images.unsplash.com/photo-1625314877395-8854897df778',
        title: 'Access Control',
        subtitle: 'Monitoring Systems',
        description: 'Access Control (AC) is the selective restriction of access to a place or other resource, while access management describes the process.'
    },
    {
        image: 'https://images.unsplash.com/photo-1590674899505-1c5c41951f14',
        title: 'Parking Management',
        subtitle: 'Vehicle Flow',
        description: 'Parking Management Systems control the flow of vehicles in a parking area and prevent unauthorised access to your parking lots.'
    },
    {
        image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa',
        title: 'Biometrics',
        subtitle: 'Fingerprint/Face',
        description: 'Advanced biometric authentication using fingerprint and facial recognition for high-security areas.'
    },
    {
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
        title: 'Turnstiles',
        subtitle: 'Crowd Control',
        description: 'Pedestrian barriers designed to control access and count attendance in high-traffic zones.'
    },
];

const ELV_HIVE = [
    {
        image: 'https://images.unsplash.com/photo-1558494949-ef2bb6db8744',
        title: 'Video Intercom',
        subtitle: 'Communication',
        description: 'An intercom is a stand-alone voice communications system for use within a building, functioning independently of the public telephone network.'
    },
    {
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        title: 'Public Address',
        subtitle: 'Sound Distribution',
        description: 'Electronic sound amplification and distribution system, used to allow a person or a system to address a large public.'
    },
    {
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7f8',
        title: 'Structured Cabling',
        subtitle: 'Fiber Optic',
        description: 'A complete system of cabling and associated hardware, which provides a comprehensive telecommunications infrastructure.'
    },
    {
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
        title: 'Low Voltage',
        subtitle: 'Systems Integration',
        description: 'Commercial low voltage systems cover a wide array of categories, from fire protection to security systems to sound and communication.'
    },
];

const TRADING_HIVE = [
    {
        image: 'https://images.unsplash.com/photo-1585775430213-480e6067b7f5',
        title: 'Honeywell',
        subtitle: 'Authorized Partner',
        description: 'Global leader in building automation, fire safety, and security technologies, offering advanced detectors, panels, and integrated systems.'
    },
    {
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
        title: 'NAFFCO',
        subtitle: 'Fire Systems',
        description: 'World-class manufacturer of firefighting equipment, including UL/FM certified pumps, extinguishers, and fire suppression systems.'
    },
    {
        image: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37',
        title: 'Hikvision',
        subtitle: 'Surveillance',
        description: 'Top-tier provider of innovative video surveillance products, including AI-powered IP cameras, NVRs, and thermal imaging solutions.'
    },
    {
        image: 'https://images.unsplash.com/photo-1563770095-25805566370e',
        title: 'Bosch',
        subtitle: 'Public Address',
        description: 'Renowned for high-fidelity public address and voice alarm systems designed for clear communication in large-scale venues.'
    },
    {
        image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c',
        title: 'Eaton',
        subtitle: 'Emergency Lighting',
        description: 'Trusted manufacturer of central battery systems and emergency exit lighting, ensuring safety compliance and reliability.'
    },
    {
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
        title: 'Simplex',
        subtitle: 'Fire Alarm',
        description: 'Industry standard for large-scale fire alarm networks, known for their TrueAlert notification appliances and high-capacity panels.'
    },
];

function SecurityServicesContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
            const element = document.getElementById('security-content-area');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [tabParam]);

    const handleTabChange = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById('security-content-area');
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const TABS = [
        { id: 'overview', label: 'Overview', icon: <Shield size={20} /> },
        { id: 'cctv', label: 'CCTV Systems', icon: <Eye size={20} /> },
        { id: 'access', label: 'Access Control', icon: <Lock size={20} /> },
        { id: 'elv', label: 'ELV Systems', icon: <Server size={20} /> },
        { id: 'trading', label: 'Trading', icon: <Package size={20} /> },
    ];

    const getTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <FadeInUp key="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-safemax-dark">SIRA & Police Approved Security</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    SafeMax provides state-of-the-art security solutions compliant with Security Industry Regulatory Agency (SIRA) standards. From high-definition CCTV networks to biometric access control, we secure your premises with intelligent technology.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "SIRA Approved Security Contractor",
                                        "Intelligent Video Analytics (IVA)",
                                        "Biometric & RFID Access Solutions",
                                        "Integrated Building Management (BMS)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <CheckCircle size={14} />
                                            </div>
                                            <span className="font-medium text-gray-800">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-900 rounded-3xl h-80 relative overflow-hidden flex items-center justify-center text-gray-700 text-6xl font-black">
                                <div className="absolute inset-0 bg-[url('/assets/images/project-placeholder.png')] bg-cover bg-center opacity-20"></div>
                                <span className="relative z-10">SECURE</span>
                            </div>
                        </div>
                    </FadeInUp>
                );
            case 'cctv':
                return (
                    <FadeInUp key="cctv">
                        <div className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100">
                            <h3 className="text-3xl font-bold mb-6 text-indigo-900">CCTV Surveillance Systems</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                We design and install video surveillance systems that provide crystal-clear visibility and evidentiary quality recording. Our systems are fully compatible with SIRA's Video Guard portal.
                            </p>
                            <HexagonHive items={CCTV_HIVE} />
                        </div>
                    </FadeInUp>
                );
            case 'access':
                return (
                    <FadeInUp key="access">
                        <div className="bg-purple-50/50 rounded-3xl p-8 border border-purple-100">
                            <h3 className="text-3xl font-bold mb-6 text-purple-900">Access Control & Gate Barriers</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                Control who enters your facility with our advanced access management solutions. From simple card readers to complex biometric time-attendance systems and vehicle gate barriers.
                            </p>
                            <HexagonHive items={ACCESS_HIVE} />
                        </div>
                    </FadeInUp>
                );
            case 'elv':
                return (
                    <FadeInUp key="elv">
                        <div className="bg-cyan-50/50 rounded-3xl p-8 border border-cyan-100">
                            <h3 className="text-3xl font-bold mb-6 text-cyan-900">ELV & Structural Cabling</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                Extra Low Voltage (ELV) systems form the backbone of modern building intelligence. We handle structured cabling, intercom systems, SMATV, and PA/BGM systems.
                            </p>
                            <HexagonHive items={ELV_HIVE} />
                        </div>
                    </FadeInUp>
                );
            case 'trading':
                return (
                    <FadeInUp key="trading">
                        <div className="bg-amber-50/50 rounded-3xl p-8 border border-amber-100">
                            <h3 className="text-3xl font-bold mb-6 text-amber-900">Equipment Trading & Supply</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl">
                                SafeMax is a trusted supplier of world-class fire and safety equipment. We source directly from top global manufacturers to ensure competitive pricing and genuine warranty.
                            </p>
                            <HexagonHive items={TRADING_HIVE} />
                        </div>
                    </FadeInUp>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white min-h-screen pb-16">
            <PageHero
                title="Security & ELV Systems"
                breadcrumbs={[
                    { label: 'Services', href: '/services' },
                    { label: 'Security & ELV', href: '/services/security' }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop"
                description="Advanced Surveillance, Access Control & Building Intelligence."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                {/* Main Content Grid */}
                <div className="mt-12 lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 items-start">

                    {/* LEFT SIDEBAR (Desktop Only) */}
                    <div className="hidden lg:block sticky top-32">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 space-y-1">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-left ${activeTab === tab.id
                                        ? 'bg-indigo-600 text-white shadow-md'
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
                        <div className="mt-8 p-6 bg-gray-900 rounded-2xl text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/assets/images/project-placeholder.png')] opacity-20 bg-cover bg-center"></div>
                            <div className="relative z-10">
                                <h4 className="font-bold text-lg mb-2">Security Audit?</h4>
                                <p className="text-gray-300 text-sm mb-4">Get a free SIRA compliance risk assessment today.</p>
                                <a href="/contact" className="block w-full py-2 bg-indigo-600 text-center rounded-lg font-bold hover:bg-indigo-700 transition-colors cursor-pointer">Book Audit</a>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT AREA */}
                    <div id="security-content-area" className="min-h-[600px] mb-20 lg:mb-0">
                        {getTabContent()}

                        {/* SUPPLIER PARTNERS CAROUSEL (Bottom Placement) */}
                        <div className="mt-16">
                            <FadeInUp>
                                <SuppliersCarousel />
                            </FadeInUp>
                        </div>
                    </div>

                </div>
                {/* FAQ SECTION - Inside max-w-7xl for alignment */}
                <div className="mt-20">
                    <FAQSection
                        title="Security & SIRA FAQ"
                        description="Answers to common questions about Security Industry Regulatory Agency (SIRA) compliance and systems."
                        items={[
                            {
                                question: "What is SIRA approval and who needs it?",
                                answer: "The Security Industry Regulatory Agency (SIRA) governs the security industry in Dubai. SIRA approval is mandatory for most commercial activities, ensuring that security systems (CCTV, Access Control) meet the specific standards required for that business type."
                            },
                            {
                                question: "What are the retention requirements for CCTV footage in Dubai?",
                                answer: "For most commercial establishments, SIRA typically requires Video Surveillance Systems (VSS) to store footage for a minimum of 31 days. Certain high-risk facilities may have longer retention requirements. Our systems are calculated to meet these storage needs precisely."
                            },
                            {
                                question: "Can I view my security cameras remotely?",
                                answer: "Yes, our modern IP-based CCTV systems support secure remote viewing via smartphone apps and web browsers. This feature allows business owners to monitor their premises in real-time from anywhere in the world."
                            },
                            {
                                question: "Do you offer Annual Maintenance Contracts (AMC) for security systems?",
                                answer: "Absolutely. A SIRA-compliant AMC is required to renew your security certification. Our maintenance packages include regular preventative checks, cleaning of cameras, and verification of recording integrity to ensure your system never fails."
                            },
                            {
                                question: "What is the Video Guard system?",
                                answer: "Video Guard is a SIRA initiative that connects the CCTV systems of vital sectors (like hotels, malls, and financial institutions) directly to SIRA's central monitoring. SafeMax is authorized to install and maintain Video Guard-compatible devices."
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
            <div className="h-24 md:hidden"></div>
        </div >
    );
}

export default function SecurityServices() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SecurityServicesContent />
        </Suspense>
    );
}
