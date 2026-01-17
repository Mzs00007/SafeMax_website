'use client';
import { motion } from 'framer-motion';

// 1. MAINTENANCE GIANTS (The "Always On" Contracts)
const CLIENTS_ROW_1 = [
    { name: 'EMAAR', sector: 'Real Estate', image: 'https://cdn.properties.emaar.com/wp-content/uploads/2023/09/MicrosoftTeams-image-70-e1694072306832.jpg', color: 'bg-blue-600', width: 'w-[280px]' },
    { name: 'RTA DUBAI', sector: 'Transport', image: 'https://d3h330vgpwpjr8.cloudfront.net/x/1000x/RTA_confirms_Dubai_Gold_Line_Metro_expansion_c1464ae14d.webp', color: 'bg-red-600', width: 'w-[320px]' },
    { name: 'NAKHEEL', sector: 'Real Estate', image: 'https://www.nakheel.com/images/nakheelcorporatelibraries/press-releases/nakheel-launches-first-villas-on-new-futuristic-palm-jebel-ali--18-09-2023.jpg?sfvrsn=31c2d7d6_1', color: 'bg-teal-600', width: 'w-[310px]' },
    { name: 'ETISALAT', sector: 'Telecom', image: 'https://suweidi.com/wp-content/uploads/2021/05/1106-Office-Building-for-Etisalat-in-Warsan-Dubai-scaled.jpg', color: 'bg-green-700', width: 'w-[290px]' }, // Placeholder for Etisalat
    { name: 'NESTLE', sector: 'Industrial', image: 'https://cloudfront-eu-central-1.images.arcpublishing.com/williamreed/F7DDRAQKCBMZVCFY3VVLD6LQMU.jpg', color: 'bg-amber-700', width: 'w-[300px]' },
    { name: 'VOLVO', sector: 'Automotive', image: 'https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2022/03/02125052/Volvo-Showrooms-in-the-UAE-Cover-02-03.jpg', color: 'bg-indigo-600', width: 'w-[310px]' }
];

// 2. PROJECT ICONS (Turnkey & Luxury Retail)
const CLIENTS_ROW_2 = [
    { name: 'APPLE STORE', sector: 'Retail', image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R597.png?resize=2880:1612&output-format=jpg&output-quality=85&interpolation=progressive-bicubic', color: 'bg-gray-200', width: 'w-[320px]' }, // Apple Store style
    { name: 'SAMSUNG HQ', sector: 'Corporate', image: 'https://images.samsung.com/is/image/samsung/ae-newsImg-61321451?$ORIGIN_JPG$', color: 'bg-blue-600', width: 'w-[280px]' },
    { name: 'DUBAI MALL', sector: 'Landmark', image: 'https://cdn.excelproperties.ae/media/blog/hero/The_Dubai_Mall_1280x720.webp?width=1280&height=384&format=webp&quality=90', color: 'bg-yellow-600', width: 'w-[290px]' }, // Using generic luxury placeholder
    { name: 'EXPO 2020', sector: 'Global', image: 'https://ava-public.s3.eu-central-1.amazonaws.com/wp-content/uploads/2022/09/27213248/Expo-2020.jpg', color: 'bg-orange-500', width: 'w-[300px]' },
    { name: 'CHRISTIAN DIOR', sector: 'Luxury', image: 'https://djx5h8pabpett.cloudfront.net/wp-content/uploads/sites/4/2019/09/17093225/4-1024x683.png', color: 'bg-purple-800', width: 'w-[310px]' }
];

const TitanCard = ({ client }: { client: any }) => (
    <div
        className={`${client.width} h-40 relative flex-shrink-0 rounded-xl overflow-hidden group/card cursor-pointer shadow-xl border border-white/10 bg-slate-900 mx-4`}
    >
        {/* 1. REAL IMAGE */}
        <div className="absolute inset-0">
            <img
                src={client.image}
                alt={client.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-70 group-hover/card:opacity-90"
            />
            {/* 2. BRAND TINT OVERLAY */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/50 to-transparent mix-blend-multiply opacity-90 transition-opacity duration-300`}></div>
            {/* Hover Tint */}
            <div className="absolute inset-0 bg-safemax-orange/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
        </div>

        {/* 3. CONTENT OVERLAY */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">

            {/* Sector Tag */}
            <div className="absolute top-3 right-3">
                <span className="px-1.5 py-0.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold tracking-widest text-white/90 uppercase shadow-lg">
                    {client.sector}
                </span>
            </div>

            {/* Client Name (Smaller Text) */}
            <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {client.name}
            </h3>

            {/* Brand Color Line */}
            <div className={`h-1 w-8 ${client.color} rounded-full mb-0 transition-all duration-300 group-hover/card:w-full box-shadow-glow`}></div>
        </div>
    </div>
);

// PURE CSS MARQUEE COMPONENT
const MarqueeRow = ({ clients, reverse = false, speed = "40s" }: { clients: any[], reverse?: boolean, speed?: string }) => {
    // Duplicate list 4 times to ensure seamless infinite loop even on ultra-wide screens
    // Loop Logic: Translate -50% -> 0 (Reverse) or 0 -> -50% (Normal)
    // Structure: [List][List] (Total 200%)
    // But since we want "infinite", we simply need enough duplication and translate 0% -> -50% of the TOTAL width
    // Actually, animate-marquee in globals.css moves translateX(-50%). So we just need 2 sets of content.

    const content = [...clients, ...clients, ...clients, ...clients];

    return (
        <div className="group relative w-full overflow-hidden flex">
            {/* The Moving Track */}
            <div
                className={`flex w-max animate-marquee ${reverse ? 'direction-reverse' : ''} group-hover:[animation-play-state:paused]`}
                style={{
                    animationDuration: speed,
                    // If reversing, we use the same keyframes but direction: reverse
                    animationDirection: reverse ? 'reverse' : 'normal'
                }}
            >
                {content.map((client, idx) => (
                    <TitanCard key={`${client.name}-${idx}`} client={client} />
                ))}
            </div>

            {/* Independent Gradient Masks for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1121] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1121] to-transparent z-10 pointer-events-none"></div>
        </div>
    );
};

export default function InfiniteMarquee() {
    return (
        // BACKGROUND: Company Theme (Dark Navy #0B1121) with Orange Glows
        <section className="relative w-full py-32 overflow-hidden bg-[#0B1121]">

            {/* 1. Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-safemax-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* 2. Architectural Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* 3. SECTION HEADER */}
            <div className="relative z-20 text-center mb-16 transform -skew-y-2">
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                    Our <span className="text-safemax-orange text-transparent bg-clip-text bg-gradient-to-br from-safemax-orange to-red-600">Clients</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-safemax-orange to-transparent mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(255,69,0,0.6)]"></div>
            </div>

            {/* 4. THE "SLASH" CONTAINER (Double Stream) */}
            <div className="relative z-10 transform -skew-y-2 origin-center space-y-12">

                {/* ROW 1: Left to Right (Reverse of default marquee logic usually, or depends on perspective. Let's say LTR means moving Right) 
                    Default Marquee: Moves Left (0 -> -50%). So items appear to scroll left.
                    User requested: "Reverse direction" for one.
                */}

                {/* Top Row: Standard Flow (Scrolls Left) */}
                <MarqueeRow clients={CLIENTS_ROW_1} speed="50s" />

                {/* Bottom Row: Reverse Flow (Scrolls Right) */}
                <MarqueeRow clients={CLIENTS_ROW_2} reverse={true} speed="50s" />

            </div>
        </section>
    );
}
