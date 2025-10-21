//app/(components)/adminComponents/Contact/modals/EditGeneralInfoModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { updateGeneralInfo } from '@/app/actions/contact';
import Modal from '@/app/admin/components/Modal';
import { Edit, Plus, Trash2 } from 'lucide-react';

export default function EditGeneralInfoModal({
                                                 isOpen,
                                                 onClose,
                                                 initialData,
                                                 onSuccess,
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
        openDays: [] as { day: string; time: string }[],
        charity: '',
    });
    const [loading, setLoading] = useState(false);

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
                openDays: initialData.openDays || [],
                charity: initialData.charity || '',
            });
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

    const handleAddDay = () => {
        setFormData({
            ...formData,
            openDays: [...formData.openDays, { day: 'Monday', time: '9:00 AM - 5:00 PM' }],
        });
    };

    const handleRemoveDay = (index: number) => {
        setFormData({
            ...formData,
            openDays: formData.openDays.filter((_, i) => i !== index),
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit General Info">
            <form
                onSubmit={handleSubmit}
                className="space-y-8 max-h-[75vh] overflow-y-auto px-1 pb-3 scrollbar-thin scrollbar-thumb-gray-400/40 dark:scrollbar-thumb-gray-600/40"
            >
                {/* Address Section */}
                <Section title="Address">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <LabeledInput
                            label="Primary Address *"
                            type="text"
                            value={formData.address1}
                            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                            placeholder="Enter main address"
                            disabled={loading}
                            required
                        />
                        <LabeledInput
                            label="Secondary Address"
                            type="text"
                            value={formData.address2}
                            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                            placeholder="Optional secondary address"
                            disabled={loading}
                        />
                    </div>
                </Section>

                {/* Contact Info */}
                <Section title="Contact Info">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <LabeledInput
                            label="Primary Phone *"
                            type="tel"
                            value={formData.phone1}
                            onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                            placeholder="+234 801 234 5678"
                            disabled={loading}
                            required
                        />
                        <LabeledInput
                            label="Secondary Phone"
                            type="tel"
                            value={formData.phone2}
                            onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                            placeholder="Optional backup number"
                            disabled={loading}
                        />
                    </div>

                    <div className="grid gap-4 mt-4">
                        <LabeledInput
                            label="Email *"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@example.com"
                            disabled={loading}
                            required
                        />
                        <LabeledInput
                            label="Twitter"
                            type="url"
                            value={formData.twitter}
                            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                            placeholder="https://twitter.com/yourhandle"
                            disabled={loading}
                        />
                        <LabeledInput
                            label="LinkedIn"
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/yourprofile"
                            disabled={loading}
                        />
                    </div>
                </Section>

                {/* Charity */}
                <Section title="Charity">
                    <LabeledInput
                        label="Charity Organization Name"
                        type="text"
                        value={formData.charity}
                        onChange={(e) => setFormData({ ...formData, charity: e.target.value })}
                        placeholder="E.g. Hope Foundation"
                        disabled={loading}
                    />
                </Section>

                {/* Open Days */}
                <Section title="Open Days">
                    <div className="space-y-3">
                        {formData.openDays.map((day, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-2 items-stretch bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-3 rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex-1">
                                    <Label>Day</Label>
                                    <select
                                        value={day.day}
                                        onChange={(e) => {
                                            const updated = [...formData.openDays];
                                            updated[index].day = e.target.value;
                                            setFormData({ ...formData, openDays: updated });
                                        }}
                                        className="w-full p-2.5 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-cyan-500"
                                        disabled={loading}
                                    >
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                                            (d) => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <Label>Hours</Label>
                                    <input
                                        type="text"
                                        value={day.time}
                                        onChange={(e) => {
                                            const updated = [...formData.openDays];
                                            updated[index].time = e.target.value;
                                            setFormData({ ...formData, openDays: updated });
                                        }}
                                        placeholder="9:00 AM - 5:00 PM"
                                        className="w-full p-2.5 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-cyan-500"
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveDay(index)}
                                    className="p-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/40 transition self-end"
                                    disabled={loading}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddDay}
                        className="mt-3 flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium text-sm"
                        disabled={loading}
                    >
                        <Plus className="w-4 h-4" /> Add Day
                    </button>
                </Section>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="submit"
                        disabled={!formData.address1.trim() || !formData.email.trim() || loading}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition"
                    >
                        <Edit className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Update General Info'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

/* 🔹 Reusable section wrapper with title and accent */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-gray-50/70 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                {title}
            </h3>
            {children}
        </section>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">{children}</label>;
}

/* 🔹 Reusable labeled input */
function LabeledInput({
                          label,
                          type,
                          value,
                          onChange,
                          placeholder,
                          disabled,
                          required,
                      }: {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 bg-white/90 dark:bg-gray-800/70 shadow-inner hover:shadow transition"
            />
        </div>
    );
}
