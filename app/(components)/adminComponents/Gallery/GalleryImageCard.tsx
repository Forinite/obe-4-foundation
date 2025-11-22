// app/adminComponents/Gallery/GalleryImageCard.tsx


'use client';

import { GalleryImage } from '@/app/types';
import { Trash2, Edit2 } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';
import { useState } from 'react';
import EditGalleryImageModal from '@/app/(components)/adminComponents/Gallery/modals/EditGalleryImageModal';

const builder = imageUrlBuilder(client);
function urlFor(source: GalleryImage['image']) {
    return builder.image(source).width(600).url();
}

interface GalleryImageCardProps {
    image: GalleryImage;
    onDelete: () => void;
}

export default function GalleryImageCard({ image, onDelete }: GalleryImageCardProps) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="relative aspect-video">
                    <img
                        src={urlFor(image.image)}
                        alt={image.caption || 'Gallery image'}
                        className="w-full h-full object-cover"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="p-3 bg-white/90 hover:bg-cyan-100 rounded-full text-cyan-600 hover:text-cyan-700 transition"
                        >
                            <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-3 bg-white/90 hover:bg-red-600 hover:text-white rounded-full text-red-600 transition"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile buttons */}
                    <div className="md:hidden absolute top-2 right-2 flex gap-2">
                        <button onClick={() => setShowEditModal(true)} className="p-2 bg-white/90 rounded-full">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={onDelete} className="p-2  bg-white/90 rounded-full text-red-600">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Caption */}
                {image.caption && (
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                            {image.caption}
                        </p>
                    </div>
                )}
            </div>

            <EditGalleryImageModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                imageId={image._id}
                currentCaption={image.caption || ''}
                onSuccess={() => {
                    setShowEditModal(false);
                    window.location.reload(); // or use refetch from parent
                }}
            />
        </>
    );
}