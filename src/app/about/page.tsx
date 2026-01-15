'use client';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInUp from '@/components/animations/FadeInUp';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import CertificationsCoverflow from '@/components/ui/CertificationsCoverflow';

export default function About() {
    return (
        <div className="bg-white min-h-screen pb-16">
            <PageHero
                title="Our Legacy"
                breadcrumbs={[
                    { label: 'About Us', href: '/about' }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                description="Our Mission, Vision, and Leadership in Safety Excellence"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                {/* History */}
                <div className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <FadeInUp delay={0.2}>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    Established in 2007, <strong>SAFEMAX Fire & Safety L.L.C.</strong> has quickly grown to become an independently recognized and highly regarded fire protection company in the UAE.
                                </p>
                                <p>
                                    Our core business is Fire Engineering. We provide comprehensive, reliable, and cost-effective solutions specifically engineered to meet our clients' needs. From our humble beginnings, we have evolved into a leading specialist for Fire Fighting and Fire Alarm System Maintenance, approved by <strong>Dubai Civil Defense (DCD)</strong>, <strong>Sharjah Civil Defense (SCD)</strong>, and <strong>Abu Dhabi Civil Defence (ADCD)</strong>.
                                </p>
                                <p>
                                    We work in conjunction with Interior Contractors, Building Managers, and Architects to ensure the systematic installation, testing, and commissioning of Life Safety Essential Services.
                                </p>
                            </div>
                        </FadeInUp>
                        <FadeInUp delay={0.4}>
                            <div className="bg-gray-200 h-64 md:h-96 rounded-2xl overflow-hidden relative shadow-inner">
                                {/* Use Hero BG as placeholder for now, or team background if available */}
                                <div
                                    className="absolute inset-0 bg-[url('/assets/images/hero-bg.png')] bg-cover bg-center opacity-80"
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-gray-500 font-bold bg-white/80 px-4 py-2 rounded-lg backdrop-blur-md shadow-sm">SafeMax Operations Center</span>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </div>

                {/* Vision & Mission (Official) */}
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FadeInUp delay={0.3}>
                        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500 h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-safemax-orange/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-2xl font-bold mb-4 text-safemax-dark">Our Commitment</h3>
                            <p className="text-gray-600 leading-relaxed relative z-10">
                                To provide businesses with a complete professional Fire protection service. Our team of highly experienced Engineers and Technicians is trained to handle all types of fire protection systems, designing operations to meet client expectations in a time and cost-efficient manner.
                            </p>
                        </div>
                    </FadeInUp>
                    <FadeInUp delay={0.4}>
                        <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800 relative overflow-hidden group hover:shadow-xl transition-all duration-500 h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Accreditations</h3>
                            <p className="text-gray-400 leading-relaxed relative z-10 mb-4">
                                SAFEMAX is a member of the <strong>National Fire Protection Association (NFPA)</strong> and holds full approvals from Civil Defense authorities across the UAE.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-bold text-white uppercase tracking-wider">
                                <span className="bg-white/10 px-3 py-1 rounded">ISO 9001:2015</span>
                                <span className="bg-white/10 px-3 py-1 rounded">ISO 14001:2015</span>
                                <span className="bg-white/10 px-3 py-1 rounded">ISO 45001:2018</span>
                                <span className="bg-safemax-orange px-3 py-1 rounded">Security Industry Regulatory Agency (SIRA) Approved</span>
                            </div>
                        </div>
                    </FadeInUp>
                </div>

                {/* Accreditation - 3D HALL OF FAME */}
                <FadeInUp>
                    <div className="mb-20">
                        <SectionHeader title="Approvals & Certifications" subtitle="The Hall of Fame. Recognized by the Region's Highest Authorities." />
                        <CertificationsCoverflow />
                    </div>
                </FadeInUp>

                {/* Leadership */}
                <div>
                    <FadeInUp>
                        <h2 className="text-3xl font-bold text-center mb-12 text-safemax-dark">Technical Leadership</h2>
                    </FadeInUp>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <FadeInUp key={i} delay={i * 0.1}>
                                <div className="group text-center">
                                    <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-safemax-orange transition-colors">
                                        {/* Team Placeholder */}
                                        <div
                                            className="absolute inset-0 bg-[url('/assets/images/team-placeholder.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                        ></div>
                                    </div>
                                    <h3 className="font-bold text-lg">Eng. Name Placeholder</h3>
                                    <p className="text-safemax-orange text-sm font-medium">Senior Engineer</p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>

            </div>
            {/* Clients - INFINITE MARQUEE */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0 text-center">
                    {/* Header moved inside InfiniteMarquee for better integration */}
                </div>
                <InfiniteMarquee />
            </section>
        </div >
    );
}
