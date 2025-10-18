//app/(components)/adminComponents/Home/modals/EditServiceModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useHomeData } from '@/app/hooks/useHomeData';
import { updateService } from '@/app/actions/home';
import { Service } from '@/app/types';
import { renderIcon } from '@/lib/icons';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';

const ICON_OPTIONS = [
    'Heart', 'Stethoscope', 'Building', 'Users', 'Target', 'Shield',
    'Doctor', 'Books', 'Book', 'MoneyBag', 'Land', 'Document'
];

export default function EditServiceModal({
                                             isOpen,
                                             onClose,
                                             index,
                                             initialService,
                                             onSuccess
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
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        disabled={loading}
                    >
                        {ICON_OPTIONS.map((icon) => (
                            <option key={icon} value={icon}>{icon}</option>
                        ))}
                    </select>
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded flex justify-center">
                        {renderIcon(formData.icon, 'w-6 h-6')}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
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
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!formData.title.trim() || !formData.description.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Service'}
                </button>
            </form>
        </Modal>
    );
}