// app/admin/dashboard/Gallery/GallerySection.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useGalleryData } from '@/app/hooks/useGalleryData';
import GalleryImageCard from '@/app/(components)/adminComponents/Gallery/GalleryImageCard';
import AddGalleryImageModal from '@/app/(components)/adminComponents/Gallery/modals/AddGalleryImageModal';
import DeleteGalleryImageModal from '@/app/(components)/adminComponents/Gallery/modals/DeleteGalleryImageModal';
import DeleteGalleryBatchModal from '@/app/(components)/adminComponents/Gallery/modals/DeleteGalleryBatchModal';

export default function GallerySection() {
    const { data: images, loading, error, refetch } = useGalleryData();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBatchDeleteModal, setShowBatchDeleteModal] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSuccess = () => refetch();

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const openAddModal = () => setShowAddModal(true);
    const openDeleteModal = (id: string) => {
        setDeleteImageId(id);
        setShowDeleteModal(true);
    };
    const openBatchDeleteModal = () => setShowBatchDeleteModal(true);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

    return (
        <>
            <div className="space-y-8">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-2xl mt-8 ml-2 font-semibold text-gray-800 dark:text-gray-100">
                            Gallery Images ({images?.length || 0})
                        </h3>

                        <div className="flex  items-center gap-4 md:text-base text-sm" >
                            {selectedIds.length > 0 && (
                                <button
                                    onClick={openBatchDeleteModal}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Delete ({selectedIds.length})
                                </button>
                            )}
                            <button
                                onClick={openAddModal}
                                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Images
                            </button>
                        </div>
                    </div>

                    {selectedIds.length > 0 && (
                        <button
                            onClick={openBatchDeleteModal}
                            className=" fixed z-20 top-16 bg-white/60 p-2 rounded-md flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                             ({selectedIds.length})
                        </button>
                    )}

                    {images?.length ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {images.map((image) => (
                                <div key={image._id} className="relative">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(image._id)}
                                        onChange={() => toggleSelect(image._id)}
                                        className="absolute top-2 left-2 w-4 h-4 z-20 accent-cyan-600"
                                    />
                                    <GalleryImageCard
                                        image={image}
                                        onDelete={() => openDeleteModal(image._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-500">No images</div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddGalleryImageModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleSuccess}
            />
            <DeleteGalleryImageModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                imageId={deleteImageId}
                onSuccess={handleSuccess}
            />
            <DeleteGalleryBatchModal
                isOpen={showBatchDeleteModal}
                onClose={() => setShowBatchDeleteModal(false)}
                imageIds={selectedIds}
                onSuccess={() => {
                    handleSuccess();
                    setSelectedIds([]);
                }}
            />
        </>
    );
}
