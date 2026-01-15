'use client';

import { useActionState, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckCircle, Loader2, Phone, Shield, Flame, Activity, Siren } from 'lucide-react';
import { submitRapidResponse } from '@/actions/contact-action';

const initialState = {
    success: false,
    message: '',
    errors: {},
};

export default function RapidResponseForm() {
    const [state, formAction, isPending] = useActionState(submitRapidResponse, initialState);
    const [selectedService, setSelectedService] = useState('');

    // Auto-reset or redirect logic could go here
    useEffect(() => {
        if (state.success) {
            // Optional: Sound effect or haptic feedback could trigger here
        }
    }, [state.success]);

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {state.success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/20 backdrop-blur-xl rounded-3xl p-8 text-center"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse">
                            <CheckCircle size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Dispatch Initiated</h3>
                        <p className="text-gray-300 mb-6">{state.message}</p>
                        <div className="text-sm text-gray-400 border-t border-white/10 pt-4">
                            Ticket ID: <span className="font-mono text-green-400">#{Math.floor(Math.random() * 9000) + 1000}</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Animated Red Line for Urgency */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-600/20 rounded-lg text-red-500 border border-red-600/30 animate-pulse">
                                <Siren size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Rapid Response Request</h3>
                        </div>

                        <form action={formAction} className="space-y-4">
                            {/* Service Type Selection */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'fire', icon: Flame, label: 'Fire System' },
                                    { id: 'security', icon: Shield, label: 'Security' },
                                    { id: 'amc', icon: Activity, label: 'AMC Visit' },
                                    { id: 'emergency', icon: AlertTriangle, label: 'Emergency' },
                                ].map((item) => (
                                    <label
                                        key={item.id}
                                        className={`cursor-pointer relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${selectedService === item.id
                                                ? 'bg-red-600 text-white border-red-500 shadow-lg scale-[1.02]'
                                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="serviceType"
                                            value={item.id}
                                            className="hidden"
                                            onChange={() => setSelectedService(item.id)}
                                        />
                                        <item.icon size={20} />
                                        <span className="text-xs font-bold uppercase">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                            {state.errors?.serviceType && (
                                <p className="text-red-500 text-xs text-center">{state.errors.serviceType[0]}</p>
                            )}

                            {/* Inputs */}
                            <div className="space-y-3">
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Your Name / Facility Name"
                                        className={`w-full bg-white/5 border ${state.errors?.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all`}
                                    />
                                    {state.errors?.name && (
                                        <p className="text-red-500 text-xs ml-2 mt-1">{state.errors.name[0]}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="Urgent Contact Number"
                                        className={`w-full bg-white/5 border ${state.errors?.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all`}
                                    />
                                    {state.errors?.phone && (
                                        <p className="text-red-500 text-xs ml-2 mt-1">{state.errors.phone[0]}</p>
                                    )}
                                </div>
                            </div>

                            <input type="hidden" name="serviceType" value={selectedService} />

                            <button
                                disabled={isPending}
                                className="w-full mt-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>DISPATCHING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>REQUEST IMMEDIATE ACTION</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
