//app/(components)/adminComponents/About/modal/EditChallengeDataModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateChallengeData } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import IconPickerModal from '@/app/admin/components/IconPickerModal';
import { Edit, Plus, Trash2 } from 'lucide-react';

interface EditChallengeDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: any;
    onSuccess: () => void;
}

export default function EditChallengeDataModal({
                                                   isOpen,
                                                   onClose,
                                                   initialData,
                                                   onSuccess,
                                               }: EditChallengeDataModalProps) {
    const [formData, setFormData] = useState({
        statistic: '',
        description: '',
        subDescription: '',
        items: [{ icon: 'target', text: '' }],
    });

    const [loading, setLoading] = useState(false);

    // ✅ Sync initial data
    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                statistic: initialData.statistic || '',
                description: initialData.description || '',
                subDescription: initialData.subDescription || '',
                items:
                    initialData.items?.map((item: any) => ({
                        icon: item.icon || 'target',
                        text: item.text || '',
                    })) || [{ icon: 'target', text: '' }],
            });
        }
    }, [isOpen, initialData]);

    // ✅ Handlers
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

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { icon: 'target', text: '' }],
        });
    };

    const removeItem = (index: number) => {
        setFormData({
            ...formData,
            items: formData.items.filter((_, i) => i !== index),
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Challenge Data">
            <form
                onSubmit={handleSubmit}
                className="space-y-8 max-h-[75vh] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-400/40 dark:scrollbar-thumb-gray-600/40"
            >
                {/* ======================== STATISTIC ======================== */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase mb-3">
                        Statistic
                    </label>
                    <input
                        type="text"
                        value={formData.statistic}
                        onChange={(e) => setFormData({ ...formData, statistic: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-fuchsia-500 bg-transparent"
                        placeholder="e.g., 75% of youth unemployed"
                        disabled={loading}
                    />
                </div>

                {/* ======================== DESCRIPTION ======================== */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase mb-3">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-fuchsia-500 bg-transparent"
                        rows={2}
                        disabled={loading}
                    />
                </div>

                {/* ======================== SUB DESCRIPTION ======================== */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase mb-3">
                        Sub Description
                    </label>
                    <textarea
                        value={formData.subDescription}
                        onChange={(e) => setFormData({ ...formData, subDescription: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-fuchsia-500 bg-transparent"
                        rows={2}
                        disabled={loading}
                    />
                </div>

                {/* ======================== ITEMS SECTION ======================== */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">
                            Challenge Items
                        </h3>
                        <button
                            type="button"
                            onClick={addItem}
                            className="flex items-center gap-2 text-fuchsia-600 hover:text-fuchsia-700 text-sm font-medium"
                            disabled={loading}
                        >
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.items.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition hover:border-fuchsia-500"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    {/* ICON PICKER */}
                                    <div className="w-full sm:w-1/3">
                                        <IconPickerModal
                                            selected={item.icon}
                                            onSelect={(icon) => updateItem(index, 'icon', icon)}
                                            label="Icon"
                                        />
                                    </div>

                                    {/* TEXT INPUT */}
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 dark:text-gray-400">
                                            Text
                                        </label>
                                        <input
                                            type="text"
                                            value={item.text}
                                            onChange={(e) => updateItem(index, 'text', e.target.value)}
                                            className="w-full p-3 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-fuchsia-500 bg-transparent"
                                            placeholder="Enter item text"
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* DELETE BUTTON */}
                                    <div className="self-center sm:self-end">
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="p-2 text-red-600 hover:text-red-700 transition rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                                            disabled={loading}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ======================== SUBMIT BUTTON ======================== */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="submit"
                        disabled={!formData.statistic.trim() || loading}
                        className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition"
                    >
                        <Edit className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Update Challenge Data'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
