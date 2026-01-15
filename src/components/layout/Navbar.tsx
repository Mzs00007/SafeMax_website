'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Zap, FileCheck, Wrench, HardHat, Building2, Construction, ShieldCheck, Shield, Camera, Lock, Network, BoomBox, Smartphone } from 'lucide-react';
import PulseEmergencyButton from '../ui/PulseEmergencyButton';
import useCyberneticSound from '@/hooks/useCyberneticSound';
import MobileBottomNav from './MobileBottomNav';
import ThreeDLogo from '../ui/ThreeDLogo';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const { playHover } = useCyberneticSound();
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setIsScrolled(latest > 20);
    });

    // Text is ALWAYS white now because background is always dark
    const textColor = 'text-white';

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                initial="visible"
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:block fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out bg-gradient-to-b from-[#DC2626] from-50% to-black py-3 lg:py-4"
            >
                {/* Bottom Gradient Fade for "Mixing" */}
                {!isScrolled && isHome && (
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />
                )}

                <div className="max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10 lg:-mt-[20px]">

                    {/* 2. THE LOGO DOCK (Always White) */}
                    <Link href="/" className="relative z-50 group block">
                        <motion.div
                            className="relative"
                            animate={{
                                width: isMobile
                                    ? ((isScrolled || !isHome) ? 120 : 160)  // Mobile Sizes (Smaller)
                                    : ((isScrolled || !isHome) ? 300 : 380), // Desktop Sizes (Smaller)
                                height: isMobile
                                    ? ((isScrolled || !isHome) ? 40 : 50)    // Mobile Heights (Smaller)
                                    : ((isScrolled || !isHome) ? 80 : 120)   // Desktop Heights (Smaller)
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <ThreeDLogo
                                src="/assets/images/logo-white.png"
                                alt="SafeMax"
                                className="object-contain object-left"
                            />
                        </motion.div>
                    </Link>

                    {/* 3. CENTER NAVIGATION ("Laser" Links + Mega Menu) - ABSOLUTELY CENTERED */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/" className="group relative py-4" onMouseEnter={playHover}> {/* Thickness */}
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Home</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link href="/about" className="group relative py-4" onMouseEnter={playHover}>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>About</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        {/* MEGA MENU TRIGGER */}
                        <div
                            className="relative group py-4"
                            onMouseEnter={() => { setServicesOpen(true); playHover(); }}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button className={`font-medium flex items-center gap-1 transition-colors ${textColor} text-lg`}>
                                Services
                                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* MEGA MENU DROPDOWN - COMPACT & FUNCTIONAL */}
                            <AnimatePresence>
                                {servicesOpen && (
                                    <>
                                        {/* Invisible Safe Area */}
                                        <div className="absolute top-full left-0 w-full h-4 bg-transparent" />

                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="fixed left-1/2 -translate-x-1/2 top-[80px] w-[90vw] md:w-[70vw] max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/40 p-4 z-[100] grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            {/* Arrow Tip */}
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-t border-l border-white/40"></div>

                                            {/* 1. FIRE ENGINEERING */}
                                            <div className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-100 bg-white group hover:border-red-100 transition-colors">
                                                {/* Header */}
                                                <Link href="/services/fire" className="h-32 m-2 mb-0 rounded-lg relative overflow-hidden block">
                                                    <div className="absolute inset-0 bg-[url('/assets/images/service-fire-preview.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 to-transparent"></div>
                                                    <div className="absolute bottom-3 left-4 text-white">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-md">
                                                                <Zap size={16} className="text-white" fill="currentColor" />
                                                            </div>
                                                            <h3 className="font-bold text-lg">Fire Systems</h3>
                                                        </div>
                                                    </div>
                                                </Link>

                                                {/* Links Grid */}
                                                <div className="p-3 grid grid-cols-2 gap-2">
                                                    {[
                                                        { name: 'AMC Contracts', href: '/services/fire?tab=amc', icon: FileCheck },
                                                        { name: 'Rectification', href: '/services/fire?tab=rectification', icon: Wrench },
                                                        { name: 'Fit-out Works', href: '/services/fire?tab=fitout', icon: HardHat },
                                                        { name: 'Turnkey Projects', href: '/services/fire?tab=projects', icon: Building2 },
                                                        { name: 'Installations', href: '/services/fire?tab=install', icon: Construction },
                                                        { name: 'DCD Approvals', href: '/services/fire?tab=projects', icon: ShieldCheck },
                                                    ].map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            onClick={() => setServicesOpen(false)}
                                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 group/link transition-colors"
                                                        >
                                                            <item.icon size={16} className="text-gray-400 group-hover/link:text-red-600 transition-colors" />
                                                            <span className="text-sm font-medium text-gray-600 group-hover/link:text-gray-900">{item.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 2. SECURITY & ELV */}
                                            <div className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-100 bg-white group hover:border-blue-100 transition-colors">
                                                {/* Header */}
                                                <Link href="/services/security" className="h-32 m-2 mb-0 rounded-lg relative overflow-hidden block">
                                                    <div className="absolute inset-0 bg-[url('/assets/images/service-security-preview.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
                                                    <div className="absolute bottom-3 left-4 text-white">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-md">
                                                                <Shield size={16} className="text-white" fill="currentColor" />
                                                            </div>
                                                            <h3 className="font-bold text-lg">Security & ELV</h3>
                                                        </div>
                                                    </div>
                                                </Link>

                                                {/* Links Grid */}
                                                <div className="p-3 grid grid-cols-2 gap-2">
                                                    {[
                                                        { name: 'CCTV Systems', href: '/services/security?tab=cctv', icon: Camera },
                                                        { name: 'Access Control', href: '/services/security?tab=access', icon: Lock },
                                                        { name: 'Structure Cabling', href: '/services/security?tab=elv', icon: Network },
                                                        { name: 'Gate Barriers', href: '/services/security?tab=access', icon: BoomBox }, // using box as placeholder or maybe simplified block
                                                        { name: 'SIRA Approvals', href: '/services/security?tab=approvals', icon: FileCheck },
                                                        { name: 'Intercoms', href: '/services/security?tab=elv', icon: Smartphone },
                                                    ].map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            onClick={() => setServicesOpen(false)}
                                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 group/link transition-colors"
                                                        >
                                                            <item.icon size={16} className="text-gray-400 group-hover/link:text-blue-600 transition-colors" />
                                                            <span className="text-sm font-medium text-gray-600 group-hover/link:text-gray-900">{item.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>



                        <Link href="/projects" className="group relative py-4" onMouseEnter={playHover}>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Projects</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link href="/careers" className="group relative py-4" onMouseEnter={playHover}>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Careers</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link href="/contact" className="group relative py-4" onMouseEnter={playHover}>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Contact</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                    </div>

                    {/* 4. EMERGENCY CTA & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4">
                        {/* Only show top button on Desktop, as Mobile has it in Bottom Bar */}
                        <div className="hidden md:flex items-center gap-4">
                            <PulseEmergencyButton />
                        </div>


                    </div>

                </div>
            </motion.nav>

            {/* MOBILE BOTTOM NAVIGATION (Visible only on < md screens) */}
            <div className="md:hidden">
                <MobileBottomNav
                    isMenuOpen={isMobileOpen}
                    onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
                    onLogoClick={() => setIsMobileOpen(false)}
                />
            </div>

            {/* 5. MOBILE DRAWER - Premium Dark Glass Redesigned */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm lg:hidden"
                        />

                        {/* Drawer Container */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-neutral-900/95 backdrop-blur-2xl z-[70] shadow-2xl lg:hidden flex flex-col border-l border-white/10"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <Image
                                    src="/assets/images/logo-white.png"
                                    alt="SafeMax"
                                    width={100}
                                    height={40}
                                    className="object-contain"
                                />
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Links Container - Structured */}
                            <motion.div
                                className="flex flex-col p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1 }
                                    }
                                }}
                            >
                                {/* Group 1: Main */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Menu</h4>
                                    {[
                                        { name: 'Home', href: '/' },
                                        { name: 'Projects', href: '/projects' },
                                    ].map((item, i) => (
                                        <motion.div key={i} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                                            <Link
                                                href={item.href}
                                                onClick={() => { setIsMobileOpen(false); playHover(); }}
                                                className={`block text-xl font-medium transition-all duration-300 py-2 border-l-2 pl-4 ${pathname === item.href ? 'border-safemax-orange text-white bg-white/5' : 'border-transparent text-gray-300 hover:text-white hover:border-gray-600 hover:pl-6'}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Group 2: Services */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Services</h4>
                                    {[
                                        { name: 'Fire & Safety', href: '/services/fire', icon: '🔥' },
                                        { name: 'Security (SIRA)', href: '/services/security', icon: '🛡️' },
                                    ].map((item, i) => (
                                        <motion.div key={i} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                                            <Link
                                                href={item.href}
                                                onClick={() => { setIsMobileOpen(false); playHover(); }}
                                                className={`flex items-center gap-3 text-lg font-medium transition-all duration-300 py-3 px-4 rounded-xl ${pathname === item.href ? 'bg-safemax-orange text-white shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <span>{item.icon}</span>
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Group 3: Company */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Company</h4>
                                    {[
                                        { name: 'About Us', href: '/about' },
                                        { name: 'Careers', href: '/careers' },
                                        { name: 'Contact', href: '/contact' }
                                    ].map((item, i) => (
                                        <motion.div key={i} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                                            <Link
                                                href={item.href}
                                                onClick={() => { setIsMobileOpen(false); playHover(); }}
                                                className={`block text-lg font-medium transition-all duration-300 py-1 pl-4 ${pathname === item.href ? 'text-safemax-orange' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Drawer Footer - Contact Info */}
                            <div className="p-6 border-t border-white/10 bg-black/20">
                                <div className="flex flex-col gap-3">
                                    <a href="tel:+971501234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-safemax-orange/20 flex items-center justify-center text-safemax-orange">📞</div>
                                        <span className="text-sm font-medium">+971 50 123 4567</span>
                                    </a>
                                    <a href="mailto:info@safemax.org" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">✉️</div>
                                        <span className="text-sm font-medium">info@safemax.org</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
