'use client';

import { motion } from 'framer-motion';
import { Upload, Send, User, Mail, Phone, Briefcase, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useActionState, useEffect } from 'react';
import { submitApplication } from '@/actions/career-action';

const initialState = {
    success: false,
    message: '',
    errors: {}
};

export default function CareerForm() {
    const [fileName, setFileName] = useState('No file chosen');
    const [state, formAction, isPending] = useActionState(submitApplication, initialState);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    // Reset form on success
    useEffect(() => {
        if (state.success) {
            setFileName('No file chosen');
            // Optional: Scroll to top of form or show success message appropriately
            const form = document.querySelector('form') as HTMLFormElement;
            if (form) form.reset();
        }
    }, [state.success]);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#0a0a0a] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/20 flex flex-col lg:flex-row min-h-[700px]">

                    {/* LEFT COLUMN - VISUAL */}
                    <div className="relative w-full lg:w-5/12 min-h-[300px] lg:min-h-full bg-red-600 overflow-hidden group">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-900/40 to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    Recruiting Now
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                                    JOIN THE<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ELITE FORCE</span>
                                </h2>
                                <p className="text-gray-300 text-lg max-w-sm">
                                    Your expertise protects lives. Bring your skills to the frontlines of safety engineering.
                                </p>
                            </div>

                            <div className="space-y-6 hidden lg:block">
                                <div className="flex items-center gap-4 text-white/80">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Career Growth</p>
                                        <p className="text-sm">Structured path to Senior Engineer</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-white/80">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Full Sponsorship</p>
                                        <p className="text-sm">Certifications & Training covered</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - FORM */}
                    <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 relative">
                        {/* Decorative Background Grid */}
                        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="w-8 h-1 bg-red-600 rounded-full" />
                                    Application Form
                                </h3>
                                {state.success && (
                                    <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                                        <CheckCircle size={16} />
                                        <span className="text-sm font-semibold">Application Sent!</span>
                                    </div>
                                )}
                            </div>

                            {state.message && !state.success && (
                                <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-2">
                                    <AlertCircle size={20} />
                                    <span>{state.message}</span>
                                </div>
                            )}

                            <form action={formAction} className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                        <input
                                            name="fullName"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className={`w-full bg-white/5 border ${state.errors?.fullName ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'} rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all`}
                                        />
                                    </div>
                                    {state.errors?.fullName && (
                                        <p className="text-red-500 text-xs ml-1">{state.errors.fullName[0]}</p>
                                    )}
                                </div>

                                {/* Email & Phone Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className={`w-full bg-white/5 border ${state.errors?.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'} rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all`}
                                            />
                                        </div>
                                        {state.errors?.email && (
                                            <p className="text-red-500 text-xs ml-1">{state.errors.email[0]}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                            <input
                                                name="phone"
                                                type="tel"
                                                placeholder="+971 50 000 0000"
                                                className={`w-full bg-white/5 border ${state.errors?.phone ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'} rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all`}
                                            />
                                        </div>
                                        {state.errors?.phone && (
                                            <p className="text-red-500 text-xs ml-1">{state.errors.phone[0]}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Position Applied For */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Position Applied For</label>
                                    <div className="relative group">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                        <input
                                            name="position"
                                            type="text"
                                            placeholder="e.g. Senior Fire Technician"
                                            className={`w-full bg-white/5 border ${state.errors?.position ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'} rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all`}
                                        />
                                    </div>
                                    {state.errors?.position && (
                                        <p className="text-red-500 text-xs ml-1">{state.errors.position[0]}</p>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Upload CV (PDF, DOCX - Max 5MB)</label>
                                    <div className="relative">
                                        <input
                                            name="cv"
                                            type="file"
                                            id="cv-upload"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <label
                                            htmlFor="cv-upload"
                                            className={`flex items-center justify-between w-full bg-white/5 border border-dashed ${state.errors?.file ? 'border-red-500/50 bg-red-500/5' : 'border-white/20'} rounded-xl p-4 cursor-pointer hover:bg-white/10 hover:border-red-500/50 transition-all group`}
                                        >
                                            <span className="text-gray-400 group-hover:text-white transition-colors truncate max-w-[200px]">{fileName}</span>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm text-white group-hover:bg-red-600 transition-colors">
                                                <Upload size={16} />
                                                <span>Choose File</span>
                                            </div>
                                        </label>
                                    </div>
                                    {state.errors?.file && (
                                        <p className="text-red-500 text-xs ml-1">{state.errors.file[0]}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Additional Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us briefly about your experience..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={isPending}
                                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 group"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>SENDING...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>SUBMIT APPLICATION</span>
                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
