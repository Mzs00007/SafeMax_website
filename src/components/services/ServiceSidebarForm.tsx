'use client';

import { useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { submitServiceRequest } from '@/actions/service-action';

type ServiceType = 'fire' | 'security';

interface Props {
    type: ServiceType;
}

const CONFIG = {
    fire: {
        bg: 'bg-gray-900',
        accent: 'bg-safemax-orange',
        accentRun: 'from-orange-600 to-red-600',
        title: 'Need an Expert?',
        subtitle: 'Get a callback from a DCD Certified Engineer within 30 mins.',
        button: 'Request Callback',
        iconBg: 'bg-[url("/assets/images/safemax-shield-bg.png")]',
        requestType: 'fire-expert',
    },
    security: {
        bg: 'bg-gray-900',
        accent: 'bg-indigo-600',
        accentRun: 'from-indigo-600 to-blue-600',
        title: 'Security Audit?',
        subtitle: 'Book a free SIRA compliance risk assessment for your facility.',
        button: 'Book Free Audit',
        iconBg: 'bg-[url("/assets/images/project-placeholder.png")]',
        requestType: 'security-audit',
    },
};

const initialState = {
    success: false,
    message: '',
    errors: {},
};

export default function ServiceSidebarForm({ type }: Props) {
    const [state, formAction, isPending] = useActionState(submitServiceRequest, initialState);
    const theme = CONFIG[type];

    return (
        <div className={`mt-8 p-6 rounded-2xl text-white relative overflow-hidden shadow-xl border border-white/10 ${theme.bg}`}>
            {/* Background Texture */}
            <div className={`absolute inset-0 opacity-20 bg-cover bg-center ${theme.iconBg}`}></div>

            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {state.success ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                        >
                            <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${theme.accent} shadow-lg shadow-white/10`}>
                                <CheckCircle size={24} className="text-white" />
                            </div>
                            <h4 className="font-bold text-lg mb-1">Request Received!</h4>
                            <p className="text-sm text-gray-300">Our expert will contact you shortly.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h4 className="font-bold text-lg mb-2">{theme.title}</h4>
                            <p className="text-gray-300 text-sm mb-4">{theme.subtitle}</p>

                            <form action={formAction} className="space-y-3">
                                <input type="hidden" name="requestType" value={theme.requestType} />

                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all"
                                    />
                                    {state.errors?.name && <p className="text-red-400 text-[10px] mt-1 ml-1">{state.errors.name[0]}</p>}
                                </div>

                                <div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="Mobile Number"
                                        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all"
                                    />
                                    {state.errors?.phone && <p className="text-red-400 text-[10px] mt-1 ml-1">{state.errors.phone[0]}</p>}
                                </div>

                                <button
                                    disabled={isPending}
                                    className={`w-full py-2.5 rounded-lg font-bold text-sm text-white shadow-lg bg-gradient-to-r ${theme.accentRun} hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {isPending ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>{theme.button}</span>
                                            <ArrowRight size={14} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
