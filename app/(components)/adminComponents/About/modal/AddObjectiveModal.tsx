//app/(components)/adminComponents/About/modal/AddObjectiveModal.tsx


'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Modal from '@/app/admin/components/Modal';
import IconPickerModal from '@/app/admin/components/IconPickerModal';
import { addObjective } from '@/app/actions/about';

export default function AddObjectiveModal({
                                              isOpen,
                                              onClose,
                                              onSuccess,
                                          }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: 'target',
        title: '',
        items: [''],
    });
    const [loading, setLoading] = useState(false);

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
            await addObjective({
                icon: formData.icon,
                title: formData.title.trim(),
                items: formData.items.filter((item) => item.trim()),
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to add objective:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Objective">
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
                        placeholder="Enter objective title"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-900"
                        disabled={loading}
                    />
                </div>

                {/* Dynamic Items */}
                <div>
                    <label className="block text-sm font-medium mb-2">Items</label>
                    <div className="space-y-3">
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const newItems = [...formData.items];
                                        newItems[index] = e.target.value;
                                        setFormData({ ...formData, items: newItems });
                                    }}
                                    placeholder={`Item ${index + 1}`}
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-900"
                                    disabled={loading}
                                />
                                {formData.items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
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

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!formData.title.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {loading ? 'Adding...' : 'Add Objective'}
                </button>
            </form>
        </Modal>
    );
}
