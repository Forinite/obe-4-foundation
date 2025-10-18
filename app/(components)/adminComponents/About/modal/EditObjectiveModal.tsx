//app/(components)/adminComponents/About/modal/EditObjectiveModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateObjective } from '@/app/actions/about';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';
import { renderIconOptions } from '@/lib/icons';

export default function EditObjectiveModal({
                                               isOpen,
                                               onClose,
                                               index,
                                               initialObjective,
                                               onSuccess
                                           }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialObjective: any;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        icon: '',
        title: '',
        items: ['', '', '']
    });
    const [loading, setLoading] = useState(false);

    // 🔥 FIX: SYNC WITH INITIAL DATA!
    useEffect(() => {
        if (isOpen && initialObjective) {
            setFormData({
                icon: initialObjective.icon || 'target',
                title: initialObjective.title || '',
                items: initialObjective.items?.length >= 3
                    ? initialObjective.items
                    : ['', '', '']
            });
            console.log('🔥 OBJECTIVE SET:', initialObjective);
        }
    }, [isOpen, initialObjective]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setLoading(true);
        try {
            await updateObjective(index, {
                icon: formData.icon,
                title: formData.title.trim(),
                items: formData.items.filter(item => item.trim())
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
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
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
                    <label className="block text-sm font-medium mb-2">Items</label>
                    {formData.items.map((item, i) => (
                        <input
                            key={i}
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[i] = e.target.value;
                                setFormData({ ...formData, items: newItems });
                            }}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 focus:ring-2 focus:ring-cyan-500"
                            placeholder={`Item ${i + 1}`}
                            disabled={loading}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!formData.title.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Objective'}
                </button>
            </form>
        </Modal>
    );
}