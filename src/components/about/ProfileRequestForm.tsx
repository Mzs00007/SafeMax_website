'use client';

import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, ShieldCheck, Lock, Building, User, Mail, FileText } from 'lucide-react';
import { submitProfileRequest } from '@/actions/profile-action';

const initialState = {
    success: false,
    message: '',
    errors: {},
};

export default function ProfileRequestForm() {
    const [state, formAction, isPending] = useActionState(submitProfileRequest, initialState);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">

                    {/* Cybernetic Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Left: Info & Visuals */}
                        <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit h-fit">
                                <ShieldCheck size={14} />
                                <span>Secure Access Portal</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Corporate <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Prequalification.</span>
                            </h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                Access our full trade licenses, ISO certifications, and DCD approvals for vendor registration and compliance checks.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    { text: "Trade License & Commercial Registry", icon: FileText },
                                    { text: "ISO 9001, 14001, 45001 Certificates", icon: ShieldCheck },
                                    { text: "Civil Defense (DCD/SCD/ADCD) Cards", icon: ShieldCheck },
                                    { text: "VAT Registration Certificate", icon: FileText },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-blue-400">
                                            <item.icon size={16} />
                                        </div>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: The Form */}
                        <div className="p-10 md:p-16 bg-white/5 backdrop-blur-sm border-l border-white/10 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {state.success ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                            <ShieldCheck size={40} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Access Granted</h3>
                                        <p className="text-gray-300 mb-8">Your credentials have been verified. The secure download link has been sent to <span className="text-white font-bold">{state.message}</span></p>

                                        <button className="w-full py-4 bg-green-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:bg-green-500 transition-all shadow-lg shadow-green-900/40">
                                            <Download size={20} />
                                            <span>Download Corporate Profile</span>
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form action={formAction} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                                <div className="relative">
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                                                        placeholder="Engineer Name"
                                                    />
                                                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                                </div>
                                                {state.errors?.name && <p className="text-red-500 text-xs ml-1">{state.errors.name[0]}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Company</label>
                                                <div className="relative">
                                                    <input
                                                        name="company"
                                                        type="text"
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                                                        placeholder="Organization"
                                                    />
                                                    <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                                </div>
                                                {state.errors?.company && <p className="text-red-500 text-xs ml-1">{state.errors.company[0]}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Official Email</label>
                                            <div className="relative">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                                                    placeholder="name@company.com"
                                                />
                                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            </div>
                                            {state.errors?.email && <p className="text-red-500 text-xs ml-1">{state.errors.email[0]}</p>}
                                        </div>

                                        <button
                                            disabled={isPending}
                                            className="w-full mt-4 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isPending ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    <span>VERIFYING CREDENTIALS...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={20} />
                                                    <span>REQUEST ACCESS</span>
                                                </>
                                            )}
                                        </button>
                                        <p className="text-xs text-gray-500 text-center">
                                            * Access is restricted to registered Facility Managers and Consultants.
                                        </p>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
