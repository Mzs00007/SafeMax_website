'use client';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactForm from '@/components/contact/ContactForm';

export default function Contact() {
    return (
        <div className="bg-white min-h-screen pb-16">
            <PageHero
                title="Contact Us"
                breadcrumbs={[
                    { label: 'Contact', href: '/contact' }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1423666639041-f14d70452508?q=80&w=2074&auto=format&fit=crop"
                description="24/7 Emergency Support & Engineering Inquiries"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                {/* LOCATIONS & INFO */}
                <div className="space-y-8">
                    {/* Head Office */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <h2 className="text-2xl font-bold mb-4 text-safemax-dark">Dubai Head Office</h2>
                        <p className="text-gray-600 mb-2">Dar Al Safiya Building, Abu Hail</p>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Tel:</strong> 04 266 3288 (Head Office)</p>
                            <p><strong>Fax:</strong> 04 266 3290</p>
                            <p><strong>Email:</strong> info@safemax.org</p>
                            <p><strong>P.O. Box:</strong> 97199, Dubai, UAE</p>
                        </div>

                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center">
                            <span className="text-2xl mr-4">🚨</span>
                            <div>
                                <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Emergency Hotline (Dubai & Sharjah)</p>
                                <a href="tel:+971509273927" className="text-xl font-bold text-red-700 hover:underline">050 927 3927</a>
                            </div>
                        </div>
                    </div>

                    {/* Abu Dhabi */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <h2 className="text-2xl font-bold mb-4 text-safemax-dark">Abu Dhabi Branch</h2>
                        <p className="text-gray-600 mb-2">Mussafah Industrial Area</p>
                        <p className="text-gray-600 text-sm"><strong>Branch Manager:</strong> Austin Christopher</p>

                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center">
                            <span className="text-2xl mr-4">🚨</span>
                            <div>
                                <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Emergency Hotline (Abu Dhabi)</p>
                                <a href="tel:+971565468491" className="text-xl font-bold text-red-700 hover:underline">056 546 8491</a>
                            </div>
                        </div>
                    </div>

                    {/* Working Hours (Moved here) */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Operating Hours
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span>Monday - Friday</span>
                                <span className="font-bold text-gray-900">8:00 AM – 5:30 PM</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span>Saturday</span>
                                <span className="font-bold text-gray-900">8:00 AM – 1:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span className="font-bold text-red-500">Emergency Support Only</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTACT FORM */}
                <div className="h-full">
                    <ContactForm />
                </div>

            </div>

            {/* MANAGEMENT DIRECTORY */}
            <div className="border-t border-gray-100 pt-16">
                <h2 className="text-3xl font-bold mb-10 text-center text-safemax-dark">Management Directory</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[
                        { name: "Sanu Devasia", role: "CEO", phone: "055 939 3555" },
                        { name: "Prabaharan", role: "General Manager", phone: "050 668 2572" },
                        { name: "Thomas A.G", role: "Operation Manager", phone: "055 710 9004" },
                        { name: "Austin Christopher", role: "Branch Manager (Abu Dhabi)", phone: "050 82 58 942" },
                        { name: "Arun", role: "Maintenance Manager (Dubai)", phone: "055 710 5288" },
                        { name: "Suresh K. Nair", role: "Manager – Project Div", phone: "055 710 5494" },
                        { name: "Roy Michal", role: "Maintenance Manager (Sharjah)", phone: "052 453 6017" },
                    ].map((person, i) => (
                        <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-safemax-orange hover:shadow-lg transition-all group">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-safemax-orange transition-colors">{person.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">{person.role}</p>
                            <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="flex items-center text-safemax-dark font-mono font-bold hover:text-safemax-orange">
                                <span className="mr-2">📞</span> {person.phone}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* PREMIUM GOOGLE MAP SECTION */}
            <div className="mt-20 mb-20">
                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 ring-1 ring-gray-200">
                    {/* Map Iframe */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1803.9114259609603!2d55.34503848135584!3d25.27654396053558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ced3d1bae47%3A0xb86a528e8216704f!2sSafe%20Max%20Fire%20and%20Safety%20llc!5e0!3m2!1sen!2sae!4v1768209485741!5m2!1sen!2sae"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    {/* Floating "Get Directions" Card */}
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white p-6 rounded-2xl shadow-xl max-w-sm border border-gray-100 backdrop-blur-md bg-white/95">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Visit Our HQ</h3>
                                <p className="text-gray-500 text-sm mb-3">Dar Al Safiya Building, Abu Hail, Dubai, UAE</p>
                                <a
                                    href="https://maps.app.goo.gl/TkNxG5wNNT9Y9u5f9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 hover:underline group"
                                >
                                    <span>Get Directions</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
