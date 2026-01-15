import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                    {/* 1. BRAND CARD */}
                    <div className="bg-white rounded-3xl p-8 text-center md:text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 h-full flex flex-col justify-between">
                        <div>
                            <Link href="/" className="block mb-6 relative w-48 h-16 mx-auto md:mx-0">
                                <Image
                                    src="/assets/images/logo-footer.png"
                                    alt="Safe Max Fire & Safety L.L.C."
                                    fill
                                    className="object-contain object-left md:object-left"
                                />
                            </Link>
                            <h2 className="text-lg font-black tracking-tight text-black mb-4 font-sans uppercase leading-tight">
                                SAFE MAX <span className="text-safemax-orange">FIRE & SAFETY L.L.C.</span>
                            </h2>
                            <p className="mt-4 text-gray-600 text-sm leading-relaxed font-medium">
                                Engineering the Future of Life Safety. Transforming fire protection into intelligent systems integration since 2007.
                            </p>
                        </div>
                        <div className="mt-6 flex justify-center md:justify-start space-x-4">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/safemax-fire-safety-llc/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 relative rounded-full overflow-hidden shadow-lg border border-gray-100 hover:scale-110 transition-transform duration-300"
                            >
                                <img
                                    src="https://img.freepik.com/premium-vector/linkedin-logo-icon_1273375-1174.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="LinkedIn"
                                    className="w-full h-full object-cover"
                                />
                            </a>
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/safemaxfireandsafety"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 relative rounded-full overflow-hidden shadow-lg border border-gray-100 hover:scale-110 transition-transform duration-300"
                            >
                                <img
                                    src="https://img.freepik.com/premium-vector/facebook-logo-vector-facebook-official-logo-vector-facebook-logo-illustrator_1002350-1803.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="Facebook"
                                    className="w-full h-full object-cover"
                                />
                            </a>
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/safemax_fire_and_safety/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 relative rounded-full overflow-hidden shadow-lg border border-gray-100 hover:scale-110 transition-transform duration-300"
                            >
                                <img
                                    src="https://unblast.com/wp-content/uploads/2025/07/instagram-logo-colored.jpg"
                                    alt="Instagram"
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        </div>
                    </div>

                    {/* 2. QUICK LINKS CARD */}
                    <div className="bg-white rounded-3xl p-8 text-center md:text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 h-full">
                        <h4 className="text-xl font-black mb-6 text-black uppercase tracking-wider border-b-2 border-black pb-2 inline-block md:block">Quick Links</h4>
                        <ul className="space-y-3 text-gray-700 font-medium text-sm">
                            <li><Link href="/about" className="hover:text-safemax-orange transition-colors flex items-center justify-center md:justify-start gap-2"><span className="text-safemax-orange">›</span> About Us</Link></li>
                            <li><Link href="/services/fire" className="hover:text-safemax-orange transition flex items-center justify-center md:justify-start gap-2"><span className="text-safemax-orange">›</span> Fire & Safety</Link></li>
                            <li><Link href="/services/security" className="hover:text-safemax-orange transition flex items-center justify-center md:justify-start gap-2"><span className="text-safemax-orange">›</span> SIRA Security</Link></li>
                            <li><Link href="/projects" className="hover:text-safemax-orange transition-colors flex items-center justify-center md:justify-start gap-2"><span className="text-safemax-orange">›</span> Projects</Link></li>
                            <li><Link href="/careers" className="hover:text-safemax-orange transition-colors flex items-center justify-center md:justify-start gap-2"><span className="text-safemax-orange">›</span> Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-safemax-orange transition-colors flex items-center justify-center md:justify-start gap-2"><span className="text-safemax-orange">›</span> Contact</Link></li>
                        </ul>
                    </div>

                    {/* 3. CONTACT CARD */}
                    <div className="bg-white rounded-3xl p-8 text-center md:text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 h-full">
                        <h3 className="text-xl font-black mb-6 text-black uppercase tracking-wider border-b-2 border-black pb-2 inline-block md:block">Get in Touch</h3>
                        <ul className="space-y-4 text-gray-700 font-medium text-sm">
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm shadow-md">📍</span>
                                <div>
                                    <strong className="block text-black">Headquarters</strong>
                                    <span>Dar Al Safiya Bldg, Abu Hail, Dubai, UAE</span>
                                </div>
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm shadow-md">📞</span>
                                <a href="tel:042663288" className="hover:text-safemax-orange transition-colors font-bold text-lg">04 266 3288</a>
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm shadow-md">✉️</span>
                                <a href="mailto:info@safemax.org" className="hover:text-safemax-orange transition-colors underline decoration-dotted">info@safemax.org</a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. ACCREDITATION CARD */}
                    <div className="bg-white rounded-3xl p-8 text-center md:text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 h-full">
                        <h3 className="text-xl font-black mb-6 text-black uppercase tracking-wider border-b-2 border-black pb-2 inline-block md:block">Accreditation</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-black p-3 rounded-xl text-center flex flex-col items-center justify-center h-24 border border-black shadow">
                                <span className="text-white text-xs font-bold leading-tight">ISO<br />9001:2015</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl text-center flex flex-col items-center justify-center h-24 border-2 border-black shadow">
                                <span className="text-black text-xs font-bold leading-tight">ISO<br />14001:2015</span>
                            </div>
                            <div className="bg-red-600 p-3 rounded-xl text-center flex flex-col items-center justify-center h-24 border border-red-600 shadow-md">
                                <span className="text-white text-xs font-bold leading-tight">DCD<br />Grade A+</span>
                            </div>
                            <div className="bg-black p-3 rounded-xl text-center flex flex-col items-center justify-center h-24 border border-black shadow">
                                <span className="text-white text-xs font-bold leading-tight">SIRA<br />Certified</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-16 border-t border-white/20 pt-8 text-center">
                    <p className="text-white/50 text-sm font-medium">&copy; {new Date().getFullYear()} SafeMax Fire & Safety L.L.C. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
