//app/(components)/adminComponents/Contact/modals/EditGeneralInfoModal.tsx


'use client';

import React, { useState, useEffect } from 'react';
import { updateGeneralInfo } from '@/app/actions/contact';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';

export default function EditGeneralInfoModal({
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
        address1: '',
        address2: '',
        phone1: '',
        phone2: '',
        email: '',
        twitter: '',
        linkedin: '',
        openDays: [],
        charity: ''
    });
    const [loading, setLoading] = useState(false);

    // 🔥 PERFECT FIX: SYNC WITH EXACT INITIAL DATA!
    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                address1: initialData.address1 || '',
                address2: initialData.address2 || '',
                phone1: initialData.phone1 || '',
                phone2: initialData.phone2 || '',
                email: initialData.email || '',
                twitter: initialData.twitter || '',
                linkedin: initialData.linkedin || '',
                // ✅ EXACT EXISTING DAYS (0 = empty, 3 = 3 rows, etc.)
                openDays: initialData.openDays || [],
                charity: initialData.charity || ''
            });
            console.log('🔥 GENERAL INFO SET:', initialData);
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.address1.trim() || !formData.email.trim()) return;

        setLoading(true);
        try {
            await updateGeneralInfo(formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update general info:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit General Info">
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Addresses */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Address 1 *</label>
                        <input
                            type="text"
                            value={formData.address1}
                            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="Primary address"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Address 2</label>
                        <input
                            type="text"
                            value={formData.address2}
                            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="Secondary address"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Phones */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone 1 *</label>
                        <input
                            type="tel"
                            value={formData.phone1}
                            onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="+1 (555) 123-4567"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone 2</label>
                        <input
                            type="tel"
                            value={formData.phone2}
                            onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="+1 (555) 987-6543"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Email & Social */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="contact@example.com"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Twitter</label>
                        <input
                            type="url"
                            value={formData.twitter}
                            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="https://twitter.com/yourhandle"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                        <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                            placeholder="https://linkedin.com/in/yourprofile"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Charity */}
                <div>
                    <label className="block text-sm font-medium mb-2">Charity</label>
                    <input
                        type="text"
                        value={formData.charity}
                        onChange={(e) => setFormData({ ...formData, charity: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        placeholder="Charity organization name"
                        disabled={loading}
                    />
                </div>

                {/* 🔥 FIXED: DYNAMIC OPEN DAYS (EXACT EXISTING + ADD/REMOVE!) */}
                <div>
                    <label className="block text-sm font-medium mb-2">Open Days</label>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                        {formData.openDays.map((day: { day: string, time: string }, index) => (
                            <div key={index} className="flex gap-2 items-end bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <select
                                    value={day.day}
                                    onChange={(e) => {
                                        const newDays = [...formData.openDays];
                                        newDays[index].day = e.target.value;
                                        setFormData({ ...formData, openDays: newDays });
                                    }}
                                    className="flex-1 p-2 border rounded"
                                    disabled={loading}
                                >
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                <input
                                    type="text"
                                    value={day.time}
                                    onChange={(e) => {
                                        const newDays = [...formData.openDays];
                                        newDays[index].time = e.target.value;
                                        setFormData({ ...formData, openDays: newDays });
                                    }}
                                    className="flex-1 p-2 border rounded"
                                    placeholder="9:00 AM - 5:00 PM"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newDays = formData.openDays.filter((_, i) => i !== index);
                                        setFormData({ ...formData, openDays: newDays });
                                    }}
                                    className="p-2 text-red-500 hover:text-red-700"
                                    disabled={loading || formData.openDays.length <= 1}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setFormData({
                            ...formData,
                            openDays: [...formData.openDays, { day: 'Monday', time: '9:00 AM - 5:00 PM' }]
                        })}
                        className="mt-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                        disabled={loading}
                    >
                        + Add Day
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!formData.address1.trim() || !formData.email.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update General Info'}
                </button>
            </form>
        </Modal>
    );
}