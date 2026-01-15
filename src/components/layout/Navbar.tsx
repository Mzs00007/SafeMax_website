'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Zap, FileCheck, Wrench, HardHat, Building2, Construction, ShieldCheck, Shield, Camera, Lock, Network, BoomBox, Smartphone, ArrowUp } from 'lucide-react';
import PulseEmergencyButton from '../ui/PulseEmergencyButton';
import useCyberneticSound from '@/hooks/useCyberneticSound';
import MobileBottomNav from './MobileBottomNav';
import ThreeDLogo from '../ui/ThreeDLogo';
import NavbarLines from './NavbarLines';

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
    const [mobileMenuCategory, setMobileMenuCategory] = useState<string | null>(null);

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
                <NavbarLines />

                {/* Bottom Gradient Fade for "Mixing" */}
                {!isScrolled && isHome && (
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />
                )}

                <div className="max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10 lg:-mt-[20px]">

                    {/* 2. THE LOGO DOCK (Always White) */}
                    <Link href="/" className="relative z-50 group block" data-nav-obstacle>
                        <motion.div
                            className="relative"
                            animate={{
                                width: isMobile
                                    ? ((isScrolled || !isHome) ? 90 : 110)   // Mobile Sizes
                                    : ((isScrolled || !isHome) ? 180 : 240), // Desktop Sizes
                                height: isMobile
                                    ? ((isScrolled || !isHome) ? 28 : 35)    // Mobile Heights
                                    : ((isScrolled || !isHome) ? 55 : 75)    // Desktop Heights
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

                    {/* 3. CENTER NAVIGATION ("Laser" Links + Mega Menu) - ABSOLUTELY CENTERED - OUTFIT FONT */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-outfit">
                        <Link href="/" className="group relative py-4" onMouseEnter={playHover} data-nav-obstacle> {/* Thickness */}
                            <span className={`font-medium transition-colors ${textColor} text-lg tracking-wide`}>Home</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link href="/about" className="group relative py-4" onMouseEnter={playHover} data-nav-obstacle>
                            <span className={`font-medium transition-colors ${textColor} text-lg tracking-wide`}>About</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        {/* MEGA MENU TRIGGER */}
                        <div
                            className="relative group py-4"
                            onMouseEnter={() => { setServicesOpen(true); playHover(); }}
                            onMouseLeave={() => setServicesOpen(false)}
                            data-nav-obstacle
                        >
                            <button className={`font-medium flex items-center gap-1 transition-colors ${textColor} text-lg tracking-wide`}>
                                Services
                                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* MEGA MENU DROPDOWN - COMPACT & FUNCTIONAL */}
                            <AnimatePresence>
                                {servicesOpen && (
                                    <>
                                        {/* Invisible Safe Area Bridge */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] h-6 bg-transparent" />

                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[650px] max-w-[90vw] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/40 p-4 z-[100] grid grid-cols-1 md:grid-cols-2 gap-4"
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



                        <Link href="/projects" className="group relative py-4" onMouseEnter={playHover} data-nav-obstacle>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Projects</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link href="/careers" className="group relative py-4" onMouseEnter={playHover} data-nav-obstacle>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Careers</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link href="/contact" className="group relative py-4" onMouseEnter={playHover} data-nav-obstacle>
                            <span className={`font-medium transition-colors ${textColor} text-lg`}>Contact</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safemax-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                    </div>

                    {/* 4. EMERGENCY CTA & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4">
                        {/* Show on all screens, component handles responsiveness */}
                        <div className="flex items-center gap-4">
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

            {/* 5. MOBILE DRAWER - PREMIUM REDESIGN */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/90 z-[60] backdrop-blur-sm lg:hidden"
                        />

                        {/* Drawer Container */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-gradient-to-b from-[#111] to-[#050505] z-[70] lg:hidden flex flex-col border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
                        >
                            {/* Header */}
                            <div className="relative flex items-center justify-between p-6 bg-white z-10">
                                <div className="h-10 relative w-40">
                                    <Image
                                        src="/assets/images/logo-footer.png"
                                        alt="SafeMax"
                                        fill
                                        className="object-contain object-left invert"
                                    />
                                </div>
                                {/* Top Close Button Removed for Bottom Ergonomics */}

                                {/* Shiny Line - Silk Thin & Shiny */}
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DC2626] to-transparent shadow-[0_0_10px_rgba(220,38,38,0.8)] opacity-100" />
                            </div>

                            {/* Scrollable Content Area - No Scrollbar */}
                            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] p-6 space-y-2">

                                {/* 1. HOME */}
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-sm bg-[#1a1a1a] border border-white/5 border-b-4 border-b-black hover:border-b-red-600 hover:bg-[#202020] active:border-b-0 active:translate-y-[4px] transition-all duration-100 group"
                                >
                                    <span className="text-lg font-bold tracking-wider uppercase text-gray-200 group-hover:text-white transition-colors">Home</span>
                                    <Construction size={18} className="text-gray-500 group-hover:text-red-500" />
                                </Link>

                                {/* 2. SERVICES DROPDOWN */}
                                <div className="rounded-sm bg-[#1a1a1a] border border-white/5 border-b-4 border-b-black overflow-hidden transition-all duration-300">
                                    <button
                                        onClick={() => setMobileMenuCategory(mobileMenuCategory === 'services' ? null : 'services')}
                                        className="w-full flex items-center justify-between p-4 hover:bg-[#202020] transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-lg font-bold tracking-wider uppercase transition-colors ${mobileMenuCategory === 'services' ? 'text-red-500' : 'text-gray-200'}`}>Services</span>
                                        </div>
                                        <div className={`transition-transform duration-300 ${mobileMenuCategory === 'services' ? 'rotate-180 text-red-500' : 'text-gray-500'}`}>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {mobileMenuCategory === 'services' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-black/20"
                                            >
                                                <div className="p-2 space-y-1">
                                                    <Link
                                                        href="/services/fire"
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/10 hover:text-red-500 text-gray-300 transition-all"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                                            <Zap size={16} />
                                                        </div>
                                                        <span className="font-medium">Fire Engineering</span>
                                                    </Link>
                                                    <Link
                                                        href="/services/security"
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600/10 hover:text-blue-500 text-gray-300 transition-all"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                            <Shield size={16} />
                                                        </div>
                                                        <span className="font-medium">Security Systems</span>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* 3. PROJECTS */}
                                <Link
                                    href="/projects"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-sm bg-[#1a1a1a] border border-white/5 border-b-4 border-b-black hover:border-b-red-600 hover:bg-[#202020] active:border-b-0 active:translate-y-[4px] transition-all duration-100 group"
                                >
                                    <span className="text-lg font-bold tracking-wider uppercase text-gray-200 group-hover:text-white transition-colors">Projects</span>
                                    <Building2 size={18} className="text-gray-500 group-hover:text-red-500" />
                                </Link>

                                {/* 4. COMPANY DROPDOWN */}
                                <div className="rounded-sm bg-[#1a1a1a] border border-white/5 border-b-4 border-b-black overflow-hidden transition-all duration-300">
                                    <button
                                        onClick={() => setMobileMenuCategory(mobileMenuCategory === 'company' ? null : 'company')}
                                        className="w-full flex items-center justify-between p-4 hover:bg-[#202020] transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-lg font-bold tracking-wider uppercase transition-colors ${mobileMenuCategory === 'company' ? 'text-red-500' : 'text-gray-200'}`}>Company</span>
                                        </div>
                                        <div className={`transition-transform duration-300 ${mobileMenuCategory === 'company' ? 'rotate-180 text-red-500' : 'text-gray-500'}`}>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {mobileMenuCategory === 'company' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-black/20"
                                            >
                                                <div className="p-2 space-y-1">
                                                    <Link
                                                        href="/about"
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all"
                                                    >
                                                        <span className="font-medium">About Us</span>
                                                    </Link>
                                                    <Link
                                                        href="/careers"
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all"
                                                    >
                                                        <span className="font-medium">Careers</span>
                                                    </Link>
                                                    <Link
                                                        href="/contact"
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all"
                                                    >
                                                        <span className="font-medium">Contact</span>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Footer Area */}
                            <div className="p-6 border-t border-white/5 bg-gradient-to-t from-black to-[#050505]">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 p-4 rounded-sm bg-[#DC2626] border-b-4 border-red-900 active:border-b-0 active:translate-y-[4px] hover:brightness-110 text-white font-black uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)]"
                                >
                                    <span>GET A QUOTE</span>
                                    <ArrowUp className="rotate-45" size={16} />
                                </Link>

                                {/* Bottom Close Button - Thumb Friendly */}
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 p-4 rounded-sm bg-[#111] border border-white/10 border-b-4 border-b-black active:border-b-0 active:translate-y-[4px] hover:bg-[#1a1a1a] text-gray-400 hover:text-white font-bold tracking-wide uppercase transition-all mt-4"
                                >
                                    <span className="group-hover:text-red-500 transition-colors">CLOSE MENU</span>
                                    <X size={18} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
