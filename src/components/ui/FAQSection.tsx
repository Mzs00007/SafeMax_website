'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title: string;
    description: string;
    items: FAQItem[];
}

export default function FAQSection({ title, description, items }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first one by default

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                        <HelpCircle size={14} />
                        <span>Common Questions</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={false}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white border-red-200 shadow-xl shadow-red-500/5' : 'bg-white border-gray-200 hover:border-red-200'
                                }`}
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-bold pr-8 transition-colors ${openIndex === index ? 'text-red-700' : 'text-gray-900'
                                    }`}>
                                    {item.question}
                                </span>
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-red-50'
                                    }`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="h-px w-full bg-gray-100 mb-4"></div>
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
