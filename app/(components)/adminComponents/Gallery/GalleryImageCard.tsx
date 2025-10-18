// app/adminComponents/Gallery/GalleryImageCard.tsx
'use client';

import { GalleryImage } from '@/app/types';
import { Trash2 } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client);
function urlFor(source: GalleryImage['image']) {
    return builder.image(source).width(400).url();
}

interface GalleryImageCardProps {
    image: GalleryImage;
    onDelete: () => void;
}

export default function GalleryImageCard({ image, onDelete }: GalleryImageCardProps) {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-cyan-400 transition-all duration-200">
            <div className="relative">
                <img
                    src={urlFor(image.image)}
                    alt="Gallery"
                    className="w-full h-48 object-cover transition-transform duration-300 md:group-hover:scale-[1.03]"
                />

                {/* Overlay for desktop hover */}
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 md:group-hover:opacity-100">
                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={onDelete}
                            className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="Delete image"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Always visible delete button for mobile */}
                <button
                    onClick={onDelete}
                    className="absolute top-2 right-2 md:hidden p-2 bg-white/90 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition active:scale-90"
                    aria-label="Delete image (mobile)"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <div className="p-3 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <span className="font-mono text-xs truncate">ID: {image._id.slice(-8)}</span>
            </div>
        </div>
    );
}
