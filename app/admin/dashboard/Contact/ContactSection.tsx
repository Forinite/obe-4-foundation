// app/admin/dashboard/Contact/ContactSection.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Info, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContactData } from '@/app/hooks/useContactData';
import GeneralInfoCard from '@/app/(components)/adminComponents/Contact/GeneralInfoCard';
import FAQCard from '@/app/subcomponents/ContactComponents/FAQCard';
import EditGeneralInfoModal from '@/app/(components)/adminComponents/Contact/modals/EditGeneralInfoModal';
import AddFAQModal from '@/app/(components)/adminComponents/Contact/modals/AddFAQModal';
import EditFAQModal from '@/app/(components)/adminComponents/Contact/modals/EditFAQModal';
import {
    updateGeneralInfo,
    addFAQ,
    deleteFAQ,
    updateFAQ
} from '@/app/actions/contact';

export default function ContactSection() {
    const { data, loading, error, refetch } = useContactData();

    // 🔥 EDIT MODALS
    const [showEditGeneralInfoModal, setShowEditGeneralInfoModal] = useState(false);

    // 🔥 FAQ MODALS
    const [showAddFAQModal, setShowAddFAQModal] = useState(false);
    const [showEditFAQModal, setShowEditFAQModal] = useState(false);
    const [editFAQIndex, setEditFAQIndex] = useState(-1);
    const [editFAQData, setEditFAQData] = useState({ question: '', answer: '' });

    // 🔥 DELETE MODALS
    const [showDeleteFAQModal, setShowDeleteFAQModal] = useState(false);
    const [deleteFAQIndex, setDeleteFAQIndex] = useState(-1);

    const handleSuccess = () => {
        refetch();
    };

    // 🔥 CALLBACKS
    const openEditGeneralInfo = () => setShowEditGeneralInfoModal(true);
    const openAddFAQ = () => setShowAddFAQModal(true);

    const openEditFAQ = (index: number, faq: any) => {
        setEditFAQIndex(index);
        setEditFAQData(faq);
        setShowEditFAQModal(true);
    };

    const openDeleteFAQ = (index: number) => {
        setDeleteFAQIndex(index);
        setShowDeleteFAQModal(true);
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    if (!data) return <div className="p-6 text-center">No data</div>;

    return (
        <>
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
                                <Info className="md:w-5 md:h-5 w-4 h-4 " />
                            </div>
                            <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-100">General Info</h3>
                        </div>
                        <button
                            onClick={openEditGeneralInfo}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white md:text-sm text-xs font-medium transition-transform hover:scale-105 shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Edit <span className={'md:inline hidden'}> Info</span></span>
                        </button>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-sm md:p-6 hover:shadow-md transition-all duration-300">
                        <GeneralInfoCard
                            data={data.generalInfo}
                            onEdit={openEditGeneralInfo}
                            onRefetch={handleSuccess}
                        />
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
                            <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-100">FAQs</h3>
                        </div>
                        <button
                            onClick={openAddFAQ}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white md:text-sm text-xs font-medium transition-transform hover:scale-105 shadow-sm"
                        >
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
                                    onEdit={() => openEditFAQ(index, faq)}
                                    onDelete={() => openDeleteFAQ(index)}
                                    onRefetch={handleSuccess}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* 🔥 ALL 5 MODALS RENDER HERE = PERFECT POSITIONING! */}

            {/* EDIT GENERAL INFO */}
            <EditGeneralInfoModal
                isOpen={showEditGeneralInfoModal}
                onClose={() => setShowEditGeneralInfoModal(false)}
                initialData={data.generalInfo}
                onSuccess={handleSuccess}
            />

            {/* FAQ MODALS */}
            <AddFAQModal
                isOpen={showAddFAQModal}
                onClose={() => setShowAddFAQModal(false)}
                onSuccess={handleSuccess}
            />
            <EditFAQModal
                isOpen={showEditFAQModal}
                onClose={() => setShowEditFAQModal(false)}
                index={editFAQIndex}
                initialFAQ={editFAQData}
                onSuccess={handleSuccess}
            />

            {/* 🔥 DELETE FAQ MODAL */}
            {showDeleteFAQModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete FAQ?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    await deleteFAQ(deleteFAQIndex);
                                    handleSuccess();
                                    setShowDeleteFAQModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteFAQModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}