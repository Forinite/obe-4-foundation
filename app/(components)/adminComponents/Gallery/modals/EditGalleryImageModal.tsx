// app/(components)/adminComponents/Gallery/modals/EditGalleryImageModal.tsx

'use client';

import React, { useState } from 'react';
import Modal from '@/app/admin/components/Modal';
import { updateGalleryImageCaption } from '@/app/actions/gallery';
import { Edit2, Loader2 } from 'lucide-react';

interface EditGalleryImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageId: string;
    currentCaption?: string;
    onSuccess: () => void;
}

export default function EditGalleryImageModal({
                                                  isOpen,
                                                  onClose,
                                                  imageId,
                                                  currentCaption = '',
                                                  onSuccess,
                                              }: EditGalleryImageModalProps) {
    const [caption, setCaption] = useState(currentCaption);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateGalleryImageCaption(imageId, caption.trim() || null);
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Failed to update caption');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Caption">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Caption (optional)</label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        rows={3}
                        placeholder="e.g., Medical outreach in Ogun State – March 2025"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        maxLength={200}
                    />
                    <p className="text-xs text-gray-500 mt-1">{caption.length}/200</p>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg disabled:opacity-60"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit2 className="w-4 h-4" />}
                        {loading ? 'Saving...' : 'Save Caption'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2.5 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}