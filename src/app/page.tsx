'use client';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/cards/ServiceCard';
import VideoGallery from '@/components/home/VideoGallery';
import ServicesGrid from '@/components/home/ServicesGrid';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeInUp from '@/components/animations/FadeInUp';
import GravityTitans from '@/components/ui/GravityTitans';
import RapidResponseForm from '@/components/home/RapidResponseForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* GLOBAL BACKGROUND IMAGE (Fixed or Scrollable based on length) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://www.safemax.org/wp-content/themes/safemax/img/bg-final.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundAttachment: 'fixed' // Parallax feel, or 'scroll' for natural length
        }}
      >
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 1.1 HERO SECTION - Transparent to show Global BG */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-white z-10">

        {/* Content Only - No specific BG here */}
        {/* Scanline Overlay explicitly for Hero area if desired, or remove */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50"></div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

          {/* Staggered Entrance Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Instant start
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-safemax-orange/50 bg-safemax-orange/10 backdrop-blur-md"
            >
              <span className="text-safemax-orange font-bold text-sm tracking-wider uppercase">ISO 9001-2015 | SIRA Certified | DCD Grade A+</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight drop-shadow-2xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="block"
                >
                  Engineering the
                </motion.span>
              </span>
              <span className="block overflow-hidden text-safemax-orange">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  className="block"
                >
                  Highest Standard
                </motion.span>
              </span>
              <span className="block overflow-hidden text-4xl md:text-6xl mt-2 text-gray-200">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  className="block"
                >
                  of Life Safety.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-200 leading-relaxed font-light drop-shadow-md"
            >
              We provide comprehensive, certified fire protection and security solutions for the UAE&apos;s most critical infrastructure, from RTA Tram Depots to Emaar High-Rises.
            </motion.p>

            <div className="mt-12 mb-24 flex flex-col items-stretch md:flex-row md:items-center gap-6 justify-center">
              <div className="w-full md:w-auto">
                <a href="tel:+971509273927" className="w-full md:w-auto px-6 py-4 md:px-10 md:py-5 bg-safemax-orange text-white rounded-lg font-bold text-base md:text-lg hover:bg-orange-600 transition shadow-[0_0_20px_rgba(255,87,34,0.3)] animate-pulse-red flex justify-center items-center text-center">
                  Request 4-Hour Response
                </a>
              </div>

              <div className="w-full md:w-auto">
                <Link href="/projects" className="w-full md:w-auto px-6 py-4 md:px-10 md:py-5 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-lg font-bold text-base md:text-lg hover:bg-white/10 transition flex items-center justify-center group">
                  View Engineering Portfolio
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>


        </div>
      </section>

      {/* 1.2 THE SAFEMAX DIFFERENCE - Glassmorphic Card */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Glass Container */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
            <FadeInUp>
              <SectionHeader
                title="The SafeMax Difference"
                subtitle="Why the UAE's top facility managers trust their critical systems to us."
              />
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <FadeInUp delay={0.1}>
                <ServiceCard
                  title="4-Hour Rapid Response"
                  desc="Our operations center guarantees a technician on-site within 4 hours for critical failures, 24/7/365. We don&apos;t just log calls; we deploy solutions."
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <ServiceCard
                  title="Cross-Domain Integration"
                  desc="We bridge the gap between Mechanical Engineering (Pumps/Pipes) and IT (Fiber Optics/VLANs). We speak both languages fluently."
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  }
                />
              </FadeInUp>
              <FadeInUp delay={0.3}>
                <ServiceCard
                  title="Regulatory Compliance"
                  desc="Fully integrated with Dubai Civil Defence (DCD), Sharjah Civil Defence (SCD), and Abu Dhabi Civil Defence (ADCD) portals for seamless approvals."
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* 1.2.5 OUR SERVICES GRID - Bento Grid */}
      <ServicesGrid />

      {/* 1.3 VIDEO GALLERY SECTION */}
      <VideoGallery />

      {/* TRUSTED BY PRO - Interactive Gravity Box */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative">
              <div className="absolute top-0 left-0 w-full p-8 z-10 pointer-events-none bg-gradient-to-b from-black/0 to-transparent">
                <h3 className="text-xl md:text-2xl font-bold text-transparent text-center uppercase tracking-widest [-webkit-text-stroke:1px_white] drop-shadow-md">Trusted By The Region&apos;s Titans</h3>
                <p className="text-center text-gray-700 text-sm mt-2 mix-blend-overlay">Interactive: Click to drop!</p>
              </div>

              {/* The Physics Area */}
              <GravityTitans />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* CALL TO ACTION STRIP - Glassmorphic Dark */}
      <section className="py-20 relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/60 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-safemax-orange/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left Column: Text */}
              <FadeInUp>
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Priority Dispatch
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Critical System Failure? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">We Respond in 4 Hours.</span>
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto lg:mx-0">
                    Don't risk downtime or fines. Join Emaar, RTA, and Dubai Police who trust SafeMax for immediate rapid response and rectification.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="text-xl">🛡️</span>
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold">DCD Approved</p>
                        <p>Certified Integrator</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold">24/7 Hotline</p>
                        <p>Always Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              {/* Right Column: Form */}
              <FadeInUp delay={0.2}>
                <RapidResponseForm />
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
