//app/(components)/adminComponents/About/modal/AddApproachModal.tsx

'use client';

import React, { useState } from 'react';
import { addApproach } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Plus } from 'lucide-react';
import IconPickerModal from '@/app/admin/components/IconPickerModal';

export default function AddApproachModal({
                                             isOpen,
                                             onClose,
                                             onSuccess,
                                         }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: 'map',
        title: '',
        description: '',
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
                        placeholder="Enter approach title"
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
                        placeholder="Enter approach description"
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
                    <Plus className="w-4 h-4" />
                    {loading ? 'Adding...' : 'Add Approach'}
                </button>
            </form>
        </Modal>
    );
}
