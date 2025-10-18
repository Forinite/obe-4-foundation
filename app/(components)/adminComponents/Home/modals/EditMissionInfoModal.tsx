//app/(components)/adminComponents/Home/modals/EditMissionInfoModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useHomeData } from '@/app/hooks/useHomeData';
import { updateMissionInfo } from '@/app/actions/home';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';
import {HomeData} from "@/app/types";

export default function EditMissionInfoModal({
                                                 isOpen,
                                                 onClose,
                                                 initialData,
                                                 onSuccess
                                             }: {
    isOpen: boolean;
    onClose: () => void;
    initialData: HomeData['missionInfo'];
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.text.trim() || formData.list.length === 0) return;

        setLoading(true);
        try {
            await updateMissionInfo(formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update mission info:', error);
        } finally {
            setLoading(false);
        }
    };

    const addListItem = () => {
        setFormData({ ...formData, list: [...formData.list, ''] });
    };

    const updateListItem = (index: number, value: string) => {
        const newList = [...formData.list];
        newList[index] = value;
        setFormData({ ...formData, list: newList });
    };

    const removeListItem = (index: number) => {
        setFormData({ ...formData, list: formData.list.filter((_, i) => i !== index) });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Mission Info">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Percentage (0-100)</label>
                    <input
                        type="number"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                        min="0"
                        max="100"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Text</label>
                    <input
                        type="text"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">List Items</label>
                    {formData.list.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => updateListItem(index, e.target.value)}
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded"
                                placeholder={`List item ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeListItem(index)}
                                className="p-2 text-red-500 hover:text-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addListItem}
                        className="text-cyan-600 hover:text-cyan-700 text-sm"
                    >
                        + Add Item
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!formData.text.trim() || formData.list.length === 0 || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Mission Info'}
                </button>
            </form>
        </Modal>
    );
}