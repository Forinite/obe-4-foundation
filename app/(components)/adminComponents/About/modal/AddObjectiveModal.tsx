//app/(components)/adminComponents/About/modal/AddObjectiveModal.tsx

'use client';

import React, { useState } from 'react';
import { addObjective } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Plus } from 'lucide-react';
import { renderIconOptions } from '@/lib/icons';

export default function AddObjectiveModal({
                                              isOpen,
                                              onClose,
                                              onSuccess
                                          }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: 'target',
        title: '',
        items: ['', '', '']
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setLoading(true);
        try {
            await addObjective({
                icon: formData.icon,
                title: formData.title.trim(),
                items: formData.items.filter(item => item.trim())
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
                        placeholder="Objective title"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Items (3 minimum)</label>
                    {formData.items.map((item, index) => (
                        <input
                            key={index}
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index] = e.target.value;
                                setFormData({ ...formData, items: newItems });
                            }}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 focus:ring-2 focus:ring-cyan-500"
                            placeholder={`Item ${index + 1}`}
                            disabled={loading}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!formData.title.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {loading ? 'Adding...' : 'Add Objective'}
                </button>
            </form>
        </Modal>
    );
}