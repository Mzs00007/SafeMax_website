'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

// REVISED PRODUCT LIST
// using exact text provided by user
const PRODUCTS = [
    {
        id: 'panel',
        image: 'https://www.safemax.org/wp-content/uploads/2019/02/111.jpg',
        title: 'Fire Alarm Control Panel',
        description: 'A fire alarm control panel (FACP), fire alarm control unit (FACU), or simply fire alarm panel is the controlling component of a fire alarm system.'
    },
    {
        id: 'repeater',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/repeater-150x150.jpg',
        title: 'Repeater Panel',
        description: 'Repeater panels are used to remotely monitor and control information’s from the control panel at a nearest location of your convenience.'
    },
    {
        id: 'smoke',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/smoke-150x150.jpg',
        title: 'Smoke Detector',
        description: 'A smoke detector is a device that senses smoke, typically as an indicator of fire. Commercial security devices issue a signal to a fire alarm control panel as part of a fire alarm system.'
    },
    {
        id: 'heat',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/heat-150x150.jpg',
        title: 'Heat Detector',
        description: 'Heat detector detects the rise of heat level and initiates fire alarm in the system. Make sure your kitchens and garbage rooms are protected by a heat detector.'
    },
    {
        id: 'mcp',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/mcp-150x150.jpg',
        title: 'MCP (Manual Call Point)',
        description: 'Manual alarm call points are designed for the purpose of raising an alarm manually once verification of a fire or emergency condition exists, by operating the push button or break glass the alarm signal can be raised.'
    },
    {
        id: 'sounder',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/sounder-150x150.jpg',
        title: 'Sounder',
        description: 'The fire alarm beacons can be used to give a visual indication that the fire alarm system is operative.'
    },
    {
        id: 'module',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/module-1-150x150.jpg',
        title: 'Module',
        description: 'The addressable module is intended for use in intelligent, two-wire loops. It includes two individual relay control modules and two Class B monitor modules.'
    },
    {
        id: 'evac',
        image: 'https://www.safemax.org/wp-content/uploads/2019/01/evacuation-150x150.jpg',
        title: 'Voice Evacuation Panel',
        description: 'A Voice evacuation system plays evacuation messages in preset languages during an event of fire. Voice evacuation system uses Control Unit, Power Amplifier, Microphone and Speakers to do the function.'
    },
    {
        id: 'extinguisher',
        image: 'https://www.safemax.org/wp-content/uploads/2019/02/6.jpg',
        title: 'Fire Extinguisher',
        description: 'Fire Extinguishers Protect The Environment by having the ability to control fires, fire extinguishers limit the amount of pollution that is caused by smoke and burning debris.'
    },
    {
        id: 'emerg-light',
        image: 'https://www.safemax.org/wp-content/uploads/2019/02/3-1.jpg',
        title: 'LED Emergency Light',
        description: 'An LED emergency light is a battery-backed lighting device that switches on automatically when a building experiences a power outage.'
    },
    {
        id: 'spot',
        image: 'https://www.safemax.org/wp-content/uploads/2019/02/5.jpg',
        title: 'Recessed LED Emergency Spot Light',
        description: 'The Recessed emrgency spot lights are designed to illuminate escape routes in the event of a power cut.'
    },
    {
        id: 'exit',
        image: 'https://www.safemax.org/wp-content/uploads/2019/02/Exit-Light-11-150x150.jpg',
        title: 'Exit Light',
        description: 'Exit lighting provides illumination and direction to guide people out of buildings during a power loss or other emergency.'
    },
];

export default function ProductShowcase() {
    return (
        // BACKGROUND: Light Red -> White -> Green Gradient as requested
        <section className="py-24 bg-gradient-to-br from-red-50 via-white to-emerald-50 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header with Darker Colors for Contrast vs Light BG */}
                <div className="text-center mb-16">
                    <h2 className="text-safemax-orange font-bold uppercase tracking-widest mb-2">Exclusive Distributor</h2>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        We Are An Exclusive dealer for Detnov Fire Alarm Systems
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-green-500 mx-auto rounded-full"></div>
                </div>

                {/* GRID LAYOUT - Always Visible */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square mb-6 bg-gray-50 rounded-xl overflow-hidden p-4 group-hover:bg-red-50/30 transition-colors shrink-0">
                                <motion.img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain mix-blend-multiply filter group-hover:brightness-110 transition-all duration-500"
                                    whileHover={{ scale: 1.1 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="text-center flex-grow flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#DC2626] transition-colors leading-tight">
                                    {product.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Hover Border Gradient */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-100 rounded-2xl transition-colors pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
