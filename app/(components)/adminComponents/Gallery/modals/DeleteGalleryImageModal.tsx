//app/(components)/adminComponents/Gallery/modals/DeleteGalleryImageModal.tsx

'use client';

import React from 'react';
import { deleteGalleryImage } from '@/app/actions/gallery';
import Modal from '@/app/admin/components/Modal';
import { Trash2 } from 'lucide-react';

export default function DeleteGalleryImageModal({
                                                    isOpen,
                                                    onClose,
                                                    imageId,
                                                    onSuccess
                                                }: {
    isOpen: boolean;
    onClose: () => void;
    imageId: string;
    onSuccess: () => void;
}) {
    const handleDelete = async () => {
        try {
            await deleteGalleryImage(imageId);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Image">
            <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">Are you sure you want to delete this image? This action cannot be undone.</p>
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}