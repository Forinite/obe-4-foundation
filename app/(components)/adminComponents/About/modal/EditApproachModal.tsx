//app/(components)/adminComponents/About/modal/EditApproachModal.tsx


'use client';

import React, { useState, useEffect } from 'react';
import { updateApproach } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';
import { renderIconOptions } from '@/lib/icons';

export default function EditApproachModal({
                                              isOpen,
                                              onClose,
                                              index,
                                              initialApproach,
                                              onSuccess
                                          }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialApproach: any;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: '',
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    // 🔥 FIX: SYNC WITH INITIAL DATA!
    useEffect(() => {
        if (isOpen && initialApproach) {
            setFormData({
                icon: initialApproach.icon || 'map',
                title: initialApproach.title || '',
                description: initialApproach.description || ''
            });
            console.log('🔥 APPROACH SET:', initialApproach);
        }
    }, [isOpen, initialApproach]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) return;

        setLoading(true);
        try {
            await updateApproach(index, formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update approach:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Approach">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="Approach title"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500"
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
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Approach'}
                </button>
            </form>
        </Modal>
    );
}