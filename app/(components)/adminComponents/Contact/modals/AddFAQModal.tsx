//app/(components)/adminComponents/Contact/modals/AddFAQModal.tsx

'use client';

import React, { useState } from 'react';
import { addFAQ } from '@/app/actions/contact';
import Modal from '@/app/admin/components/Modal';
import { Plus } from 'lucide-react';

export default function AddFAQModal({
                                        isOpen,
                                        onClose,
                                        onSuccess
                                    }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({ question: '', answer: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.question.trim() || !formData.answer.trim()) return;

        setLoading(true);
        try {
            await addFAQ(formData);
            onSuccess();
            onClose();
            setFormData({ question: '', answer: '' });
        } catch (error) {
            console.error('Failed to add FAQ:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add FAQ">
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
                    <Plus className="w-4 h-4" />
                    {loading ? 'Adding...' : 'Add FAQ'}
                </button>
            </form>
        </Modal>
    );
}