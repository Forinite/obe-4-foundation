// app/admin/dashboard/Gallery/GallerySection.tsx
'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {useGalleryData} from "@/app/hooks/useGalleryData";
import GalleryImageCard from "@/app/(components)/adminComponents/Gallery/GalleryImageCard";
import AddGalleryImageModal from '@/app/(components)/adminComponents/Gallery/modals/AddGalleryImageModal';
import DeleteGalleryImageModal from '@/app/(components)/adminComponents/Gallery/modals/DeleteGalleryImageModal';
import { addGalleryImage, deleteGalleryImage } from '@/app/actions/gallery';

export default function GallerySection() {
    const { data: images, loading, error, refetch } = useGalleryData();

    // 🔥 MODAL STATES
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState('');

    const handleSuccess = () => {
        refetch();
    };

    const openAddModal = () => setShowAddModal(true);
    const openDeleteModal = (imageId: string) => {
        setDeleteImageId(imageId);
        setShowDeleteModal(true);
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    if (!images?.length) return <div className="p-6 text-center">No images</div>;

    return (
        <>
            <div className="space-y-8">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl mt-8 ml-2 font-semibold text-gray-800 dark:text-gray-100">
                            Gallery Images ({images.length})
                        </h3>
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Image</span>
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((image) => (
                            <GalleryImageCard
                                key={image._id}
                                image={image}
                                onDelete={() => openDeleteModal(image._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 🔥 2 MODALS */}
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
        </>
    );
}