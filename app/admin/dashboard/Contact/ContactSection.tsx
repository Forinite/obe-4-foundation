// app/admin/dashboard/Contact/ContactSection.tsx
'use client';
import { ContactData } from '@/app/types';
import { Plus, Info, MessageSquare } from 'lucide-react';
import GeneralInfoCard from '@/app/(components)/adminComponents/Contact/GeneralInfoCard';
import FAQCard from '@/app/subcomponents/ContactComponents/FAQCard';
import { motion } from 'framer-motion';

interface ContactSectionProps {
    data: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
    return (
        <div className="space-y-10 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-md border border-gray-200 dark:border-gray-800">
            {/* General Info Section */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                            <Info className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">General Info</h3>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-transform hover:scale-105 shadow-sm">
                        <Plus className="w-4 h-4" />
                        <span>Edit Info</span>
                    </button>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                    <GeneralInfoCard data={data.generalInfo} />
                </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">FAQs</h3>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-transform hover:scale-105 shadow-sm">
                        <Plus className="w-4 h-4" />
                        <span>Add FAQ</span>
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <FAQCard
                                question={faq.question}
                                answer={faq.answer}
                                index={index}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
