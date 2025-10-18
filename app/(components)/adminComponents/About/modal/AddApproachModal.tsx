//app/(components)/adminComponents/About/modal/AddApproachModal.tsx

'use client';

import React, { useState } from 'react';
import { addApproach } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Plus } from 'lucide-react';
import { renderIconOptions } from '@/lib/icons';

export default function AddApproachModal({
                                             isOpen,
                                             onClose,
                                             onSuccess
                                         }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: 'map',
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) return;

        setLoading(true);
        try {
            await addApproach(formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to add approach:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Approach">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
                        disabled={loading}
                    >
                        {renderIconOptions()}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        placeholder="Approach title"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        rows={3}
                        placeholder="Approach description"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!formData.title.trim() || !formData.description.trim() || loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {loading ? 'Adding...' : 'Add Approach'}
                </button>
            </form>
        </Modal>
    );
}