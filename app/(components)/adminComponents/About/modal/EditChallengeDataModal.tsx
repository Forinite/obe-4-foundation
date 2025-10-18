//app/(components)/adminComponents/About/modal/EditChallengeDataModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateChallengeData } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';
import { renderIconOptions } from '@/lib/icons';

export default function EditChallengeDataModal({
                                                   isOpen,
                                                   onClose,
                                                   initialData,
                                                   onSuccess
                                               }: {
    isOpen: boolean;
    onClose: () => void;
    initialData: any;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        statistic: '',
        description: '',
        subDescription: '',
        items: [{ icon: 'target', text: '' }]
    });
    const [loading, setLoading] = useState(false);

    // 🔥 FIX: SYNC WITH INITIAL DATA!
    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                statistic: initialData.statistic || '',
                description: initialData.description || '',
                subDescription: initialData.subDescription || '',
                items: initialData.items?.map((item: any) => ({
                    icon: item.icon || 'target',
                    text: item.text || ''
                })) || [{ icon: 'target', text: '' }]
            });
            console.log('🔥 CHALLENGE SET:', initialData);
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.statistic.trim()) return;

        setLoading(true);
        try {
            await updateChallengeData(formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update challenge data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateItem = (index: number, field: string, value: string) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, items: newItems });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Challenge Data">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Statistic</label>
                    <input
                        type="text"
                        value={formData.statistic}
                        onChange={(e) => setFormData({ ...formData, statistic: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
                        placeholder="e.g., 75% of youth unemployed"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
                        rows={2}
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Sub Description</label>
                    <textarea
                        value={formData.subDescription}
                        onChange={(e) => setFormData({ ...formData, subDescription: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
                        rows={2}
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Items</label>
                    {formData.items.map((item, index) => (
                        <div key={index} className="space-y-2 mb-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <select
                                value={item.icon}
                                onChange={(e) => updateItem(index, 'icon', e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {renderIconOptions()}
                            </select>
                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) => updateItem(index, 'text', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Item text"
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!formData.statistic.trim() || loading}
                    className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Challenge Data'}
                </button>
            </form>
        </Modal>
    );
}