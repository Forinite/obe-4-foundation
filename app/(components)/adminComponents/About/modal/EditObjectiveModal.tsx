//app/(components)/adminComponents/About/modal/EditObjectiveModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Modal from '@/app/admin/components/Modal';
import IconPickerModal from '@/app/admin/components/IconPickerModal';
import { updateObjective } from '@/app/actions/about';

export default function EditObjectiveModal({
                                               isOpen,
                                               onClose,
                                               index,
                                               initialObjective,
                                               onSuccess,
                                           }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialObjective: any;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: 'target',
        title: '',
        items: [''],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && initialObjective) {
            setFormData({
                icon: initialObjective.icon || 'target',
                title: initialObjective.title || '',
                items: initialObjective.items?.length ? initialObjective.items : [''],
            });
        }
    }, [isOpen, initialObjective]);

    const handleAddItem = () =>
        setFormData((prev) => ({ ...prev, items: [...prev.items, ''] }));
    const handleRemoveItem = (index: number) =>
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setLoading(true);
        try {
            await updateObjective(index, {
                icon: formData.icon,
                title: formData.title.trim(),
                items: formData.items.filter((item) => item.trim()),
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update objective:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Objective">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Icon Picker */}
                <IconPickerModal
                    selected={formData.icon}
                    onSelect={(icon) => setFormData({ ...formData, icon })}
                    label="Select Icon"
                    color={'cyan'}
                />

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Objective title"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-900"
                        disabled={loading}
                    />
                </div>

                {/* Items */}
                <div>
                    <label className="block text-sm font-medium mb-2">Items</label>
                    <div className="space-y-3">
                        {formData.items.map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const newItems = [...formData.items];
                                        newItems[i] = e.target.value;
                                        setFormData({ ...formData, items: newItems });
                                    }}
                                    placeholder={`Item ${i + 1}`}
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-900"
                                    disabled={loading}
                                />
                                {formData.items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(i)}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="mt-3 text-cyan-600 hover:text-cyan-700 text-sm flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add item
                    </button>
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={!formData.title.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Objective'}
                </button>
            </form>
        </Modal>
    );
}
