//app/(components)/adminComponents/Gallery/modals/DeleteGalleryBatchIModal.tsx

'use client';

import React, { useState } from 'react';
import { deleteGalleryImages } from '@/app/actions/gallery';
import Modal from '@/app/admin/components/Modal';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteGalleryBatchModal({
                                                    isOpen,
                                                    onClose,
                                                    imageIds,
                                                    onSuccess,
                                                }: {
    isOpen: boolean;
    onClose: () => void;
    imageIds: string[];
    onSuccess: () => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!imageIds.length) return;
        setLoading(true);
        try {
            await deleteGalleryImages(imageIds);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to delete images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Selected Images">
            <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold">{imageIds.length}</span>{' '}
                    selected image{imageIds.length > 1 ? 's' : ''}? <br />
                    This action cannot be undone.
                </p>

                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" /> Delete All
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}
