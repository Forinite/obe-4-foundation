//app/(components)/adminComponents/Contact/modals/EditFAQModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateFAQ } from '@/app/actions/contact';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';

export default function EditFAQModal({
                                         isOpen,
                                         onClose,
                                         index,
                                         initialFAQ,
                                         onSuccess
                                     }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialFAQ: { question: string; answer: string };
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({ question: '', answer: '' });
    const [loading, setLoading] = useState(false);

    // 🔥 FIX: SYNC WITH INITIAL DATA!
    useEffect(() => {
        if (isOpen && initialFAQ) {
            setFormData({
                question: initialFAQ.question || '',
                answer: initialFAQ.answer || ''
            });
            console.log('🔥 FAQ SET:', initialFAQ);
        }
    }, [isOpen, initialFAQ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.question.trim() || !formData.answer.trim()) return;

        setLoading(true);
        try {
            await updateFAQ(index, formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update FAQ:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit FAQ">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Question *</label>
                    <input
                        type="text"
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        placeholder="What are your operating hours?"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Answer *</label>
                    <textarea
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        rows={3}
                        placeholder="We operate Monday - Friday, 9:00 AM - 5:00 PM."
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!formData.question.trim() || !formData.answer.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update FAQ'}
                </button>
            </form>
        </Modal>
    );
}