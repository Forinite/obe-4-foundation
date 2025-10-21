//app/(components)/adminComponents/About/modal/EditApproachModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateApproach } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';
import IconPickerModal from '@/app/admin/components/IconPickerModal';

export default function EditApproachModal({
                                              isOpen,
                                              onClose,
                                              index,
                                              initialApproach,
                                              onSuccess,
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
        description: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && initialApproach) {
            setFormData({
                icon: initialApproach.icon || 'map',
                title: initialApproach.title || '',
                description: initialApproach.description || '',
            });
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
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Icon Picker */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Icon
                    </label>
                    <IconPickerModal
                        selected={formData.icon}
                        onSelect={(icon) => setFormData({ ...formData, icon })}
                        color="emerald"
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                        placeholder="Edit approach title"
                        disabled={loading}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                        rows={3}
                        placeholder="Edit approach description"
                        disabled={loading}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={
                        !formData.title.trim() || !formData.description.trim() || loading
                    }
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Approach'}
                </button>
            </form>
        </Modal>
    );
}
