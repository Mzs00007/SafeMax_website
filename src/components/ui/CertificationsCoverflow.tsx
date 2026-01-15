'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const CERTIFICATIONS = [
    {
        title: 'DCD A+',
        subtitle: 'Dubai Civil Defence',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Dubai_Civil_Defence_Logo.png/600px-Dubai_Civil_Defence_Logo.png',
        color: 'bg-red-600',
        id: 'DCD-2025'
    },
    {
        title: 'SIRA',
        subtitle: 'Security Industry Reg.',
        // Using a generic security shield or finding a SIRA representation if specific URL fails. 
        // Using Dubia Gov logo variation or similar as placeholder for SIRA
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Government_of_Dubai_logo.svg/600px-Government_of_Dubai_logo.svg.png',
        color: 'bg-blue-600',
        id: 'SIRA-SEC'
    },
    {
        title: 'ISO 9001',
        subtitle: 'Quality Management',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/ISO_9001_2015_logo.svg/600px-ISO_9001_2015_logo.svg.png',
        color: 'bg-purple-600',
        id: 'ISO-9001'
    },
    {
        title: 'NFPA',
        subtitle: 'Member Org.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/NFPA_logo.svg/600px-NFPA_logo.svg.png',
        color: 'bg-orange-600',
        id: 'NFPA-MEM'
    },
    {
        title: 'ADCD',
        subtitle: 'Abu Dhabi Civil Defence',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Dubai_Civil_Defence_Logo.png/600px-Dubai_Civil_Defence_Logo.png', // Fallback to DCD style for now or generic shield
        color: 'bg-red-700',
        id: 'ADCD-ENG'
    },
    {
        title: 'ISO 14001',
        subtitle: 'Environmental Mgmt.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/ISO_9001_2015_logo.svg/600px-ISO_9001_2015_logo.svg.png', // ISO generic style
        color: 'bg-green-600',
        id: 'ISO-14001'
    },
    {
        title: 'UL Listed',
        subtitle: 'Safety Science',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/UL_Mark.svg/600px-UL_Mark.svg.png',
        color: 'bg-red-800',
        id: 'UL-CERT'
    },
    {
        title: 'FM Global',
        subtitle: 'Property Loss Prevention',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/FM_Global_logo.svg/600px-FM_Global_logo.svg.png',
        color: 'bg-orange-700',
        id: 'FM-APP'
    },
    {
        title: 'KITEMARK',
        subtitle: 'BSI Benchmark',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/BSI_Kitemark.svg/600px-BSI_Kitemark.svg.png',
        color: 'bg-indigo-600',
        id: 'BSI-KM'
    },
    {
        title: 'Honeywell',
        subtitle: 'Authorized Partner',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Honeywell_logo.svg/600px-Honeywell_logo.svg.png',
        color: 'bg-red-600',
        id: 'HON-PART'
    },
    {
        title: 'NAFFCO',
        subtitle: 'Firefighting Shield',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/NAFFCO_Logo.jpg/220px-NAFFCO_Logo.jpg',
        color: 'bg-red-900',
        id: 'NAF-UAE'
    },
];

export default function CertificationsCoverflow() {
    return (
        <div className="cert-swiper py-12">
            <Swiper
                modules={[EffectCoverflow, Pagination, Autoplay]}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true} // Infinite Loop
                initialSlide={0}
                speed={800} // Smooth transition speed
                coverflowEffect={{
                    rotate: 25,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                autoHeight={true} // Responsive height based on slides
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false, // CRITICAL: Resume after drag
                    pauseOnMouseEnter: true       // Pause while hovering/interacting
                }}
                className="w-full !max-w-none !pb-12" // Full width, no max constraint
            >
                {CERTIFICATIONS.map((cert, i) => (
                    <SwiperSlide key={i} className="!w-[300px] !h-[420px]">
                        <div className={`w-full h-full rounded-2xl overflow-hidden relative group bg-white border border-gray-100 shadow-xl flex flex-col items-center justify-center text-center select-none hover:border-safemax-orange/30 transition-colors`}>

                            {/* Card Decoration Top */}
                            <div className={`absolute top-0 left-0 w-full h-3 ${cert.color} z-20`}></div>

                            {/* 1. DEMO IMAGE (Full Card Background) */}
                            <div className="absolute inset-0 bg-white flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105">
                                {/* Simulated Document Look */}
                                <div className="relative w-full h-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                                    <img
                                        src={cert.image}
                                        alt={`${cert.title} Certificate Demo`}
                                        className="w-full object-contain max-h-[200px] drop-shadow-sm filter"
                                    />
                                    {/* Watermark/Stamp effect */}
                                    <div className="absolute bottom-10 right-0 w-16 h-16 border-2 border-dashed border-gray-300 rounded-full opacity-20 rotate-12"></div>
                                </div>
                            </div>

                            {/* 2. HOVER REVEAL TEXT OVERLAY */}
                            <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out border-t border-gray-100 z-30">
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">{cert.title}</h3>
                                <p className="text-gray-500 font-medium uppercase tracking-wide text-xs mb-3">{cert.subtitle}</p>

                                {/* Dummy "Demi Text" */}
                                <p className="text-gray-400 text-[10px] leading-relaxed">
                                    Approved integration for complex risk environments.
                                    <br />ID: <span className="font-mono text-gray-500">{cert.id}</span>
                                </p>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
