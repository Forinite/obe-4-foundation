//app/(components)/adminComponents/Home/modals/EditServiceModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateService } from '@/app/actions/home';
import { Service } from '@/app/types';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';
import IconPickerModal from '@/app/admin/components/IconPickerModal'; // ✅ Correct picker

export default function EditServiceModal({
                                             isOpen,
                                             onClose,
                                             index,
                                             initialService,
                                             onSuccess,
                                         }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialService: Service;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState<Service>(initialService);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialService);
    }, [initialService]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) return;

        setLoading(true);
        try {
            await updateService(index, formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update service:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Service">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 font-inter animate-fadeIn"
            >
                {/* ICON PICKER */}
                <IconPickerModal
                    label="Icon"
                    selected={formData.icon}
                    onSelect={(icon) => setFormData({ ...formData, icon })}
                    color="emerald"
                />

                {/* TITLE */}
                <div>
                    <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900"
                        disabled={loading}
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900"
                        rows={3}
                        disabled={loading}
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={
                        !formData.title.trim() || !formData.description.trim() || loading
                    }
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Service'}
                </button>
            </form>
        </Modal>
    );
}
