'use client';

import { useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send, CheckCircle, Mail, User, MessageSquare, FileText } from 'lucide-react';
import { submitGeneralInquiry } from '@/actions/contact-action';

const initialState = {
    success: false,
    message: '',
    errors: {},
};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitGeneralInquiry, initialState);

    return (
        <div className="bg-safemax-dark text-white p-8 md:p-10 rounded-3xl h-full border border-white/10 relative overflow-hidden flex flex-col">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-safemax-orange/10 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16"></div>

            <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-3xl font-bold mb-2">Send us a Message</h3>
                <p className="text-gray-400 mb-8">For general inquiries, partnerships, or career questions.</p>

                <AnimatePresence mode="wait">
                    {state.success ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center"
                        >
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                <CheckCircle size={32} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                            <p className="text-gray-300">Thank you for contacting SafeMax. We will get back to you shortly.</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            action={formAction}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-5 flex-1 flex flex-col"
                        >
                            {/* Name & Email Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <div className="relative">
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-safemax-orange focus:bg-white/10 transition-all placeholder:text-gray-600"
                                        />
                                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                    {state.errors?.name && <p className="text-red-500 text-xs ml-1">{state.errors.name[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <div className="relative">
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-safemax-orange focus:bg-white/10 transition-all placeholder:text-gray-600"
                                        />
                                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                    {state.errors?.email && <p className="text-red-500 text-xs ml-1">{state.errors.email[0]}</p>}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-1">
                                <div className="relative">
                                    <input
                                        name="subject"
                                        type="text"
                                        placeholder="Subject"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-safemax-orange focus:bg-white/10 transition-all placeholder:text-gray-600"
                                    />
                                    <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                </div>
                                {state.errors?.subject && <p className="text-red-500 text-xs ml-1">{state.errors.subject[0]}</p>}
                            </div>

                            {/* Message */}
                            <div className="space-y-1 flex-1">
                                <div className="relative h-full">
                                    <textarea
                                        name="message"
                                        placeholder="How can we help you?"
                                        rows={4}
                                        className="w-full h-full min-h-[120px] bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-safemax-orange focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none"
                                    ></textarea>
                                    <MessageSquare size={18} className="absolute left-3 top-4 text-gray-500" />
                                </div>
                                {state.errors?.message && <p className="text-red-500 text-xs ml-1">{state.errors.message[0]}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={isPending}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>SENDING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>SEND MESSAGE</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
